import type { NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { jsonError } from "@/lib/http";

export async function GET(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get("id"));
  if (!Number.isFinite(id) || id <= 0) {
    return jsonError("Invalid resource id.");
  }

  const db = getDb();
  if (!db) {
    return jsonError("Database is not configured.", 500);
  }

  const rows = (await db`
    UPDATE resources
    SET download_count = download_count + 1,
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING url
  `) as { url: string }[];

  if (!rows[0]?.url) {
    return jsonError("Resource not found.", 404);
  }

  return Response.redirect(rows[0].url, 302);
}
