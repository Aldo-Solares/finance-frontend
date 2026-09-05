// @/modules/user/schemas/profile-image.schema.ts

import { z } from 'zod'

import { requiredString } from '@/core/utils/zod-helpers'

// ===================
// PROFILE IMAGE
// ===================

export const ProfileImageSchema = z.object({
  profileImageId: z.number(),
  name: z.string(),
  imageUrl: z.string(),
  active: z.boolean(),
})

// ===================
// UPDATE PROFILE IMAGE
// ===================

export const UpdateProfileImageRequestSchema = z.object({
  name: requiredString('El nombre es obligatorio').max(
    100,
    'El nombre no puede superar los 100 caracteres',
  ),
})

// ===================
// UPDATE PROFILE IMAGE STATUS
// ===================

export const UpdateProfileImageStatusRequestSchema = z.object({
  active: z.boolean(),
})

// ===================
// TYPES
// ===================

export type ProfileImage = z.infer<typeof ProfileImageSchema>

export type UpdateProfileImageRequest = z.infer<
  typeof UpdateProfileImageRequestSchema
>

export type UpdateProfileImageStatusRequest = z.infer<
  typeof UpdateProfileImageStatusRequestSchema
>
