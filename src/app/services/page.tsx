import type { Metadata } from "next";
import { SectionShell } from "@/components/section-shell";
import { serviceCards } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: "Institutional AI and digital transformation services for African partners and clients.",
};

export default function ServicesPage() {
  return (
    <main>
      <SectionShell
        title="Services"
        intro="ADTL Africa delivers practical solutions for both implementation partners and service clients across Africa."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {serviceCards.map((service) => (
            <article key={service.title} className="rounded-md border border-border p-5">
              <h3 className="text-xl font-semibold text-ink">{service.title}</h3>
              <dl className="mt-4 space-y-3 text-sm leading-7">
                <div>
                  <dt className="font-semibold text-ink">What it is</dt>
                  <dd className="text-muted">{service.what}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Who it is for</dt>
                  <dd className="text-muted">{service.who}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Outcome</dt>
                  <dd className="text-muted">{service.outcome}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </SectionShell>
    </main>
  );
}
