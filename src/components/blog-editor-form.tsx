"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RichTextEditor } from "@/components/rich-text-editor";

type BlogEditorFormProps = {
    initialData?: {
        id: number;
        title: string;
        slug: string;
        summary: string;
        featuredImage?: string;
        featuredImageAlt?: string;
        contentHtml: string;
        seoTitle: string;
        seoDescription: string;
        published: boolean;
    };
    isEditMode?: boolean;
};

export function BlogEditorForm({ initialData, isEditMode = false }: BlogEditorFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        summary: initialData?.summary || "",
        featuredImage: initialData?.featuredImage || "",
        featuredImageAlt: initialData?.featuredImageAlt || "",
        contentHtml: initialData?.contentHtml || "",
        seoTitle: initialData?.seoTitle || "",
        seoDescription: initialData?.seoDescription || "",
        published: initialData?.published || false,
    });

    const handleGenerateSlug = useCallback(() => {
        const slug = formData.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
        setFormData((prev) => ({ ...prev, slug }));
    }, [formData.title]);

    const handleFeaturedImageUpload = useCallback(async () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            try {
                const formDataObj = new FormData();
                formDataObj.append("file", file);

                const response = await fetch("/api/upload-image", {
                    method: "POST",
                    body: formDataObj,
                });

                if (!response.ok) throw new Error("Upload failed");
                const { url } = await response.json();

                setFormData((prev) => ({
                    ...prev,
                    featuredImage: url,
                    featuredImageAlt: file.name,
                }));
                toast.success("Featured image uploaded");
            } catch (error) {
                console.error("Image upload error:", error);
                toast.error("Failed to upload image");
            }
        };
        input.click();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            toast.error("Title is required");
            return;
        }

        if (!formData.slug.trim()) {
            toast.error("Slug is required");
            return;
        }

        if (!formData.contentHtml.trim()) {
            toast.error("Content is required");
            return;
        }

        setIsLoading(true);

        try {
            const url = isEditMode ? `/api/blog-post/${initialData?.id}` : "/api/blog";
            const method = isEditMode ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to save blog post");
            }

            toast.success(isEditMode ? "Blog post updated successfully" : "Blog post created successfully");
            router.push("/admin/blog");
            router.refresh();
        } catch (error) {
            console.error("Form submission error:", error);
            toast.error(error instanceof Error ? error.message : "Failed to save blog post");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
                <label className="block text-sm font-semibold text-ink mb-2">Title *</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter blog post title"
                    className="w-full rounded-lg border border-border bg-white px-4 py-2 text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    disabled={isLoading}
                />
            </div>

            {/* Slug */}
            <div>
                <label className="block text-sm font-semibold text-ink mb-2">Slug *</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                        placeholder="url-friendly-slug"
                        className="flex-1 rounded-lg border border-border bg-white px-4 py-2 text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        disabled={isLoading}
                    />
                    <button
                        type="button"
                        onClick={handleGenerateSlug}
                        className="px-4 py-2 rounded-lg bg-brand-primary text-white font-semibold hover:bg-opacity-90 transition-opacity disabled:opacity-50"
                        disabled={isLoading}
                    >
                        Generate
                    </button>
                </div>
            </div>

            {/* Summary */}
            <div>
                <label className="block text-sm font-semibold text-ink mb-2">Summary</label>
                <textarea
                    value={formData.summary}
                    onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
                    placeholder="Brief summary for blog card display"
                    rows={3}
                    className="w-full rounded-lg border border-border bg-white px-4 py-2 text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    disabled={isLoading}
                />
            </div>

            {/* Featured Image */}
            <div>
                <label className="block text-sm font-semibold text-ink mb-2">Featured Image</label>
                <div className="space-y-3">
                    <button
                        type="button"
                        onClick={handleFeaturedImageUpload}
                        className="px-4 py-2 rounded-lg border-2 border-dashed border-border bg-gray-50 text-ink font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
                        disabled={isLoading}
                    >
                        🖼️ Upload Featured Image
                    </button>
                    {formData.featuredImage && (
                        <div className="space-y-2">
                            <img
                                src={formData.featuredImage}
                                alt="Featured"
                                className="w-full max-w-md h-auto rounded-lg border border-border"
                            />
                            <input
                                type="text"
                                value={formData.featuredImageAlt}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, featuredImageAlt: e.target.value }))
                                }
                                placeholder="Alt text for featured image"
                                className="w-full rounded-lg border border-border bg-white px-4 py-2 text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                disabled={isLoading}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Content Editor */}
            <div>
                <label className="block text-sm font-semibold text-ink mb-2">Content *</label>
                <RichTextEditor
                    content={formData.contentHtml}
                    onChange={(content) => setFormData((prev) => ({ ...prev, contentHtml: content }))}
                    placeholder="Write your blog post content..."
                />
            </div>

            {/* SEO Section */}
            <div className="rounded-lg border border-border bg-gray-50 p-4 space-y-4">
                <h3 className="text-lg font-semibold text-ink">SEO Settings</h3>

                <div>
                    <label className="block text-sm font-semibold text-ink mb-2">SEO Title</label>
                    <input
                        type="text"
                        value={formData.seoTitle}
                        onChange={(e) => setFormData((prev) => ({ ...prev, seoTitle: e.target.value }))}
                        placeholder="Title for search engines (50-60 chars)"
                        maxLength={60}
                        className="w-full rounded-lg border border-border bg-white px-4 py-2 text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        disabled={isLoading}
                    />
                    <p className="text-xs text-muted mt-1">{formData.seoTitle.length}/60 characters</p>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-ink mb-2">SEO Description</label>
                    <textarea
                        value={formData.seoDescription}
                        onChange={(e) => setFormData((prev) => ({ ...prev, seoDescription: e.target.value }))}
                        placeholder="Meta description (150-160 chars)"
                        maxLength={160}
                        rows={2}
                        className="w-full rounded-lg border border-border bg-white px-4 py-2 text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        disabled={isLoading}
                    />
                    <p className="text-xs text-muted mt-1">{formData.seoDescription.length}/160 characters</p>
                </div>
            </div>

            {/* Publish Status */}
            <div>
                <label className="block text-sm font-semibold text-ink mb-2">
                    <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
                        disabled={isLoading}
                        className="mr-2"
                    />
                    Publish this post
                </label>
                <p className="text-xs text-muted">Unpublished posts are only visible to editors and admins.</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-border">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 rounded-lg bg-brand-primary text-white font-semibold hover:bg-opacity-90 transition-opacity disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : isEditMode ? "Update Post" : "Create Post"}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={isLoading}
                    className="px-6 py-3 rounded-lg border border-border text-ink font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
