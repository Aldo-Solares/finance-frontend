// @/modules/user/services/user.service.ts

import { createApiResponseSchema } from '@/core/schemas/api-response.schema'
import { fetchServer } from '@/core/api/api-server'

import { UserSchema, type User } from '@/modules/user/schemas/user.schema'

// ===================
// CURRENT USER
// ===================

export async function getCurrentUser(): Promise<User> {
  const response = await fetchServer('/users/me', {
    method: 'GET',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(UserSchema).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible obtener el usuario actual',
    )
  }

  if (result.data === null) {
    throw new Error('La respuesta del usuario actual no contiene datos')
  }

  return result.data
}
