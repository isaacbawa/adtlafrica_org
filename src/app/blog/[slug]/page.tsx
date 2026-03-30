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
    <main className="mx-auto w-full max-w-4xl px-6 py-14">
      <article>
        <h1 className="text-4xl font-semibold tracking-tight text-ink">{post.title}</h1>
        <p className="mt-4 text-sm text-muted">{new Date(post.createdAt).toLocaleDateString()}</p>
        <p className="mt-8 whitespace-pre-line text-base leading-8 text-ink">{post.body}</p>
      </article>
    </main>
  );
}
