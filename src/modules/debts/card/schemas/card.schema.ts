// @/modules/debts/schemas/card.schema.ts

import { z } from 'zod'

import { requiredString } from '@/core/utils/zod-helpers'

// ===================
// CARD RESPONSE
// ===================

export const CardSchema = z.object({
  cardId: z.number().int(),
  cardCode: z.string(),
  active: z.boolean(),
  productId: z.number().int(),
  bank: z.string(),
  cardName: z.string(),
  userId: z.number().int(),
  userName: z.string(),
})

// ===================
// CREATE CARD
// ===================

export const CreateCardRequestSchema = z.object({
  cardCode: requiredString('El código de la tarjeta es obligatorio').max(
    50,
    'El código de la tarjeta no puede superar los 50 caracteres',
  ),
  productId: z.number().int(),
  active: z.boolean().nullable().optional(),
})

// ===================
// UPDATE CARD
// ===================

export const UpdateCardRequestSchema = z.object({
  cardCode: requiredString('El código de la tarjeta es obligatorio').max(
    50,
    'El código de la tarjeta no puede superar los 50 caracteres',
  ),
  productId: z.number().int(),
  active: z.boolean(),
})

// ===================
// TYPES
// ===================

export type Card = z.infer<typeof CardSchema>

export type CreateCardRequest = z.infer<typeof CreateCardRequestSchema>

export type UpdateCardRequest = z.infer<typeof UpdateCardRequestSchema>
