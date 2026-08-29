// @/modules/user/services/user-settings.service.ts

import { fetchServer } from '@/core/api/api-server'

import { createApiResponseSchema } from '@/core/schemas/api-response.schema'

import {
  UserSettingsSchema,
  type UpdateUserSettingsRequest,
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
// UPDATE CURRENT USER SETTINGS
// ===================

export async function updateCurrentUserSettings(
  request: UpdateUserSettingsRequest,
): Promise<UserSettings> {
  const response = await fetchServer('/user-settings/me', {
    method: 'PATCH',
    body: JSON.stringify(request),
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(UserSettingsSchema).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ??
        'No fue posible actualizar la configuración del usuario',
    )
  }

  if (result.data === null) {
    throw new Error(
      'La respuesta de actualización de configuración no contiene datos',
    )
  }

  return result.data
}
