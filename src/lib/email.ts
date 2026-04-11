import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

type SubmissionType = "contact" | "partnership" | "application";

export async function notifyAdmin(type: SubmissionType, subject: string) {
    if (!env.adminEmail) {
        return;
    }

    // Placeholder delivery layer. In production, connect a provider like Resend,
    // Postmark, or SES using server-side API keys and verified sender domains.
    logger.info(`[notify-admin] ${type} -> ${env.adminEmail}: ${subject}`);
}
