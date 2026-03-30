import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { notifyAdmin } from "@/lib/email";
import { getIpAddress, jsonError } from "@/lib/http";
import { checkRateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const ip = getIpAddress(request);
  const limit = checkRateLimit(`contact:${ip}`, 5, 15 * 60 * 1000);
  if (!limit.allowed) {
    return jsonError(`Rate limited. Retry in ${limit.retryAfter}s.`, 429);
  }

  const payload = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Invalid input.");
  }

  if (parsed.data.website) {
    return Response.json({ ok: true });
  }

  const db = getDb();
  if (db) {
    await db`
      INSERT INTO contact_messages (name, email, subject, message, ip_hash)
      VALUES (${parsed.data.name}, ${parsed.data.email}, ${parsed.data.subject}, ${parsed.data.message}, ${createHash("sha256").update(ip).digest("hex")})
    `;
  }

  await notifyAdmin("contact", `New contact message: ${parsed.data.subject}`);
  return Response.json({ ok: true });
}
