import { neon } from "@neondatabase/serverless";
import { env, hasDatabase } from "@/lib/env";

let client: ReturnType<typeof neon> | null = null;

export function getDb() {
    if (!hasDatabase || !env.databaseUrl) {
        return null;
    }

    if (!client) {
        client = neon(env.databaseUrl);
    }

    return client;
}
