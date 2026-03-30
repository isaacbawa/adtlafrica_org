import Link from "next/link";
import { primaryNavItems, utilityNavItems } from "@/lib/content";

export function SiteHeader() {
    return (
        <header className="border-b border-border bg-white">
            <div className="site-container flex items-center justify-between py-5">
                <Link href="/" className="flex items-center gap-3" aria-label="ADTL Africa Home">
                    <div className="h-10 w-10 rounded-sm bg-brand-primary" />
                    <div>
                        <p className="text-2xl font-semibold leading-none tracking-wide text-ink">ADTL</p>
                        <p className="mt-1 text-sm text-muted">AI & Digital Transformative Lab</p>
                    </div>
                </Link>

                <div className="flex items-center gap-4">
                    <nav aria-label="Utility" className="hidden md:block">
                        <ul className="flex items-center gap-4 text-sm font-semibold text-muted">
                            {utilityNavItems.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="whitespace-nowrap border-b border-transparent pb-1 hover:border-brand-primary hover:text-brand-primary">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <a href="#newsletter" className="btn-primary">
                        Subscribe
                    </a>
                    {/* Auth is intentionally disabled for now.
                    <Show when="signed-out">
                        <SignInButton mode="modal">
                            <button className="btn-secondary">Sign in</button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="btn-primary">Sign up</button>
                        </SignUpButton>
                    </Show>

                    <Show when="signed-in">
                        <UserButton />
                    </Show>
                    */}
                </div>
            </div>

            <div className="border-t border-border">
                <nav aria-label="Primary" className="site-container overflow-x-auto py-3">
                    <ul className="flex min-w-max items-center gap-6 text-sm font-semibold uppercase tracking-[0.06em] text-ink md:text-[0.95rem] md:tracking-[0.04em]">
                        {primaryNavItems.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className="whitespace-nowrap border-b-2 border-transparent pb-1 hover:border-brand-primary hover:text-brand-primary">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
