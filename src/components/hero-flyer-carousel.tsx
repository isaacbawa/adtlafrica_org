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
        <section className="relative overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={activeSlide.image}
                    alt={activeSlide.imageAlt}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
            </div>

            {/* Dark gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />

            <div className="relative z-10 site-container py-20 md:py-28 lg:py-36">

                <div className="max-w-2xl">

                    {/* Text Container with Brand Overlay */}
                    <div className="rounded-xl backdrop-blur-md bg-[color:var(--brand-primary)]/85 p-6 md:p-8 lg:p-10 shadow-2xl">

                        {activeSlide.kicker && (
                            <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
                                {activeSlide.kicker}
                            </p>
                        )}

                        <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                            {activeSlide.title}
                        </h1>

                        <p className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-white/90">
                            {activeSlide.body}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href={activeSlide.primaryCta.href}
                                className="btn-primary text-sm"
                            >
                                {activeSlide.primaryCta.label}
                            </Link>

                            <Link
                                href={activeSlide.secondaryCta.href}
                                className="btn-secondary text-sm"
                            >
                                {activeSlide.secondaryCta.label}
                            </Link>
                        </div>
                    </div>

                    {/* Carousel Indicators */}
                    <div className="mt-6 flex items-center gap-2">
                        {slides.map((slide, index) => (
                            <button
                                key={slide.title}
                                type="button"
                                onClick={() => setActiveIndex(index)}
                                className={`rounded-full transition-all ${index === activeIndex
                                    ? "h-2 w-8 bg-white"
                                    : "h-2 w-2 bg-white/50 hover:bg-white"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                                aria-current={index === activeIndex}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}