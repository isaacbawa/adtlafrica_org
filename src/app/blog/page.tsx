import type { Metadata } from "next";
import Link from "next/link";
import { SectionShell } from "@/components/section-shell";
import { serverLogger } from "@/lib/server-logger";
import { getDb } from "@/lib/db";

export const metadata: Metadata = {
    title: "Blog",
    description: "Insights on AI adoption, digital transformation, and practical implementation across Africa.",
};

type BlogPostCard = {
    id: number;
    title: string;
    slug: string;
    summary: string;
    featuredImage?: string;
    featuredImageAlt?: string;
    createdAt: string;
};

export default async function BlogPage() {
    let posts: BlogPostCard[] = [];
    let error = false;

    const db = getDb();
    if (db) {
        try {
            const rows = await db`
                SELECT id, title, slug, summary, featured_image AS "featuredImage", 
                       featured_image_alt AS "featuredImageAlt", created_at AS "createdAt"
                FROM blog_posts
                WHERE published = TRUE
                ORDER BY created_at DESC
            `;
            posts = rows as BlogPostCard[];
        } catch (err) {
            serverLogger.error("Failed to fetch published blog posts:", err);
            error = true;
        }
    } else {
        serverLogger.error("Database not configured for blog posts");
        error = true;
    }

    return (
        <main>
            <SectionShell
                title="Blog"
                intro="Field insights, implementation notes, and practical perspectives for partners and clients scaling digital transformation."
            >
                {error && (
                    <div className="mb-6 p-4 rounded-lg border border-red-200 bg-red-50 text-red-800">
                        <p className="font-semibold">Unable to load blog posts</p>
                        <p className="text-sm mt-1">Please try again later or contact support.</p>
                    </div>
                )}

                {posts.length === 0 ? (
                    <div className="text-center py-12 text-muted">
                        <p className="text-lg">No blog posts published yet.</p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group overflow-hidden rounded-lg border border-border bg-white hover:shadow-lg transition-shadow duration-300"
                            >
                                {/* Featured Image */}
                                {post.featuredImage ? (
                                    <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
                                        <img
                                            src={post.featuredImage}
                                            alt={post.featuredImageAlt || post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ) : (
                                    <div className="relative w-full aspect-video bg-linear-to-br from-brand-primary/10 to-brand-primary/5 flex items-center justify-center">
                                        <div className="text-4xl opacity-20">📝</div>
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-5 space-y-3">
                                    <h3 className="text-xl font-semibold text-ink line-clamp-2 group-hover:text-brand-primary transition-colors">
                                        {post.title}
                                    </h3>

                                    <p className="text-sm text-muted line-clamp-2">{post.summary}</p>

                                    <div className="pt-2 flex items-center justify-between">
                                        <time className="text-xs text-muted">
                                            {new Date(post.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </time>
                                        <span className="text-sm font-semibold text-brand-primary group-hover:translate-x-1 transition-transform">
                                            Read →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </SectionShell>
        </main>
    );
}
