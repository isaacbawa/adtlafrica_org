import { readFileSync } from "fs";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

// Load environment variables from .env.local
config({ path: ".env.local" });

async function initDatabase() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        console.error("DATABASE_URL environment variable is not set");
        process.exit(1);
    }

    const db = neon(databaseUrl);

    try {
        console.log("Reading schema file...");
        const schema = readFileSync("./db/schema.sql", "utf-8");

        console.log("Executing schema...");
        // Split the schema into individual statements and execute them
        const statements = schema.split(';').filter(stmt => stmt.trim().length > 0);

        for (const statement of statements) {
            if (statement.trim()) {
                await db.unsafe(statement.trim() + ';');
            }
        }

        console.log("✅ Database schema initialized successfully!");
    } catch (error) {
        console.error("❌ Failed to initialize database:", error);
        process.exit(1);
    }
}

initDatabase();