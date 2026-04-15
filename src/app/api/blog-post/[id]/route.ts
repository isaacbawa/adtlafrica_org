import { assertRole, getUserId } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { jsonError } from "@/lib/http";
import { serverLogger } from "@/lib/server-logger";

type Params = {
    id: string;
};

export async function GET(request: Request, { params }: { params: Promise<Params> }) {
    try {
        const { id } = await params;
        const postId = parseInt(id);

        if (isNaN(postId)) {
            return jsonError("Invalid blog post ID format.", 400);
        }

        const db = getDb();
        if (!db) {
            serverLogger.error("Database not configured for blog-post GET");
            return jsonError("Database is not available.", 500);
        }

        const rows = (await db`
            SELECT id, title, slug, summary, featured_image AS "featuredImage", featured_image_alt AS "featuredImageAlt",
                   body, content_html AS "contentHtml", seo_title AS "seoTitle", seo_description AS "seoDescription",
                   published, created_at AS "createdAt", updated_at AS "updatedAt"
            FROM blog_posts
            WHERE id = ${postId}
            LIMIT 1
        `) as any[];

        if (rows.length === 0) {
            return jsonError("Blog post not found.", 404);
        }

        serverLogger.info({ action: "blog_post_fetched", postId });
        return Response.json(rows[0], { status: 200 });
    } catch (error) {
        serverLogger.error("Error fetching blog post:", error);
        return jsonError("Failed to fetch blog post.", 500);
    }
}

export async function PUT(request: Request, { params }: { params: Promise<Params> }) {
    try {
        const permission = await assertRole(["admin", "editor"]);
        if (!permission.allowed) {
            serverLogger.warn({ action: "blog_update_unauthorized", role: permission.role });
            return jsonError("Unauthorized. Only admins and editors can update blog posts.", 401);
        }

        const userId = await getUserId();
        if (!userId) {
            return jsonError("Authentication required.", 401);
        }

        const { id } = await params;
        const postId = parseInt(id);

        if (isNaN(postId)) {
            return jsonError("Invalid blog post ID format.", 400);
        }

        const payload = await request.json().catch(() => null);

        // Validate required fields
        if (!payload || !payload.title || !payload.slug || !payload.contentHtml) {
            return jsonError("Missing required fields: title, slug, and contentHtml are required.", 400);
        }

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
            serverLogger.error("Database not configured for blog-post PUT");
            return jsonError("Database is not available.", 500);
        }

        try {
            // Verify post exists
            const existing = (await db`
                SELECT id FROM blog_posts WHERE id = ${postId}
            `) as any[];

            if (existing.length === 0) {
                return jsonError("Blog post not found.", 404);
            }

            // Check if new slug already exists (excluding current post)
            if (payload.slug !== existing[0].slug) {
                const slugExists = (await db`
                    SELECT id FROM blog_posts 
                    WHERE slug = ${payload.slug.toLowerCase()} AND id != ${postId}
                    LIMIT 1
                `) as any[];

                if (slugExists.length > 0) {
                    serverLogger.warn({ action: "blog_update_slug_conflict", postId, slug: payload.slug });
                    return jsonError(`Slug "${payload.slug}" is already in use.`, 409);
                }
            }

            // Sanitize data
            const title = payload.title.trim().substring(0, 255);
            const slug = payload.slug.toLowerCase().trim();
            const summary = (payload.summary || title).trim().substring(0, 500);
            const seoTitle = (payload.seoTitle || title).trim().substring(0, 60);
            const seoDescription = (payload.seoDescription || summary).trim().substring(0, 160);
            const contentHtml = payload.contentHtml.trim();
            const featured_image = payload.featuredImage || null;
            const featured_image_alt = payload.featuredImageAlt || null;
            const published = payload.published === true;

            const rows = (await db`
                UPDATE blog_posts 
                SET title = ${title},
                    slug = ${slug},
                    summary = ${summary},
                    body = ${summary},
                    featured_image = ${featured_image},
                    featured_image_alt = ${featured_image_alt},
                    content_html = ${contentHtml},
                    seo_title = ${seoTitle},
                    seo_description = ${seoDescription},
                    published = ${published},
                    updated_at = NOW()
                WHERE id = ${postId}
                RETURNING id, updated_at AS "updatedAt"
            `) as any[];

            if (rows.length === 0) {
                return jsonError("Failed to update blog post.", 500);
            }

            serverLogger.info({ action: "blog_post_updated", postId, userId, title, slug, published });
            return Response.json({
                id: rows[0]?.id,
                message: "Blog post updated successfully",
                updatedAt: rows[0]?.updatedAt
            }, { status: 200 });
        } catch (dbError: unknown) {
            serverLogger.error("Database error updating blog post:", dbError);
            const message = dbError instanceof Error ? dbError.message : "Failed to update blog post.";
            return jsonError(message, 500);
        }
    } catch (error) {
        serverLogger.error("Unexpected error in blog PUT:", error);
        return jsonError("An unexpected error occurred. Please try again.", 500);
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<Params> }) {
    try {
        const permission = await assertRole(["admin"]);
        if (!permission.allowed) {
            serverLogger.warn({ action: "blog_delete_unauthorized", role: permission.role });
            return jsonError("Unauthorized. Only admins can delete blog posts.", 403);
        }

        const userId = await getUserId();
        if (!userId) {
            return jsonError("Authentication required.", 401);
        }

        const { id } = await params;
        const postId = parseInt(id);

        if (isNaN(postId)) {
            return jsonError("Invalid blog post ID format.", 400);
        }

        const db = getDb();
        if (!db) {
            serverLogger.error("Database not configured for blog-post DELETE");
            return jsonError("Database is not available.", 500);
        }

        try {
            // Verify post exists first
            const existing = (await db`
                SELECT id, title FROM blog_posts WHERE id = ${postId}
            `) as any[];

            if (existing.length === 0) {
                return jsonError("Blog post not found.", 404);
            }

            const postTitle = existing[0]?.title;

            // Delete the post
            const rows = (await db`
                DELETE FROM blog_posts
                WHERE id = ${postId}
                RETURNING id
            `) as any[];

            if (rows.length === 0) {
                return jsonError("Failed to delete blog post.", 500);
            }

            serverLogger.info({ action: "blog_post_deleted", postId, userId, postTitle });
            return Response.json({
                message: "Blog post deleted successfully",
                id: postId
            }, { status: 200 });
        } catch (dbError: unknown) {
            serverLogger.error("Database error deleting blog post:", dbError);
            const message = dbError instanceof Error ? dbError.message : "Failed to delete blog post.";
            return jsonError(message, 500);
        }
    } catch (error) {
        serverLogger.error("Unexpected error in blog DELETE:", error);
        return jsonError("An unexpected error occurred. Please try again.", 500);
    }
}
