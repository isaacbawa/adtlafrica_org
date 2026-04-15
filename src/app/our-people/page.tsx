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
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {team.map((member, index) => (
                        <article key={member.id} className="info-card overflow-hidden flex flex-col">
                            <div className="shrink-0 mb-4 aspect-4/5 w-full relative">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 300px"
                                    className="rounded-lg object-cover w-full h-full border-2 border-border select-none"
                                    style={{ objectFit: 'cover', objectPosition: 'center', imageRendering: 'auto' }}
                                    quality={100}
                                    priority={index < 3}
                                />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <h3 className="text-xl font-semibold text-ink">{member.name}</h3>
                                <p className="mt-1 text-sm font-semibold text-brand-primary">{member.role}</p>
                                {/* <p className="mt-3 text-sm text-muted leading-6 flex-1">{member.bio}</p> */}

                                {member.linkedinUrl ? (
                                    <a
                                        href={member.linkedinUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="LinkedIn"
                                        className="mt-4 inline-flex items-center justify-center w-10 h-10 rounded text-brand-primary hover:bg-brand-primary hover:text-white transition-colors"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-9 h-9"
                                        >
                                            <path d="M19 0h-14C2.239 0 1 1.239 1 4v16c0 2.761 1.239 4 4 4h14c2.761 0 4-1.239 4-4V4c0-2.761-1.239-4-4-4zM8 19H5V9h3v10zM6.5 7.732c-.966 0-1.75-.79-1.75-1.764 0-.973.784-1.764 1.75-1.764s1.75.79 1.75 1.764c0 .973-.784 1.764-1.75 1.764zM20 19h-3v-5.604c0-1.337-.025-3.059-1.865-3.059-1.865 0-2.151 1.456-2.151 2.963V19h-3V9h2.881v1.367h.041c.401-.759 1.381-1.559 2.844-1.559 3.041 0 3.604 2.002 3.604 4.604V19z" />
                                        </svg>
                                    </a>
                                ) : null}
                            </div>
                        </article>
                    ))}
                </div>
            </SectionShell>
        </main>
    );
}
