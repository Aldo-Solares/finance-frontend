// @/modules/debts/card/schemas/card.schema.ts

import { z } from 'zod'

import { requiredString } from '@/core/utils/zod-helpers'

// ===================
// CARD RESPONSE
// ===================

export const CardSchema = z.object({
  cardId: z.number().int(),
  bank: z.string(),
  cardName: z.string(),
  active: z.boolean(),
})

// ===================
// CREATE CARD
// ===================

export const CreateCardRequestSchema = z.object({
  bank: requiredString('El banco es obligatorio').max(
    100,
    'El banco no puede superar los 100 caracteres',
  ),
  cardName: requiredString('El nombre de la tarjeta es obligatorio').max(
    100,
    'El nombre de la tarjeta no puede superar los 100 caracteres',
  ),
  active: z.boolean(),
})

// ===================
// UPDATE CARD
// ===================

export const UpdateCardRequestSchema = z.object({
  bank: requiredString('El banco es obligatorio').max(
    100,
    'El banco no puede superar los 100 caracteres',
  ),
  cardName: requiredString('El nombre de la tarjeta es obligatorio').max(
    100,
    'El nombre de la tarjeta no puede superar los 100 caracteres',
  ),
  active: z.boolean(),
})

// ===================
// TYPES
// ===================

export type Card = z.infer<typeof CardSchema>

export type CreateCardRequest = z.infer<typeof CreateCardRequestSchema>

export type UpdateCardRequest = z.infer<typeof UpdateCardRequestSchema>
