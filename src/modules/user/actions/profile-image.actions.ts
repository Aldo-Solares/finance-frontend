// @/modules/user/actions/profile-image.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  type ActionState,
  withActionState,
} from '@/core/utils/action-state'
import {
  CreateProfileImageRequestSchema,
  UpdateProfileImageRequestSchema,
  type ProfileImage,
} from '@/modules/user/schemas/profile-image.schema'
import {
  createProfileImage,
  deleteProfileImage,
  updateProfileImage,
} from '@/modules/user/services/profile-image.service'

// ===================
// CREATE PROFILE IMAGE
// ===================

export async function createProfileImageAction(
  _previousState: ActionState<ProfileImage>,
  formData: FormData,
): Promise<ActionState<ProfileImage>> {
  const parsed = CreateProfileImageRequestSchema.safeParse({
    name: formData.get('name'),
    file: formData.get('file'),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ?? 'Los datos de la imagen no son válidos',
    )
  }

  return withActionState(async () => {
    const result = await createProfileImage(parsed.data.name, parsed.data.file)

    revalidatePath('/', 'layout')

    return result
  }, 'No fue posible crear la imagen de perfil')
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

  return withActionState(async () => {
    const result = await updateProfileImage(profileImageId, parsed.data)

    revalidatePath('/', 'layout')

    return result
  }, 'No fue posible actualizar la imagen de perfil')
}

// ===================
// DELETE PROFILE IMAGE
// ===================

export async function deleteProfileImageAction(profileImageId: number) {
  await deleteProfileImage(profileImageId)

  revalidatePath('/', 'layout')
}
