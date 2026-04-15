import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { SectionShell } from "@/components/section-shell";
import { getUserRole } from "@/lib/auth";
import { hasClerk } from "@/lib/env";

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Protected content and submissions dashboard for ADTL Africa staff.",
};

export default async function AdminPage() {
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

    return (
        <main>
            <SectionShell
                title="Admin Dashboard"
                intro="Simple operational dashboard for managing content, resources, team members, careers, and incoming submissions."
            >
                <ul className="grid gap-4 md:grid-cols-2">
                    <li className="info-card">
                        <h3 className="text-2xl font-semibold text-ink">Blog Management</h3>
                        <p className="card-body">Create, edit, publish, unpublish, and delete blog posts with rich text editor.</p>
                        <Link href="/admin/blog" className="mt-4 inline-block text-base font-semibold text-brand-primary">
                            Manage Posts →
                        </Link>
                    </li>
                    <li className="info-card">
                        <h3 className="text-2xl font-semibold text-ink">Resources Management</h3>
                        <p className="card-body">Manage knowledge hub documents and categories.</p>
                        <Link href="/api/resources" className="mt-4 inline-block text-base font-semibold text-brand-primary">
                            API Endpoint
                        </Link>
                    </li>
                    <li className="info-card">
                        <h3 className="text-2xl font-semibold text-ink">Team Management</h3>
                        <p className="card-body">Add, edit, and remove team member profiles.</p>
                        <Link href="/api/team" className="mt-4 inline-block text-base font-semibold text-brand-primary">
                            API Endpoint
                        </Link>
                    </li>
                    <li className="info-card">
                        <h3 className="text-2xl font-semibold text-ink">Submissions Inbox</h3>
                        <p className="card-body">Review contact, partnership, and career application submissions.</p>
                        <Link href="/api/submissions" className="mt-4 inline-block text-base font-semibold text-brand-primary">
                            API Endpoint
                        </Link>
                    </li>
                </ul>
            </SectionShell>
        </main>
    );
}
