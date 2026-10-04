// @/modules/trading/user-trading-account/schemas/user-trading-account.schema.ts

import { z } from 'zod'

import { requiredNumber } from '@/core/utils/zod-helpers'

// ===================
// USER TRADING ACCOUNT
// ===================

export const UserTradingAccountSchema = z.object({
  userTradingAccountId: z.number(),
  tradingAccountId: z.number(),
  institution: z.string(),
  name: z.string(),
  currencyId: z.number(),
  currencyCode: z.string(),
})

export type UserTradingAccount = z.infer<typeof UserTradingAccountSchema>

// ===================
// CREATE
// ===================

export const CreateUserTradingAccountSchema = z.object({
  tradingAccountId: requiredNumber(
    'Selecciona una cuenta de trading',
    'La cuenta seleccionada no es válida',
  )
    .int('La cuenta seleccionada no es válida')
    .positive('La cuenta seleccionada no es válida'),
})

export type CreateUserTradingAccount = z.infer<
  typeof CreateUserTradingAccountSchema
>

// ===================
// UPDATE
// ===================

export const UpdateUserTradingAccountSchema = z.object({
  tradingAccountId: requiredNumber(
    'Selecciona una cuenta de trading',
    'La cuenta seleccionada no es válida',
  )
    .int('La cuenta seleccionada no es válida')
    .positive('La cuenta seleccionada no es válida'),
})

export type UpdateUserTradingAccount = z.infer<
  typeof UpdateUserTradingAccountSchema
>
