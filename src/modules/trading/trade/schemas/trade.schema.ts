// @/modules/trading/trade/schemas/trade.schema.ts

import { z } from 'zod'

import { TRADE_STATUS_VALUES } from '@/modules/trading/trade/constants/trade.constants'
import { TradeSaleSchema } from '@/modules/trading/trade-sale/schemas/trade-sale.schema'

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
  userTradingAccountId: z.number(),

  instrumentId: z.number(),

  quantity: z.number().positive(),

  purchasePrice: z.number().positive(),

  purchaseCommission: z.number().min(0),
  purchaseCommissionRate: z.number().min(0),

  purchaseDate: z.string().min(1),
})

export type CreateTrade = z.infer<typeof CreateTradeSchema>

// ===================
// UPDATE
// ===================

export const UpdateTradeSchema = CreateTradeSchema

export type UpdateTrade = z.infer<typeof UpdateTradeSchema>
