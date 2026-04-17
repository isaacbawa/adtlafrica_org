import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";

export function SiteFooter() {
    return (
        <footer className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 border-t border-border bg-gray-950 text-white">
            <div className="site-container grid gap-6 sm:gap-8 md:gap-10 py-8 sm:py-10 md:py-12 lg:py-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <h2 className="text-sm sm:text-base font-semibold uppercase tracking-[0.12em] text-ink-soft">
                        ADTL Africa
                    </h2>
                    <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-ink-soft">
                        Driving AI and digital transformation across Africa through practical systems, partnerships,
                        and capacity building.
                    </p>
                </div>

                <div>
                    <h2 className="text-sm sm:text-base font-semibold uppercase tracking-[0.12em] text-ink-soft">
                        Contact
                    </h2>
                    <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 text-sm sm:text-base text-ink">
                        <li>Barfour Frimpong - Operations & Relations</li>
                        <li>+233 592 413 228</li>
                        <li>adtlafrica@gmail.com</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-sm sm:text-base font-semibold uppercase tracking-[0.12em] text-ink-soft">
                        Quick Links
                    </h2>
                    <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                        <li>
                            <Link href="/services" className="text-ink hover:text-brand-primary transition-colors">
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link href="/partnership" className="text-ink hover:text-brand-primary transition-colors">
                                Partnership
                            </Link>
                        </li>
                        <li>
                            <Link href="/career" className="text-ink hover:text-brand-primary transition-colors">
                                Career
                            </Link>
                        </li>
                        <li>
                            <Link href="/career" className="text-ink hover:text-brand-primary transition-colors">
                                Terms
                            </Link>
                        </li>
                        <li>
                            <Link href="/career" className="text-ink hover:text-brand-primary transition-colors">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-(--brand-primary) text-sm sm:text-base font-semibold uppercase tracking-[0.12em] text-ink-soft">
                        Engage
                    </h2>
                    <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-ink-soft">
                        Get updates on programmes, resources, and partnership opportunities.
                    </p>
                    <div className="mt-3 sm:mt-4">
                        <NewsletterForm />
                    </div>
                </div>
            </div>
            <div className="border-t border-border py-4 sm:py-5 text-center text-xs sm:text-sm text-ink-soft">
                {new Date().getFullYear()} ADTL Africa. All rights reserved.
            </div>
        </footer>
    );
}
