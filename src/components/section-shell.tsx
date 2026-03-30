import type { ReactNode } from "react";

type SectionShellProps = {
  title: string;
  intro?: string;
  children: ReactNode;
};

export function SectionShell({ title, intro, children }: SectionShellProps) {
  return (
    <section className="border-b border-border py-12 last:border-b-0">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-ink">{title}</h2>
        {intro ? <p className="mt-4 max-w-3xl text-base leading-7 text-muted">{intro}</p> : null}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
