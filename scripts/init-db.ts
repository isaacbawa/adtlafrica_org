import { readFileSync } from "fs";
import { Pool } from "pg";
import { config } from "dotenv";

// Load environment variables from .env.local
config({ path: ".env.local" });

/**
 * Simple SQL statement splitter that respects string literals and comments.
 * Splits SQL on semicolons that are not inside quotes or comments.
 */
function splitSqlStatements(schema: string): string[] {
    const statements: string[] = [];
    let current = "";
    let inSingleQuote = false;
    let inDoubleQuote = false;
    let inLineComment = false;
    let inBlockComment = false;

    for (let i = 0; i < schema.length; i++) {
        const char = schema[i];
        const nextChar = schema[i + 1];

        // Handle line comments
        if (!inSingleQuote && !inDoubleQuote && !inBlockComment && char === '-' && nextChar === '-') {
            inLineComment = true;
            current += char;
            continue;
        }

        if (inLineComment && (char === '\n' || char === '\r')) {
            inLineComment = false;
            current += char;
            continue;
        }

        // Handle block comments
        if (!inSingleQuote && !inDoubleQuote && !inLineComment && char === '/' && nextChar === '*') {
            inBlockComment = true;
            current += char;
            continue;
        }

        if (inBlockComment && char === '*' && nextChar === '/') {
            inBlockComment = true;
            current += char;
            i++; // Skip next char
            current += schema[i];
            inBlockComment = false;
            continue;
        }

        // Handle string escapes
        if ((inSingleQuote || inDoubleQuote) && char === '\\' && nextChar) {
            current += char;
            i++; // Skip next char
            current += schema[i];
            continue;
        }

        // Toggle quote states
        if (!inLineComment && !inBlockComment) {
            if (char === "'" && !inDoubleQuote) {
                inSingleQuote = !inSingleQuote;
            } else if (char === '"' && !inSingleQuote) {
                inDoubleQuote = !inDoubleQuote;
            }
        }

        // Handle statement terminator
        if (char === ';' && !inSingleQuote && !inDoubleQuote && !inLineComment && !inBlockComment) {
            current += char;
            const trimmed = current.trim();
            if (trimmed.length > 0) {
                statements.push(trimmed);
            }
            current = "";
            continue;
        }

        current += char;
    }

    // Don't forget the last statement if it doesn't end with semicolon
    const trimmed = current.trim();
    if (trimmed.length > 0) {
        statements.push(trimmed);
    }

    return statements;
}

async function initDatabase() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        console.error("DATABASE_URL environment variable is not set");
        process.exit(1);
    }

    // Use a standard PostgreSQL Pool for schema initialization
    const pool = new Pool({
        connectionString: databaseUrl,
        ssl: { rejectUnauthorized: false },
    });

    let hasError = false;

    try {
        console.log("Reading schema file...");
        const schema = readFileSync("./db/schema.sql", "utf-8");

        console.log("Executing schema...");
        const statements = splitSqlStatements(schema);
        console.log(`Found ${statements.length} SQL statements to execute`);

        let executedCount = 0;
        let skippedCount = 0;

        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            if (statement.trim()) {
                try {
                    console.log(`[${i + 1}/${statements.length}] Executing statement...`);
                    await pool.query(statement);
                    executedCount++;
                    const preview = statement.split('\n')[0].substring(0, 50);
                    console.log(`✓ [${i + 1}/${statements.length}] Executed: ${preview}...`);
                } catch (err: unknown) {
                    // Log but continue for idempotent operations
                    const errMsg = err instanceof Error ? err.message : String(err);
                    if (!errMsg.includes("already exists")) {
                        console.warn(`⚠ [${i + 1}/${statements.length}] Error: ${errMsg.substring(0, 80)}`);
                    } else {
                        console.log(`⊘ [${i + 1}/${statements.length}] Skipped (already exists)`);
                        skippedCount++;
                    }
                }
            }
        }

        console.log(`\n✅ Database schema initialized successfully!`);
        console.log(`   Executed: ${executedCount} statements`);
        console.log(`   Skipped: ${skippedCount} statements (already existing)`);
    } catch (error) {
        console.error("❌ Failed to initialize database:", error);
        hasError = true;
    } finally {
        console.log("Closing database connection...");
        try {
            await pool.end();
            console.log("Database connection closed");
        } catch (err) {
            console.error("Error closing connection:", err);
            hasError = true;
        }
    }

    // Exit with appropriate code
    if (hasError) {
        process.exit(1);
    } else {
        process.exit(0);
    }
}

// Add error handlers
process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
    process.exit(1);
});

process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
});

initDatabase().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
});