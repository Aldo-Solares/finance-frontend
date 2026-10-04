// @/modules/trading/trade/schemas/trade.schema.ts

import { z } from 'zod'

import { TRADE_STATUS_VALUES } from '@/modules/trading/trade/constants/trade.constants'
import { TradeSaleSchema } from '@/modules/trading/trade-sale/schemas/trade-sale.schema'
import { requiredNumber, requiredString } from '@/core/utils/zod-helpers'

// ===================
// STATUS
// ===================

export const TradeStatusSchema = z.enum(TRADE_STATUS_VALUES)

export type TradeStatus = z.infer<typeof TradeStatusSchema>

// ===================
// TRADE
// ===================

export const TradeSchema = z.object({
  tradeId: z.number(),

  userTradingAccountId: z.number(),

  tradingAccountId: z.number(),
  tradingAccountName: z.string(),

  instrumentId: z.number(),
  instrumentSymbol: z.string(),
  instrumentName: z.string(),

  currency: z.string(),

  quantity: z.number(),

  purchasePrice: z.number(),

  purchaseCommission: z.number(),
  purchaseCommissionRate: z.number(),

  expectedPurchaseCommission: z.number(),
  purchaseCommissionValid: z.boolean(),

  purchaseDate: z.string(),

  purchaseGrossAmount: z.number(),
  purchaseTotalCost: z.number(),

  soldQuantity: z.number(),
  remainingQuantity: z.number(),
  remainingCost: z.number(),

  totalSaleAmount: z.number(),
  totalSaleCommissions: z.number(),

  realizedProfit: z.number(),

  status: TradeStatusSchema,

  sales: z.array(TradeSaleSchema),
})

export type Trade = z.infer<typeof TradeSchema>

// ===================
// CREATE
// ===================

export const CreateTradeSchema = z.object({
  userTradingAccountId: requiredNumber(
    'Selecciona una cuenta de trading',
    'La cuenta de trading no es válida',
  )
    .int('La cuenta de trading no es válida')
    .positive('La cuenta de trading no es válida'),

  instrumentId: requiredNumber(
    'Selecciona un instrumento',
    'El instrumento no es válido',
  )
    .int('El instrumento no es válido')
    .positive('El instrumento no es válido'),

  quantity: requiredNumber('La cantidad es obligatoria', 'La cantidad debe ser válida')
    .positive('La cantidad debe ser mayor que cero'),

  purchasePrice: requiredNumber(
    'El precio de compra es obligatorio',
    'El precio de compra debe ser válido',
  ).positive('El precio de compra debe ser mayor que cero'),

  purchaseCommission: requiredNumber(
    'La comisión es obligatoria',
    'La comisión debe ser válida',
  ).min(0, 'La comisión no puede ser negativa'),
  purchaseCommissionRate: requiredNumber(
    'La tasa de comisión es obligatoria',
    'La tasa de comisión debe ser válida',
  ).min(0, 'La tasa de comisión no puede ser negativa'),

  purchaseDate: requiredString('La fecha de compra es obligatoria'),
})

export type CreateTrade = z.infer<typeof CreateTradeSchema>

// ===================
// UPDATE
// ===================

export const UpdateTradeSchema = z.object({
  userTradingAccountId: requiredNumber(
    'Selecciona una cuenta de trading',
    'La cuenta de trading no es válida',
  )
    .int('La cuenta de trading no es válida')
    .positive('La cuenta de trading no es válida'),

  instrumentId: requiredNumber(
    'Selecciona un instrumento',
    'El instrumento no es válido',
  )
    .int('El instrumento no es válido')
    .positive('El instrumento no es válido'),

  quantity: requiredNumber('La cantidad es obligatoria', 'La cantidad debe ser válida')
    .positive('La cantidad debe ser mayor que cero'),

  purchasePrice: requiredNumber(
    'El precio de compra es obligatorio',
    'El precio de compra debe ser válido',
  ).positive('El precio de compra debe ser mayor que cero'),

  purchaseCommission: requiredNumber(
    'La comisión es obligatoria',
    'La comisión debe ser válida',
  ).min(0, 'La comisión no puede ser negativa'),
  purchaseCommissionRate: requiredNumber(
    'La tasa de comisión es obligatoria',
    'La tasa de comisión debe ser válida',
  ).min(0, 'La tasa de comisión no puede ser negativa'),

  purchaseDate: requiredString('La fecha de compra es obligatoria'),
})

export type UpdateTrade = z.infer<typeof UpdateTradeSchema>
