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
        <form id="newsletter" onSubmit={onSubmit} className="border border-border rounded-md p-0.5 sm:p-5">
            {!status ? (
                <>
                    <label
                        className="fieldS-label font-bold text-white sm:text-sm"
                        htmlFor="newsletter-email"
                    >
                        JOIN TO GET INSIGHTS ON HOW AI CAN BENEFIT YOU
                    </label>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center">
                        <input
                            id="newsletter-email"
                            className="field-input mt-0 text-xs sm:text-sm flex-1 h-11"
                            type="email"
                            required
                            placeholder="Your email..."
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        <button
                            className="btn-primary text-xs sm:text-sm h-11 px-5 whitespace-nowrap"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Subscribe"}
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-white sm:text-sm">{status}</p>
            )}
        </form>
    );
}
