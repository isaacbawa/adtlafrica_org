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
                <div className="grid gap-6 sm:gap-7 md:gap-8 grid-cols-1 lg:grid-cols-2">
                    <div className="space-y-3 sm:space-y-4">
                        {jobs.length === 0 ? (
                            <p className="text-xs sm:text-sm md:text-base text-ink-soft">No current vacancies.</p>
                        ) : null}
                        {jobs.map((job) => (
                            <article key={job.id} className="info-card">
                                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-ink">
                                    {job.title}
                                </h3>
                                <p className="card-body text-xs sm:text-sm md:text-base whitespace-pre-line">
                                    {job.description}
                                </p>
                                <p className="card-body text-xs sm:text-sm md:text-base whitespace-pre-line">
                                    {job.requirements}
                                </p>
                                <p className="mt-3 sm:mt-4 text-xs uppercase tracking-[0.08em] text-ink-soft">
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
