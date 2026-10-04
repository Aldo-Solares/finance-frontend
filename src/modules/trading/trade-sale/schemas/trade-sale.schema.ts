// @/modules/trading/trade-sale/schemas/trade-sale.schema.ts

import { z } from 'zod'

import { requiredNumber, requiredString } from '@/core/utils/zod-helpers'

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
  tradeId: requiredNumber('La operación es obligatoria', 'La operación no es válida')
    .int('La operación no es válida')
    .positive('La operación no es válida'),

  quantity: requiredNumber('La cantidad es obligatoria', 'La cantidad debe ser válida')
    .positive('La cantidad debe ser mayor que cero'),

  salePrice: requiredNumber(
    'El precio de venta es obligatorio',
    'El precio de venta debe ser válido',
  ).positive('El precio de venta debe ser mayor que cero'),

  commission: requiredNumber(
    'La comisión es obligatoria',
    'La comisión debe ser válida',
  ).min(0, 'La comisión no puede ser negativa'),

  commissionRate: requiredNumber(
    'La tasa de comisión es obligatoria',
    'La tasa de comisión debe ser válida',
  ).min(0, 'La tasa de comisión no puede ser negativa'),

  saleDate: requiredString('La fecha de venta es obligatoria'),
})

export type CreateTradeSale = z.infer<typeof CreateTradeSaleSchema>

export const UpdateTradeSaleSchema = z.object({
  quantity: requiredNumber('La cantidad es obligatoria', 'La cantidad debe ser válida')
    .positive('La cantidad debe ser mayor que cero'),

  salePrice: requiredNumber(
    'El precio de venta es obligatorio',
    'El precio de venta debe ser válido',
  ).positive('El precio de venta debe ser mayor que cero'),

  commission: requiredNumber(
    'La comisión es obligatoria',
    'La comisión debe ser válida',
  ).min(0, 'La comisión no puede ser negativa'),

  commissionRate: requiredNumber(
    'La tasa de comisión es obligatoria',
    'La tasa de comisión debe ser válida',
  ).min(0, 'La tasa de comisión no puede ser negativa'),

  saleDate: requiredString('La fecha de venta es obligatoria'),
})

export type UpdateTradeSale = z.infer<typeof UpdateTradeSaleSchema>
