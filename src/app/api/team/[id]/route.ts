import type { NextRequest } from "next/server";
import { assertRole } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { jsonError } from "@/lib/http";
import { teamMemberSchema } from "@/lib/validation";

const teamUpdateSchema = teamMemberSchema.partial();

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
    return jsonError("Invalid team member id.");
  }

  const payload = await request.json().catch(() => null);
  const parsed = teamUpdateSchema.safeParse(payload);
  if (!parsed.success || Object.keys(parsed.data).length === 0) {
    return jsonError("Invalid update payload.");
  }

  const db = getDb();
  if (!db) {
    return jsonError("Database is not configured.", 500);
  }

  const currentRows = (await db`
    SELECT name, role, bio, linkedin_url AS "linkedinUrl"
    FROM team_members
    WHERE id = ${id}
    LIMIT 1
  `) as {
    name: string;
    role: string;
    bio: string;
    linkedinUrl: string | null;
  }[];

  const current = currentRows[0];
  if (!current) {
    return jsonError("Not found.", 404);
  }

  const next = { ...current, ...parsed.data };

  await db`
    UPDATE team_members
    SET name = ${next.name},
        role = ${next.role},
        bio = ${next.bio},
        linkedin_url = ${next.linkedinUrl || null},
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
    return jsonError("Invalid team member id.");
  }

  const db = getDb();
  if (!db) {
    return jsonError("Database is not configured.", 500);
  }

  await db`DELETE FROM team_members WHERE id = ${id}`;
  return Response.json({ ok: true });
}
