import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  summary: z.string().optional(),
});

export const experienceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Skill is required"),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  url: z.string().url().optional().or(z.literal('')),
});

export const volunteeringSchema = z.object({
  id: z.string(),
  role: z.string().min(1, "Role is required"),
  organization: z.string().min(1, "Organization is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
});

export const certificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  date: z.string().optional(),
  url: z.string().url().optional().or(z.literal('')),
});

export const awardSchema = z.object({
    id: z.string(),
    title: z.string().min(1, "Title is required"),
    issuer: z.string().optional(),
    date: z.string().optional(),
    description: z.string().optional(),
});

export const languageSchema = z.object({
    id: z.string(),
    language: z.string().min(1, "Language is required"),
    proficiency: z.string().optional(), // e.g. Native, Professional, etc.
});

export const resumeContentSchema = z.object({
  personalInfo: personalInfoSchema.optional(),
  experience: z.array(experienceSchema).optional(),
  education: z.array(educationSchema).optional(),
  skills: z.array(skillSchema).optional(),
  projects: z.array(projectSchema).optional(),
  volunteering: z.array(volunteeringSchema).optional(),
  certifications: z.array(certificationSchema).optional(),
  awards: z.array(awardSchema).optional(),
  languages: z.array(languageSchema).optional(),
  sectionOrder: z.array(z.string()).optional(),
});

export type ResumeContent = z.infer<typeof resumeContentSchema>;
