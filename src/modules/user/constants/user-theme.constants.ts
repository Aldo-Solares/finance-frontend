// @/modules/user/constants/user-theme.constants.ts

import { PROFILE_IMAGE_BACKGROUNDS } from '@/modules/user/constants/profile-image.constants'

export const USER_THEME_DEFAULT = 'DEFAULT' as const

export const USER_THEME_COLORS = {
  DEFAULT: {
    primary: '#B86F89',
    primaryHover: '#A9617B',
    primaryForeground: '#FFFFFF',
    primarySoft: '#FCF8FA',
    primaryBorder: '#EADFE3',
    primaryMuted: '#F4E9EE',
  },

  PINK: {
    primary: '#EC4899',
    primaryHover: '#DB2777',
    primaryForeground: '#FFFFFF',
    primarySoft: '#FDF2F8',
    primaryBorder: '#FBCFE8',
    primaryMuted: '#FCE7F3',
  },

  PURPLE: {
    primary: '#8B5CF6',
    primaryHover: '#7C3AED',
    primaryForeground: '#FFFFFF',
    primarySoft: '#F5F3FF',
    primaryBorder: '#DDD6FE',
    primaryMuted: '#EDE9FE',
  },

  BLUE: {
    primary: '#3B82F6',
    primaryHover: '#2563EB',
    primaryForeground: '#FFFFFF',
    primarySoft: '#EFF6FF',
    primaryBorder: '#BFDBFE',
    primaryMuted: '#DBEAFE',
  },

  CYAN: {
    primary: '#06B6D4',
    primaryHover: '#0891B2',
    primaryForeground: '#FFFFFF',
    primarySoft: '#ECFEFF',
    primaryBorder: '#A5F3FC',
    primaryMuted: '#CFFAFE',
  },

  GREEN: {
    primary: '#22C55E',
    primaryHover: '#16A34A',
    primaryForeground: '#FFFFFF',
    primarySoft: '#F0FDF4',
    primaryBorder: '#BBF7D0',
    primaryMuted: '#DCFCE7',
  },

  LIME: {
    primary: '#84CC16',
    primaryHover: '#65A30D',
    primaryForeground: '#FFFFFF',
    primarySoft: '#F7FEE7',
    primaryBorder: '#D9F99D',
    primaryMuted: '#ECFCCB',
  },

  YELLOW: {
    primary: '#EAB308',
    primaryHover: '#CA8A04',
    primaryForeground: '#FFFFFF',
    primarySoft: '#FEFCE8',
    primaryBorder: '#FEF08A',
    primaryMuted: '#FEF9C3',
  },

  ORANGE: {
    primary: '#F97316',
    primaryHover: '#EA580C',
    primaryForeground: '#FFFFFF',
    primarySoft: '#FFF7ED',
    primaryBorder: '#FED7AA',
    primaryMuted: '#FFEDD5',
  },

  RED: {
    primary: '#EF4444',
    primaryHover: '#DC2626',
    primaryForeground: '#FFFFFF',
    primarySoft: '#FEF2F2',
    primaryBorder: '#FECACA',
    primaryMuted: '#FEE2E2',
  },

  ROSE: {
    primary: '#F43F5E',
    primaryHover: '#E11D48',
    primaryForeground: '#FFFFFF',
    primarySoft: '#FFF1F2',
    primaryBorder: '#FECDD3',
    primaryMuted: '#FFE4E6',
  },

  INDIGO: {
    primary: '#6366F1',
    primaryHover: '#4F46E5',
    primaryForeground: '#FFFFFF',
    primarySoft: '#EEF2FF',
    primaryBorder: '#C7D2FE',
    primaryMuted: '#E0E7FF',
  },

  VIOLET: {
    primary: '#8B5CF6',
    primaryHover: '#7C3AED',
    primaryForeground: '#FFFFFF',
    primarySoft: '#F5F3FF',
    primaryBorder: '#DDD6FE',
    primaryMuted: '#EDE9FE',
  },

  TEAL: {
    primary: '#14B8A6',
    primaryHover: '#0F766E',
    primaryForeground: '#FFFFFF',
    primarySoft: '#F0FDFA',
    primaryBorder: '#99F6E4',
    primaryMuted: '#CCFBF1',
  },

  SLATE: {
    primary: '#64748B',
    primaryHover: '#475569',
    primaryForeground: '#FFFFFF',
    primarySoft: '#F8FAFC',
    primaryBorder: '#CBD5E1',
    primaryMuted: '#F1F5F9',
  },

  GRAY: {
    primary: '#6B7280',
    primaryHover: '#4B5563',
    primaryForeground: '#FFFFFF',
    primarySoft: '#F9FAFB',
    primaryBorder: '#D1D5DB',
    primaryMuted: '#F3F4F6',
  },

  BLACK: {
    primary: '#171717',
    primaryHover: '#000000',
    primaryForeground: '#FFFFFF',
    primarySoft: '#F5F5F5',
    primaryBorder: '#D4D4D4',
    primaryMuted: '#E5E5E5',
  },

  WHITE: {
    primary: '#737373',
    primaryHover: '#525252',
    primaryForeground: '#FFFFFF',
    primarySoft: '#FAFAFA',
    primaryBorder: '#E5E5E5',
    primaryMuted: '#F5F5F5',
  },
} as const

export type UserThemeName =
  | typeof USER_THEME_DEFAULT
  | (typeof PROFILE_IMAGE_BACKGROUNDS)[number]
