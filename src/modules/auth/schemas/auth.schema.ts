// @/modules/auth/schemas/auth.schema.ts

import { z } from 'zod'

import {
  optionalNullableString,
  requiredString,
} from '@/core/utils/zod-helpers'

const RoleSchema = z.enum(['ADMIN', 'USER', 'DEBTOR'])

export const LoginRequestSchema = z.object({
  email: requiredString('Email is required').email('Invalid email'),
  password: requiredString('Password is required'),
})

export type LoginRequest = z.infer<typeof LoginRequestSchema>

export const LoginResponseSchema = z.object({
  token: z.string(),
  userId: z.number(),
  email: z.string(),
  name: z.string(),
  role: RoleSchema,
})

export type LoginResponse = z.infer<typeof LoginResponseSchema>

export const RegisterRequestSchema = z.object({
  name: requiredString('Name is required').max(100),

  lastName: optionalNullableString.pipe(z.string().max(100).nullable()),

  secondLastName: optionalNullableString.pipe(z.string().max(100).nullable()),

  email: requiredString('Email is required').email('Invalid email').max(150),

  password: requiredString('Password is required'),
})

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>

export const RegisterResponseSchema = z.object({
  user: z.object({
    userId: z.number(),
    name: z.string(),
    lastName: z.string().nullable(),
    secondLastName: z.string().nullable(),
    email: z.string(),
    role: RoleSchema,
    emailVerified: z.boolean(),
  }),
  verificationToken: z.string(),
})

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>

export const VerifyEmailRequestSchema = z.object({
  token: requiredString('Token is required'),
})

export type VerifyEmailRequest = z.infer<typeof VerifyEmailRequestSchema>

export const ForgotPasswordRequestSchema = z.object({
  email: requiredString('Email is required').email('Invalid email'),
})

export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordRequestSchema>

export const ResetPasswordRequestSchema = z.object({
  token: requiredString('Token is required'),
  newPassword: requiredString('New password is required'),
})

export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>
