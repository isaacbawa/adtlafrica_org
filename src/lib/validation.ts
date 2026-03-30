import { z } from "zod";
import { sanitizeMultiline, sanitizeText } from "@/lib/sanitize";

const intlPhoneRegex = /^\+?[1-9]\d{6,14}$/;

export const contactSchema = z.object({
  name: z.string().min(2).max(80).transform(sanitizeText),
  email: z.email().max(320).transform((value) => value.toLowerCase()),
  subject: z.string().min(3).max(120).transform(sanitizeText),
  message: z.string().min(20).max(3000).transform(sanitizeMultiline),
  website: z.string().max(0).optional().default(""),
});

export const partnershipSchema = z.object({
  organizationName: z.string().min(2).max(160).transform(sanitizeText),
  contactPerson: z.string().min(2).max(120).transform(sanitizeText),
  email: z.email().max(320).transform((value) => value.toLowerCase()),
  phone: z.string().regex(intlPhoneRegex, "Use international format, e.g. +233...").transform(sanitizeText),
  partnershipType: z.enum(["institutions", "government", "private-sector"]),
  message: z.string().min(20).max(4000).transform(sanitizeMultiline),
  website: z.string().max(0).optional().default(""),
});

export const careerApplicationSchema = z.object({
  jobId: z.number().int().positive(),
  name: z.string().min(2).max(120).transform(sanitizeText),
  email: z.email().max(320).transform((value) => value.toLowerCase()),
  coverLetter: z.string().min(50).max(5000).transform(sanitizeMultiline),
  website: z.string().max(0).optional().default(""),
});

export const blogCreateSchema = z.object({
  title: z.string().min(3).max(180).transform(sanitizeText),
  slug: z.string().min(3).max(180).regex(/^[a-z0-9-]+$/),
  summary: z.string().min(30).max(600).transform(sanitizeText),
  body: z.string().min(100).max(50000).transform(sanitizeMultiline),
  seoTitle: z.string().min(10).max(180).transform(sanitizeText),
  seoDescription: z.string().min(30).max(320).transform(sanitizeText),
  published: z.boolean().default(false),
});

export const resourceCreateSchema = z.object({
  title: z.string().min(3).max(180).transform(sanitizeText),
  category: z.string().min(2).max(80).transform(sanitizeText),
  description: z.string().min(20).max(400).transform(sanitizeText),
  url: z.url().max(500),
  published: z.boolean().default(false),
});

export const teamMemberSchema = z.object({
  name: z.string().min(2).max(120).transform(sanitizeText),
  role: z.string().min(2).max(120).transform(sanitizeText),
  bio: z.string().min(20).max(1200).transform(sanitizeMultiline),
  linkedinUrl: z.url().max(500).optional().or(z.literal("")),
});

export const jobListingSchema = z.object({
  title: z.string().min(3).max(180).transform(sanitizeText),
  description: z.string().min(50).max(4000).transform(sanitizeMultiline),
  requirements: z.string().min(50).max(4000).transform(sanitizeMultiline),
  deadline: z.coerce.date(),
  published: z.boolean().default(true),
});
