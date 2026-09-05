// @/modules/user/services/user.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { createApiResponseSchema } from '@/core/schemas/api-response.schema'
import {
  UpdateUserResponseSchema,
  UserSchema,
  type ChangePasswordRequest,
  type UpdateUserRequest,
  type UpdateUserResponse,
  type User,
} from '@/modules/user/schemas/user.schema'

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

// ===================
// UPDATE CURRENT USER
// ===================

export async function updateCurrentUser(
  request: UpdateUserRequest,
): Promise<UpdateUserResponse> {
  const response = await fetchServer('/users/me', {
    method: 'PUT',
    body: JSON.stringify(request),
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(UpdateUserResponseSchema).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'No fue posible actualizar el usuario')
  }

  if (result.data === null) {
    throw new Error('La respuesta de actualización no contiene datos')
  }

  return result.data
}

// ===================
// CHANGE PASSWORD
// ===================

export async function changePassword(
  request: ChangePasswordRequest,
): Promise<void> {
  const response = await fetchServer('/users/me/password', {
    method: 'PATCH',
    body: JSON.stringify(request),
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.null()).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'No fue posible actualizar la contraseña')
  }
}

// ===================
// UPDATE CURRENT USER PROFILE IMAGE
// ===================

export async function updateCurrentUserProfileImage(
  profileImageId: number,
): Promise<User> {
  const response = await fetchServer(
    `/users/me/profile-image/${profileImageId}`,
    {
      method: 'PATCH',
    },
  )

  const json: unknown = await response.json()

  const result = createApiResponseSchema(UserSchema).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible actualizar la imagen de perfil',
    )
  }

  if (result.data === null) {
    throw new Error(
      'La respuesta de actualización de imagen de perfil no contiene datos',
    )
  }

  return result.data
}

// ===================
// REMOVE CURRENT USER PROFILE IMAGE
// ===================

export async function removeCurrentUserProfileImage(): Promise<void> {
  const response = await fetchServer('/users/me/profile-image', {
    method: 'DELETE',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.null()).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible eliminar la imagen de perfil',
    )
  }
}
