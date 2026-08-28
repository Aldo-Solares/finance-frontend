// @/modules/trading/trade/services/trade.service.ts

import { fetchServer } from '@/core/api/api-server'
import { createApiResponseSchema } from '@/core/schemas/api-response.schema'
import {
  CreateTradeSchema,
  TradeSchema,
  UpdateTradeSchema,
  type CreateTrade,
  type Trade,
  type UpdateTrade,
} from '@/modules/trading/trade/schemas/trade.schema'

// ===================
// GET ALL
// ===================

export async function getTrades(): Promise<Trade[]> {
  const response = await fetchServer('/trades', {
    method: 'GET',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(TradeSchema.array()).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'No fue posible obtener las operaciones.')
  }

  return result.data ?? []
}

// ===================
// GET BY ID
// ===================

export async function getTradeById(tradeId: number): Promise<Trade> {
  const response = await fetchServer(`/trades/${tradeId}`, {
    method: 'GET',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(TradeSchema).parse(json)

  if (!result.success || result.data === null) {
    throw new Error(result.message ?? 'No fue posible obtener la operación.')
  }

  return result.data
}

// ===================
// GET BY USER TRADING ACCOUNT
// ===================

export async function getTradesByUserTradingAccountId(
  userTradingAccountId: number,
): Promise<Trade[]> {
  const response = await fetchServer(
    `/trades/account/${userTradingAccountId}`,
    {
      method: 'GET',
    },
  )

  const json: unknown = await response.json()

  const result = createApiResponseSchema(TradeSchema.array()).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible obtener las operaciones de la cuenta.',
    )
  }

  return result.data ?? []
}

// ===================
// CREATE
// ===================

export async function createTrade(input: CreateTrade): Promise<Trade> {
  const payload = CreateTradeSchema.parse(input)

  const response = await fetchServer('/trades', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(TradeSchema).parse(json)

  if (!result.success || result.data === null) {
    throw new Error(result.message ?? 'No fue posible crear la operación.')
  }

  return result.data
}

// ===================
// UPDATE
// ===================

export async function updateTrade(
  tradeId: number,
  input: UpdateTrade,
): Promise<Trade> {
  const payload = UpdateTradeSchema.parse(input)

  const response = await fetchServer(`/trades/${tradeId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(TradeSchema).parse(json)

  if (!result.success || result.data === null) {
    throw new Error(result.message ?? 'No fue posible actualizar la operación.')
  }

  return result.data
}

// ===================
// DELETE
// ===================

export async function deleteTrade(tradeId: number): Promise<void> {
  await fetchServer(`/trades/${tradeId}`, {
    method: 'DELETE',
  })
}
