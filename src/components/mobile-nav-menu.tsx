"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { primaryNavItems, utilityNavItems } from "@/lib/content";

export function MobileNavMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((v) => !v);
    const closeMenu = () => setIsOpen(false);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest("[data-mobile-nav-menu]")) {
                closeMenu();
            }
        };

        document.body.style.overflow = "hidden";

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.body.style.overflow = "auto";
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="lg:hidden relative" data-mobile-nav-menu>

            {/* HAMBURGER BUTTON */}
            <button
                onClick={toggleMenu}
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-nav-drawer"
                className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-black"
            >
                {!isOpen ? (
                    <div className="flex flex-col gap-1.5">
                        <span className="block h-0.5 w-6 bg-(--brand-primary)" />
                        <span className="block h-0.5 w-6 bg-(--brand-primary)" />
                        <span className="block h-0.5 w-6 bg-(--brand-primary)" />
                    </div>
                ) : (
                    <svg
                        className="h-6 w-6 text-(--brand-primary)"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                )}
            </button>

            {/* BACKDROP */}
            {isOpen && (
                <div
                    onClick={closeMenu}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                    aria-hidden="true"
                />
            )}

            {/* DRAWER */}
            <nav
                id="mobile-nav-drawer"
                aria-label="Mobile navigation"
                className={`fixed bottom-0 left-0 right-0 z-50 bg-white shadow-2xl transition-transform duration-300 ease-out ${isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
                    }`}
            >
                <div className="site-container py-6 space-y-6">

                    {/* CLOSE BUTTON */}
                    <div className="flex justify-end">
                        <button
                            onClick={closeMenu}
                            aria-label="Close menu"
                            className="p-2 rounded-md hover:bg-gray-100 transition"
                        >
                            <svg
                                className="h-6 w-6 text-(--brand-primary)"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* PRIMARY NAV */}
                    <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
                            Navigation
                        </p>

                        <ul className="space-y-3">
                            {primaryNavItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={closeMenu}
                                        className="block text-base font-semibold text-gray-900 hover:text-black transition"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* UTILITY LINKS */}
                    {utilityNavItems.length > 0 && (
                        <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
                                Resources
                            </p>

                            <ul className="space-y-2">
                                {utilityNavItems.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={closeMenu}
                                            className="text-sm text-gray-600 hover:text-black transition"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* DIVIDER */}
                    <div className="border-t border-gray-200" />

                    {/* CTA */}
                    <a
                        href="#newsletter"
                        onClick={closeMenu}
                        className="btn-primary block w-full text-center py-3 text-sm"
                    >
                        Subscribe to get Expertise Insights
                    </a>

                </div>
            </nav>
        </div>
    );
}