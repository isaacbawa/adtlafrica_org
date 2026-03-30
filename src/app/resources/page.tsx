import type { Metadata } from "next";
import { ResourceSearch } from "@/components/resource-search";
import { SectionShell } from "@/components/section-shell";
import { getPublishedResources } from "@/lib/repository";

export const metadata: Metadata = {
  title: "Resources",
  description: "Knowledge hub for ADTL Africa guides, PDFs, and training materials.",
};

export default async function ResourcesPage() {
  const resources = await getPublishedResources();

  return (
    <main>
      <SectionShell
        title="Resources"
        intro="Access guides, PDFs, and training materials designed for institutions, partners, and clients implementing digital transformation."
      >
        <ResourceSearch resources={resources} />
      </SectionShell>
    </main>
  );
}
