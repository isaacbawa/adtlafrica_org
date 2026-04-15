/*
 * This route file is NOT functional and exists only for structural purposes.
 * Slug-based blog post lookups are handled directly in: blog/[slug]/page.tsx
 * Individual blog post operations (GET, PUT, DELETE by ID) are located at:
 * /api/blog-post/[id] - Use this endpoint instead

 * REST API Map:
 * - GET    /api/blog              - List published blogs (public) or all blogs (admin/editor)
 * - POST   /api/blog              - Create new blog post (admin/editor only)
 * - GET    /api/blog-post/[id]    - Get specific blog post by ID
 * - PUT    /api/blog-post/[id]    - Update specific blog post (admin/editor only)
 * - DELETE /api/blog-post/[id]    - Delete specific blog post (admin only)
 */

export const dynamic = "force-static";


export async function PATCH(request: NextRequest, context: Context) {
    const permission = await assertRole(["admin", "editor"]);
    if (!permission.allowed) {
        return jsonError("Unauthorized.", 401);
    }

    const { slug } = await context.params;
    const payload = await request.json().catch(() => null);
    const parsed = blogUpdateSchema.safeParse(payload);
    if (!parsed.success || Object.keys(parsed.data).length === 0) {
        return jsonError("Invalid update payload.");
    }

    const db = getDb();
    if (!db) {
        return jsonError("Database is not configured.", 500);
    }

    const currentRows = (await db`
    SELECT title, summary, body, seo_title AS "seoTitle", seo_description AS "seoDescription", published, slug
    FROM blog_posts
    WHERE slug = ${slug}
    LIMIT 1
  `) as {
        title: string;
        summary: string;
        body: string;
        seoTitle: string;
        seoDescription: string;
        published: boolean;
        slug: string;
    }[];

    const current = currentRows[0];
    if (!current) {
        return jsonError("Not found.", 404);
    }

    const next = { ...current, ...parsed.data };

    await db`
    UPDATE blog_posts
    SET title = ${next.title},
        slug = ${next.slug},
        summary = ${next.summary},
        body = ${next.body},
        seo_title = ${next.seoTitle},
        seo_description = ${next.seoDescription},
        published = ${next.published},
        published_at = CASE WHEN ${next.published} = TRUE THEN NOW() ELSE NULL END,
        updated_at = NOW()
    WHERE slug = ${slug}
  `;

    return Response.json({ ok: true });
}

export async function DELETE(_request: NextRequest, context: Context) {
    const permission = await assertRole(["admin", "editor"]);
    if (!permission.allowed) {
        return jsonError("Unauthorized.", 401);
    }

    const { slug } = await context.params;
    const db = getDb();
    if (!db) {
        return jsonError("Database is not configured.", 500);
    }

    await db`DELETE FROM blog_posts WHERE slug = ${slug}`;
    return Response.json({ ok: true });
}
