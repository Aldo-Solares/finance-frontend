// @/modules/user/services/user-settings.service.ts

import { fetchServer } from '@/core/api/api-server'

import { createApiResponseSchema } from '@/core/schemas/api-response.schema'

import {
  UserSettingsSchema,
  type UpdateDarkModeRequest,
  type UpdateProfileImageBackgroundRequest,
  type UpdateStatementCutoffReminderRequest,
  type UserSettings,
} from '@/modules/user/schemas/user-settings.schema'

// ===================
// CURRENT USER SETTINGS
// ===================

export async function getCurrentUserSettings(): Promise<UserSettings> {
  const response = await fetchServer('/user-settings/me', {
    method: 'GET',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(UserSettingsSchema).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible obtener la configuración del usuario',
    )
  }

  if (result.data === null) {
    throw new Error(
      'La respuesta de configuración del usuario no contiene datos',
    )
  }

  return result.data
}

// ===================
// UPDATE STATEMENT CUTOFF REMINDER
// ===================

export async function updateStatementCutoffReminder(
  request: UpdateStatementCutoffReminderRequest,
): Promise<UserSettings> {
  const response = await fetchServer(
    '/user-settings/me/statement-cutoff-reminder',
    {
      method: 'PATCH',
      body: JSON.stringify(request),
    },
  )

  const json: unknown = await response.json()

  const result = createApiResponseSchema(UserSettingsSchema).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ??
        'No fue posible actualizar la preferencia de recordatorio',
    )
  }

  if (result.data === null) {
    throw new Error(
      'La respuesta de actualización del recordatorio no contiene datos',
    )
  }

  return result.data
}

// ===================
// UPDATE PROFILE IMAGE BACKGROUND
// ===================

export async function updateProfileImageBackground(
  request: UpdateProfileImageBackgroundRequest,
): Promise<UserSettings> {
  const response = await fetchServer(
    '/user-settings/me/profile-image-background',
    {
      method: 'PATCH',
      body: JSON.stringify(request),
    },
  )

  const json: unknown = await response.json()

  const result = createApiResponseSchema(UserSettingsSchema).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ??
        'No fue posible actualizar el fondo de la imagen de perfil',
    )
  }

  if (result.data === null) {
    throw new Error('La respuesta de actualización del fondo no contiene datos')
  }

  return result.data
}

// ===================
// UPDATE DARKMODE
// ===================
export async function updateDarkMode(
  request: UpdateDarkModeRequest,
): Promise<UserSettings> {
  const response = await fetchServer('/user-settings/me/dark-mode', {
    method: 'PATCH',
    body: JSON.stringify(request),
  })

  const json: unknown = await response.json()
  const result = createApiResponseSchema(UserSettingsSchema).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ??
        'No fue posible actualizar la preferencia de modo oscuro',
    )
  }

  if (result.data === null) {
    throw new Error(
      'La respuesta de actualización del modo oscuro no contiene datos',
    )
  }

  return result.data
}
