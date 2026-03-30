import { assertRole } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { jsonError } from "@/lib/http";
import { jobListingSchema } from "@/lib/validation";

export async function GET() {
    const db = getDb();
    if (!db) {
        return Response.json({ data: [] });
    }

    const { role } = await assertRole(["admin", "editor"]);
    const rows = role === "public"
        ? await db`
        SELECT id, title, description, requirements, deadline, published
        FROM job_listings
        WHERE published = TRUE
        ORDER BY deadline ASC
      `
        : await db`
        SELECT id, title, description, requirements, deadline, published
        FROM job_listings
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
    const parsed = jobListingSchema.safeParse(payload);
    if (!parsed.success) {
        return jsonError(parsed.error.issues[0]?.message ?? "Invalid input.");
    }

    const db = getDb();
    if (!db) {
        return jsonError("Database is not configured.", 500);
    }

    const rows = (await db`
    INSERT INTO job_listings (title, description, requirements, deadline, published)
    VALUES (${parsed.data.title}, ${parsed.data.description}, ${parsed.data.requirements}, ${parsed.data.deadline.toISOString()}, ${parsed.data.published})
    RETURNING id
  `) as { id: number }[];

    return Response.json({ id: rows[0]?.id }, { status: 201 });
}
