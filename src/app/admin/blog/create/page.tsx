import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { SectionShell } from "@/components/section-shell";
import { getUserRole } from "@/lib/auth";
import { hasClerk } from "@/lib/env";
import { BlogEditorForm } from "@/components/blog-editor-form";

export const metadata: Metadata = {
    title: "Create Blog Post",
    description: "Create a new blog post with rich text editor.",
};

export default async function CreateBlogPage() {
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

    return (
        <main>
            <SectionShell
                title="Create Blog Post"
                intro="Write a new blog post with rich text formatting, images, and SEO optimization."
            >
                <BlogEditorForm />
            </SectionShell>
        </main>
    );
}
