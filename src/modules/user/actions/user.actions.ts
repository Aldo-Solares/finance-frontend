// @/modules/user/actions/user.actions.ts

'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

import { AUTH_TOKEN_COOKIE } from '@/core/constants/auth.constants'
import {
  actionError,
  actionSuccess,
  type ActionState,
} from '@/core/utils/action-state'
import {
  ChangePasswordRequestSchema,
  UpdateUserRequestSchema,
  type UpdateUserResponse,
  type User,
} from '@/modules/user/schemas/user.schema'
import {
  changePassword,
  removeCurrentUserProfileImage,
  updateCurrentUser,
  updateCurrentUserProfileImage,
} from '@/modules/user/services/user.service'

// ===================
// UPDATE CURRENT USER
// ===================

export async function updateCurrentUserAction(
  _previousState: ActionState<UpdateUserResponse>,
  formData: FormData,
): Promise<ActionState<UpdateUserResponse>> {
  const parsed = UpdateUserRequestSchema.safeParse({
    name: formData.get('name'),
    lastName: normalizeNullableString(formData.get('lastName')),
    secondLastName: normalizeNullableString(formData.get('secondLastName')),
    email: formData.get('email'),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ?? 'Los datos del usuario no son válidos',
    )
  }

  try {
    const result = await updateCurrentUser(parsed.data)

    // ===================
    // UPDATE JWT
    // ===================

    const cookieStore = await cookies()

    cookieStore.set(AUTH_TOKEN_COOKIE, result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    // ===================
    // REVALIDATE
    // ===================

    revalidatePath('/', 'layout')

    return actionSuccess(result)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar el usuario',
    )
  }
}

// ===================
// UPDATE CURRENT USER PROFILE IMAGE
// ===================

export async function updateCurrentUserProfileImageAction(
  _previousState: ActionState<User>,
  formData: FormData,
): Promise<ActionState<User>> {
  const profileImageId = Number(formData.get('profileImageId'))

  if (!Number.isInteger(profileImageId) || profileImageId <= 0) {
    return actionError('La imagen de perfil no es válida')
  }

  try {
    const result = await updateCurrentUserProfileImage(profileImageId)

    revalidatePath('/', 'layout')

    return actionSuccess(result)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar la imagen de perfil',
    )
  }
}

// ===================
// REMOVE CURRENT USER PROFILE IMAGE
// ===================

export async function removeCurrentUserProfileImageAction(
  _previousState: ActionState<null>,
  _formData: FormData,
): Promise<ActionState<null>> {
  try {
    await removeCurrentUserProfileImage()

    revalidatePath('/', 'layout')

    return actionSuccess(null)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible eliminar la imagen de perfil',
    )
  }
}

// ===================
// CHANGE PASSWORD
// ===================

export async function changePasswordAction(
  _previousState: ActionState<null>,
  formData: FormData,
): Promise<ActionState<null>> {
  const parsed = ChangePasswordRequestSchema.safeParse({
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos de contraseña no son válidos',
    )
  }

  try {
    await changePassword(parsed.data)

    return actionSuccess(null)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar la contraseña',
    )
  }
}

// ===================
// NORMALIZATION
// ===================

function normalizeNullableString(
  value: FormDataEntryValue | null,
): string | null {
  if (typeof value !== 'string' || value.trim() === '') {
    return null
  }

  return value.trim()
}
