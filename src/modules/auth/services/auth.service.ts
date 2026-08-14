// @/modules/auth/services/auth.service.ts

import { z } from 'zod'

import { fetchPublic } from '@/core/api/api-public'
import { extractErrorMessage } from '@/core/utils/extract-error-message'
import { createApiResponseSchema } from '@/core/schemas/api-response.schema'

import {
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  LoginResponseSchema,
  RegisterRequest,
  RegisterResponse,
  RegisterResponseSchema,
  ResetPasswordRequest,
  VerifyEmailRequest,
} from '@/modules/auth/schemas/auth.schema'

const JSON_HEADERS = {
  'Content-Type': 'application/json',
}

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

export async function forgotPassword(
  request: ForgotPasswordRequest,
): Promise<string> {
  const response = await fetchPublic('/auth/forgot-password', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response))
  }

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.string()).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'Password recovery request failed')
  }

  if (result.data === null) {
    throw new Error('Password recovery token is missing')
  }

  return result.data
}

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
