import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { hasClerk } from "@/lib/env";
import { serverLogger } from "@/lib/server-logger";

// 10MB max file size
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        if (hasClerk) {
            const { userId } = await auth();
            if (!userId) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
        }

        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Validate file type - allow common image formats
        const validImageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
        if (!validImageTypes.includes(file.type)) {
            return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG, WebP, GIF, and SVG are allowed." }, { status: 400 });
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: "File size exceeds 10MB limit" }, { status: 400 });
        }

        // Convert file to base64 for storage
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");
        const dataUrl = `data:${file.type};base64,${base64}`;

        // Generate unique ID for the image
        const imageId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Log upload
        serverLogger.info({
            action: "blog_image_upload",
            filename: file.name,
            size: file.size,
            type: file.type,
            imageId,
        });

        return NextResponse.json({
            url: dataUrl,
            id: imageId,
            name: file.name,
            size: file.size,
        });
    } catch (error) {
        serverLogger.error("Image upload error:", error);
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }
}
