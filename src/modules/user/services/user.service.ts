// @/modules/user/services/user.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { parseApiResponse } from '@/core/api/api-response'
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

  return parseApiResponse(
    response,
    UserSchema,
    'No fue posible obtener el usuario actual',
  )
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

  return parseApiResponse(
    response,
    UpdateUserResponseSchema,
    'No fue posible actualizar el usuario',
  )
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

  await parseApiResponse(
    response,
    z.null(),
    'No fue posible actualizar la contraseña',
  )
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

  return parseApiResponse(
    response,
    UserSchema,
    'No fue posible actualizar la imagen de perfil',
  )
}

// ===================
// REMOVE CURRENT USER PROFILE IMAGE
// ===================

export async function removeCurrentUserProfileImage(): Promise<void> {
  const response = await fetchServer('/users/me/profile-image', {
    method: 'DELETE',
  })

  await parseApiResponse(
    response,
    z.null(),
    'No fue posible eliminar la imagen de perfil',
  )
}
