import type { ReactNode } from "react";

type PageHeroProps = {
    kicker: string;
    title: string;
    description: string;
    children?: ReactNode;
};

export function PageHero({ kicker, title, description, children }: PageHeroProps) {
    return (
        <section className="border-b border-border py-14 md:py-20">
            <div className="site-container grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
                <div>
                    <p className="section-kicker">{kicker}</p>
                    <h1 className="mt-4 text-5xl leading-[1.05] text-ink md:text-6xl">{title}</h1>
                    <p className="mt-6 max-w-3xl text-xl leading-9 text-muted">{description}</p>
                </div>
                {children ? <aside className="surface-panel rounded-md p-6 md:p-7">{children}</aside> : null}
            </div>
        </section>
    );
}
