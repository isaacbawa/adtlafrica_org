import type { Metadata } from "next";
import { SectionShell } from "@/components/section-shell";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about ADTL Africa's vision, mission, and philosophy for practical digital transformation.",
};

export default function AboutPage() {
  return (
    <main>
      <SectionShell
        title="About ADTL Africa"
        intro="ADTL Africa is a mission-driven, pan-African platform focused on accelerating practical AI and digital transformation for institutions, communities, and businesses."
      >
        <p className="max-w-3xl text-base leading-8 text-ink">
          We exist to ensure Africa is not left behind in the global digital revolution. Our work combines
          implementation, training, and partnership models that create measurable transformation in
          productivity, learning outcomes, and service delivery.
        </p>
      </SectionShell>

      <SectionShell title="Vision" intro="Efficiency. Equity. Innovation.">
        <p className="max-w-3xl text-base leading-8 text-ink">
          To transform African enterprises and educational institutions through intelligent digital systems
          that drive efficiency, equity, and innovation.
        </p>
      </SectionShell>

      <SectionShell title="Mission" intro="Scalable AI systems with real-world impact.">
        <p className="max-w-3xl text-base leading-8 text-ink">
          To accelerate digital transformation across Africa by building scalable AI solutions, business
          intelligence systems, and smart educational technologies that improve outcomes across sectors.
        </p>
      </SectionShell>

      <SectionShell
        title="Why It Matters"
        intro="The continent's digital transition requires practical capability, not theory alone."
      >
        <ul className="space-y-3 text-base leading-8 text-ink">
          <li>Africa's digital skills gap is widening as AI adoption grows.</li>
          <li>Most programmes remain concept-heavy and practice-light.</li>
          <li>Institutions and SMEs need implementation support, not only advisory documents.</li>
        </ul>
      </SectionShell>
    </main>
  );
}
