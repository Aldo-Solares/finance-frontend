// @/modules/auth/services/auth.service.ts

import { z } from 'zod'

import { fetchPublic } from '@/core/api/api-public'
import { createApiResponseSchema } from '@/core/schemas/api-response.schema'
import { extractErrorMessage } from '@/core/utils/extract-error-message'

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

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response))
  }

  const json: unknown = await response.json()

  const result = createApiResponseSchema(LoginResponseSchema).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'Login failed')
  }

  if (result.data === null) {
    throw new Error('Login response data is missing')
  }

  return result.data
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

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response))
  }

  const json: unknown = await response.json()

  const result = createApiResponseSchema(RegisterResponseSchema).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'Registration failed')
  }

  if (result.data === null) {
    throw new Error('Registration response data is missing')
  }

  return result.data
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

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response))
  }

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.null()).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'Email verification failed')
  }
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

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response))
  }

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.null()).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'Verification email could not be sent')
  }
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

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response))
  }

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.null()).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'Password recovery request failed')
  }
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

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response))
  }

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.null()).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'Password reset failed')
  }
}
