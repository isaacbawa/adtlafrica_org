import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import { hasClerk } from "@/lib/env";

const passthroughMiddleware = (_request: NextRequest) => NextResponse.next();

export const proxy = hasClerk ? clerkMiddleware() : passthroughMiddleware;

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|cur|heic|heif|webm|mp4)(?:\\?.*)?$)[^?]*(?:\\?.*)?$)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
