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
                    src="/ADTL Africa_Services.jpg"
                    alt="Illustration of integrated service delivery"
                    width={960}
                    height={640}
                    className="h-auto w-full rounded-md border border-border"
                />
                <p className="section-kicker">Service Promise</p>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base leading-6 sm:leading-7 md:leading-8 text-ink">
                    Every engagement combines implementation quality, local context alignment, and measurable outcomes.
                </p>
            </PageHero>

            <SectionShell
                title="Services"
                intro="ADTL Africa delivers practical solutions for both implementation partners and service clients across Africa."
            >
                <div className="grid gap-6 sm:gap-7 md:gap-8 grid-cols-1 md:grid-cols-2">
                    {serviceCards.map((service) => (
                        <article key={service.title} className="service-card group">
                            {/* Service Image */}
                            <div>
                                <Image
                                    src={service.image}
                                    alt={`${service.title} visualization`}
                                    width={400}
                                    height={200}
                                    className="service-card-image"
                                    priority={false}
                                />
                            </div>

                            {/* Content Container */}
                            <div className="service-card-content">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-ink mb-4 sm:mb-5">
                                    {service.title}
                                </h3>

                                <dl className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base leading-6 sm:leading-7 md:leading-8">
                                    <div>
                                        <dt className="font-semibold text-ink text-xs sm:text-sm uppercase tracking-wide">
                                            What it is
                                        </dt>
                                        <dd className="card-body mt-1 sm:mt-2">{service.what}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-semibold text-ink text-xs sm:text-sm uppercase tracking-wide">
                                            Who it is for
                                        </dt>
                                        <dd className="card-body mt-1 sm:mt-2">{service.who}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-semibold text-ink text-xs sm:text-sm uppercase tracking-wide">
                                            Outcome
                                        </dt>
                                        <dd className="card-body mt-1 sm:mt-2">{service.outcome}</dd>
                                    </div>
                                </dl>
                            </div>
                        </article>
                    ))}
                </div>
            </SectionShell>
        </main>
    );
}
