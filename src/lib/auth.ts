import { auth, clerkClient } from "@clerk/nextjs/server";
import { hasClerk } from "@/lib/env";
import { logger } from "@/lib/logger";

export type UserRole = "admin" | "editor" | "public";

export async function getUserId(): Promise<string | null> {
    if (!hasClerk) {
        return null;
    }
    const { userId } = await auth();
    return userId ?? null;
}

export async function getUserRole(): Promise<UserRole> {
    if (!hasClerk) {
        return "public";
    }
    const { userId } = await auth();
    if (!userId) {
        return "public";
    }
    try {
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const role = user.publicMetadata?.role;
        if (role === "admin" || role === "editor") {
            return role;
        }
    } catch (error) {
        logger.error("Error fetching user role from Clerk");
    }
    return "public";
}

export async function assertRole(allowed: UserRole[]) {
    const role = await getUserRole();
    return {
        role,
        allowed: allowed.includes(role),
    };
}
