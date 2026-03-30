import type { Metadata } from "next";
import Link from "next/link";
import { HeroFlyerCarousel } from "@/components/hero-flyer-carousel";
import { SectionShell } from "@/components/section-shell";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main>
      <HeroFlyerCarousel />

      <section className="border-b border-border py-16">
        <div className="site-container grid gap-5 md:grid-cols-4">
          <div className="info-card">
            <p className="text-4xl font-semibold text-ink md:text-5xl">3</p>
            <p className="mt-2 text-base text-muted">Strategic Focus Areas</p>
          </div>
          <div className="info-card">
            <p className="text-4xl font-semibold text-ink md:text-5xl">6</p>
            <p className="mt-2 text-base text-muted">Service Specialties</p>
          </div>
          <div className="info-card">
            <p className="text-4xl font-semibold text-ink md:text-5xl">100</p>
            <p className="mt-2 text-base text-muted">Participants per Cohort</p>
          </div>
          <div className="info-card">
            <p className="text-4xl font-semibold text-ink md:text-5xl">1</p>
            <p className="mt-2 text-base text-muted">Clear Mission for Digital Inclusion</p>
          </div>
        </div>
      </section>

      <SectionShell
        title="Who We Are"
        intro="A not-for-profit, innovation-led platform focused on inclusive and practical digital transformation across the continent."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <article className="info-card">
            <h3 className="text-2xl font-semibold text-ink">Not-for-Profit</h3>
            <p className="mt-3 text-base leading-8 text-muted">Social impact over profit, with inclusive services across society.</p>
          </article>
          <article className="info-card">
            <h3 className="text-2xl font-semibold text-ink">Pan-African</h3>
            <p className="mt-3 text-base leading-8 text-muted">Bridging digital skills gaps across youth, communities, and institutions.</p>
          </article>
          <article className="info-card">
            <h3 className="text-2xl font-semibold text-ink">Innovation-Led</h3>
            <p className="mt-3 text-base leading-8 text-muted">Solutions grounded in operational realities and implementation outcomes.</p>
          </article>
        </div>
      </SectionShell>

      <SectionShell title="Core Focus Areas">
        <div className="grid gap-5 md:grid-cols-3">
          <article className="info-card">
            <h3 className="text-2xl font-semibold text-ink">SME Digital Transformation</h3>
            <p className="mt-3 text-base leading-8 text-muted">
              Web systems, AI workflows, dashboards, and digital infrastructure for growth-stage organizations.
            </p>
          </article>
          <article className="info-card">
            <h3 className="text-2xl font-semibold text-ink">Education & Capacity Building</h3>
            <p className="mt-3 text-base leading-8 text-muted">
              Youth training, teacher integration programmes, cohort learning, and certification pathways.
            </p>
          </article>
          <article className="info-card">
            <h3 className="text-2xl font-semibold text-ink">AI Integration & Automation</h3>
            <p className="mt-3 text-base leading-8 text-muted">
              AI coworker systems, process automation, and data-driven decision support.
            </p>
          </article>
        </div>
      </SectionShell>

      <SectionShell title="The Problem We Address">
        <div className="grid gap-5 md:grid-cols-3">
          <article className="info-card">
            <h3 className="text-2xl font-semibold text-ink">Widening Skills Gap</h3>
            <p className="mt-3 text-base leading-8 text-muted">AI adoption is outpacing practical skills development across sectors.</p>
          </article>
          <article className="info-card">
            <h3 className="text-2xl font-semibold text-ink">Limited Practical Training</h3>
            <p className="mt-3 text-base leading-8 text-muted">Hands-on learning opportunities remain inaccessible for most learners.</p>
          </article>
          <article className="info-card">
            <h3 className="text-2xl font-semibold text-ink">Theory-Practice Disconnect</h3>
            <p className="mt-3 text-base leading-8 text-muted">Many programmes teach concepts without implementation capability.</p>
          </article>
        </div>
      </SectionShell>

      <SectionShell title="Our Solution" intro="Practical. Hands-on. Impact-driven.">
        <ul className="grid gap-4 text-base leading-8 text-ink md:grid-cols-2">
          <li className="info-card">Real AI tools in every session</li>
          <li className="info-card">Cohort-based peer learning</li>
          <li className="info-card">Mentor-guided live projects</li>
          <li className="info-card">Continuous monitoring and feedback loops</li>
        </ul>
      </SectionShell>

      <SectionShell title="Impact">
        <div className="grid gap-4 text-base leading-8 text-ink md:grid-cols-4">
          <div className="info-card">Skilled workforce development</div>
          <div className="info-card">Increased employability outcomes</div>
          <div className="info-card">SME transformation support</div>
          <div className="info-card">Stronger innovation ecosystem</div>
        </div>
      </SectionShell>

      <section className="py-16 md:py-20">
        <div className="site-container flex w-full flex-col items-start justify-between gap-6 rounded-md border border-border px-6 py-10 md:flex-row md:items-center md:px-10">
          <div>
            <p className="section-kicker">Partnership Opportunity</p>
            <h2 className="mt-2 text-4xl font-semibold text-ink md:text-5xl">Ready to Partner With Us?</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
              Join us in transforming Africa&apos;s digital future, one learner, one institution, one system at a time.
            </p>
          </div>
          <Link href="/partnership" className="btn-primary">
            Start a Partnership
          </Link>
        </div>
      </section>
    </main>
  );
}
