// @/modules/user/services/user-settings.service.ts

import { fetchServer } from '@/core/api/api-server'
import { parseApiResponse } from '@/core/api/api-response'

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

  return parseApiResponse(
    response,
    UserSettingsSchema,
    'No fue posible obtener la configuración del usuario',
  )
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

  return parseApiResponse(
    response,
    UserSettingsSchema,
    'No fue posible actualizar la preferencia de recordatorio',
  )
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

  return parseApiResponse(
    response,
    UserSettingsSchema,
    'No fue posible actualizar el fondo de la imagen de perfil',
  )
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

  return parseApiResponse(
    response,
    UserSettingsSchema,
    'No fue posible actualizar la preferencia de modo oscuro',
  )
}
