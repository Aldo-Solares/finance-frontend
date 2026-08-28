// @/modules/trading/trading-account/schemas/trading-account.schema.ts

import { z } from 'zod'

// ===================
// TRADING ACCOUNT
// ===================

export const TradingAccountSchema = z.object({
  tradingAccountId: z.number(),
  userId: z.number(),
  name: z.string(),
  currency: z.string(),
})

export type TradingAccount = z.infer<typeof TradingAccountSchema>

// ===================
// CREATE
// ===================

export const CreateTradingAccountSchema = z.object({
  userId: z.number(),
  name: z.string().min(1),
  currency: z.string().min(1),
})

export type CreateTradingAccount = z.infer<typeof CreateTradingAccountSchema>

// ===================
// UPDATE
// ===================

export const UpdateTradingAccountSchema = z.object({
  name: z.string().min(1),
  currency: z.string().min(1),
})

export type UpdateTradingAccount = z.infer<typeof UpdateTradingAccountSchema>
