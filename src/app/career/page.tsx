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
            {jobs.length === 0 ? <p className="text-sm text-muted">No current vacancies.</p> : null}
            {jobs.map((job) => (
              <article key={job.id} className="rounded-md border border-border p-5">
                <h3 className="text-lg font-semibold text-ink">{job.title}</h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted">{job.description}</p>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted">{job.requirements}</p>
                <p className="mt-4 text-xs uppercase tracking-wide text-muted">
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
