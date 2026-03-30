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
    <form onSubmit={onSubmit} className="space-y-4 rounded-md border border-border p-6">
      <label className="block">
        <span className="text-sm text-ink">Name</span>
        <input
          required
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          className="mt-1 w-full border border-border px-3 py-2"
        />
      </label>
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
        <span className="text-sm text-ink">Subject</span>
        <input
          required
          value={form.subject}
          onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
          className="mt-1 w-full border border-border px-3 py-2"
        />
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
        {loading ? "Sending..." : "Send Message"}
      </button>
      {status ? <p className="text-sm text-muted">{status}</p> : null}
    </form>
  );
}
