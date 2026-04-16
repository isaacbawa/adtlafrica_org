import { env, hasIndexNow } from "./env";
import { logger } from "./server-logger";

interface IndexNowSubmissionPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

interface IndexNowResponse {
  success: boolean;
  status?: number;
  message: string;
}

/**
 * Submit URLs to IndexNow API for search engine indexing
 * Production-ready implementation with error handling and validation
 */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResponse> {
  // Skip if IndexNow is not configured
  if (!hasIndexNow) {
    logger.info("IndexNow not configured, skipping submission");
    return {
      success: false,
      message: "IndexNow is not configured",
    };
  }

  // Validate URLs
  if (!urls || urls.length === 0) {
    logger.warn("No URLs provided for IndexNow submission");
    return {
      success: false,
      message: "No URLs provided",
    };
  }

  // Limit to 10,000 URLs per request (IndexNow limit)
  const urlsToSubmit = urls.slice(0, 10000);

  try {
    const keyLocation = `${env.siteUrl}/8f0122d23de2402ebac56108da25a71d.txt`;
    const host = new URL(env.siteUrl).hostname;

    const payload: IndexNowSubmissionPayload = {
      host,
      key: env.indexNowKey!,
      keyLocation,
      urlList: urlsToSubmit,
    };

    logger.info(`Submitting ${urlsToSubmit.length} URLs to IndexNow`, {
      host,
      urlCount: urlsToSubmit.length,
    });

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    // Handle response based on status code
    if (response.status === 200) {
      logger.info(`IndexNow submission successful (${urlsToSubmit.length} URLs)`);
      return {
        success: true,
        status: 200,
        message: `Successfully submitted ${urlsToSubmit.length} URLs to IndexNow`,
      };
    }

    if (response.status === 400) {
      logger.error("IndexNow submission failed: Invalid format");
      return {
        success: false,
        status: 400,
        message: "Invalid request format",
      };
    }

    if (response.status === 403) {
      logger.error("IndexNow submission failed: Invalid key or key location");
      return {
        success: false,
        status: 403,
        message: "Authentication failed - check key configuration",
      };
    }

    if (response.status === 422) {
      logger.error("IndexNow submission failed: URLs don't belong to host or key mismatch");
      return {
        success: false,
        status: 422,
        message: "URL validation failed or key mismatch",
      };
    }

    if (response.status === 429) {
      logger.warn("IndexNow rate limit hit");
      return {
        success: false,
        status: 429,
        message: "Rate limited - please try again later",
      };
    }

    // Unexpected status code
    const responseText = await response.text();
    logger.error(`IndexNow submission failed with status ${response.status}`, {
      status: response.status,
      response: responseText,
    });

    return {
      success: false,
      status: response.status,
      message: `Submission failed with status ${response.status}`,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logger.error("IndexNow submission error", {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });

    return {
      success: false,
      message: `IndexNow submission error: ${errorMessage}`,
    };
  }
}

/**
 * Submit a single URL to IndexNow
 */
export async function submitSingleUrlToIndexNow(url: string): Promise<IndexNowResponse> {
  return submitToIndexNow([url]);
}

/**
 * Generate a list of important URLs for IndexNow submission
 * Called after content updates
 */
export function generateSitemapUrls(): string[] {
  const base = env.siteUrl;

  return [
    // Main pages
    `${base}/`,
    `${base}/about`,
    `${base}/services`,
    `${base}/resources`,
    `${base}/partnership`,
    `${base}/contact`,
    `${base}/our-people`,
    `${base}/blog`,
    `${base}/career`,
  ];
}
