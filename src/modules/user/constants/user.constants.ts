// @/modules/user/constants/user.constants.ts

// ===================
// USER ROLE
// ===================

export const USER_ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const

// ===================
// USER ROLE VALUES
// ===================

export const USER_ROLE_VALUES = [USER_ROLE.ADMIN, USER_ROLE.USER] as const

// ===================
// USER ROLE LABELS
// ===================

export const USER_ROLE_LABELS = {
  [USER_ROLE.ADMIN]: 'Administrador',
  [USER_ROLE.USER]: 'Usuario',
} as const
