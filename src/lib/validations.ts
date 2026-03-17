import { z } from 'zod'

// ─────────────────────────────────────────────
// Shared field validators
// ─────────────────────────────────────────────

const phoneRegex = /^\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

const phoneValidator = z
  .string()
  .min(10, 'Phone number must be at least 10 digits')
  .regex(phoneRegex, 'Please enter a valid phone number')

const emailValidator = z
  .string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required')

const nameValidator = (field: string) =>
  z.string().min(1, `${field} is required`).max(100, `${field} is too long`)

// ─────────────────────────────────────────────
// Service type values (mirrors Prisma enum)
// ─────────────────────────────────────────────

export const SERVICE_TYPES = [
  'RESIDENTIAL_REPAIR',
  'RESIDENTIAL_INSTALL',
  'COMMERCIAL_REPAIR',
  'COMMERCIAL_INSTALL',
  'DRAIN_CLEANING',
  'WATER_HEATER',
  'SEWER_LINE',
  'GAS_LINE',
  'EMERGENCY',
  'NEW_CONSTRUCTION',
  'REMODEL',
  'MAINTENANCE',
  'INSPECTION',
  'OTHER',
] as const

export const URGENCY_LEVELS = [
  'EMERGENCY',
  'URGENT',
  'STANDARD',
  'FLEXIBLE',
] as const

export const LEAD_SOURCES = [
  'WEBSITE',
  'PHONE',
  'GOOGLE',
  'FACEBOOK',
  'REFERRAL',
  'WISETACK',
  'OTHER',
] as const

export const LEAD_STATUSES = [
  'NEW',
  'CONTACTED',
  'QUOTED',
  'SCHEDULED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
  'LOST',
] as const

// ─────────────────────────────────────────────
// Contact Form Schema
// ─────────────────────────────────────────────

export const contactFormSchema = z.object({
  firstName: nameValidator('First name'),
  lastName: nameValidator('Last name'),
  email: emailValidator,
  phone: phoneValidator,
  serviceType: z.enum(SERVICE_TYPES).optional(),
  preferredContact: z.enum(['email', 'phone', 'text']).default('email'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be under 2000 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// ─────────────────────────────────────────────
// Schedule / Service Request Form Schema
// ─────────────────────────────────────────────

export const scheduleFormSchema = z.object({
  serviceType: z.enum(SERVICE_TYPES, {
    errorMap: () => ({ message: 'Please select a service type' }),
  }),
  urgency: z.enum(URGENCY_LEVELS).default('STANDARD'),
  description: z
    .string()
    .min(10, 'Please describe the issue in at least 10 characters')
    .max(2000, 'Description must be under 2000 characters'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.string().min(1, 'Please select a preferred time'),
  firstName: nameValidator('First name'),
  lastName: nameValidator('Last name'),
  email: emailValidator,
  phone: phoneValidator,
  address: z.string().optional(),
  city: z.string().optional(),
  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code')
    .optional()
    .or(z.literal('')),
})

export type ScheduleFormData = z.infer<typeof scheduleFormSchema>

// ─────────────────────────────────────────────
// Job Application Form Schema
// ─────────────────────────────────────────────

export const applicationFormSchema = z.object({
  firstName: nameValidator('First name'),
  lastName: nameValidator('Last name'),
  email: emailValidator,
  phone: phoneValidator,
  position: z.string().min(1, 'Position is required'),
  coverLetter: z
    .string()
    .max(5000, 'Cover letter must be under 5000 characters')
    .optional()
    .or(z.literal('')),
})

export type ApplicationFormData = z.infer<typeof applicationFormSchema>

// ─────────────────────────────────────────────
// Full Lead Creation Schema (admin / internal)
// ─────────────────────────────────────────────

export const leadSchema = z.object({
  firstName: nameValidator('First name'),
  lastName: nameValidator('Last name'),
  email: emailValidator,
  phone: phoneValidator,
  address: z.string().optional(),
  city: z.string().optional(),
  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code')
    .optional()
    .or(z.literal('')),
  serviceType: z.enum(SERVICE_TYPES, {
    errorMap: () => ({ message: 'Please select a service type' }),
  }),
  urgency: z.enum(URGENCY_LEVELS).default('STANDARD'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(5000, 'Description must be under 5000 characters'),
  source: z.enum(LEAD_SOURCES).default('WEBSITE'),
  status: z.enum(LEAD_STATUSES).default('NEW'),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  assignedToId: z.string().cuid().optional().nullable(),
})

export type LeadData = z.infer<typeof leadSchema>

// ─────────────────────────────────────────────
// Testimonial Submission Schema
// ─────────────────────────────────────────────

export const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  location: z.string().max(100).optional().or(z.literal('')),
  content: z
    .string()
    .min(10, 'Review must be at least 10 characters')
    .max(2000, 'Review must be under 2000 characters'),
  rating: z.number().int().min(1).max(5).default(5),
  serviceType: z.string().optional().or(z.literal('')),
})

export type TestimonialData = z.infer<typeof testimonialSchema>
