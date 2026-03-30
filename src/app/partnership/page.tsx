import type { Metadata } from "next";
import { PartnershipForm } from "@/components/partnership-form";
import { SectionShell } from "@/components/section-shell";

export const metadata: Metadata = {
    title: "Partnership",
    description: "Partner with ADTL Africa to deliver scalable digital transformation outcomes.",
};

export default function PartnershipPage() {
    return (
        <main>
            <SectionShell
                title="Partnership Opportunities"
                intro="We collaborate with institutions, government, and private sector organizations to deliver measurable digital impact."
            >
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="surface-panel rounded-md p-6 md:p-7">
                        <p className="section-kicker">Collaboration Tracks</p>
                        <div className="mt-4 space-y-4 text-base leading-8 text-ink">
                            <p>
                                <strong>Institutions & Schools:</strong> Teacher AI integration training, programme co-design,
                                and institutional capacity building.
                            </p>
                            <p>
                                <strong>Government:</strong> Digital policy support, service modernization, and high-impact
                                implementation partnerships.
                            </p>
                            <p>
                                <strong>Private Sector & NGOs:</strong> SME transformation, custom AI deployment, and co-funded
                                delivery programmes.
                            </p>
                        </div>
                    </div>
                    <PartnershipForm />
                </div>
            </SectionShell>
        </main>
    );
}
