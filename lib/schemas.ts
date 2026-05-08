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
    { errorMap: () => ({ message: "Please select a budget range" }) }
  ),
  message: z
    .string()
    .min(10, "A few words on what you need help with")
    .max(2000),
  _hp: z.string().max(0).optional().or(z.literal("")),
});

export type Lead = z.infer<typeof LeadSchema>;
