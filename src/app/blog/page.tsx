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
                        <article key={post.id} className="info-card">
                            <h3 className="text-2xl font-semibold text-ink md:text-3xl">{post.title}</h3>
                            <p className="card-body">{post.summary}</p>
                            <Link href={`/blog/${post.slug}`} className="mt-5 inline-block text-base font-semibold text-brand-primary">
                                Read article
                            </Link>
                        </article>
                    ))}
                </div>
            </SectionShell>
        </main>
    );
}
