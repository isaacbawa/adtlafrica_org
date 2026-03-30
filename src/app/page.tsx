import type { Metadata } from "next";
import Link from "next/link";
import { SectionShell } from "@/components/section-shell";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main>
      <section className="border-b border-border py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary">ADTL Africa</p>
          <h1 className="mt-4 max-w-4xl text-5xl leading-tight text-ink md:text-6xl">
            Driving AI & Digital Transformation Across Africa
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            A mission-driven platform delivering practical systems, training, and institutional partnerships
            that bridge Africa&apos;s digital implementation gap for both partners and clients.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="rounded-sm bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:bg-brand-primary-strong"
            >
              Explore Services
            </Link>
            <Link
              href="/partnership"
              className="rounded-sm border border-border px-6 py-3 text-sm font-semibold text-ink hover:border-brand-primary hover:text-brand-primary"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      <SectionShell
        title="Who We Are"
        intro="A not-for-profit, innovation-led platform focused on inclusive and practical digital transformation."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-md border border-border p-5">
            <h3 className="text-lg font-semibold text-ink">Not-for-Profit</h3>
            <p className="mt-3 text-sm leading-7 text-muted">Social impact over profit, with inclusive services across society.</p>
          </article>
          <article className="rounded-md border border-border p-5">
            <h3 className="text-lg font-semibold text-ink">Pan-African</h3>
            <p className="mt-3 text-sm leading-7 text-muted">Bridging digital skills gaps across youth, communities, and institutions.</p>
          </article>
          <article className="rounded-md border border-border p-5">
            <h3 className="text-lg font-semibold text-ink">Innovation-Led</h3>
            <p className="mt-3 text-sm leading-7 text-muted">Solutions grounded in operational realities and implementation outcomes.</p>
          </article>
        </div>
      </SectionShell>

      <SectionShell title="Core Focus Areas">
        <div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-md border border-border p-5">
            <h3 className="text-lg font-semibold text-ink">SME Digital Transformation</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Web systems, AI workflows, dashboards, and digital infrastructure for growth-stage organizations.
            </p>
          </article>
          <article className="rounded-md border border-border p-5">
            <h3 className="text-lg font-semibold text-ink">Education & Capacity Building</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Youth training, teacher integration programmes, cohort learning, and certification pathways.
            </p>
          </article>
          <article className="rounded-md border border-border p-5">
            <h3 className="text-lg font-semibold text-ink">AI Integration & Automation</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              AI coworker systems, process automation, and data-driven decision support.
            </p>
          </article>
        </div>
      </SectionShell>

      <SectionShell title="The Problem We Address">
        <div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-md border border-border p-5">
            <h3 className="text-lg font-semibold text-ink">Widening Skills Gap</h3>
            <p className="mt-3 text-sm leading-7 text-muted">AI adoption is outpacing practical skills development across sectors.</p>
          </article>
          <article className="rounded-md border border-border p-5">
            <h3 className="text-lg font-semibold text-ink">Limited Practical Training</h3>
            <p className="mt-3 text-sm leading-7 text-muted">Hands-on learning opportunities remain inaccessible for most learners.</p>
          </article>
          <article className="rounded-md border border-border p-5">
            <h3 className="text-lg font-semibold text-ink">Theory-Practice Disconnect</h3>
            <p className="mt-3 text-sm leading-7 text-muted">Many programmes teach concepts without implementation capability.</p>
          </article>
        </div>
      </SectionShell>

      <SectionShell title="Our Solution" intro="Practical. Hands-on. Impact-driven.">
        <ul className="grid gap-4 text-sm leading-7 text-ink md:grid-cols-2">
          <li className="rounded-md border border-border p-4">Real AI tools in every session</li>
          <li className="rounded-md border border-border p-4">Cohort-based peer learning</li>
          <li className="rounded-md border border-border p-4">Mentor-guided live projects</li>
          <li className="rounded-md border border-border p-4">Continuous monitoring and feedback loops</li>
        </ul>
      </SectionShell>

      <SectionShell title="Impact">
        <div className="grid gap-4 text-sm leading-7 text-ink md:grid-cols-4">
          <div className="rounded-md border border-border p-4">Skilled workforce development</div>
          <div className="rounded-md border border-border p-4">Increased employability outcomes</div>
          <div className="rounded-md border border-border p-4">SME transformation support</div>
          <div className="rounded-md border border-border p-4">Stronger innovation ecosystem</div>
        </div>
      </SectionShell>

      <section className="py-14">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 rounded-md border border-border px-6 py-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-ink">Ready to Partner With Us?</h2>
            <p className="mt-3 text-base text-muted">
              Join us in transforming Africa&apos;s digital future, one learner, one institution, one system at a time.
            </p>
          </div>
          <Link
            href="/partnership"
            className="rounded-sm bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:bg-brand-primary-strong"
          >
            Start a Partnership
          </Link>
        </div>
      </section>
    </main>
  );
}
