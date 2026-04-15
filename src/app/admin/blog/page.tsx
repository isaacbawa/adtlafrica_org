import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { SectionShell } from "@/components/section-shell";
import { AdminBlogDashboard } from "@/components/admin-blog-dashboard";
import { getUserRole } from "@/lib/auth";
import { hasClerk } from "@/lib/env";
import { getAllBlogPosts } from "@/lib/repository";

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

    const posts = await getAllBlogPosts();

    return (
        <main>
            <SectionShell
                title="Blog Management"
                intro="Create, edit, publish, and manage all your blog posts with rich text editing, images, and SEO optimization."
            >
                <AdminBlogDashboard posts={posts} />
            </SectionShell>
        </main>
    );
}
