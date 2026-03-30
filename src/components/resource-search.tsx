"use client";

import { useMemo, useState } from "react";

type Resource = {
    id: number;
    title: string;
    category: string;
    description: string;
    url: string;
    downloadCount: number;
};

type ResourceSearchProps = {
    resources: Resource[];
};

export function ResourceSearch({ resources }: ResourceSearchProps) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all");

    const categories = useMemo(
        () => ["all", ...new Set(resources.map((resource) => resource.category))],
        [resources],
    );

    const filtered = useMemo(() => {
        return resources.filter((resource) => {
            const q = query.toLowerCase();
            const matchQuery =
                resource.title.toLowerCase().includes(q) || resource.description.toLowerCase().includes(q);
            const matchCategory = category === "all" || resource.category === category;
            return matchQuery && matchCategory;
        });
    }, [category, query, resources]);

    return (
        <div className="space-y-7">
            <div className="grid gap-4 md:grid-cols-2">
                <input
                    placeholder="Search resources"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="field-input"
                />
                <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="field-input"
                >
                    {categories.map((item) => (
                        <option key={item} value={item}>
                            {item === "all" ? "All categories" : item}
                        </option>
                    ))}
                </select>
            </div>

            <ul className="space-y-4">
                {filtered.map((resource) => (
                    <li key={resource.id} className="info-card">
                        <h3 className="text-2xl font-semibold text-ink">{resource.title}</h3>
                        <p className="mt-3 text-base leading-8 text-muted">{resource.description}</p>
                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm uppercase tracking-[0.08em] text-muted">{resource.category}</span>
                            <a
                                href={`/api/resources/download?id=${resource.id}`}
                                className="text-base font-semibold text-brand-primary hover:text-brand-primary-strong"
                            >
                                Download ({resource.downloadCount})
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
