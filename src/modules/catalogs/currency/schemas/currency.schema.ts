// @/modules/catalogs/currency/schemas/currency.schema.ts

import { z } from 'zod'

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
  code: z.string().min(1),
  symbol: z.string().min(1),
})

export type CreateCurrency = z.infer<typeof CreateCurrencySchema>

// ===================
// UPDATE
// ===================

export const UpdateCurrencySchema = z.object({
  code: z.string().min(1),
  symbol: z.string().min(1),
})

export type UpdateCurrency = z.infer<typeof UpdateCurrencySchema>
