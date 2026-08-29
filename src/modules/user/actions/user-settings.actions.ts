// @/modules/user/actions/user-settings.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  actionSuccess,
  type ActionState,
} from '@/core/utils/action-state'

import {
  UpdateUserSettingsRequestSchema,
  type UserSettings,
} from '@/modules/user/schemas/user-settings.schema'

import { updateCurrentUserSettings } from '@/modules/user/services/user-settings.service'

// ===================
// UPDATE CURRENT USER SETTINGS
// ===================

export async function updateCurrentUserSettingsAction(
  _previousState: ActionState<UserSettings>,
  formData: FormData,
): Promise<ActionState<UserSettings>> {
  const parsed = UpdateUserSettingsRequestSchema.safeParse({
    statementCutoffReminder: formData.get('statementCutoffReminder') === 'true',
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos de configuración no son válidos',
    )
  }

  try {
    const result = await updateCurrentUserSettings(parsed.data)

    revalidatePath('/settings')

    return actionSuccess(result)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar la configuración',
    )
  }
}
