// @/modules/user/schemas/user-settings.schema.ts

import { z } from 'zod'

// ===================
// USER SETTINGS
// ===================

export const UserSettingsSchema = z.object({
  userSettingsId: z.number(),
  userId: z.number(),
  statementCutoffReminder: z.boolean(),
})

export type UserSettings = z.infer<typeof UserSettingsSchema>

// ===================
// UPDATE USER SETTINGS
// ===================

export const UpdateUserSettingsRequestSchema = z.object({
  statementCutoffReminder: z.boolean(),
})

export type UpdateUserSettingsRequest = z.infer<
  typeof UpdateUserSettingsRequestSchema
>
