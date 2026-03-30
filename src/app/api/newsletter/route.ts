import type { NextRequest } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { getIpAddress, jsonError } from "@/lib/http";
import { checkRateLimit } from "@/lib/rate-limit";

const newsletterSchema = z.object({
    email: z.email().max(320).transform((value) => value.toLowerCase()),
});

export async function POST(request: NextRequest) {
    const ip = getIpAddress(request);
    const limit = checkRateLimit(`newsletter:${ip}`, 8, 10 * 60 * 1000);
    if (!limit.allowed) {
        return jsonError(`Rate limited. Retry in ${limit.retryAfter}s.`, 429);
    }

    const payload = await request.json().catch(() => null);
    const parsed = newsletterSchema.safeParse(payload);
    if (!parsed.success) {
        return jsonError(parsed.error.issues[0]?.message ?? "Invalid email.");
    }

    const db = getDb();
    if (db) {
        try {
            await db`
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
          id BIGSERIAL PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

            await db`
        INSERT INTO newsletter_subscribers (email)
        VALUES (${parsed.data.email})
        ON CONFLICT (email) DO NOTHING
      `;
        } catch {
            // Soft-fail on subscription storage in case database access is unavailable.
        }
    }

    return Response.json({ ok: true });
}
