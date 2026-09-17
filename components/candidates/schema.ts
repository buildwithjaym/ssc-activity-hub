import { z } from "zod";

export const candidateSchema = z.object({
  candidate_number: z.coerce.number().min(1, "Candidate number is required"),

  full_name: z.string().min(3, "Full name is required"),

  college: z
    .enum([
      "CTE",
      "CCS",
      "CAH",
      "IHTM",
      "IIS",
      "CPADM",
      "CHUSOCOM",
      "CCJE",
      "CA",
    ])
    .optional(),

  year_level: z
    .enum(["1st Year", "2nd Year", "3rd Year", "4th Year"])
    .optional(),

  bio: z
    .string()
    .max(500, "Maximum 500 characters")
    .optional()
    .or(z.literal("")),

  image_url: z.string().optional().or(z.literal("")),

  event_id: z.string().uuid("Please select event"),

  category_id: z.string().uuid("Please select category"),
});

export type CandidateFormData = z.infer<typeof candidateSchema>;
