// @/modules/user/schemas/user.schema.ts

import { z } from 'zod'

import { requiredString } from '@/core/utils/zod-helpers'
import { USER_ROLE_VALUES } from '@/modules/user/constants/user.constants'

// ===================
// ROLE
// ===================

export const UserRoleSchema = z.enum(USER_ROLE_VALUES)

export type UserRole = z.infer<typeof UserRoleSchema>

// ===================
// PASSWORD
// ===================

export const StrongPasswordSchema = requiredString(
  'La contraseña es obligatoria',
)
  .min(8, 'La contraseña debe tener mínimo 8 caracteres')
  .regex(/[A-Z]/, 'La contraseña debe contener una mayúscula')
  .regex(/[a-z]/, 'La contraseña debe contener una minúscula')
  .regex(/\d/, 'La contraseña debe contener un número')
  .regex(/[^A-Za-z0-9\s]/, 'La contraseña debe contener un carácter especial')

// ===================
// USER
// ===================

export const UserSchema = z.object({
  userId: z.number(),
  name: z.string(),
  lastName: z.string().nullable(),
  secondLastName: z.string().nullable(),
  email: z.string().email(),
  role: UserRoleSchema,
  emailVerified: z.boolean(),
})

// ===================
// UPDATE USER
// ===================

export const UpdateUserRequestSchema = z.object({
  name: requiredString('El nombre es obligatorio'),
  lastName: z.string().trim().nullable(),
  secondLastName: z.string().trim().nullable(),
  email: requiredString('El correo es obligatorio').email(
    'El correo no es válido',
  ),
})

export const UpdateUserResponseSchema = z.object({
  user: UserSchema,
  token: z.string(),
})

// ===================
// CHANGE PASSWORD
// ===================

export const ChangePasswordRequestSchema = z.object({
  currentPassword: requiredString('La contraseña actual es obligatoria'),
  newPassword: StrongPasswordSchema,
})

// ===================
// CHANGE ROLE
// ===================

export const ChangeRoleRequestSchema = z.object({
  role: UserRoleSchema,
})

// ===================
// TYPES
// ===================

export type User = z.infer<typeof UserSchema>

export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>

export type UpdateUserResponse = z.infer<typeof UpdateUserResponseSchema>

export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>

export type ChangeRoleRequest = z.infer<typeof ChangeRoleRequestSchema>
