"use client";

import { FormEvent, useState } from "react";

type Job = {
    id: number;
    title: string;
};

type CareerApplicationFormProps = {
    jobs: Job[];
};

export function CareerApplicationForm({ jobs }: CareerApplicationFormProps) {
    const [jobId, setJobId] = useState(jobs[0]?.id ?? 0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [cv, setCv] = useState<File | null>(null);
    const [website, setWebsite] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("");
        setLoading(true);

        const formData = new FormData();
        formData.append("jobId", String(jobId));
        formData.append("name", name);
        formData.append("email", email);
        formData.append("coverLetter", coverLetter);
        formData.append("website", website);
        if (cv) {
            formData.append("cv", cv);
        }

        const response = await fetch("/api/applications", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            setStatus("Application submitted successfully.");
            setName("");
            setEmail("");
            setCoverLetter("");
            setCv(null);
        } else {
            const data = (await response.json().catch(() => null)) as { error?: string } | null;
            setStatus(data?.error ?? "Unable to submit application.");
        }

        setLoading(false);
    }

    if (jobs.length === 0) {
        return <p className="text-base text-muted">No open roles at the moment.</p>;
    }

    return (
        <form onSubmit={onSubmit} className="form-shell space-y-5">
            <label className="block">
                <span className="field-label">Role</span>
                <select
                    value={jobId}
                    onChange={(event) => setJobId(Number(event.target.value))}
                    className="field-input"
                >
                    {jobs.map((job) => (
                        <option key={job.id} value={job.id}>
                            {job.title}
                        </option>
                    ))}
                </select>
            </label>
            <label className="block">
                <span className="field-label">Name</span>
                <input required value={name} onChange={(event) => setName(event.target.value)} className="field-input" />
            </label>
            <label className="block">
                <span className="field-label">Email</span>
                <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="field-input" />
            </label>
            <label className="block">
                <span className="field-label">Cover Letter</span>
                <textarea required rows={8} value={coverLetter} onChange={(event) => setCoverLetter(event.target.value)} className="field-input" />
            </label>
            <label className="block">
                <span className="field-label">CV (PDF only, max 5MB)</span>
                <input
                    required
                    type="file"
                    accept="application/pdf"
                    onChange={(event) => setCv(event.target.files?.[0] ?? null)}
                    className="field-input"
                />
            </label>
            <input
                aria-hidden
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                className="hidden"
            />
            <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-60"
            >
                {loading ? "Submitting..." : "Submit Application"}
            </button>
            {status ? <p className="text-base text-muted">{status}</p> : null}
        </form>
    );
}
