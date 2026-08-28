// @/modules/debts/user-card/services/user-card.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { createApiResponseSchema } from '@/core/schemas/api-response.schema'

import {
  UserCardSchema,
  type CreateUserCardRequest,
  type UpdateUserCardRequest,
  type UserCard,
} from '@/modules/debts/user-card/schemas/user-card.schema'

// ===================
// FIND ALL
// ===================

export async function findAllUserCards(): Promise<UserCard[]> {
  const response = await fetchServer('/user-cards', {
    method: 'GET',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.array(UserCardSchema)).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible obtener las tarjetas del usuario',
    )
  }

  if (result.data === null) {
    throw new Error('La respuesta de tarjetas del usuario no contiene datos')
  }

  return result.data
}

// ===================
// FIND ACTIVE
// ===================

export async function findAllActiveUserCards(): Promise<UserCard[]> {
  const response = await fetchServer('/user-cards/active', {
    method: 'GET',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.array(UserCardSchema)).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ??
        'No fue posible obtener las tarjetas activas del usuario',
    )
  }

  if (result.data === null) {
    throw new Error(
      'La respuesta de tarjetas activas del usuario no contiene datos',
    )
  }

  return result.data
}

// ===================
// FIND BY ID
// ===================

export async function findUserCardById(userCardId: number): Promise<UserCard> {
  const response = await fetchServer(`/user-cards/${userCardId}`, {
    method: 'GET',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(UserCardSchema).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible obtener la tarjeta del usuario',
    )
  }

  if (result.data === null) {
    throw new Error('La respuesta de la tarjeta del usuario no contiene datos')
  }

  return result.data
}

// ===================
// CREATE
// ===================

export async function createUserCard(
  request: CreateUserCardRequest,
): Promise<UserCard> {
  const response = await fetchServer('/user-cards', {
    method: 'POST',
    body: JSON.stringify(request),
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(UserCardSchema).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'No fue posible agregar la tarjeta')
  }

  if (result.data === null) {
    throw new Error('La respuesta de creación de la tarjeta no contiene datos')
  }

  return result.data
}

// ===================
// UPDATE
// ===================

export async function updateUserCard(
  userCardId: number,
  request: UpdateUserCardRequest,
): Promise<UserCard> {
  const response = await fetchServer(`/user-cards/${userCardId}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(UserCardSchema).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'No fue posible actualizar la tarjeta')
  }

  if (result.data === null) {
    throw new Error(
      'La respuesta de actualización de la tarjeta no contiene datos',
    )
  }

  return result.data
}

// ===================
// DELETE
// ===================

export async function deleteUserCard(userCardId: number): Promise<void> {
  const response = await fetchServer(`/user-cards/${userCardId}`, {
    method: 'DELETE',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.null()).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible eliminar la tarjeta del usuario',
    )
  }
}
