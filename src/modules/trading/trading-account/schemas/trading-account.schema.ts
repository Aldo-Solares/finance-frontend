// @/modules/trading/trading-account/schemas/trading-account.schema.ts

import { z } from 'zod'

import { requiredNumber, requiredString } from '@/core/utils/zod-helpers'

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
})

export type TradingAccount = z.infer<typeof TradingAccountSchema>

// ===================
// CREATE
// ===================

export const CreateTradingAccountSchema = z.object({
  institution: requiredString('La institución es obligatoria'),
  name: requiredString('El nombre de la cuenta es obligatorio'),
  currencyId: requiredNumber('Selecciona una moneda', 'La moneda no es válida')
    .int('La moneda no es válida')
    .positive('La moneda no es válida'),
})

export type CreateTradingAccount = z.infer<typeof CreateTradingAccountSchema>

// ===================
// UPDATE
// ===================

export const UpdateTradingAccountSchema = z.object({
  institution: requiredString('La institución es obligatoria'),
  name: requiredString('El nombre de la cuenta es obligatorio'),
  currencyId: requiredNumber('Selecciona una moneda', 'La moneda no es válida')
    .int('La moneda no es válida')
    .positive('La moneda no es válida'),
})

export type UpdateTradingAccount = z.infer<typeof UpdateTradingAccountSchema>
