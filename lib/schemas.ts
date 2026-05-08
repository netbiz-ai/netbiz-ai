import { z } from "zod";

export const LeadSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  email: z.email("Enter a valid email"),
  company: z.string().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "A few words on what you need help with")
    .max(2000),
  // honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type Lead = z.infer<typeof LeadSchema>;
