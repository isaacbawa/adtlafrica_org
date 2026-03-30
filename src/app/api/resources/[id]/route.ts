import type { NextRequest } from "next/server";
import { assertRole } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { jsonError } from "@/lib/http";
import { resourceCreateSchema } from "@/lib/validation";

const resourceUpdateSchema = resourceCreateSchema.partial();

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, context: Context) {
  const permission = await assertRole(["admin", "editor"]);
  if (!permission.allowed) {
    return jsonError("Unauthorized.", 401);
  }

  const id = Number((await context.params).id);
  if (!Number.isFinite(id) || id <= 0) {
    return jsonError("Invalid resource id.");
  }

  const payload = await request.json().catch(() => null);
  const parsed = resourceUpdateSchema.safeParse(payload);
  if (!parsed.success || Object.keys(parsed.data).length === 0) {
    return jsonError("Invalid update payload.");
  }

  const db = getDb();
  if (!db) {
    return jsonError("Database is not configured.", 500);
  }

  const currentRows = (await db`
    SELECT title, category, description, url, published
    FROM resources
    WHERE id = ${id}
    LIMIT 1
  `) as {
    title: string;
    category: string;
    description: string;
    url: string;
    published: boolean;
  }[];

  const current = currentRows[0];
  if (!current) {
    return jsonError("Not found.", 404);
  }

  const next = { ...current, ...parsed.data };

  await db`
    UPDATE resources
    SET title = ${next.title},
        category = ${next.category},
        description = ${next.description},
        url = ${next.url},
        published = ${next.published},
        updated_at = NOW()
    WHERE id = ${id}
  `;

  return Response.json({ ok: true });
}

export async function DELETE(_request: NextRequest, context: Context) {
  const permission = await assertRole(["admin", "editor"]);
  if (!permission.allowed) {
    return jsonError("Unauthorized.", 401);
  }

  const id = Number((await context.params).id);
  if (!Number.isFinite(id) || id <= 0) {
    return jsonError("Invalid resource id.");
  }

  const db = getDb();
  if (!db) {
    return jsonError("Database is not configured.", 500);
  }

  await db`DELETE FROM resources WHERE id = ${id}`;
  return Response.json({ ok: true });
}
