// @/modules/debts/services/card.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { createApiResponseSchema } from '@/core/schemas/api-response.schema'

import {
  CardSchema,
  type Card,
  type CreateCardRequest,
  type UpdateCardRequest,
} from '@/modules/debts/card/schemas/card.schema'

// ===================
// FIND ALL
// ===================

export async function findAllCards(): Promise<Card[]> {
  const response = await fetchServer('/cards', {
    method: 'GET',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.array(CardSchema)).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'No fue posible obtener las tarjetas')
  }

  if (result.data === null) {
    throw new Error('La respuesta de tarjetas no contiene datos')
  }

  return result.data
}

// ===================
// FIND BY ID
// ===================

export async function findCardById(cardId: number): Promise<Card> {
  const response = await fetchServer(`/cards/${cardId}`, {
    method: 'GET',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(CardSchema).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'No fue posible obtener la tarjeta')
  }

  if (result.data === null) {
    throw new Error('La respuesta de la tarjeta no contiene datos')
  }

  return result.data
}

// ===================
// CREATE
// ===================

export async function createCard(request: CreateCardRequest): Promise<Card> {
  const response = await fetchServer('/cards', {
    method: 'POST',
    body: JSON.stringify(request),
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(CardSchema).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'No fue posible crear la tarjeta')
  }

  if (result.data === null) {
    throw new Error('La respuesta de creación no contiene datos')
  }

  return result.data
}

// ===================
// UPDATE
// ===================

export async function updateCard(
  cardId: number,
  request: UpdateCardRequest,
): Promise<Card> {
  const response = await fetchServer(`/cards/${cardId}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(CardSchema).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'No fue posible actualizar la tarjeta')
  }

  if (result.data === null) {
    throw new Error('La respuesta de actualización no contiene datos')
  }

  return result.data
}

// ===================
// DELETE
// ===================

export async function deleteCard(cardId: number): Promise<void> {
  const response = await fetchServer(`/cards/${cardId}`, {
    method: 'DELETE',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.null()).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'No fue posible eliminar la tarjeta')
  }
}
