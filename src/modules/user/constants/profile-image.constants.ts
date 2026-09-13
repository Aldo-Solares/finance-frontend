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

export const PROFILE_IMAGE_BACKGROUNDS = [
  'PINK',
  'PURPLE',
  'BLUE',
  'CYAN',
  'GREEN',
  'LIME',
  'YELLOW',
  'ORANGE',
  'RED',
  'ROSE',
  'INDIGO',
  'VIOLET',
  'TEAL',
  'SLATE',
  'GRAY',
  'BLACK',
  'WHITE',
] as const

export const PROFILE_IMAGE_BACKGROUND_CLASSES = {
  PINK: 'bg-pink-300',
  PURPLE: 'bg-purple-300',
  BLUE: 'bg-blue-300',
  CYAN: 'bg-cyan-300',
  GREEN: 'bg-green-300',
  LIME: 'bg-lime-300',
  YELLOW: 'bg-yellow-300',
  ORANGE: 'bg-orange-300',
  RED: 'bg-red-300',
  ROSE: 'bg-rose-300',
  INDIGO: 'bg-indigo-300',
  VIOLET: 'bg-violet-300',
  TEAL: 'bg-teal-300',
  SLATE: 'bg-slate-300',
  GRAY: 'bg-gray-300',
  BLACK: 'bg-neutral-950',
  WHITE: 'bg-white',
} as const
