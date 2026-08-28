// @/modules/trading/trade-sale/schemas/trade-sale.schema.ts

import { z } from 'zod'

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

export const CreateTradeSaleSchema = z.object({
  tradeId: z.number(),

  quantity: z.number().positive(),

  salePrice: z.number().positive(),

  commission: z.number().min(0),

  commissionRate: z.number().min(0),

  saleDate: z.string().min(1),
})

export type CreateTradeSale = z.infer<typeof CreateTradeSaleSchema>

export const UpdateTradeSaleSchema = z.object({
  quantity: z.number().positive(),

  salePrice: z.number().positive(),

  commission: z.number().min(0),

  commissionRate: z.number().min(0),

  saleDate: z.string().min(1),
})

export type UpdateTradeSale = z.infer<typeof UpdateTradeSaleSchema>
