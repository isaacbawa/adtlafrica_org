import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { serverLogger } from "@/lib/server-logger";

type BlogPostPageProps = {
    params: Promise<{ slug: string }>;
};

type BlogPost = {
    id: number;
    title: string;
    slug: string;
    summary: string;
    featuredImage?: string;
    featuredImageAlt?: string;
    contentHtml: string;
    seoTitle: string;
    seoDescription: string;
    createdAt: string;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const db = getDb();

    if (!db) {
        return {
            title: "Article Not Found",
            description: "The requested article is not available.",
        };
    }

    try {
        const rows = (await db`
            SELECT seo_title AS "seoTitle", seo_description AS "seoDescription", 
                   featured_image AS "featuredImage"
            FROM blog_posts
            WHERE slug = ${slug} AND published = TRUE
            LIMIT 1
        `) as Array<{ seoTitle: string; seoDescription: string; featuredImage: string | null }>;

        if (rows.length === 0) {
            return {
                title: "Article Not Found",
                description: "The requested article is not available.",
            };
        }

        const post = rows[0];
        return {
            title: post.seoTitle || "ADTL Africa Blog",
            description: post.seoDescription || "Read insights from ADTL Africa",
            openGraph: {
                title: post.seoTitle,
                description: post.seoDescription,
                type: "article",
                images: post.featuredImage ? [{ url: post.featuredImage }] : [],
            },
        };
    } catch (error) {
        serverLogger.error("Error generating metadata for blog post:", error);
        return {
            title: "Article Not Found",
            description: "The requested article is not available.",
        };
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const db = getDb();

    if (!db) {
        notFound();
    }

    let post: BlogPost | null = null;

    try {
        const rows = (await db`
            SELECT id, title, slug, summary, featured_image AS "featuredImage", 
                   featured_image_alt AS "featuredImageAlt", content_html AS "contentHtml",
                   seo_title AS "seoTitle", seo_description AS "seoDescription", 
                   created_at AS "createdAt"
            FROM blog_posts
            WHERE slug = ${slug} AND published = TRUE
            LIMIT 1
        `) as BlogPost[];

        if (rows.length === 0) {
            notFound();
        }

        post = rows[0];
    } catch (error) {
        serverLogger.error("Error fetching blog post by slug:", error);
        notFound();
    }

    if (!post) {
        notFound();
    }

    return (
        <main className="site-container py-12 md:py-16">
            <article className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <p className="section-kicker">Article</p>
                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl">
                        {post.title}
                    </h1>
                    <time className="mt-4 inline-block text-base text-muted">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                </div>

                {/* Featured Image */}
                {post.featuredImage && (
                    <div className="mb-8 rounded-lg overflow-hidden border border-border">
                        <img
                            src={post.featuredImage}
                            alt={post.featuredImageAlt || post.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

                {/* Content - HTML rendering */}
                <div
                    className="prose prose-lg max-w-none prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl 
                              prose-a:text-brand-primary prose-a:underline prose-img:rounded-lg prose-img:border prose-img:border-border
                              prose-blockquote:border-l-4 prose-blockquote:border-brand-primary prose-blockquote:pl-4 prose-blockquote:italic
                              prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                              prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                              prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6
                              text-ink"
                    dangerouslySetInnerHTML={{
                        __html: post.contentHtml,
                    }}
                />

                {/* Back Link */}
                <div className="mt-12 pt-8 border-t border-border">
                    <a href="/blog" className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:underline">
                        ← Back to Blog
                    </a>
                </div>
            </article>
        </main>
    );
}
