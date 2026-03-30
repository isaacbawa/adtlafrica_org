import { assertRole } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { jsonError } from "@/lib/http";
import { teamMemberSchema } from "@/lib/validation";

export async function GET() {
  const db = getDb();
  if (!db) {
    return Response.json({ data: [] });
  }

  const rows = await db`
    SELECT id, name, role, bio, linkedin_url AS "linkedinUrl", display_order AS "displayOrder"
    FROM team_members
    ORDER BY display_order ASC, created_at DESC
  `;

  return Response.json({ data: rows });
}

export async function POST(request: Request) {
  const permission = await assertRole(["admin", "editor"]);
  if (!permission.allowed) {
    return jsonError("Unauthorized.", 401);
  }

  const payload = await request.json().catch(() => null);
  const parsed = teamMemberSchema.safeParse(payload);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Invalid input.");
  }

  const db = getDb();
  if (!db) {
    return jsonError("Database is not configured.", 500);
  }

  const rows = (await db`
    INSERT INTO team_members (name, role, bio, linkedin_url)
    VALUES (${parsed.data.name}, ${parsed.data.role}, ${parsed.data.bio}, ${parsed.data.linkedinUrl || null})
    RETURNING id
  `) as { id: number }[];

  return Response.json({ id: rows[0]?.id }, { status: 201 });
}
