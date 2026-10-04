// @/modules/user/schemas/profile-image.schema.ts

import { z } from 'zod'

import {
  PROFILE_IMAGE_ALLOWED_TYPES,
  PROFILE_IMAGE_MAX_SIZE,
} from '@/modules/user/constants/profile-image.constants'
import { requiredString } from '@/core/utils/zod-helpers'

// ===================
// PROFILE IMAGE
// ===================

export const ProfileImageSchema = z.object({
  profileImageId: z.number(),
  name: z.string(),
  imageUrl: z.string(),
})

export const ProfileImageFileSchema = z
  .instanceof(File, { error: 'La imagen es obligatoria' })
  .refine((file) => file.size > 0, 'La imagen es obligatoria')
  .refine(
    (file) =>
      PROFILE_IMAGE_ALLOWED_TYPES.some((allowedType) => allowedType === file.type),
    'El formato debe ser PNG, JPG, JPEG o WebP',
  )
  .refine(
    (file) => file.size <= PROFILE_IMAGE_MAX_SIZE,
    'La imagen no puede superar los 5 MB',
  )

export const CreateProfileImageRequestSchema = z.object({
  name: requiredString('El nombre de la imagen es obligatorio').max(
    100,
    'El nombre de la imagen no puede superar los 100 caracteres',
  ),
  file: ProfileImageFileSchema,
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
// TYPES
// ===================

export type ProfileImage = z.infer<typeof ProfileImageSchema>

export type UpdateProfileImageRequest = z.infer<
  typeof UpdateProfileImageRequestSchema
>
