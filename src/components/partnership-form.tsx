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
    <form onSubmit={onSubmit} className="space-y-4 rounded-md border border-border p-6">
      <label className="block">
        <span className="text-sm text-ink">Organization Name</span>
        <input
          required
          value={form.organizationName}
          onChange={(event) => setForm((prev) => ({ ...prev, organizationName: event.target.value }))}
          className="mt-1 w-full border border-border px-3 py-2"
        />
      </label>
      <label className="block">
        <span className="text-sm text-ink">Contact Person</span>
        <input
          required
          value={form.contactPerson}
          onChange={(event) => setForm((prev) => ({ ...prev, contactPerson: event.target.value }))}
          className="mt-1 w-full border border-border px-3 py-2"
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm text-ink">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="mt-1 w-full border border-border px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-sm text-ink">Phone</span>
          <input
            required
            placeholder="+233..."
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            className="mt-1 w-full border border-border px-3 py-2"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-sm text-ink">Partnership Type</span>
        <select
          value={form.partnershipType}
          onChange={(event) => setForm((prev) => ({ ...prev, partnershipType: event.target.value }))}
          className="mt-1 w-full border border-border px-3 py-2"
        >
          <option value="institutions">Institutions</option>
          <option value="government">Government</option>
          <option value="private-sector">Private Sector</option>
        </select>
      </label>
      <label className="block">
        <span className="text-sm text-ink">Message</span>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
          className="mt-1 w-full border border-border px-3 py-2"
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
        className="rounded-sm bg-brand-primary px-5 py-2 text-sm font-medium text-white hover:bg-brand-primary-strong disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Partnership Request"}
      </button>
      {status ? <p className="text-sm text-muted">{status}</p> : null}
    </form>
  );
}
