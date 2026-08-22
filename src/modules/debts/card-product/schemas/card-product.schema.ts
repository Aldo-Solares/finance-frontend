// @/modules/debts/card-product/schemas/card-product.schema.ts

import { z } from 'zod'

import { requiredString } from '@/core/utils/zod-helpers'

export const CardProductSchema = z.object({
  productId: z.number().int(),
  bank: z.string(),
  cardName: z.string(),
})

export const CreateCardProductRequestSchema = z.object({
  bank: requiredString('El banco es obligatorio').max(
    100,
    'El banco no puede superar los 100 caracteres',
  ),

  cardName: requiredString('El nombre de la tarjeta es obligatorio').max(
    100,
    'El nombre de la tarjeta no puede superar los 100 caracteres',
  ),
})

export const UpdateCardProductRequestSchema = CreateCardProductRequestSchema

export type CardProduct = z.infer<typeof CardProductSchema>

export type CreateCardProductRequest = z.infer<
  typeof CreateCardProductRequestSchema
>

export type UpdateCardProductRequest = z.infer<
  typeof UpdateCardProductRequestSchema
>
