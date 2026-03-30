import { getDb } from "@/lib/db";

export type BlogPost = {
    id: number;
    title: string;
    slug: string;
    summary: string;
    body: string;
    seoTitle: string;
    seoDescription: string;
    published: boolean;
    createdAt: string;
};

export type ResourceItem = {
    id: number;
    title: string;
    category: string;
    description: string;
    url: string;
    published: boolean;
    downloadCount: number;
};

export type TeamMember = {
    id: number;
    name: string;
    role: string;
    bio: string;
    linkedinUrl: string | null;
};

export type JobListing = {
    id: number;
    title: string;
    description: string;
    requirements: string;
    deadline: string;
    published: boolean;
};

const mockBlog: BlogPost[] = [
    {
        id: 1,
        title: "Why Practical AI Skills Matter for Africa's Workforce",
        slug: "practical-ai-skills-africa",
        summary: "A field-informed perspective on shifting from theory-heavy learning to applied AI capability.",
        body: "ADTL Africa focuses on practical implementation, mentor support, and measurable outcomes for learners and institutions.",
        seoTitle: "Practical AI Skills for Africa",
        seoDescription: "How practical AI training improves workforce outcomes across Africa.",
        published: true,
        createdAt: new Date().toISOString(),
    },
];

const mockResources: ResourceItem[] = [
    {
        id: 1,
        title: "AI Readiness Checklist for Institutions",
        category: "Guides",
        description: "A practical framework for evaluating institutional readiness for AI adoption.",
        url: "https://example.org/resource.pdf",
        published: true,
        downloadCount: 0,
    },
    {
        id: 2,
        title: "SME Digital Transformation Worksheet",
        category: "Training Materials",
        description: "A worksheet to identify operational bottlenecks and automation opportunities.",
        url: "https://example.org/sme-guide.pdf",
        published: true,
        downloadCount: 0,
    },
];

const mockTeam: TeamMember[] = [
    {
        id: 1,
        name: "Mr. Barfour Frimpong",
        role: "Operations & Relations",
        bio: "Leads strategic partnerships and programme operations across ADTL Africa initiatives.",
        linkedinUrl: null,
    },
];

const mockJobs: JobListing[] = [
    {
        id: 1,
        title: "Programme Coordinator - AI Skills Training",
        description: "Coordinate participant onboarding, schedules, and delivery operations for cohort-based training.",
        requirements: "Experience in programme coordination, stakeholder communication, and digital literacy training support.",
        deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
        published: true,
    },
];

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
    const db = getDb();
    if (!db) {
        return mockBlog;
    }

    const rows = (await db`
    SELECT id, title, slug, summary, body, seo_title AS "seoTitle", seo_description AS "seoDescription", published, created_at AS "createdAt"
    FROM blog_posts
    WHERE published = TRUE
    ORDER BY created_at DESC
  `) as BlogPost[];
    return rows;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const db = getDb();
    if (!db) {
        return mockBlog.find((post) => post.slug === slug) ?? null;
    }

    const rows = (await db`
    SELECT id, title, slug, summary, body, seo_title AS "seoTitle", seo_description AS "seoDescription", published, created_at AS "createdAt"
    FROM blog_posts
    WHERE slug = ${slug} AND published = TRUE
    LIMIT 1
  `) as BlogPost[];
    return rows[0] ?? null;
}

export async function getPublishedResources(): Promise<ResourceItem[]> {
    const db = getDb();
    if (!db) {
        return mockResources;
    }

    const rows = (await db`
    SELECT id, title, category, description, url, published, download_count AS "downloadCount"
    FROM resources
    WHERE published = TRUE
    ORDER BY created_at DESC
  `) as ResourceItem[];
    return rows;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
    const db = getDb();
    if (!db) {
        return mockTeam;
    }

    const rows = (await db`
    SELECT id, name, role, bio, linkedin_url AS "linkedinUrl"
    FROM team_members
    ORDER BY display_order ASC, created_at DESC
  `) as TeamMember[];
    return rows;
}

export async function getPublishedJobs(): Promise<JobListing[]> {
    const db = getDb();
    if (!db) {
        return mockJobs;
    }

    const rows = (await db`
    SELECT id, title, description, requirements, deadline, published
    FROM job_listings
    WHERE published = TRUE AND deadline >= NOW()
    ORDER BY deadline ASC
  `) as JobListing[];
    return rows;
}
