import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SectionShell } from "@/components/section-shell";
import { getUserRole } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Protected content and submissions dashboard for ADTL Africa staff.",
};

export default async function AdminPage() {
  const role = await getUserRole();
  if (role !== "admin" && role !== "editor") {
    redirect("/");
  }

  return (
    <main>
      <SectionShell
        title="Admin Dashboard"
        intro="Simple operational dashboard for managing content, resources, team members, careers, and incoming submissions."
      >
        <ul className="grid gap-4 md:grid-cols-2">
          <li className="rounded-md border border-border p-4">
            <h3 className="font-semibold text-ink">Blog Management</h3>
            <p className="mt-2 text-sm text-muted">Create, edit, publish, unpublish, and delete blog posts.</p>
            <Link href="/api/blog" className="mt-3 inline-block text-sm font-medium text-brand-primary">
              API Endpoint
            </Link>
          </li>
          <li className="rounded-md border border-border p-4">
            <h3 className="font-semibold text-ink">Resources Management</h3>
            <p className="mt-2 text-sm text-muted">Manage knowledge hub documents and categories.</p>
            <Link href="/api/resources" className="mt-3 inline-block text-sm font-medium text-brand-primary">
              API Endpoint
            </Link>
          </li>
          <li className="rounded-md border border-border p-4">
            <h3 className="font-semibold text-ink">Team Management</h3>
            <p className="mt-2 text-sm text-muted">Add, edit, and remove team member profiles.</p>
            <Link href="/api/team" className="mt-3 inline-block text-sm font-medium text-brand-primary">
              API Endpoint
            </Link>
          </li>
          <li className="rounded-md border border-border p-4">
            <h3 className="font-semibold text-ink">Submissions Inbox</h3>
            <p className="mt-2 text-sm text-muted">Review contact, partnership, and career application submissions.</p>
            <Link href="/api/submissions" className="mt-3 inline-block text-sm font-medium text-brand-primary">
              API Endpoint
            </Link>
          </li>
        </ul>
      </SectionShell>
    </main>
  );
}
