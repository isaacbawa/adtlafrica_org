"use client";

import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";

type SiteHeaderClientProps = {
    clerkEnabled: boolean;
};

// Placeholder header shown during loading
function HeaderSkeleton() {
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-white shadow-sm">
            <div className="site-container h-32 bg-white" />
        </header>
    );
}

export function SiteHeaderClient({ clerkEnabled }: SiteHeaderClientProps) {
    return (
        <Suspense fallback={<HeaderSkeleton />}>
            <SiteHeader clerkEnabled={clerkEnabled} />
        </Suspense>
    );
}

