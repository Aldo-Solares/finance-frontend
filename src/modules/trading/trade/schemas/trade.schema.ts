// @/modules/trading/trade/schemas/trade.schema.ts

import { z } from 'zod'

export const TradeStatusSchema = z.enum(['OPEN', 'PARTIALLY_SOLD', 'CLOSED'])

export type TradeStatus = z.infer<typeof TradeStatusSchema>

export const TradeSaleSchema = z.object({
  tradeSaleId: z.number(),
  tradeId: z.number(),

  quantity: z.number(),
  salePrice: z.number(),

  commission: z.number(),
  commissionRate: z.number(),

  expectedCommission: z.number(),
  commissionValid: z.boolean(),

  saleDate: z.string(),

  grossAmount: z.number(),
  netAmount: z.number(),
  costBasis: z.number(),
  realizedProfit: z.number(),
})

export type TradeSale = z.infer<typeof TradeSaleSchema>

export const TradeSchema = z.object({
  tradeId: z.number(),

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

export const CreateTradeSchema = z.object({
  tradingAccountId: z.number(),
  instrumentId: z.number(),

  quantity: z.number().positive(),

  purchasePrice: z.number().positive(),

  purchaseCommission: z.number().min(0),

  purchaseCommissionRate: z.number().min(0),

  purchaseDate: z.string().min(1),
})

export type CreateTrade = z.infer<typeof CreateTradeSchema>

export const UpdateTradeSchema = CreateTradeSchema

export type UpdateTrade = z.infer<typeof UpdateTradeSchema>
