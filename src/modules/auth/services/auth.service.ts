// @/modules/auth/services/auth.service.ts

import { z } from 'zod'

import { parseApiResponse } from '@/core/api/api-response'
import { fetchPublic } from '@/core/api/api-public'

import {
  type ForgotPasswordRequest,
  type LoginRequest,
  type LoginResponse,
  LoginResponseSchema,
  type RegisterRequest,
  type RegisterResponse,
  RegisterResponseSchema,
  type ResendVerificationRequest,
  type ResetPasswordRequest,
  type VerifyEmailRequest,
} from '@/modules/auth/schemas/auth.schema'

const JSON_HEADERS = {
  'Content-Type': 'application/json',
}

// ===================
// LOGIN
// ===================

export async function login(request: LoginRequest): Promise<LoginResponse> {
  const response = await fetchPublic('/auth/login', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(request),
  })

  return parseApiResponse(
    response,
    LoginResponseSchema,
    'Los datos de inicio de sesión no están disponibles',
  )
}

// ===================
// REGISTER
// ===================

export async function register(
  request: RegisterRequest,
): Promise<RegisterResponse> {
  const response = await fetchPublic('/auth/register', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(request),
  })

  return parseApiResponse(
    response,
    RegisterResponseSchema,
    'Los datos del registro no están disponibles',
  )
}

// ===================
// VERIFY EMAIL
// ===================

export async function verifyEmail(request: VerifyEmailRequest): Promise<void> {
  const response = await fetchPublic('/auth/verify-email', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(request),
  })

  await parseApiResponse(
    response,
    z.null(),
    'No fue posible verificar el correo electrónico',
  )
}

// ===================
// RESEND VERIFICATION
// ===================

export async function resendVerification(
  request: ResendVerificationRequest,
): Promise<void> {
  const response = await fetchPublic('/auth/resend-verification', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(request),
  })

  await parseApiResponse(
    response,
    z.null(),
    'No fue posible enviar nuevamente el correo de verificación',
  )
}

// ===================
// FORGOT PASSWORD
// ===================

export async function forgotPassword(
  request: ForgotPasswordRequest,
): Promise<void> {
  const response = await fetchPublic('/auth/forgot-password', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(request),
  })

  await parseApiResponse(
    response,
    z.null(),
    'No fue posible solicitar la recuperación de contraseña',
  )
}

// ===================
// RESET PASSWORD
// ===================

export async function resetPassword(
  request: ResetPasswordRequest,
): Promise<void> {
  const response = await fetchPublic('/auth/reset-password', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(request),
  })

  await parseApiResponse(
    response,
    z.null(),
    'No fue posible restablecer la contraseña',
  )
}
