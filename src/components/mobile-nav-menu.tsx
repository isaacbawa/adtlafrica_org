"use client";

import { useState } from "react";
import Link from "next/link";
import { primaryNavItems, utilityNavItems } from "@/lib/content";

export function MobileNavMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className="lg:hidden">
            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
                className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            >
                <span
                    className={`h-0.5 w-6 bg-ink transition-all duration-300 ${
                        isOpen ? "translate-y-2 rotate-45" : ""
                    }`}
                />
                <span
                    className={`h-0.5 w-6 bg-ink transition-all duration-300 ${
                        isOpen ? "opacity-0" : "opacity-100"
                    }`}
                />
                <span
                    className={`h-0.5 w-6 bg-ink transition-all duration-300 ${
                        isOpen ? "-translate-y-2 -rotate-45" : ""
                    }`}
                />
            </button>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 top-0 z-40 bg-black bg-opacity-20"
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Menu Drawer */}
            <nav
                className={`fixed left-0 right-0 top-auto z-50 max-h-[85vh] overflow-y-auto border-t border-border bg-white shadow-lg transition-all duration-300 ${
                    isOpen ? "translate-y-0" : "translate-y-full"
                }`}
                aria-label="Mobile navigation"
            >
                <div className="site-container space-y-3 py-4">
                    {/* Primary Navigation */}
                    <ul className="space-y-2 border-b border-border pb-4">
                        {primaryNavItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={closeMenu}
                                    className="block py-2 text-base font-semibold uppercase tracking-[0.04em] text-ink hover:text-brand-primary"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Utility Navigation */}
                    <ul className="space-y-2 border-b border-border pb-4">
                        {utilityNavItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={closeMenu}
                                    className="block py-2 text-sm font-semibold text-ink hover:text-brand-primary"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* CTA */}
                    <div className="pt-2">
                        <a
                            href="#newsletter"
                            onClick={closeMenu}
                            className="btn-primary w-full text-center block"
                        >
                            Subscribe
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
}
