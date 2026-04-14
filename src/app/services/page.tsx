import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { SectionShell } from "@/components/section-shell";
import { serviceCards } from "@/lib/content";

export const metadata: Metadata = {
    title: "Services",
    description: "Institutional AI and digital transformation services for African partners and clients.",
};

export default function ServicesPage() {
    return (
        <main>
            <PageHero
                kicker="Services"
                title="Professional AI & Digital Delivery Services"
                description="Our services are designed for institutions, governments, NGOs, and private clients that require practical deployment support and durable capability transfer."
            >
                <Image
                    src="/ADTL AFRICA_Services.png"
                    alt="Illustration of integrated service delivery"
                    width={960}
                    height={640}
                    className="mb-4 h-auto w-full rounded-md border border-border"
                />
                <p className="section-kicker">Service Promise</p>
                <p className="mt-3 text-base leading-8 text-ink">
                    Every engagement combines implementation quality, local context alignment, and measurable outcomes.
                </p>
            </PageHero>

            <SectionShell
                title="Services"
                intro="ADTL Africa delivers practical solutions for both implementation partners and service clients across Africa."
            >
                <div className="grid gap-6 md:grid-cols-2">
                    {serviceCards.map((service) => (
                        <article key={service.title} className="info-card">
                            <h3 className="text-2xl font-semibold text-ink md:text-3xl">{service.title}</h3>
                            <dl className="mt-5 space-y-4 text-base leading-8">
                                <div>
                                    <dt className="font-semibold text-ink">What it is</dt>
                                    <dd className="card-body mt-1">{service.what}</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold text-ink">Who it is for</dt>
                                    <dd className="card-body mt-1">{service.who}</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold text-ink">Outcome</dt>
                                    <dd className="card-body mt-1">{service.outcome}</dd>
                                </div>
                            </dl>
                        </article>
                    ))}
                </div>
            </SectionShell>
        </main>
    );
}
