import { z } from 'zod'

import { requiredString } from '@/core/utils/zod-helpers'
import { USER_ROLE_VALUES } from '@/modules/user/constants/user.constants'

// ===================
// ROLE
// ===================

export const RoleSchema = z.enum(USER_ROLE_VALUES)

export type Role = z.infer<typeof RoleSchema>

// ===================
// AUTH USER
// ===================

export const AuthUserSchema = z.object({
  userId: z.number(),
  name: z.string(),
  lastName: z.string().nullable(),
  secondLastName: z.string().nullable(),
  email: z.email(),
  role: RoleSchema,
})

export type AuthUser = z.infer<typeof AuthUserSchema>

// ===================
// LOGIN
// ===================

export const LoginRequestSchema = z.object({
  email: z
    .string({ error: 'El correo electrónico es requerido' })
    .min(1, 'El correo electrónico es requerido')
    .email('El correo electrónico no es válido'),
  password: requiredString('La contraseña es requerida'),
})

export type LoginRequest = z.infer<typeof LoginRequestSchema>

export const LoginResponseSchema = z.object({
  token: z.string(),
  user: AuthUserSchema,
})

export type LoginResponse = z.infer<typeof LoginResponseSchema>

// ===================
// REGISTER
// ===================

export const RegisterRequestSchema = z.object({
  name: requiredString('El nombre es requerido'),
  lastName: requiredString('El apellido es requerido'),
  secondLastName: requiredString('El segundo apellido es requerido'),
  email: z
    .string({ error: 'El correo electrónico es requerido' })
    .trim()
    .min(1, 'El correo electrónico es requerido')
    .email('El correo electrónico no es válido'),
  password: requiredString('La contraseña es requerida'),
})

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>

export const RegisterResponseSchema = z.object({
  user: AuthUserSchema,
})

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>

// ===================
// VERIFY EMAIL
// ===================

export const VerifyEmailRequestSchema = z.object({
  token: requiredString('El token es requerido'),
})

export type VerifyEmailRequest = z.infer<typeof VerifyEmailRequestSchema>

// ===================
// RESEND VERIFICATION
// ===================

export const ResendVerificationRequestSchema = z.object({
  email: z
    .string({ error: 'El correo electrónico es requerido' })
    .trim()
    .min(1, 'El correo electrónico es requerido')
    .email('El correo electrónico no es válido'),
})

export type ResendVerificationRequest = z.infer<
  typeof ResendVerificationRequestSchema
>

// ===================
// FORGOT PASSWORD
// ===================

export const ForgotPasswordRequestSchema = z.object({
  email: z
    .string({ error: 'El correo electrónico es requerido' })
    .trim()
    .min(1, 'El correo electrónico es requerido')
    .email('El correo electrónico no es válido'),
})

export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordRequestSchema>

// ===================
// RESET PASSWORD
// ===================

export const ResetPasswordRequestSchema = z.object({
  token: requiredString('El token es requerido'),
  newPassword: requiredString('La nueva contraseña es requerida'),
})

export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>
