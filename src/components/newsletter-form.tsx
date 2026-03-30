"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("");
        setLoading(true);

        const response = await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            setStatus("Thanks for subscribing. We will keep you updated.");
            setEmail("");
        } else {
            const data = (await response.json().catch(() => null)) as { error?: string } | null;
            setStatus(data?.error ?? "Subscription failed. Please try again.");
        }

        setLoading(false);
    }

    return (
        <form id="newsletter" onSubmit={onSubmit} className="space-y-3">
            <label className="field-label" htmlFor="newsletter-email">
                Email address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
                <input
                    id="newsletter-email"
                    className="field-input mt-0"
                    type="email"
                    required
                    placeholder="name@organization.org"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <button className="btn-primary sm:self-start" type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Subscribe"}
                </button>
            </div>
            {status ? <p className="text-sm text-muted">{status}</p> : null}
        </form>
    );
}
