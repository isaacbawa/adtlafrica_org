import { NextRequest, NextResponse } from "next/server";
import { submitToIndexNow, generateSitemapUrls } from "@/lib/indexnow";
import { checkRateLimit } from "@/lib/rate-limit";
import { hasIndexNow } from "@/lib/env";
import { serverLogger } from "@/lib/server-logger";

/**
 * POST /api/indexnow
 * Endpoint to manually trigger IndexNow URL submissions
 * Protected with rate limiting and origin validation
 */
export async function POST(request: NextRequest) {
  try {
    // Check if IndexNow is configured
    if (!hasIndexNow) {
      return NextResponse.json(
        { error: "IndexNow is not configured" },
        { status: 503 }
      );
    }

    // Rate limiting (1 request per minute per IP)
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rateLimitKey = `indexnow-${ip}`;
    const allowed = await checkRateLimit(rateLimitKey, 1, 60);

    if (!allowed) {
      serverLogger.warn("IndexNow endpoint rate limited", { ip });
      return NextResponse.json(
        { error: "Rate limit exceeded. Maximum 1 request per minute." },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const urls = body.urls as string[];

    // Validate URLs parameter
    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: "Invalid request. Provide 'urls' as an array." },
        { status: 400 }
      );
    }

    // Validate URLs format
    const validUrls = urls.filter((url) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    });

    if (validUrls.length === 0) {
      return NextResponse.json(
        { error: "No valid URLs provided." },
        { status: 400 }
      );
    }

    // Submit to IndexNow
    const result = await submitToIndexNow(validUrls);

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    }

    return NextResponse.json(result, { status: result.status || 400 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    serverLogger.error("IndexNow API error", { error: errorMessage });

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/indexnow
 * Endpoint to submit all important sitemap URLs
 * Useful for triggering bulk indexing
 */
export async function GET(request: NextRequest) {
  try {
    // Check if IndexNow is configured
    if (!hasIndexNow) {
      return NextResponse.json(
        { error: "IndexNow is not configured" },
        { status: 503 }
      );
    }

    // Rate limiting (1 request per 5 minutes per IP)
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rateLimitKey = `indexnow-bulk-${ip}`;
    const allowed = await checkRateLimit(rateLimitKey, 1, 300);

    if (!allowed) {
      serverLogger.warn("IndexNow bulk endpoint rate limited", { ip });
      return NextResponse.json(
        { error: "Rate limit exceeded. Maximum 1 request per 5 minutes." },
        { status: 429 }
      );
    }

    // Generate and submit all important URLs
    const urls = generateSitemapUrls();
    const result = await submitToIndexNow(urls);

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    }

    return NextResponse.json(result, { status: result.status || 400 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    serverLogger.error("IndexNow bulk API error", { error: errorMessage });

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
