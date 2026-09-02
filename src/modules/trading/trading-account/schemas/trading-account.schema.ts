// @/modules/trading/trading-account/schemas/trading-account.schema.ts

import { z } from 'zod'

// ===================
// TRADING ACCOUNT
// ===================

export const TradingAccountSchema = z.object({
  tradingAccountId: z.number(),
  institution: z.string(),
  name: z.string(),
  currencyId: z.number(),
  currencyCode: z.string(),
  currencySymbol: z.string(),
  active: z.boolean(),
})

export type TradingAccount = z.infer<typeof TradingAccountSchema>

// ===================
// CREATE
// ===================

export const CreateTradingAccountSchema = z.object({
  institution: z.string().min(1),
  name: z.string().min(1),
  currencyId: z.number(),
  active: z.boolean(),
})

export type CreateTradingAccount = z.infer<typeof CreateTradingAccountSchema>

// ===================
// UPDATE
// ===================

export const UpdateTradingAccountSchema = z.object({
  institution: z.string().min(1),
  name: z.string().min(1),
  currencyId: z.number(),
  active: z.boolean(),
})

export type UpdateTradingAccount = z.infer<typeof UpdateTradingAccountSchema>
