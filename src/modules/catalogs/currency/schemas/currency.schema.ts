// @/modules/catalogs/currency/schemas/currency.schema.ts

import { z } from 'zod'

import { requiredString } from '@/core/utils/zod-helpers'

// ===================
// CURRENCY
// ===================

export const CurrencySchema = z.object({
  currencyId: z.number(),
  code: z.string(),
  symbol: z.string(),
})

export type Currency = z.infer<typeof CurrencySchema>

// ===================
// CREATE
// ===================

export const CreateCurrencySchema = z.object({
  code: requiredString('El código de la moneda es obligatorio'),
  symbol: requiredString('El símbolo de la moneda es obligatorio'),
})

export type CreateCurrency = z.infer<typeof CreateCurrencySchema>

// ===================
// UPDATE
// ===================

export const UpdateCurrencySchema = z.object({
  code: requiredString('El código de la moneda es obligatorio'),
  symbol: requiredString('El símbolo de la moneda es obligatorio'),
})

export type UpdateCurrency = z.infer<typeof UpdateCurrencySchema>
