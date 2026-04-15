import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SectionShell } from "@/components/section-shell";

export const metadata: Metadata = {
    title: "Contact",
    description: "Contact ADTL Africa for partnerships, services, and programme collaboration.",
};

export default function ContactPage() {
    return (
        <main>
            <SectionShell
                title="Contact"
                intro="Reach out to discuss institutional collaboration, project implementation, or programme support."
            >
                <div className="grid gap-6 sm:gap-7 md:gap-8 grid-cols-1 lg:grid-cols-2">
                    <div className="surface-panel rounded-md p-4 sm:p-5 md:p-6 lg:p-7">
                        <p className="section-kicker">Direct Contact</p>
                        <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 text-ink">
                            <p>Barfour Frimpong - Operations & Relations</p>
                            <p>+233 592 413 228</p>
                            <p>info@adtlafrica.org</p>
                        </div>
                    </div>
                    <ContactForm />
                </div>
            </SectionShell>
        </main>
    );
}
