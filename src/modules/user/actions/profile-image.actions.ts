// @/modules/user/actions/profile-image.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  PROFILE_IMAGE_ALLOWED_TYPES,
  PROFILE_IMAGE_MAX_SIZE,
} from '@/modules/user/constants/profile-image.constants'
import {
  actionError,
  actionSuccess,
  type ActionState,
} from '@/core/utils/action-state'
import {
  UpdateProfileImageRequestSchema,
  UpdateProfileImageStatusRequestSchema,
  type ProfileImage,
} from '@/modules/user/schemas/profile-image.schema'
import {
  createProfileImage,
  deleteProfileImage,
  updateProfileImage,
  updateProfileImageStatus,
} from '@/modules/user/services/profile-image.service'

// ===================
// CREATE PROFILE IMAGE
// ===================

export async function createProfileImageAction(
  _previousState: ActionState<ProfileImage>,
  formData: FormData,
): Promise<ActionState<ProfileImage>> {
  const name = formData.get('name')
  const file = formData.get('file')

  if (typeof name !== 'string' || name.trim() === '') {
    return actionError('El nombre de la imagen es obligatorio')
  }

  if (!(file instanceof File) || file.size === 0) {
    return actionError('La imagen es obligatoria')
  }

  if (
    !PROFILE_IMAGE_ALLOWED_TYPES.some(
      (allowedType) => allowedType === file.type,
    )
  ) {
    return actionError('El formato debe ser PNG, JPG, JPEG o WebP')
  }

  if (file.size > PROFILE_IMAGE_MAX_SIZE) {
    return actionError('La imagen no puede superar los 5 MB')
  }

  try {
    const result = await createProfileImage(name.trim(), file)

    revalidatePath('/', 'layout')

    return actionSuccess(result)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible crear la imagen de perfil',
    )
  }
}

// ===================
// UPDATE PROFILE IMAGE
// ===================

export async function updateProfileImageAction(
  _previousState: ActionState<ProfileImage>,
  formData: FormData,
): Promise<ActionState<ProfileImage>> {
  const profileImageId = Number(formData.get('profileImageId'))
  const name = formData.get('name')

  if (!Number.isInteger(profileImageId) || profileImageId <= 0) {
    return actionError('La imagen de perfil no es válida')
  }

  const parsed = UpdateProfileImageRequestSchema.safeParse({
    name,
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'El nombre de la imagen de perfil no es válido',
    )
  }

  try {
    const result = await updateProfileImage(profileImageId, parsed.data)

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
// UPDATE PROFILE IMAGE STATUS
// ===================

export async function updateProfileImageStatusAction(
  _previousState: ActionState<ProfileImage>,
  formData: FormData,
): Promise<ActionState<ProfileImage>> {
  const profileImageId = Number(formData.get('profileImageId'))

  const parsed = UpdateProfileImageStatusRequestSchema.safeParse({
    active: formData.get('active') === 'true',
  })

  if (!Number.isInteger(profileImageId) || profileImageId <= 0) {
    return actionError('La imagen de perfil no es válida')
  }

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'El estado de la imagen de perfil no es válido',
    )
  }

  try {
    const result = await updateProfileImageStatus(profileImageId, parsed.data)

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
// DELETE PROFILE IMAGE
// ===================

export async function deleteProfileImageAction(
  _previousState: ActionState<null>,
  formData: FormData,
): Promise<ActionState<null>> {
  const profileImageId = Number(formData.get('profileImageId'))

  if (!Number.isInteger(profileImageId) || profileImageId <= 0) {
    return actionError('La imagen de perfil no es válida')
  }

  try {
    await deleteProfileImage(profileImageId)

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
