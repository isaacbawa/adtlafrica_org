import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { notifyAdmin } from "@/lib/email";
import { getIpAddress, jsonError } from "@/lib/http";
import { checkRateLimit } from "@/lib/rate-limit";
import { partnershipSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
    const ip = getIpAddress(request);
    const limit = checkRateLimit(`partnership:${ip}`, 5, 15 * 60 * 1000);
    if (!limit.allowed) {
        return jsonError(`Rate limited. Retry in ${limit.retryAfter}s.`, 429);
    }

    const payload = await request.json().catch(() => null);
    const parsed = partnershipSchema.safeParse(payload);

    if (!parsed.success) {
        return jsonError(parsed.error.issues[0]?.message ?? "Invalid input.");
    }

    if (parsed.data.website) {
        return Response.json({ ok: true });
    }

    const db = getDb();
    if (db) {
        await db`
      INSERT INTO partnership_requests (organization_name, contact_person, email, phone, partnership_type, message, ip_hash)
      VALUES (${parsed.data.organizationName}, ${parsed.data.contactPerson}, ${parsed.data.email}, ${parsed.data.phone}, ${parsed.data.partnershipType}, ${parsed.data.message}, ${createHash("sha256").update(ip).digest("hex")})
    `;
    }

    await notifyAdmin("partnership", `New partnership request from ${parsed.data.organizationName}`);
    return Response.json({ ok: true });
}
