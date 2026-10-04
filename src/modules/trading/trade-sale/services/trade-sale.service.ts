// @/modules/trading/trade-sale/services/trade-sale.service.ts

import { fetchServer } from '@/core/api/api-server'
import { parseApiResponse } from '@/core/api/api-response'
import {
  TradeSaleSchema,
  type CreateTradeSale,
  type TradeSale,
  type UpdateTradeSale,
} from '@/modules/trading/trade-sale/schemas/trade-sale.schema'

export async function createTradeSale(
  input: CreateTradeSale,
): Promise<TradeSale> {
  const response = await fetchServer('/trade-sales', {
    method: 'POST',
    body: JSON.stringify(input),
  })

  return parseApiResponse(
    response,
    TradeSaleSchema,
    'No fue posible registrar la venta.',
  )
}

export async function updateTradeSale(
  tradeSaleId: number,
  input: UpdateTradeSale,
): Promise<TradeSale> {
  const response = await fetchServer(`/trade-sales/${tradeSaleId}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  })

  return parseApiResponse(
    response,
    TradeSaleSchema,
    'No fue posible actualizar la venta.',
  )
}

export async function deleteTradeSale(tradeSaleId: number): Promise<void> {
  await fetchServer(`/trade-sales/${tradeSaleId}`, {
    method: 'DELETE',
  })
}
