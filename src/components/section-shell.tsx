import type { ReactNode } from "react";

type SectionShellProps = {
    title: string;
    intro?: string;
    children: ReactNode;
};

export function SectionShell({ title, intro, children }: SectionShellProps) {
    return (
        <section className="border-b border-border py-16 md:py-20 last:border-b-0">
            <div className="site-container">
                <p className="section-kicker">ADTL Africa</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">{title}</h2>
                {intro ? <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{intro}</p> : null}
                <div className="mt-10">{children}</div>
            </div>
        </section>
    );
}
