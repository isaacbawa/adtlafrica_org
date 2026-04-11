import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton, UserButton, auth } from "@clerk/nextjs";
import { primaryNavItems, utilityNavItems } from "@/lib/content";

export async function SiteHeader() {
    const { userId } = await auth();
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-white shadow-sm">
            <div className="site-container flex items-center justify-between py-5">
                <Link href="/" className="flex items-center gap-3" aria-label="ADTL Africa Home">
                    <Image
                        src="/ADTL AFRICA_LOGO.png"
                        alt="ADTL Africa Logo"
                        width={60}
                        height={60}
                        className="h-12 w-auto"
                        priority
                    />
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
                    {userId ? (
                        <div className="flex items-center gap-2">
                            <Link href="/admin" className="hidden sm:inline-block px-3 py-2 text-sm font-semibold text-ink border-b-2 border-transparent hover:border-brand-primary hover:text-brand-primary">
                                Admin
                            </Link>
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <SignInButton mode="modal">
                                <button className="btn-secondary">
                                    Sign In
                                </button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="btn-primary">
                                    Sign Up
                                </button>
                            </SignUpButton>
                        </div>
                    )}
                </div>
            </div>

            <div className="border-t border-border bg-white">
                <nav aria-label="Primary" className="site-container flex items-center justify-between overflow-x-auto py-3">
                    <ul className="flex min-w-max items-center gap-6 text-sm font-semibold uppercase tracking-[0.06em] text-ink md:text-[0.95rem] md:tracking-[0.04em]">
                        {primaryNavItems.slice(0, 4).map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className="whitespace-nowrap border-b-2 border-transparent pb-1 hover:border-brand-primary hover:text-brand-primary">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul className="flex min-w-max items-center gap-6 text-sm font-semibold uppercase tracking-[0.06em] text-ink md:text-[0.95rem] md:tracking-[0.04em]">
                        {primaryNavItems.slice(4).map((item) => (
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
