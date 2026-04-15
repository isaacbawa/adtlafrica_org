import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { SectionShell } from "@/components/section-shell";

export const metadata: Metadata = {
    title: "About",
    description: "Learn about ADTL Africa's vision, mission, and philosophy for practical digital transformation.",
};

export default function AboutPage() {
    return (
        <main>
            <PageHero
                kicker="About ADTL Africa"
                title="Institutional AI Transformation for Africa"
                description="We are a mission-driven not-for-profit helping partners and clients move from digital ambition to practical, scalable implementation outcomes."
            >
                <Image
                    src="/visual-capacity.svg"
                    alt="Illustration of institutional learning and delivery"
                    width={960}
                    height={640}
                    className="mb-3 sm:mb-4 h-auto w-full rounded-md border border-border"
                />
                <p className="section-kicker">Core Orientation</p>
                <ul className="mt-2 sm:mt-3 space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base leading-6 sm:leading-7 md:leading-8 text-ink">
                    <li>Locally grounded and pan-African in delivery model</li>
                    <li>Implementation-first support, not theory-only advisory</li>
                    <li>Focused on measurable service and learning outcomes</li>
                </ul>
            </PageHero>

            <SectionShell
                title="About ADTL Africa"
                intro="ADTL Africa is a mission-driven, pan-African platform focused on accelerating practical AI and digital transformation for institutions, communities, and businesses."
            >
                <p className="max-w-3xl text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-9 text-ink">
                    We exist to ensure Africa is not left behind in the global digital revolution. Our work combines
                    implementation, training, and partnership models that create measurable transformation in
                    productivity, learning outcomes, and service delivery.
                </p>
            </SectionShell>

            <SectionShell title="Vision" intro="Efficiency. Equity. Innovation.">
                <article className="info-card max-w-4xl">
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-ink">
                        To transform African enterprises and educational institutions through intelligent digital systems
                        that drive efficiency, equity, and innovation.
                    </p>
                </article>
            </SectionShell>

            <SectionShell title="Mission" intro="Scalable AI systems with real-world impact.">
                <article className="info-card max-w-4xl">
                    <p className="card-body text-sm sm:text-base md:text-lg text-ink">
                        To accelerate digital transformation across Africa by building scalable AI solutions, business
                        intelligence systems, and smart educational technologies that improve outcomes across sectors.
                    </p>
                </article>
            </SectionShell>

            <SectionShell
                title="Why It Matters"
                intro="The continent's digital transition requires practical capability, not theory alone."
            >
                <ul className="grid gap-3 sm:gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <li className="info-card card-body text-xs sm:text-sm md:text-base">
                        Africa's digital skills gap is widening as AI adoption grows.
                    </li>
                    <li className="info-card card-body text-xs sm:text-sm md:text-base">
                        Most programmes remain concept-heavy and practice-light.
                    </li>
                    <li className="info-card card-body text-xs sm:text-sm md:text-base">
                        Institutions and SMEs need implementation support, not only advisory documents.
                    </li>
                </ul>
            </SectionShell>
        </main>
    );
}
