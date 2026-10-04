// @/modules/debts/user-card/services/user-card.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { parseApiResponse } from '@/core/api/api-response'

import {
  UserCardSchema,
  type CreateUserCardRequest,
  type UserCard,
} from '@/modules/debts/user-card/schemas/user-card.schema'

// ===================
// FIND ALL
// ===================

export async function findAllUserCards(): Promise<UserCard[]> {
  const response = await fetchServer('/user-cards', {
    method: 'GET',
  })

  return parseApiResponse(
    response,
    z.array(UserCardSchema),
    'No fue posible obtener las tarjetas del usuario',
  )
}

// ===================
// FIND BY ID
// ===================

export async function findUserCardById(userCardId: number): Promise<UserCard> {
  const response = await fetchServer(`/user-cards/${userCardId}`, {
    method: 'GET',
  })

  return parseApiResponse(
    response,
    UserCardSchema,
    'No fue posible obtener la tarjeta del usuario',
  )
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

  return parseApiResponse(
    response,
    UserCardSchema,
    'No fue posible agregar la tarjeta',
  )
}

// ===================
// DELETE
// ===================

export async function deleteUserCard(userCardId: number): Promise<void> {
  const response = await fetchServer(`/user-cards/${userCardId}`, {
    method: 'DELETE',
  })

  await parseApiResponse(
    response,
    z.null(),
    'No fue posible eliminar la tarjeta del usuario',
  )
}
