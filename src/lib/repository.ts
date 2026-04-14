import { getDb } from "@/lib/db";
import { serverLogger } from "@/lib/server-logger";
// import { siteAssetUrls } from "@/lib/site-assets";

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
    image: string;
    linkedinUrl: string | null;
};

type TeamMemberRecord = Omit<TeamMember, "image"> & {
    image?: string | null;
};

export type JobListing = {
    id: number;
    title: string;
    description: string;
    requirements: string;
    deadline: string;
    published: boolean;
    deletedAt: string | null;
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

const teamPlaceholderImage = "/team/team-member-placeholder.svg";
const isaacbawa = "/team/Isaac Bawa Ngisah.jpg";
const wisdomkordoh = "/team/Wisdom Kordah.jpg";
const barfourfrimpong = "/team/Barfour Frimpong.jpg";
const mercy = "/team/Mercy Namoe-kan Nassam.jpg";
const Raymondosei = "/team/Raymond Osei.jpg";
const josephineyeboah = "/team/Josephine Yeboah.jpg";

const linkedin_isaacbawa = "https://www.linkedin.com/in/isaacbawangisah/";
const linkedin_wisdomkordah = "https://www.linkedin.com/in/wisdom-kordah/";
const linkedin_barfour = "https://www.linkedin.com/in/barfourfrimpong/";

// Generic placeholder for team members with missing image or LinkedIn URL
const GENERIC_TEAM_PLACEHOLDER = {
    image: teamPlaceholderImage,
    linkedinUrl: null as string | null,
};

// Default institutional roster used until the admin-managed team directory is fully populated.
const mockTeam: TeamMember[] = [
    {
        id: 1,
        name: "Barfour Frimpong",
        role: "Operations & Relations",
        bio: "Leads strategic partnerships, programme delivery coordination, and stakeholder engagement across ADTL Africa initiatives.",
        image: barfourfrimpong,
        linkedinUrl: linkedin_barfour,
    },
    {
        id: 2,
        name: "Josephine Yeboah",
        role: "Intern",
        bio: "Oversees cross-sector programme design, partnership development, and institutional collaboration for implementation across Africa.",
        image: josephineyeboah,
        linkedinUrl: null,
    },
    {
        id: 3,
        name: "Isaac Bawa Ngisah",
        role: "Tech Lead, Senior Software Developer",
        bio: "Leads technical architecture, software delivery, and engineering quality across ADTL Africa's digital platforms and implementation work.",
        image: isaacbawa,
        linkedinUrl: linkedin_isaacbawa,
    },
    {
        id: 4,
        name: "Raymond Osei",
        role: "Learning Experience Manager",
        bio: "Coordinates cohort-based training delivery, mentor support, and learner experience across ADTL Africa's skills programmes.",
        image: Raymondosei,
        linkedinUrl: null,
    },
    {
        id: 5,
        name: "Wisdom Kordah",
        role: "Software Engineer",
        bio: "Builds dashboards, reporting systems, and measurement frameworks that turn programme data into actionable decision support.",
        image: wisdomkordoh,
        linkedinUrl: linkedin_wisdomkordah,
    },
    {
        id: 6,
        name: "Mercy Namoe-kan Nassam",
        role: "Secretary",
        bio: "Supports outreach, partner communication, and community engagement to strengthen trust, visibility, and programme participation.",
        image: teamPlaceholderImage,
        linkedinUrl: null,
    },
];

function withDefaultTeamMembers(members: TeamMemberRecord[]): TeamMember[] {
    const fallbackByName = new Map(mockTeam.map((member) => [member.name.toLowerCase(), member]));
    const normalized = members.map((member) => {
        const fallback = fallbackByName.get(member.name.toLowerCase());

        return {
            id: member.id,
            name: member.name,
            role: member.role,
            bio: member.bio,
            image: member.image?.trim() || GENERIC_TEAM_PLACEHOLDER.image,
            linkedinUrl: member.linkedinUrl ?? GENERIC_TEAM_PLACEHOLDER.linkedinUrl,
        };
    });

    if (normalized.length >= mockTeam.length) {
        return normalized;
    }

    const usedNames = new Set(normalized.map((member) => member.name.toLowerCase()));
    let nextId = normalized.reduce((maxId, member) => Math.max(maxId, member.id), 0) + 1;

    for (const fallbackMember of mockTeam) {
        if (usedNames.has(fallbackMember.name.toLowerCase())) {
            continue;
        }

        normalized.push({
            ...fallbackMember,
            id: nextId++,
        });
    }

    return normalized;
}

const mockJobs: JobListing[] = [
    {
        id: 1,
        title: "Programme Coordinator - AI Skills Training",
        description: "Coordinate participant onboarding, schedules, and delivery operations for cohort-based training.",
        requirements: "Experience in programme coordination, stakeholder communication, and digital literacy training support.",
        deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
        published: true,
        deletedAt: null,
    },
];

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
    const db = getDb();
    if (!db) {
        return mockBlog;
    }

    try {
        const rows = (await db`
        SELECT id, title, slug, summary, body, seo_title AS "seoTitle", seo_description AS "seoDescription", published, created_at AS "createdAt"
        FROM blog_posts
        WHERE published = TRUE
        ORDER BY created_at DESC
      `) as BlogPost[];
        return rows;
    } catch (error) {
        serverLogger.error("Database query failed, falling back to mock data", error);
        return mockBlog;
    }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const db = getDb();
    if (!db) {
        return mockBlog.find((post) => post.slug === slug) ?? null;
    }

    try {
        const rows = (await db`
        SELECT id, title, slug, summary, body, seo_title AS "seoTitle", seo_description AS "seoDescription", published, created_at AS "createdAt"
        FROM blog_posts
        WHERE slug = ${slug} AND published = TRUE
        LIMIT 1
      `) as BlogPost[];
        return rows[0] ?? null;
    } catch (error) {
        serverLogger.error("Database query failed, falling back to mock data", error);
        return mockBlog.find((post) => post.slug === slug) ?? null;
    }
}

