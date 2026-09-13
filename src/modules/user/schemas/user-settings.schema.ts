// @/modules/user/schemas/user-settings.schema.ts

import { z } from 'zod'

import { PROFILE_IMAGE_BACKGROUNDS } from '@/modules/user/constants/profile-image.constants'

// ===================
// USER SETTINGS
// ===================

export const UserSettingsSchema = z.object({
  userSettingsId: z.number(),
  userId: z.number(),
  statementCutoffReminder: z.boolean(),
  profileImageBackground: z.enum(PROFILE_IMAGE_BACKGROUNDS),
  darkMode: z.boolean(),
})

export type UserSettings = z.infer<typeof UserSettingsSchema>

// ===================
// UPDATE STATEMENT CUTOFF REMINDER
// ===================

export const UpdateStatementCutoffReminderRequestSchema = z.object({
  statementCutoffReminder: z.boolean(),
})

export type UpdateStatementCutoffReminderRequest = z.infer<
  typeof UpdateStatementCutoffReminderRequestSchema
>

// ===================
// UPDATE PROFILE IMAGE BACKGROUND
// ===================

export const UpdateProfileImageBackgroundRequestSchema = z.object({
  profileImageBackground: z.enum(PROFILE_IMAGE_BACKGROUNDS),
})

export type UpdateProfileImageBackgroundRequest = z.infer<
  typeof UpdateProfileImageBackgroundRequestSchema
>

// ===================
// UPDATE DARKMODE
// ===================
export const UpdateDarkModeRequestSchema = z.object({
  active: z.boolean(),
})

export type UpdateDarkModeRequest = z.infer<typeof UpdateDarkModeRequestSchema>
