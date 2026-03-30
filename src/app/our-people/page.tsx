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
                        <article key={member.id} className="info-card">
                            <h3 className="text-2xl font-semibold text-ink md:text-3xl">{member.name}</h3>
                            <p className="mt-1 text-base font-semibold text-brand-primary">{member.role}</p>
                            <p className="card-body">{member.bio}</p>
                            {member.linkedinUrl ? (
                                <a
                                    href={member.linkedinUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-5 inline-block text-base font-semibold text-ink hover:text-brand-primary"
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
