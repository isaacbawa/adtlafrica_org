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
        <form id="newsletter" onSubmit={onSubmit} className="space-y-2 sm:space-y-3">
            <label className="fieldS-label font-bold text-white sm:text-sm" htmlFor="newsletter-email">
                JOIN TO GET INSIGHTS ON HOW AI CAN BENEFIT YOU
            </label>
            <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row">
                <input
                    id="newsletter-email"
                    className="field-input mt-0 text-xs sm:text-sm flex-1 sm:flex-auto"
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <button className="btn-primary text-xs sm:text-sm sm:self-start whitespace-nowrap" type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Subscribe"}
                </button>
            </div>
            {status ? <p className="text-white sm:text-sm text-ink-soft">{status}</p> : null}
        </form>
    );
}
