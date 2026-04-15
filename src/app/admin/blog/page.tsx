import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { SectionShell } from "@/components/section-shell";
import { getUserRole } from "@/lib/auth";
import { hasClerk } from "@/lib/env";
import { getAllBlogPosts } from "@/lib/repository";
import { BlogPostsManager } from "@/components/blog-posts-manager";

export const metadata: Metadata = {
    title: "Manage Blog",
    description: "Create, edit, and manage blog posts.",
};

export default async function AdminBlogPage() {
    // If Clerk is not configured, redirect to home
    if (!hasClerk) {
        redirect("/");
    }

    const { userId } = await auth();

    // If not signed in, redirect to sign-in
    if (!userId) {
        redirect("/sign-in");
    }

    // Check if user has admin role
    const role = await getUserRole();
    if (role !== "admin") {
        redirect("/");
    }

    const isAdmin = true;
    const posts = await getAllBlogPosts();

    return (
        <main>
            <SectionShell
                title="Blog Management"
                intro="Create, edit, and manage blog posts with rich text editor, images, and SEO optimization."
            >
                <div className="space-y-6">
                    {/* Create New Post Button */}
                    <Link
                        href="/admin/blog/create"
                        className="inline-block px-6 py-3 rounded-lg bg-brand-primary text-white font-semibold hover:bg-opacity-90 transition-opacity"
                    >
                        + Create New Post
                    </Link>

                    {/* Posts Manager */}
                    <BlogPostsManager initialPosts={posts} isAdmin={isAdmin} />
                </div>
            </SectionShell>
        </main>
    );
}
