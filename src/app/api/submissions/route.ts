import { assertRole } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { jsonError } from "@/lib/http";

export async function GET() {
  const permission = await assertRole(["admin", "editor"]);
  if (!permission.allowed) {
    return jsonError("Unauthorized.", 401);
  }

  const db = getDb();
  if (!db) {
    return jsonError("Database is not configured.", 500);
  }

  const [contact, partnership, applications] = await Promise.all([
    db`
      SELECT id, name, email, subject, message, created_at AS "createdAt"
      FROM contact_messages
      ORDER BY created_at DESC
      LIMIT 100
    `,
    db`
      SELECT id, organization_name AS "organizationName", contact_person AS "contactPerson", email, phone, partnership_type AS "partnershipType", message, created_at AS "createdAt"
      FROM partnership_requests
      ORDER BY created_at DESC
      LIMIT 100
    `,
    db`
      SELECT id, job_id AS "jobId", name, email, cover_letter AS "coverLetter", cv_file_name AS "cvFileName", created_at AS "createdAt"
      FROM applications
      ORDER BY created_at DESC
      LIMIT 100
    `,
  ]);

  return Response.json({ contact, partnership, applications });
}
