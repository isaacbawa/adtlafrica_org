import type { Metadata } from "next";
import Image from "next/image";
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
                title="Our Team"
                intro="A multidisciplinary team focused on implementation quality, measurable outcomes, and trusted partnerships."
            >
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
                    {team.map((member) => (
                        <article key={member.id} className="info-card overflow-hidden">
                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                <div className="flex-shrink-0">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={200}
                                        height={200}
                                        className="rounded-lg object-cover w-32 h-32 sm:w-48 sm:h-48 border-2 border-border"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-semibold text-ink">{member.name}</h3>
                                    <p className="mt-1 text-base font-semibold text-brand-primary">{member.role}</p>
                                    <p className="mt-4 text-base text-muted leading-7">{member.bio}</p>
                                    {member.linkedinUrl ? (
                                        <a
                                            href={member.linkedinUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-5 inline-block px-4 py-2 rounded border-2 border-brand-primary text-brand-primary font-semibold hover:bg-brand-primary hover:text-white transition-colors"
                                        >
                                            View LinkedIn
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </SectionShell>
        </main>
    );
}