export async function getPublishedResources(): Promise<ResourceItem[]> {
    const db = getDb();
    if (!db) {
        return mockResources;
    }

    try {
        const rows = (await db`
        SELECT id, title, category, description, url, published, download_count AS "downloadCount"
        FROM resources
        WHERE published = TRUE
        ORDER BY created_at DESC
      `) as ResourceItem[];
        return rows;
    } catch (error) {
        serverLogger.error("Database query failed, falling back to mock data", error);
        return mockResources;
    }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
    const db = getDb();
    if (!db) {
        return mockTeam;
    }

    try {
        try {
            const rows = (await db`
            SELECT id, name, role, bio, profile_image_url AS "image", linkedin_url AS "linkedinUrl"
            FROM team_members
            ORDER BY display_order ASC, created_at DESC
          `) as TeamMemberRecord[];

            return withDefaultTeamMembers(rows);
        } catch (error) {
            serverLogger.warn("Team query using profile_image_url failed, retrying legacy image column", error);

            const rows = (await db`
            SELECT id, name, role, bio, image, linkedin_url AS "linkedinUrl"
            FROM team_members
            ORDER BY display_order ASC, created_at DESC
          `) as TeamMemberRecord[];

            return withDefaultTeamMembers(rows);
        }
    } catch (error) {
        serverLogger.error("Database query failed, falling back to mock data", error);
        return mockTeam;
    }
}

export async function getPublishedJobs(): Promise<JobListing[]> {
    const db = getDb();
    if (!db) {
        return mockJobs;
    }

    try {
        const rows = (await db`
        SELECT id, title, description, requirements, deadline, published, deleted_at AS "deletedAt"
        FROM job_listings
        WHERE published = TRUE AND deadline >= NOW() AND deleted_at IS NULL
        ORDER BY deadline ASC
      `) as JobListing[];
        return rows;
    } catch (error) {
        serverLogger.error("Database query failed, falling back to mock data", error);
        return mockJobs;
    }
}
