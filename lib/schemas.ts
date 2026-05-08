import { z } from "zod";

export const PAIN_POINT_OPTIONS = [
  "Manual & repetitive processes",
  "Lead generation & sales",
  "Customer support",
  "Data analysis & reporting",
  "Content creation & marketing",
  "Other",
] as const;

export const BUDGET_OPTIONS = [
  { value: "under_1k", label: "Under $1k/mo" },
  { value: "1k_5k", label: "$1k–$5k/mo" },
  { value: "5k_10k", label: "$5k–$10k/mo" },
  { value: "10k_plus", label: "$10k+/mo" },
  { value: "not_sure", label: "Not sure yet" },
] as const;

export const LeadSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  email: z.email("Enter a valid email"),
  company: z.string().min(1, "Please enter your company name").max(120),
  companyWebsite: z.string().url("Enter a valid URL (e.g. https://acme.com)").max(200),
  painPoints: z.array(z.string()).min(1, "Select at least one challenge"),
  budget: z.enum(
    ["under_1k", "1k_5k", "5k_10k", "10k_plus", "not_sure"] as const,
    { error: () => "Please select a budget range" }
  ),
  message: z
    .string()
    .min(10, "A few words on what you need help with")
    .max(2000),
  _hp: z.string().max(0).optional().or(z.literal("")),
});

export type Lead = z.infer<typeof LeadSchema>;

export const AdminLoginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export type AdminLogin = z.infer<typeof AdminLoginSchema>;

export const GenerateSchema = z.object({
  sourceType: z.enum(["youtube", "text"]),
  input: z.string().min(1, "Input is required").max(20000),
});
export type GenerateInput = z.infer<typeof GenerateSchema>;

export const ContentPatchSchema = z.object({
  title: z.string().max(300).optional(),
  blog_draft: z.string().max(50000).optional(),
  linkedin_draft: z.string().max(10000).optional(),
  twitter_draft: z.array(z.string().max(500)).max(20).optional(),
});
export type ContentPatch = z.infer<typeof ContentPatchSchema>;

export const PublishSchema = z.object({
  title: z.string().min(1).max(300).optional(),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, hyphens")
    .optional(),
});
export type PublishInput = z.infer<typeof PublishSchema>;
