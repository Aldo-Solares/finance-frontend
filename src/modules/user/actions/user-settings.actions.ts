// @/modules/user/actions/user-settings.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  actionSuccess,
  type ActionState,
} from '@/core/utils/action-state'

import {
  UpdateDarkModeRequestSchema,
  UpdateProfileImageBackgroundRequestSchema,
  UpdateStatementCutoffReminderRequestSchema,
  type UserSettings,
} from '@/modules/user/schemas/user-settings.schema'

import {
  updateDarkMode,
  updateProfileImageBackground,
  updateStatementCutoffReminder,
} from '@/modules/user/services/user-settings.service'

// ===================
// UPDATE STATEMENT CUTOFF REMINDER
// ===================

export async function updateStatementCutoffReminderAction(
  _previousState: ActionState<UserSettings>,
  formData: FormData,
): Promise<ActionState<UserSettings>> {
  const parsed = UpdateStatementCutoffReminderRequestSchema.safeParse({
    statementCutoffReminder: formData.get('statementCutoffReminder') === 'true',
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'La preferencia de recordatorio no es válida',
    )
  }

  try {
    const result = await updateStatementCutoffReminder(parsed.data)

    revalidatePath('/user/settings')

    return actionSuccess(result)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar la preferencia de recordatorio',
    )
  }
}

// ===================
// UPDATE PROFILE IMAGE BACKGROUND
// ===================

export async function updateProfileImageBackgroundAction(
  _previousState: ActionState<UserSettings>,
  formData: FormData,
): Promise<ActionState<UserSettings>> {
  const parsed = UpdateProfileImageBackgroundRequestSchema.safeParse({
    profileImageBackground: formData.get('profileImageBackground'),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'El fondo de la imagen de perfil no es válido',
    )
  }

  try {
    const result = await updateProfileImageBackground(parsed.data)

    revalidatePath('/user/settings')

    return actionSuccess(result)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar el fondo de la imagen de perfil',
    )
  }
}

// ===================
// UPDATE DARKMODE
// ===================
export async function updateDarkModeAction(
  _previousState: ActionState<UserSettings>,
  formData: FormData,
): Promise<ActionState<UserSettings>> {
  const parsed = UpdateDarkModeRequestSchema.safeParse({
    active: formData.get('active') === 'true',
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'La preferencia de modo oscuro no es válida',
    )
  }

  try {
    const result = await updateDarkMode(parsed.data)
    revalidatePath('/user/settings')
    return actionSuccess(result)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar la preferencia de modo oscuro',
    )
  }
}
