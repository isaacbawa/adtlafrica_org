import { clerkMiddleware } from "@clerk/nextjs/server";

// Use clerkMiddleware to attach auth context to requests
// The middleware itself doesn't enforce protection - that's handled in individual routes
export const proxy = clerkMiddleware();

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|cur|heic|heif|webm|mp4)(?:\\?.*)?$)[^?]*(?:\\?.*)?$)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
