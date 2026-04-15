"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type BlogPost = {
    id: number;
    title: string;
    slug: string;
    summary: string;
    featuredImage?: string | null;
    featured_image?: string | null;
    published: boolean;
    createdAt: string;
    created_at?: string;
    updatedAt?: string;
    updated_at?: string;
};

type AdminBlogDashboardProps = {
    posts: BlogPost[];
};

export function AdminBlogDashboard({ posts: initialPosts }: AdminBlogDashboardProps) {
    const router = useRouter();
    const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterPublished, setFilterPublished] = useState<"all" | "published" | "draft">("all");
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [togglingId, setTogglingId] = useState<number | null>(null);

    // Filter and search posts
    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesSearch =
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.summary.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesFilter =
                filterPublished === "all" ||
                (filterPublished === "published" && post.published) ||
                (filterPublished === "draft" && !post.published);

            return matchesSearch && matchesFilter;
        });
    }, [posts, searchQuery, filterPublished]);

    const handleDelete = async (id: number) => {
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
        setTogglingId(post.id);

        try {
            const response = await fetch(`/api/blog-post/${post.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: post.title,
                    slug: post.slug,
                    summary: post.summary,
                    body: "", // Required but not updated here
                    content_html: "",
                    published: !post.published,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update post");
            }

            setPosts(
                posts.map((p) =>
                    p.id === post.id ? { ...p, published: !p.published } : p
                )
            );

            toast.success(`Post ${!post.published ? "published" : "unpublished"}`);
            router.refresh();
        } catch (error) {
            toast.error("Failed to update post");
        } finally {
            setTogglingId(null);
        }
    };

    const getFormattedDate = (dateString: string | undefined) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="space-y-6">
            {/* Header with Create Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-ink">Blog Posts</h2>
                    <p className="mt-1 text-xs sm:text-sm text-ink-soft">
                        Manage your blog content. {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""} found.
                    </p>
                </div>
                <Link
                    href="/admin/blog/create"
                    className="btn-primary w-full sm:w-auto text-center text-xs sm:text-sm"
                >
                    + Create New Post
                </Link>
            </div>

            {/* Search and Filter Controls */}
            <div className="space-y-3 sm:space-y-4">
                {/* Search */}
                <div>
                    <label htmlFor="search" className="field-label text-xs sm:text-sm">
                        Search posts
                    </label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Title, slug, or summary..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="field-input text-xs sm:text-sm"
                    />
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 flex-wrap">
                    {(["all", "published", "draft"] as const).map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setFilterPublished(filter)}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-colors ${
                                filterPublished === filter
                                    ? "bg-brand-primary text-white"
                                    : "bg-surface-soft text-ink hover:bg-border"
                            }`}
                        >
                            {filter === "all" && "All Posts"}
                            {filter === "published" && "Published"}
                            {filter === "draft" && "Drafts"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Posts List */}
            {filteredPosts.length === 0 ? (
                <div className="rounded-lg border border-border bg-surface-soft p-8 sm:p-12 text-center">
                    <p className="text-sm sm:text-base text-ink-soft">
                        {posts.length === 0
                            ? "No blog posts yet. Create your first post to get started!"
                            : "No posts match your search or filter."}
                    </p>
                </div>
            ) : (
                <div className="space-y-2 sm:space-y-3">
                    {filteredPosts.map((post) => (
                        <div
                            key={post.id}
                            className="rounded-lg border border-border bg-white hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-4">
                                {/* Featured Image Thumbnail */}
                                {(post.featuredImage || post.featured_image) && (
                                    <div className="shrink-0 w-full sm:w-20 h-24 sm:h-20 rounded overflow-hidden bg-surface-soft">
                                        <Image
                                            src={post.featuredImage || post.featured_image || ""}
                                            alt={post.title}
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Post Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                        <div className="min-w-0">
                                            <Link
                                                href={`/admin/blog/edit/${post.id}`}
                                                className="block"
                                            >
                                                <h3 className="text-sm sm:text-base font-semibold text-brand-primary hover:text-brand-primary-strong transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                            </Link>
                                            <p className="mt-1 text-xs text-ink-soft truncate">
                                                /{post.slug}
                                            </p>
                                            <p className="mt-2 text-xs sm:text-sm text-ink-soft line-clamp-2">
                                                {post.summary}
                                            </p>
                                        </div>

                                        {/* Status Badge */}
                                        <div className="shrink-0">
                                            <span
                                                className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${
                                                    post.published
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                            >
                                                {post.published ? "Published" : "Draft"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Metadata */}
                                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-ink-soft">
                                        <span>Created: {getFormattedDate(post.createdAt || post.created_at)}</span>
                                        {(post.updatedAt || post.updated_at) && (
                                            <span>Updated: {getFormattedDate(post.updatedAt || post.updated_at)}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-2 w-full sm:w-auto">
                                    <Link
                                        href={`/admin/blog/edit/${post.id}`}
                                        className="btn-secondary text-xs text-center"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => togglePublish(post)}
                                        disabled={togglingId === post.id}
                                        className={`px-3 py-1.5 text-xs font-medium rounded transition-colors disabled:opacity-60 ${
                                            post.published
                                                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                                : "bg-green-100 text-green-700 hover:bg-green-200"
                                        }`}
                                    >
                                        {togglingId === post.id
                                            ? "Updating..."
                                            : post.published
                                              ? "Unpublish"
                                              : "Publish"}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        disabled={deletingId === post.id}
                                        className="px-3 py-1.5 text-xs font-medium rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors disabled:opacity-60"
                                    >
                                        {deletingId === post.id ? "Deleting..." : "Delete"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
