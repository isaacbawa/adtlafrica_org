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
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="surface-panel rounded-md p-6 md:p-7">
                        <p className="section-kicker">Direct Contact</p>
                        <div className="mt-4 space-y-3 text-lg leading-8 text-ink">
                            <p>Mr. Barfour Frimpong - Operations & Relations</p>
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
