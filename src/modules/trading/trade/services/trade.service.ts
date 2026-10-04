// @/modules/trading/trade/services/trade.service.ts

import { fetchServer } from '@/core/api/api-server'
import { parseApiResponse } from '@/core/api/api-response'
import {
  TradeSchema,
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

  return parseApiResponse(
    response,
    TradeSchema.array(),
    'No fue posible obtener las operaciones.',
  )
}

// ===================
// GET BY ID
// ===================

export async function getTradeById(tradeId: number): Promise<Trade> {
  const response = await fetchServer(`/trades/${tradeId}`, {
    method: 'GET',
  })

  return parseApiResponse(
    response,
    TradeSchema,
    'No fue posible obtener la operación.',
  )
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

  return parseApiResponse(
    response,
    TradeSchema.array(),
    'No fue posible obtener las operaciones de la cuenta.',
  )
}

// ===================
// CREATE
// ===================

export async function createTrade(input: CreateTrade): Promise<Trade> {
  const response = await fetchServer('/trades', {
    method: 'POST',
    body: JSON.stringify(input),
  })

  return parseApiResponse(
    response,
    TradeSchema,
    'No fue posible crear la operación.',
  )
}

// ===================
// UPDATE
// ===================

export async function updateTrade(
  tradeId: number,
  input: UpdateTrade,
): Promise<Trade> {
  const response = await fetchServer(`/trades/${tradeId}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  })

  return parseApiResponse(
    response,
    TradeSchema,
    'No fue posible actualizar la operación.',
  )
}

// ===================
// DELETE
// ===================

export async function deleteTrade(tradeId: number): Promise<void> {
  await fetchServer(`/trades/${tradeId}`, {
    method: 'DELETE',
  })
}
