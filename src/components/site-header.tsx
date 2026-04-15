"use client";

import Link from "next/link";
import Image from "next/image";
import { primaryNavItems, utilityNavItems } from "@/lib/content";
import { siteAssetUrls } from "@/lib/site-assets";
import { MobileNavMenu } from "@/components/mobile-nav-menu";

type SiteHeaderProps = {
    clerkEnabled: boolean;
};

export function SiteHeader({ clerkEnabled }: SiteHeaderProps) {
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-white shadow-sm">
            {/* Top Bar - Logo and Utilities */}
            <div className="site-container flex items-center justify-between py-2 sm:py-2.5 lg:py-3">
                <Link
                    href="/"
                    className="flex shrink-0 items-center"
                    aria-label="ADTL Africa Home"
                >
                    <Image
                        src={siteAssetUrls.logo}
                        alt="ADTL Africa Logo"
                        width={220}
                        height={100}
                        className="h-12 w-auto p-0 m-0 sm:h-14 lg:h-16"
                        priority={true}
                    />
                </Link>

                <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
                    {/* Utility Nav - Hidden on mobile, visible on desktop */}
                    <nav aria-label="Utility" className="hidden md:block">
                        <ul className="flex items-center gap-3 lg:gap-4 text-xs font-semibold text-ink-soft sm:text-sm">
                            {utilityNavItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="whitespace-nowrap border-b border-transparent pb-1 transition-colors hover:border-brand-primary hover:text-brand-primary"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Subscribe Button - Hidden on mobile */}
                    <a
                        href="#newsletter"
                        className="btn-primary hidden sm:inline-block text-xs text-center py-2 px-3 sm:text-sm sm:px-4 sm:py-2.5"
                    >
                        Subscribe
                    </a>

                    {/* Mobile Hamburger Menu - Only visible on small screens */}
                    <MobileNavMenu />
                </div>
            </div>

            {/* Primary Navigation - Desktop only */}
            <nav
                aria-label="Primary"
                className="hidden lg:block border-t border-border bg-white"
            >
                <div className="site-container flex items-center justify-between py-3">
                    <ul className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.04em] text-ink">
                        {primaryNavItems.slice(0, 4).map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="whitespace-nowrap border-b-2 border-transparent pb-1 transition-colors hover:border-brand-primary hover:text-brand-primary"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.04em] text-ink">
                        {primaryNavItems.slice(4).map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="whitespace-nowrap border-b-2 border-transparent pb-1 transition-colors hover:border-brand-primary hover:text-brand-primary"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
}
