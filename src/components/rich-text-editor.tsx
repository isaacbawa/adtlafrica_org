"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";

type RichTextEditorProps = {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
};

export function RichTextEditor({ content, onChange, placeholder = "Write your blog post..." }: RichTextEditorProps) {
    const [isLoading, setIsLoading] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Image.configure({
                allowBase64: true,
                HTMLAttributes: {
                    class: "w-full rounded-lg my-4",
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-brand-primary underline",
                },
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class:
                    "prose prose-sm prose-headings:font-semibold prose-a:text-brand-primary focus:outline-none max-w-none w-full rounded-lg border border-border bg-white p-4 text-ink min-h-96",
            },
        },
    });

    const handleImageUpload = useCallback(async () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            setIsLoading(true);
            try {
                const formData = new FormData();
                formData.append("file", file);

                const response = await fetch("/api/upload-image", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) throw new Error("Upload failed");
                const { url } = await response.json();

                if (editor) {
                    editor.chain().focus().setImage({ src: url }).run();
                }
            } catch (error) {
                toast.error("Image upload failed. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        input.click();
    }, [editor]);

    const addLink = useCallback(() => {
        const url = window.prompt("Enter URL:");
        if (url && editor) {
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }
    }, [editor]);

    if (!editor) return null;

    return (
        <div className="space-y-3">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 rounded-lg border border-border bg-gray-50 p-3">
                {/* Text Style Buttons */}
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${editor.isActive("heading", { level: 1 })
                            ? "bg-brand-primary text-white"
                            : "bg-white text-ink border border-border hover:bg-gray-100"
                        }`}
                    title="Heading 1"
                >
                    H1
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${editor.isActive("heading", { level: 2 })
                            ? "bg-brand-primary text-white"
                            : "bg-white text-ink border border-border hover:bg-gray-100"
                        }`}
                    title="Heading 2"
                >
                    H2
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${editor.isActive("heading", { level: 3 })
                            ? "bg-brand-primary text-white"
                            : "bg-white text-ink border border-border hover:bg-gray-100"
                        }`}
                    title="Heading 3"
                >
                    H3
                </button>

                <div className="w-px bg-border"></div>

                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${editor.isActive("bold")
                            ? "bg-brand-primary text-white"
                            : "bg-white text-ink border border-border hover:bg-gray-100"
                        }`}
                    title="Bold"
                >
                    <strong>B</strong>
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${editor.isActive("italic")
                            ? "bg-brand-primary text-white"
                            : "bg-white text-ink border border-border hover:bg-gray-100"
                        }`}
                    title="Italic"
                >
                    <em>I</em>
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${editor.isActive("strike")
                            ? "bg-brand-primary text-white"
                            : "bg-white text-ink border border-border hover:bg-gray-100"
                        }`}
                    title="Strikethrough"
                >
                    <s>S</s>
                </button>

                <div className="w-px bg-border"></div>

                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${editor.isActive("bulletList")
                            ? "bg-brand-primary text-white"
                            : "bg-white text-ink border border-border hover:bg-gray-100"
                        }`}
                    title="Bullet List"
                >
                    • List
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${editor.isActive("orderedList")
                            ? "bg-brand-primary text-white"
                            : "bg-white text-ink border border-border hover:bg-gray-100"
                        }`}
                    title="Ordered List"
                >
                    1. List
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${editor.isActive("codeBlock")
                            ? "bg-brand-primary text-white"
                            : "bg-white text-ink border border-border hover:bg-gray-100"
                        }`}
                    title="Code Block"
                >
                    {"<> Code"}
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${editor.isActive("blockquote")
                            ? "bg-brand-primary text-white"
                            : "bg-white text-ink border border-border hover:bg-gray-100"
                        }`}
                    title="Blockquote"
                >
                    " Quote
                </button>

                <div className="w-px bg-border"></div>

                <button
                    onClick={addLink}
                    className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${editor.isActive("link")
                            ? "bg-brand-primary text-white"
                            : "bg-white text-ink border border-border hover:bg-gray-100"
                        }`}
                    title="Add Link"
                >
                    🔗 Link
                </button>

                <button
                    onClick={handleImageUpload}
                    disabled={isLoading}
                    className="px-3 py-2 rounded text-sm font-semibold transition-colors bg-white text-ink border border-border hover:bg-gray-100 disabled:opacity-50"
                    title="Insert Image"
                >
                    {isLoading ? "⏳ Uploading..." : "🖼️ Image"}
                </button>

                <div className="w-px bg-border"></div>

                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    className="px-3 py-2 rounded text-sm font-semibold bg-white text-ink border border-border hover:bg-gray-100"
                    title="Undo"
                >
                    ↶ Undo
                </button>

                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    className="px-3 py-2 rounded text-sm font-semibold bg-white text-ink border border-border hover:bg-gray-100"
                    title="Redo"
                >
                    ↷ Redo
                </button>

                <button
                    onClick={() => editor.chain().focus().clearNodes().run()}
                    className="px-3 py-2 rounded text-sm font-semibold bg-white text-ink border border-border hover:bg-gray-100"
                    title="Clear Formatting"
                >
                    ✕ Clear
                </button>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} />
        </div>
    );
}
