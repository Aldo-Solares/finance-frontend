// @/modules/user/constants/profile-image.constants.ts

export const PROFILE_IMAGE_MAX_SIZE = 5 * 1024 * 1024

export const PROFILE_IMAGE_ALLOWED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
] as const

export const PROFILE_IMAGE_ALLOWED_EXTENSIONS = [
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
] as const
