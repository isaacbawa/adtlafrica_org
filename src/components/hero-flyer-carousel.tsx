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

    return (
        <section className="relative min-h-[70vh] lg:min-h-[80vh] overflow-hidden">

            {/* Background Image */}
            <Image
                src={activeSlide.image}
                alt={activeSlide.imageAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
            />

            {/* FULL BRAND OVERLAY */}
            <div className="absolute inset-0 bg-[color:var(--brand-primary)]/70" />

            {/* CONTENT */}
            <div className="relative z-10 site-container flex min-h-[70vh] lg:min-h-[80vh] items-center">

                <div className="max-w-3xl text-white">

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
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
                            className="btn-secondary text-sm bg-white text-black hover:bg-white/90"
                        >
                            {activeSlide.secondaryCta.label}
                        </Link>
                    </div>

                    {/* Carousel Indicators */}
                    <div className="mt-8 flex items-center gap-2">
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