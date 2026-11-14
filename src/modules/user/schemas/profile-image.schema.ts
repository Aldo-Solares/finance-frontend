// @/modules/user/schemas/profile-image.schema.ts

import { z } from 'zod'

import { requiredString } from '@/core/utils/zod-helpers'

// ===================
// PROFILE IMAGE
// ===================

export const ProfileImageSchema = z.object({
  profileImageId: z.number(),
  name: z.string(),
  fileName: z.string(),
  imagePath: z.string(),
})

export const ProfileImageFileNameSchema = z
  .string()
  .trim()
  .min(1, 'El nombre del archivo es obligatorio')
  .max(255, 'El nombre del archivo es demasiado largo')
  .regex(
    /^[\p{L}\p{N}][\p{L}\p{N} ._-]*\.png$/u,
    'El archivo debe ser PNG y estar dentro de public/images/profile-images',
  )

export const CreateProfileImageRequestSchema = z.object({
  name: requiredString('El nombre de la imagen es obligatorio').max(
    100,
    'El nombre de la imagen no puede superar los 100 caracteres',
  ),
  fileName: ProfileImageFileNameSchema,
})

// ===================
// UPDATE PROFILE IMAGE
// ===================

export const UpdateProfileImageRequestSchema = z.object({
  name: requiredString('El nombre es obligatorio').max(
    100,
    'El nombre no puede superar los 100 caracteres',
  ),
  fileName: ProfileImageFileNameSchema,
})

// ===================
// TYPES
// ===================

export type ProfileImage = z.infer<typeof ProfileImageSchema>

export type UpdateProfileImageRequest = z.infer<
  typeof UpdateProfileImageRequestSchema
>
