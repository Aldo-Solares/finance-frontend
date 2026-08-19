// @/modules/auth/actions/auth.actions.ts
'use server'

import { cookies } from 'next/headers'
import { AUTH_TOKEN_COOKIE } from '@/core/constants/auth.constants'

import {
  actionError,
  actionSuccess,
  type ActionState,
} from '@/core/utils/action-state'

import {
  ForgotPasswordRequestSchema,
  LoginRequestSchema,
  RegisterRequestSchema,
  ResendVerificationRequestSchema,
  ResetPasswordRequestSchema,
  VerifyEmailRequestSchema,
  type LoginResponse,
  type RegisterResponse,
} from '@/modules/auth/schemas/auth.schema'

import {
  forgotPassword,
  login,
  register,
  resendVerification,
  resetPassword,
  verifyEmail,
} from '@/modules/auth/services/auth.service'
import { redirect } from 'next/navigation'

// ===================
// LOGIN
// ===================

export async function loginAction(
  _previousState: ActionState<LoginResponse>,
  formData: FormData,
): Promise<ActionState<LoginResponse>> {
  const parsed = LoginRequestSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? 'Invalid login data')
  }

  let result: LoginResponse

  try {
    result = await login(parsed.data)

    const cookieStore = await cookies()

    cookieStore.set(AUTH_TOKEN_COOKIE, result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
  } catch (error) {
    return actionError(error instanceof Error ? error.message : 'Login failed')
  }

  redirect('/dashboard')
}

// ===================
// REGISTER
// ===================

export async function registerAction(
  _previousState: ActionState<RegisterResponse>,
  formData: FormData,
): Promise<ActionState<RegisterResponse>> {
  const parsed = RegisterRequestSchema.safeParse({
    name: formData.get('name'),
    lastName: normalizeNullableString(formData.get('lastName')),
    secondLastName: normalizeNullableString(formData.get('secondLastName')),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ?? 'Invalid registration data',
    )
  }

  try {
    const result = await register(parsed.data)

    return actionSuccess(result)
  } catch (error) {
    return actionError(
      error instanceof Error ? error.message : 'Registration failed',
    )
  }
}

// ===================
// VERIFY EMAIL
// ===================

export async function verifyEmailAction(
  _previousState: ActionState<null>,
  formData: FormData,
): Promise<ActionState<null>> {
  const parsed = VerifyEmailRequestSchema.safeParse({
    token: formData.get('token'),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ?? 'Invalid verification token',
    )
  }

  try {
    await verifyEmail(parsed.data)

    return actionSuccess(null)
  } catch (error) {
    return actionError(
      error instanceof Error ? error.message : 'Email verification failed',
    )
  }
}

// ===================
// RESEND VERIFICATION
// ===================

export async function resendVerificationAction(
  _previousState: ActionState<null>,
  formData: FormData,
): Promise<ActionState<null>> {
  const parsed = ResendVerificationRequestSchema.safeParse({
    email: formData.get('email'),
  })

  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? 'Invalid email')
  }

  try {
    await resendVerification(parsed.data)

    return actionSuccess(null)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'Verification email could not be sent',
    )
  }
}

// ===================
// FORGOT PASSWORD
// ===================

export async function forgotPasswordAction(
  _previousState: ActionState<null>,
  formData: FormData,
): Promise<ActionState<null>> {
  const parsed = ForgotPasswordRequestSchema.safeParse({
    email: formData.get('email'),
  })

  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? 'Invalid email')
  }

  try {
    await forgotPassword(parsed.data)

    return actionSuccess(null)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'Password recovery request failed',
    )
  }
}

// ===================
// RESET PASSWORD
// ===================

export async function resetPasswordAction(
  _previousState: ActionState<null>,
  formData: FormData,
): Promise<ActionState<null>> {
  const parsed = ResetPasswordRequestSchema.safeParse({
    token: formData.get('token'),
    newPassword: formData.get('newPassword'),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ?? 'Invalid password reset data',
    )
  }

  try {
    await resetPassword(parsed.data)

    return actionSuccess(null)
  } catch (error) {
    return actionError(
      error instanceof Error ? error.message : 'Password reset failed',
    )
  }
}

// ===================
// LOGOUT
// ===================

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies()

  cookieStore.delete(AUTH_TOKEN_COOKIE)

  redirect('/auth/login')
}

// ===================
// NORMALIZATION
// ===================

function normalizeNullableString(value: FormDataEntryValue | null) {
  if (typeof value !== 'string' || value.trim() === '') {
    return null
  }

  return value
}
