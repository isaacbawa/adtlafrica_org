"use client";

import { FormEvent, useState } from "react";

const initialState = {
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
};

export function ContactForm() {
    const [form, setForm] = useState(initialState);
    const [status, setStatus] = useState<string>("");
    const [loading, setLoading] = useState(false);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("");
        setLoading(true);

        const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            setStatus("Message sent successfully.");
            setForm(initialState);
        } else {
            const data = (await response.json().catch(() => null)) as { error?: string } | null;
            setStatus(data?.error ?? "Unable to submit now.");
        }

        setLoading(false);
    }

    return (
        <form onSubmit={onSubmit} className="form-shell space-y-5">
            <label className="block">
                <span className="field-label">Name</span>
                <input
                    required
                    value={form.name}
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    className="field-input"
                />
            </label>
            <label className="block">
                <span className="field-label">Email</span>
                <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="field-input"
                />
            </label>
            <label className="block">
                <span className="field-label">Subject</span>
                <input
                    required
                    value={form.subject}
                    onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
                    className="field-input"
                />
            </label>
            <label className="block">
                <span className="field-label">Message</span>
                <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                    className="field-input"
                />
            </label>

            <input
                aria-hidden
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
                name="website"
                className="hidden"
            />

            <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-60"
            >
                {loading ? "Sending..." : "Send Message"}
            </button>
            {status ? <p className="text-base text-muted">{status}</p> : null}
        </form>
    );
}
