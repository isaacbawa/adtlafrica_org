import type { ReactNode } from "react";

type PageHeroProps = {
    kicker: string;
    title: string;
    description: string;
    children?: ReactNode;
};

export function PageHero({ kicker, title, description, children }: PageHeroProps) {
    return (
        <section className="border-b border-border py-8 sm:py-10 md:py-14 lg:py-20">
            <div className="site-container grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
                <div>
                    <p className="section-kicker">{kicker}</p>
                    <h1 className="mt-2 sm:mt-3 md:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight md:leading-[1.05] text-ink">
                        {title}
                    </h1>
                    <p className="mt-3 sm:mt-4 md:mt-6 max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl leading-6 sm:leading-7 md:leading-8 lg:leading-9 text-ink-soft">
                        {description}
                    </p>
                </div>
                {children ? (
                    <aside className="surface-panel rounded-md p-4 sm:p-5 md:p-6 lg:p-7">
                        {children}
                    </aside>
                ) : null}
            </div>
        </section>
    );
}
