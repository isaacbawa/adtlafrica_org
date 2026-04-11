"use client";

import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { env } from "@/lib/env";

type ProvidersProps = {
    children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
    if (!env.clerkPublishableKey) {
        return (
            <>
                {children}
                <Toaster />
            </>
        );
    }
    return (
        <ClerkProvider>
            {children}
            <Toaster />
        </ClerkProvider>
    );
}
