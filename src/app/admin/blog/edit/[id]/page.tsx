import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { SectionShell } from "@/components/section-shell";
import { getUserRole } from "@/lib/auth";
import { hasClerk } from "@/lib/env";
import { getDb } from "@/lib/db";
import { BlogEditorForm } from "@/components/blog-editor-form";

type Params = {
    id: string;
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { id } = await params;
    return {
        title: "Edit Blog Post",
        description: "Edit an existing blog post.",
    };
}

export default async function EditBlogPage({ params }: { params: Promise<Params> }) {
    if (!hasClerk) {
        redirect("/");
    }

    const { userId } = await auth();
    if (!userId) {
        redirect("/sign-in");
    }

    const role = await getUserRole();
    if (role !== "admin") {
        redirect("/");
    }

    const { id } = await params;
    const db = getDb();

    if (!db) {
        notFound();
    }

    try {
        const rows = (await db`
            SELECT id, title, slug, summary, featured_image AS "featuredImage", featured_image_alt AS "featuredImageAlt",
                   content_html AS "contentHtml", seo_title AS "seoTitle", seo_description AS "seoDescription",
                   published FROM blog_posts
            WHERE id = ${parseInt(id)}
            LIMIT 1
        `) as any[];

        if (rows.length === 0) {
            notFound();
        }

        const post = rows[0];

        return (
            <main>
                <SectionShell
                    title="Edit Blog Post"
                    intro="Update your blog post content, images, and SEO settings."
                >
                    <BlogEditorForm initialData={post as any} isEditMode />
                </SectionShell>
            </main>
        );
    } catch (error) {
        notFound();
    }
}
