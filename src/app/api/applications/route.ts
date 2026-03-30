import type { NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { notifyAdmin } from "@/lib/email";
import { getIpAddress, jsonError } from "@/lib/http";
import { checkRateLimit } from "@/lib/rate-limit";
import { careerApplicationSchema } from "@/lib/validation";

const MAX_CV_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
    const ip = getIpAddress(request);
    const limit = checkRateLimit(`application:${ip}`, 3, 30 * 60 * 1000);
    if (!limit.allowed) {
        return jsonError(`Rate limited. Retry in ${limit.retryAfter}s.`, 429);
    }

    const formData = await request.formData();
    const cv = formData.get("cv");

    const payload = {
        jobId: Number(formData.get("jobId")),
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        coverLetter: String(formData.get("coverLetter") ?? ""),
        website: String(formData.get("website") ?? ""),
    };

    const parsed = careerApplicationSchema.safeParse(payload);
    if (!parsed.success) {
        return jsonError(parsed.error.issues[0]?.message ?? "Invalid input.");
    }

    if (parsed.data.website) {
        return Response.json({ ok: true });
    }

    if (!(cv instanceof File)) {
        return jsonError("CV file is required.");
    }

    const isPdfType = cv.type === "application/pdf";
    const isPdfName = cv.name.toLowerCase().endsWith(".pdf");
    if (!isPdfType || !isPdfName) {
        return jsonError("Only PDF files are allowed for CV upload.");
    }

    if (cv.size > MAX_CV_SIZE) {
        return jsonError("CV exceeds 5MB limit.");
    }

    const db = getDb();
    if (db) {
        await db`
      INSERT INTO applications (job_id, name, email, cover_letter, cv_file_name, cv_mime_type, cv_file_size)
      VALUES (${parsed.data.jobId}, ${parsed.data.name}, ${parsed.data.email}, ${parsed.data.coverLetter}, ${cv.name}, ${cv.type}, ${cv.size})
    `;
    }

    await notifyAdmin("application", `New job application from ${parsed.data.name}`);
    return Response.json({ ok: true });
}
