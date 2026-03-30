import type { NextRequest } from "next/server";
import { assertRole } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { jsonError } from "@/lib/http";
import { jobListingSchema } from "@/lib/validation";

const jobUpdateSchema = jobListingSchema.partial();

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
    return jsonError("Invalid job id.");
  }

  const payload = await request.json().catch(() => null);
  const parsed = jobUpdateSchema.safeParse(payload);
  if (!parsed.success || Object.keys(parsed.data).length === 0) {
    return jsonError("Invalid update payload.");
  }

  const db = getDb();
  if (!db) {
    return jsonError("Database is not configured.", 500);
  }

  const currentRows = (await db`
    SELECT title, description, requirements, deadline, published
    FROM job_listings
    WHERE id = ${id}
    LIMIT 1
  `) as {
    title: string;
    description: string;
    requirements: string;
    deadline: string;
    published: boolean;
  }[];

  const current = currentRows[0];
  if (!current) {
    return jsonError("Not found.", 404);
  }

  const next = { ...current, ...parsed.data };

  await db`
    UPDATE job_listings
    SET title = ${next.title},
        description = ${next.description},
        requirements = ${next.requirements},
        deadline = ${new Date(next.deadline).toISOString()},
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
    return jsonError("Invalid job id.");
  }

  const db = getDb();
  if (!db) {
    return jsonError("Database is not configured.", 500);
  }

  await db`DELETE FROM job_listings WHERE id = ${id}`;
  return Response.json({ ok: true });
}
