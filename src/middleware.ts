import { clerkMiddleware } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { env } from "@/lib/env";

export default env.clerkSecretKey ? clerkMiddleware() : ((request: NextRequest) => { });

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|cur|heic|heif|webm|mp4)(?:\\?.*)?$)[^?]*(?:\\?.*)?$)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
