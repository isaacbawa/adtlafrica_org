import { assertRole } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { jsonError } from "@/lib/http";
import { resourceCreateSchema } from "@/lib/validation";

export async function GET() {
    const db = getDb();
    if (!db) {
        return Response.json({ data: [] });
    }

    const { role } = await assertRole(["admin", "editor"]);
    const rows = role === "public"
        ? await db`
        SELECT id, title, category, description, url, published, download_count AS "downloadCount", created_at AS "createdAt"
        FROM resources
        WHERE published = TRUE
        ORDER BY created_at DESC
      `
        : await db`
        SELECT id, title, category, description, url, published, download_count AS "downloadCount", created_at AS "createdAt"
        FROM resources
        ORDER BY created_at DESC
      `;

    return Response.json({ data: rows });
}

export async function POST(request: Request) {
    const permission = await assertRole(["admin", "editor"]);
    if (!permission.allowed) {
        return jsonError("Unauthorized.", 401);
    }

    const payload = await request.json().catch(() => null);
    const parsed = resourceCreateSchema.safeParse(payload);
    if (!parsed.success) {
        return jsonError(parsed.error.issues[0]?.message ?? "Invalid input.");
    }

    const db = getDb();
    if (!db) {
        return jsonError("Database is not configured.", 500);
    }

    const rows = (await db`
    INSERT INTO resources (title, category, description, url, published)
    VALUES (${parsed.data.title}, ${parsed.data.category}, ${parsed.data.description}, ${parsed.data.url}, ${parsed.data.published})
    RETURNING id
  `) as { id: number }[];

    return Response.json({ id: rows[0]?.id }, { status: 201 });
}
