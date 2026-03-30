import type { NextRequest } from "next/server";
import { assertRole } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { jsonError } from "@/lib/http";
import { blogCreateSchema } from "@/lib/validation";

const blogUpdateSchema = blogCreateSchema.partial();

type Context = {
    params: Promise<{ slug: string }>;
};

export async function GET(_request: NextRequest, context: Context) {
    const { slug } = await context.params;
    const db = getDb();
    if (!db) {
        return jsonError("Database is not configured.", 500);
    }

    const { role } = await assertRole(["admin", "editor"]);
    const rows = (role === "public"
        ? await db`
        SELECT id, title, slug, summary, body, seo_title AS "seoTitle", seo_description AS "seoDescription", published, created_at AS "createdAt"
        FROM blog_posts
        WHERE slug = ${slug} AND published = TRUE
        LIMIT 1
      `
        : await db`
        SELECT id, title, slug, summary, body, seo_title AS "seoTitle", seo_description AS "seoDescription", published, created_at AS "createdAt"
        FROM blog_posts
        WHERE slug = ${slug}
        LIMIT 1
      `) as {
            id: number;
            title: string;
            slug: string;
            summary: string;
            body: string;
            seoTitle: string;
            seoDescription: string;
            published: boolean;
            createdAt: string;
        }[];

    if (!rows[0]) {
        return jsonError("Not found.", 404);
    }

    return Response.json(rows[0]);
}

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
