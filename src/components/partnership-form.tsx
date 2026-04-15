"use client";

import { FormEvent, useState } from "react";

const initialState = {
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    partnershipType: "institutions",
    message: "",
    website: "",
};

export function PartnershipForm() {
    const [form, setForm] = useState(initialState);
    const [status, setStatus] = useState<string>("");
    const [loading, setLoading] = useState(false);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("");
        setLoading(true);

        const response = await fetch("/api/partnership", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            setStatus("Partnership request submitted.");
            setForm(initialState);
        } else {
            const data = (await response.json().catch(() => null)) as { error?: string } | null;
            setStatus(data?.error ?? "Submission failed.");
        }

        setLoading(false);
    }

    return (
        <form onSubmit={onSubmit} className="form-shell space-y-4 sm:space-y-5">
            <label className="block">
                <span className="field-label text-xs sm:text-sm">Organization Name</span>
                <input
                    required
                    value={form.organizationName}
                    onChange={(event) => setForm((prev) => ({ ...prev, organizationName: event.target.value }))}
                    className="field-input text-sm sm:text-base"
                />
            </label>
            <label className="block">
                <span className="field-label text-xs sm:text-sm">Contact Person</span>
                <input
                    required
                    value={form.contactPerson}
                    onChange={(event) => setForm((prev) => ({ ...prev, contactPerson: event.target.value }))}
                    className="field-input text-sm sm:text-base"
                />
            </label>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                <label className="block">
                    <span className="field-label text-xs sm:text-sm">Email</span>
                    <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                        className="field-input text-sm sm:text-base"
                    />
                </label>
                <label className="block">
                    <span className="field-label text-xs sm:text-sm">Phone</span>
                    <input
                        required
                        placeholder="+233..."
                        value={form.phone}
                        onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                        className="field-input text-sm sm:text-base"
                    />
                </label>
            </div>
            <label className="block">
                <span className="field-label text-xs sm:text-sm">Partnership Type</span>
                <select
                    value={form.partnershipType}
                    onChange={(event) => setForm((prev) => ({ ...prev, partnershipType: event.target.value }))}
                    className="field-input text-sm sm:text-base"
                >
                    <option value="institutions">Institutions</option>
                    <option value="government">Government</option>
                    <option value="private-sector">Private Sector</option>
                </select>
            </label>
            <label className="block">
                <span className="field-label text-xs sm:text-sm">Message</span>
                <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                    className="field-input text-sm sm:text-base"
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
                className="btn-primary w-full sm:w-auto disabled:opacity-60 text-xs sm:text-sm"
            >
                {loading ? "Submitting..." : "Submit Partnership Request"}
            </button>
            {status ? <p className="text-xs sm:text-sm text-ink-soft">{status}</p> : null}
        </form>
    );
}
