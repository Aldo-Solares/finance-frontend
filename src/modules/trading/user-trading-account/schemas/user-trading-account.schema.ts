// @/modules/trading/user-trading-account/schemas/user-trading-account.schema.ts

import { z } from 'zod'

// ===================
// USER TRADING ACCOUNT
// ===================

export const UserTradingAccountSchema = z.object({
  userTradingAccountId: z.number(),
  tradingAccountId: z.number(),
  institution: z.string(),
  name: z.string(),
  accountType: z.string(),
  currency: z.string(),
  alias: z.string().nullable(),
  accountNumber: z.string().nullable(),
  active: z.boolean(),
})

export type UserTradingAccount = z.infer<typeof UserTradingAccountSchema>

// ===================
// CREATE
// ===================

export const CreateUserTradingAccountSchema = z.object({
  tradingAccountId: z.number(),
  alias: z.string().nullable(),
  accountNumber: z.string().nullable(),
  active: z.boolean(),
})

export type CreateUserTradingAccount = z.infer<
  typeof CreateUserTradingAccountSchema
>

// ===================
// UPDATE
// ===================

export const UpdateUserTradingAccountSchema = z.object({
  tradingAccountId: z.number(),
  alias: z.string().nullable(),
  accountNumber: z.string().nullable(),
  active: z.boolean(),
})

export type UpdateUserTradingAccount = z.infer<
  typeof UpdateUserTradingAccountSchema
>
