// @/modules/trading/trade-sale/services/trade-sale.service.ts

import { fetchServer } from '@/core/api/api-server'
import { createApiResponseSchema } from '@/core/schemas/api-response.schema'
import {
  CreateTradeSaleSchema,
  TradeSaleSchema,
  UpdateTradeSaleSchema,
  type CreateTradeSale,
  type TradeSale,
  type UpdateTradeSale,
} from '@/modules/trading/trade-sale/schemas/trade-sale.schema'

export async function createTradeSale(
  input: CreateTradeSale,
): Promise<TradeSale> {
  const payload = CreateTradeSaleSchema.parse(input)

  const response = await fetchServer('/trade-sales', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(TradeSaleSchema).parse(json)

  if (!result.success || result.data === null) {
    throw new Error(result.message ?? 'No fue posible registrar la venta.')
  }

  return result.data
}

export async function updateTradeSale(
  tradeSaleId: number,
  input: UpdateTradeSale,
): Promise<TradeSale> {
  const payload = UpdateTradeSaleSchema.parse(input)

  const response = await fetchServer(`/trade-sales/${tradeSaleId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(TradeSaleSchema).parse(json)

  if (!result.success || result.data === null) {
    throw new Error(result.message ?? 'No fue posible actualizar la venta.')
  }

  return result.data
}

export async function deleteTradeSale(tradeSaleId: number): Promise<void> {
  await fetchServer(`/trade-sales/${tradeSaleId}`, {
    method: 'DELETE',
  })
}
