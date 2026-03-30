import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/repository";

type BlogPostPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        return {
            title: "Article Not Found",
            description: "The requested article is not available.",
        };
    }

    return {
        title: post.seoTitle,
        description: post.seoDescription,
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="site-container py-12 md:py-16">
            <article>
                <p className="section-kicker">Article</p>
                <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-ink md:text-6xl">{post.title}</h1>
                <p className="mt-4 text-base text-muted">{new Date(post.createdAt).toLocaleDateString()}</p>
                <p className="mt-8 whitespace-pre-line text-lg leading-9 text-ink">{post.body}</p>
            </article>
        </main>
    );
}
