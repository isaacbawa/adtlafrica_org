"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type BlogPost = {
    id: number;
    title: string;
    slug: string;
    featuredImage?: string | null;
    published: boolean;
    createdAt: string;
    updatedAt?: string;
};

type BlogPostsManagerProps = {
    initialPosts: BlogPost[];
    isAdmin: boolean;
};

export function BlogPostsManager({ initialPosts, isAdmin }: BlogPostsManagerProps) {
    const router = useRouter();
    const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = async (id: number) => {
        if (!isAdmin) {
            toast.error("Only admins can delete posts");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this post? This cannot be undone.")) {
            return;
        }

        setDeletingId(id);

        try {
            const response = await fetch(`/api/blog-post/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete post");
            }

            setPosts(posts.filter((post) => post.id !== id));
            toast.success("Blog post deleted successfully");
            router.refresh();
        } catch (error) {
            toast.error("Failed to delete blog post");
        } finally {
            setDeletingId(null);
        }
    };

    const togglePublish = async (post: BlogPost) => {
        try {
            const response = await fetch(`/api/blog-post/${post.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...post,
                    published: !post.published,
                }),
            });

            if (!response.ok) throw new Error("Failed to update post");

            setPosts(
                posts.map((p) => (p.id === post.id ? { ...p, published: !p.published } : p))
            );
            toast.success(`Post ${!post.published ? "published" : "unpublished"}`);
            router.refresh();
        } catch (error) {
            toast.error("Failed to update post");
        }
    };

    if (posts.length === 0) {
        return (
            <div className="text-center py-12 text-muted">
                <p className="text-lg">No blog posts yet. Create your first post to get started!</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="flex items-center gap-4 rounded-lg border border-border bg-white p-4 hover:shadow-md transition-shadow"
                >
                    {/* Featured Image Thumbnail */}
                    {post.featuredImage && (
                        <div className="shrink-0 w-20 h-20 rounded hidden sm:block">
                            <img
                                src={post.featuredImage}
                                alt={post.title}
                                className="w-full h-full object-cover rounded"
                            />
                        </div>
                    )}

                    {/* Post Info */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-ink truncate">{post.title}</h3>
                        <p className="text-sm text-muted mt-1">/{post.slug}</p>
                        <p className="text-xs text-muted mt-2">
                            Created {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${post.published
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                                }`}
                        >
                            {post.published ? "Published" : "Draft"}
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="shrink-0 flex gap-2">
                        <button
                            onClick={() => togglePublish(post)}
                            className="px-3 py-1 rounded text-sm font-semibold border border-border text-ink hover:bg-gray-50 transition-colors"
                            title={post.published ? "Unpublish" : "Publish"}
                        >
                            {post.published ? "↓" : "✓"}
                        </button>

                        <Link
                            href={`/admin/blog/edit/${post.id}`}
                            className="px-3 py-1 rounded text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                        >
                            Edit
                        </Link>

                        {isAdmin && (
                            <button
                                onClick={() => handleDelete(post.id)}
                                disabled={deletingId === post.id}
                                className="px-3 py-1 rounded text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                            >
                                {deletingId === post.id ? "..." : "Delete"}
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
