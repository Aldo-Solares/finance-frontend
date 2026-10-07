// @/modules/auth/actions/auth.actions.ts

'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { AUTH_TOKEN_COOKIE } from '@/core/constants/auth.constants'
import {
  actionError,
  type ActionState,
  withActionState,
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
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos de inicio de sesión no son válidos',
    )
  }

  const result = await withActionState(async () => {
    const response = await login(parsed.data)

    const cookieStore = await cookies()

    cookieStore.set(AUTH_TOKEN_COOKIE, response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })

    return response
  }, 'No fue posible iniciar sesión')

  if (!result.success) {
    return result
  }

  redirect('/main')
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
    lastName: formData.get('lastName'),
    secondLastName: formData.get('secondLastName'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ?? 'Los datos de registro no son válidos',
    )
  }

  return withActionState(
    () => register(parsed.data),
    'No fue posible registrar al usuario',
  )
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
      parsed.error.issues[0]?.message ??
        'El token de verificación no es válido',
    )
  }

  return withActionState(async () => {
    await verifyEmail(parsed.data)

    return null
  }, 'No fue posible verificar el correo electrónico')
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
    return actionError(
      parsed.error.issues[0]?.message ?? 'El correo electrónico no es válido',
    )
  }

  return withActionState(async () => {
    await resendVerification(parsed.data)

    return null
  }, 'No fue posible enviar el correo de verificación')
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
    return actionError(
      parsed.error.issues[0]?.message ?? 'El correo electrónico no es válido',
    )
  }

  return withActionState(async () => {
    await forgotPassword(parsed.data)

    return null
  }, 'No fue posible solicitar la recuperación de contraseña')
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
      parsed.error.issues[0]?.message ??
        'Los datos para restablecer la contraseña no son válidos',
    )
  }

  return withActionState(async () => {
    await resetPassword(parsed.data)

    return null
  }, 'No fue posible restablecer la contraseña')
}

// ===================
// LOGOUT
// ===================

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies()

  cookieStore.delete(AUTH_TOKEN_COOKIE)

  redirect('/auth/login')
}
