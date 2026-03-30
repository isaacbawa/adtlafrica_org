import { z } from "zod";
import { assertRole, getUserId } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { jsonError } from "@/lib/http";
import { blogCreateSchema } from "@/lib/validation";

export async function GET() {
  const db = getDb();
  if (!db) {
    return Response.json({ data: [] });
  }

  const { role } = await assertRole(["admin", "editor"]);
  const rows = role === "public"
    ? await db`
        SELECT id, title, slug, summary, seo_title AS "seoTitle", seo_description AS "seoDescription", published, created_at AS "createdAt"
        FROM blog_posts
        WHERE published = TRUE
        ORDER BY created_at DESC
      `
    : await db`
        SELECT id, title, slug, summary, seo_title AS "seoTitle", seo_description AS "seoDescription", published, created_at AS "createdAt"
        FROM blog_posts
        ORDER BY created_at DESC
      `;

  return Response.json({ data: rows });
}

export async function POST(request: Request) {
  const permission = await assertRole(["admin", "editor"]);
  if (!permission.allowed) {
    return jsonError("Unauthorized.", 401);
  }

  const userId = await getUserId();
  if (!userId) {
    return jsonError("Authentication required.", 401);
  }

  const payload = await request.json().catch(() => null);
  const parsed = blogCreateSchema.safeParse(payload);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Invalid input.");
  }

  const db = getDb();
  if (!db) {
    return jsonError("Database is not configured.", 500);
  }

  try {
    const rows = (await db`
      INSERT INTO blog_posts (author_clerk_user_id, title, slug, summary, body, seo_title, seo_description, published, published_at)
      VALUES (${userId}, ${parsed.data.title}, ${parsed.data.slug}, ${parsed.data.summary}, ${parsed.data.body}, ${parsed.data.seoTitle}, ${parsed.data.seoDescription}, ${parsed.data.published}, ${parsed.data.published ? new Date().toISOString() : null})
      RETURNING id
    `) as { id: number }[];

    return Response.json({ id: rows[0]?.id }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof z.ZodError ? error.message : "Unable to create blog post.";
    return jsonError(message, 400);
  }
}
