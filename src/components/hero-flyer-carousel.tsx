"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Slide = {
    kicker: string;
    title: string;
    body: string;
    image: string;
    imageAlt: string;
    primaryCta: { href: string; label: string };
    secondaryCta: { href: string; label: string };
};

const slides: Slide[] = [
    {
        kicker: "",
        title: "Driving AI & Digital Transformation Across Africa",
        body:
            "We partner with institutions and clients to design practical systems, build real digital capability, and deliver measurable transformation outcomes.",
        image: "/Africa AI & Digital Transformation.jpg",
        imageAlt: "Africa AI & Digital Transformation",
        primaryCta: { href: "/services", label: "Explore Services" },
        secondaryCta: { href: "/partnership", label: "Partner With Us" },
    },
    {
        kicker: "",
        title: "AI & Digital Skills Training Programme",
        body:
            "Our intensive cohort model equips participants with practical AI tool experience, live projects, mentorship, and implementation confidence.",
        image: "/Africa AI & Digital Transformation.jpg",
        imageAlt: "Africa AI & Digital Transformation",
        primaryCta: { href: "/career", label: "View Opportunities" },
        secondaryCta: { href: "/resources", label: "Browse Resources" },
    },
    {
        kicker: "",
        title: "Build Practical Systems With ADTL Africa",
        body:
            "From schools and government to private sector and NGOs, we co-design scalable digital delivery models that produce durable impact.",
        image: "/Africa AI & Digital Transformation.jpg",
        imageAlt: "Africa AI & Digital Transformation",
        primaryCta: { href: "/partnership", label: "Start Partnership" },
        secondaryCta: { href: "/about", label: "Learn About ADTL" },
    },
];

const AUTOPLAY_MS = 6000;

export function HeroFlyerCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((current) => (current + 1) % slides.length);
        }, AUTOPLAY_MS);

        return () => clearInterval(timer);
    }, []);

    const activeSlide = useMemo(() => slides[activeIndex], [activeIndex]);

    function previous() {
        setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
    }

    function next() {
        setActiveIndex((current) => (current + 1) % slides.length);
    }

    return (
        <section className="py-8 sm:py-10 md:py-12 lg:py-16">
            <div className="site-container">
                <div className="bg-white p-3 sm:p-4 md:p-6">
                    <div className="grid items-stretch gap-4 sm:gap-5 md:gap-6 grid-cols-1 lg:grid-cols-[1.08fr_0.92fr]">
                        <div className="order-2 lg:order-1">
                            <p className="section-kicker">{activeSlide.kicker}</p>
                            <h1 className="mt-2 sm:mt-3 md:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-snug md:leading-tight lg:leading-[1.05] text-ink">
                                {activeSlide.title}
                            </h1>
                            <p className="mt-3 sm:mt-4 md:mt-5 max-w-3xl text-xs sm:text-sm md:text-base lg:text-lg leading-5 sm:leading-6 md:leading-7 lg:leading-8 text-ink-soft">
                                {activeSlide.body}
                            </p>

                            <div className="mt-5 sm:mt-6 md:mt-7 flex flex-wrap gap-2 sm:gap-3">
                                <Link href={activeSlide.primaryCta.href} className="btn-primary text-xs sm:text-sm">
                                    {activeSlide.primaryCta.label}
                                </Link>
                                <Link href={activeSlide.secondaryCta.href} className="btn-secondary text-xs sm:text-sm">
                                    {activeSlide.secondaryCta.label}
                                </Link>
                            </div>

                            <div className="mt-5 sm:mt-6 md:mt-7 flex items-center gap-1.5 sm:gap-2">
                                {slides.map((slide, index) => (
                                    <button
                                        key={slide.title}
                                        type="button"
                                        onClick={() => setActiveIndex(index)}
                                        className={`rounded-full transition-all ${index === activeIndex ? "h-2 w-6 sm:w-8 bg-brand-primary" : "h-2 w-2 sm:w-2.5 bg-border hover:bg-brand-primary"}`}
                                        aria-label={`Go to slide ${index + 1}`}
                                        aria-current={index === activeIndex}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="relative overflow-hidden rounded-md border border-border bg-surface-soft">
                                <Image
                                    src={activeSlide.image}
                                    alt={activeSlide.imageAlt}
                                    width={960}
                                    height={640}
                                    priority={true}
                                    sizes="(max-width: 768px) 100vw, 46vw"
                                    className="h-auto w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
