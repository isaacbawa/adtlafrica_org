"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { primaryNavItems, utilityNavItems } from "@/lib/content";

export function MobileNavMenu() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('[data-mobile-nav-menu]')) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className="lg:hidden" data-mobile-nav-menu>
            {/* Professional Hamburger/Close Button */}
            <button
                onClick={toggleMenu}
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
                className="relative flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-surface-soft focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                aria-controls="mobile-nav-drawer"
            >
                {!isOpen ? (
                    <div className="flex flex-col gap-1.5">
                        <span className="h-0.5 w-6 bg-ink transition-all" />
                        <span className="h-0.5 w-6 bg-ink transition-all" />
                        <span className="h-0.5 w-6 bg-ink transition-all" />
                    </div>
                ) : (
                    <svg
                        className="h-6 w-6 text-ink"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                )}
            </button>

            {/* Backdrop Overlay - Click to close */}
            {isOpen && (
                <div
                    className="fixed inset-0 top-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300"
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Menu Drawer - Smooth Slide from Bottom */}
            <nav
                id="mobile-nav-drawer"
                className={`fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-y-auto border-t border-border bg-white shadow-2xl transition-transform duration-300 ease-out ${
                    isOpen ? "translate-y-0" : "translate-y-full"
                }`}
                aria-label="Mobile navigation"
            >
                <div className="site-container space-y-6 py-6">
                    {/* Primary Navigation Section */}
                    <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-soft">
                            Navigation
                        </p>
                        <ul className="space-y-3">
                            {primaryNavItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={closeMenu}
                                        className="text-base font-semibold uppercase tracking-[0.04em] text-ink transition-colors hover:text-brand-primary active:text-brand-primary-strong"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Utility Links Section */}
                    {utilityNavItems.length > 0 && (
                        <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-soft">
                                Resources
                            </p>
                            <ul className="space-y-2">
                                {utilityNavItems.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={closeMenu}
                                            className="text-sm font-medium text-ink-soft transition-colors hover:text-brand-primary active:text-brand-primary-strong"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Divider */}
                    <div className="border-t border-border" />

                    {/* CTA Button */}
                    <a
                        href="#newsletter"
                        onClick={closeMenu}
                        className="btn-primary block w-full text-center py-3 text-sm"
                    >
                        Subscribe to Newsletter
                    </a>
                </div>
            </nav>
        </div>
    );
}
