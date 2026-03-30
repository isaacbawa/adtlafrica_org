import type { Metadata } from "next";
import { SectionShell } from "@/components/section-shell";
import { getTeamMembers } from "@/lib/repository";

export const metadata: Metadata = {
  title: "Our People",
  description: "Meet the team driving ADTL Africa's AI and digital transformation mission.",
};

export default async function OurPeoplePage() {
  const team = await getTeamMembers();

  return (
    <main>
      <SectionShell
        title="Our People"
        intro="A multidisciplinary team focused on implementation quality, measurable outcomes, and trusted partnerships."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {team.map((member) => (
            <article key={member.id} className="rounded-md border border-border p-5">
              <h3 className="text-xl font-semibold text-ink">{member.name}</h3>
              <p className="text-sm font-medium text-brand-primary">{member.role}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{member.bio}</p>
              {member.linkedinUrl ? (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm font-medium text-ink hover:text-brand-primary"
                >
                  LinkedIn
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </SectionShell>
    </main>
  );
}
