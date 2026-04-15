import type { ReactNode } from "react";

type SectionShellProps = {
    title: string;
    intro?: string;
    children: ReactNode;
};

export function SectionShell({ title, intro, children }: SectionShellProps) {
    return (
        <section className="border-b border-border py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 last:border-b-0">
            <div className="site-container">
                <p className="section-kicker">ADTL Africa</p>
                <h2 className="mt-2 sm:mt-2.5 md:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-ink">
                    {title}
                </h2>
                {intro ? (
                    <p className="mt-3 sm:mt-4 md:mt-5 max-w-3xl text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 text-ink-soft">
                        {intro}
                    </p>
                ) : null}
                <div className="mt-6 sm:mt-8 md:mt-10">{children}</div>
            </div>
        </section>
    );
}
