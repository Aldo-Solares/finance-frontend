// @/modules/debts/card/services/card.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { parseApiResponse } from '@/core/api/api-response'

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

  return parseApiResponse(
    response,
    z.array(CardSchema),
    'No fue posible obtener las tarjetas',
  )
}

// ===================
// FIND BY ID
// ===================

export async function findCardById(cardId: number): Promise<Card> {
  const response = await fetchServer(`/cards/${cardId}`, {
    method: 'GET',
  })

  return parseApiResponse(
    response,
    CardSchema,
    'No fue posible obtener la tarjeta',
  )
}

// ===================
// CREATE
// ===================

export async function createCard(request: CreateCardRequest): Promise<Card> {
  const response = await fetchServer('/cards', {
    method: 'POST',
    body: JSON.stringify(request),
  })

  return parseApiResponse(
    response,
    CardSchema,
    'No fue posible crear la tarjeta',
  )
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

  return parseApiResponse(
    response,
    CardSchema,
    'No fue posible actualizar la tarjeta',
  )
}

// ===================
// DELETE
// ===================

export async function deleteCard(cardId: number): Promise<void> {
  const response = await fetchServer(`/cards/${cardId}`, {
    method: 'DELETE',
  })

  await parseApiResponse(
    response,
    z.null(),
    'No fue posible eliminar la tarjeta',
  )
}
