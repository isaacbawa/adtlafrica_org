import type { Metadata } from "next";
import { CareerApplicationForm } from "@/components/career-application-form";
import { SectionShell } from "@/components/section-shell";
import { getPublishedJobs } from "@/lib/repository";

export const metadata: Metadata = {
    title: "Career",
    description: "Open roles and career opportunities at ADTL Africa.",
};

export default async function CareerPage() {
    const jobs = await getPublishedJobs();

    return (
        <main>
            <SectionShell
                title="Career"
                intro="Join ADTL Africa to build practical AI and digital transformation systems with real social and institutional impact."
            >
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-4">
                        {jobs.length === 0 ? <p className="text-base text-muted">No current vacancies.</p> : null}
                        {jobs.map((job) => (
                            <article key={job.id} className="info-card">
                                <h3 className="text-2xl font-semibold text-ink md:text-3xl">{job.title}</h3>
                                <p className="card-body whitespace-pre-line">{job.description}</p>
                                <p className="card-body whitespace-pre-line">{job.requirements}</p>
                                <p className="mt-4 text-sm uppercase tracking-[0.08em] text-muted">
                                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                                </p>
                            </article>
                        ))}
                    </div>
                    <CareerApplicationForm jobs={jobs.map((job) => ({ id: job.id, title: job.title }))} />
                </div>
            </SectionShell>
        </main>
    );
}
