import type { Metadata } from "next";
import Link from "next/link";
import { SectionShell } from "@/components/section-shell";
import { getPublishedBlogPosts } from "@/lib/repository";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on AI adoption, digital transformation, and practical implementation across Africa.",
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <main>
      <SectionShell
        title="Blog"
        intro="Field insights, implementation notes, and practical perspectives for partners and clients scaling digital transformation."
      >
        <div className="space-y-5">
          {posts.map((post) => (
            <article key={post.id} className="rounded-md border border-border p-5">
              <h3 className="text-xl font-semibold text-ink">{post.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{post.summary}</p>
              <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-medium text-brand-primary">
                Read article
              </Link>
            </article>
          ))}
        </div>
      </SectionShell>
    </main>
  );
}
