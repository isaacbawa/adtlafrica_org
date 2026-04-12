"use client";

import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

type ProvidersProps = {
  children: ReactNode;
  clerkEnabled: boolean;
};

export function Providers({ children, clerkEnabled }: ProvidersProps) {
  const content = (
    <>
      {children}
      <Toaster />
    </>
  );

  if (!clerkEnabled) {
    return content;
  }

  return <ClerkProvider>{content}</ClerkProvider>;
}
