import { assertRole, getUserId } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { jsonError } from "@/lib/http";
import { serverLogger } from "@/lib/server-logger";

export async function GET(request: Request) {
    const db = getDb();
    if (!db) {
        serverLogger.error("Database not configured for blog GET");
        return Response.json({ data: [] }, { status: 500 });
    }

    try {
        const permission = await assertRole(["admin", "editor", "public"]);
        const role = permission.role || "public";

        const rows = role === "public"
            ? await db`
                SELECT id, title, slug, summary, featured_image AS "featuredImage", featured_image_alt AS "featuredImageAlt", 
                       seo_title AS "seoTitle", seo_description AS "seoDescription", published, created_at AS "createdAt"
                FROM blog_posts
                WHERE published = TRUE
                ORDER BY created_at DESC
              `
            : await db`
                SELECT id, title, slug, summary, featured_image AS "featuredImage", featured_image_alt AS "featuredImageAlt",
                       content_html AS "contentHtml", seo_title AS "seoTitle", seo_description AS "seoDescription", 
                       published, created_at AS "createdAt", updated_at AS "updatedAt"
                FROM blog_posts
                ORDER BY created_at DESC
              `;

        serverLogger.info({ action: "blog_posts_fetched", count: rows.length, role });
        return Response.json({ data: rows, count: rows.length }, { status: 200 });
    } catch (error) {
        serverLogger.error("Failed to fetch blog posts:", error);
        return jsonError("Unable to fetch blog posts", 500);
    }
}

export async function POST(request: Request) {
    try {
        const permission = await assertRole(["admin", "editor"]);
        if (!permission.allowed) {
            serverLogger.warn({ action: "blog_create_unauthorized", role: permission.role });
            return jsonError("Unauthorized. Only admins and editors can create blog posts.", 401);
        }

        const userId = await getUserId();
        if (!userId) {
            serverLogger.warn("Blog POST attempted without authentication");
            return jsonError("Authentication required.", 401);
        }

        const payload = await request.json().catch(() => null);

        // Validate required fields
        if (!payload || !payload.title || !payload.slug || !payload.contentHtml) {
            serverLogger.warn({
                action: "blog_create_validation_failed",
                userId,
                fields: { title: !!payload?.title, slug: !!payload?.slug, contentHtml: !!payload?.contentHtml }
            });
            return jsonError("Missing required fields: title, slug, and contentHtml are required.", 400);
        }

        // Validate field constraints
        if (typeof payload.title !== "string" || payload.title.trim().length === 0) {
            return jsonError("Title must be a non-empty string.", 400);
        }

        if (typeof payload.slug !== "string" || payload.slug.trim().length === 0) {
            return jsonError("Slug must be a non-empty string.", 400);
        }

        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(payload.slug)) {
            return jsonError("Slug must be lowercase, alphanumeric, and separated by hyphens.", 400);
        }

        if (typeof payload.contentHtml !== "string" || payload.contentHtml.trim().length === 0) {
            return jsonError("Content must be provided.", 400);
        }

        const db = getDb();
        if (!db) {
            serverLogger.error("Database not configured for blog POST");
            return jsonError("Database is not available. Please try again later.", 500);
        }

        try {
            // Check if slug already exists
            const slugExists = await db`
                SELECT id FROM blog_posts WHERE slug = ${payload.slug.toLowerCase()}
            `;

            if (slugExists.length > 0) {
                serverLogger.warn({ action: "blog_create_slug_exists", slug: payload.slug });
                return jsonError(`Slug "${payload.slug}" is already in use. Please choose a different slug.`, 409);
            }

            // Sanitize and validate data
            const title = payload.title.trim().substring(0, 255);
            const slug = payload.slug.toLowerCase().trim();
            const summary = (payload.summary || payload.title).trim().substring(0, 500);
            const seoTitle = (payload.seoTitle || title).trim().substring(0, 60);
            const seoDescription = (payload.seoDescription || summary).trim().substring(0, 160);
            const contentHtml = payload.contentHtml.trim();
            const featured_image = payload.featuredImage || null;
            const featured_image_alt = payload.featuredImageAlt || null;
            const published = payload.published === true;

            const rows = await db`
                INSERT INTO blog_posts 
                (title, slug, summary, body, featured_image, featured_image_alt, content_html, seo_title, seo_description, published, created_at, updated_at)
                VALUES (${title}, ${slug}, ${summary}, ${summary}, ${featured_image}, ${featured_image_alt}, ${contentHtml}, ${seoTitle}, ${seoDescription}, ${published}, NOW(), NOW())
                RETURNING id, created_at AS "createdAt"
            `;

            const postId = rows[0]?.id;
            serverLogger.info({ action: "blog_post_created", postId, userId, title, slug, published });

            return Response.json({
                id: postId,
                message: "Blog post created successfully",
                createdAt: rows[0]?.createdAt
            }, { status: 201 });
        } catch (dbError: unknown) {
            serverLogger.error("Database error creating blog post:", dbError);
            const message = dbError instanceof Error ? dbError.message : "Failed to save blog post to database";
            return jsonError(message, 500);
        }
    } catch (error) {
        serverLogger.error("Unexpected error in blog POST:", error);
        return jsonError("An unexpected error occurred. Please try again.", 500);
    }
}
