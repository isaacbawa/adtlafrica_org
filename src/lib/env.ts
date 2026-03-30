export const env = {
  databaseUrl: process.env.DATABASE_URL,
  clerkSecretKey: process.env.CLERK_SECRET_KEY,
  clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  adminEmail: process.env.ADMIN_NOTIFICATION_EMAIL,
};

export const hasDatabase = Boolean(env.databaseUrl);
export const hasClerk = Boolean(env.clerkSecretKey && env.clerkPublishableKey);
