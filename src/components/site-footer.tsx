import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";

export function SiteFooter() {
    return (
        <footer className="mt-24 border-t border-border bg-surface-soft">
            <div className="site-container grid gap-10 py-14 md:grid-cols-4">
                <div>
                    <h2 className="text-base font-semibold uppercase tracking-[0.12em] text-muted">ADTL Africa</h2>
                    <p className="mt-3 text-base leading-7 text-muted">
                        Driving AI and digital transformation across Africa through practical systems, partnerships,
                        and capacity building.
                    </p>
                </div>

                <div>
                    <h2 className="text-base font-semibold uppercase tracking-[0.12em] text-muted">Contact</h2>
                    <ul className="mt-3 space-y-2 text-base text-ink">
                        <li>Mr. Barfour Frimpong - Operations & Relations</li>
                        <li>+233 592 413 228</li>
                        <li>info@adtlafrica.org</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-base font-semibold uppercase tracking-[0.12em] text-muted">Quick Links</h2>
                    <ul className="mt-3 space-y-2 text-base">
                        <li>
                            <Link href="/services" className="text-ink hover:text-brand-primary">
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link href="/partnership" className="text-ink hover:text-brand-primary">
                                Partnership
                            </Link>
                        </li>
                        <li>
                            <Link href="/career" className="text-ink hover:text-brand-primary">
                                Career
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-base font-semibold uppercase tracking-[0.12em] text-muted">Engage</h2>
                    <p className="mt-3 text-base leading-7 text-muted">Get updates on programmes, resources, and partnership opportunities.</p>
                    <div className="mt-4">
                        <NewsletterForm />
                    </div>
                </div>
            </div>
            <div className="border-t border-border py-5 text-center text-sm text-muted">
                {new Date().getFullYear()} ADTL Africa. All rights reserved.
            </div>
        </footer>
    );
}
