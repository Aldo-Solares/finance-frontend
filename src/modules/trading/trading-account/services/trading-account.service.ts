// @/modules/trading/trading-account/services/trading-account.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { parseApiResponse } from '@/core/api/api-response'
import {
  TradingAccountSchema,
  type CreateTradingAccount,
  type TradingAccount,
  type UpdateTradingAccount,
} from '@/modules/trading/trading-account/schemas/trading-account.schema'

// ===================
// SCHEMAS
// ===================

const TradingAccountResponseSchema = TradingAccountSchema

const TradingAccountListResponseSchema = z.array(TradingAccountSchema)

// ===================
// GET ALL
// ===================

export const getTradingAccounts = async (): Promise<TradingAccount[]> => {
  const response = await fetchServer('/trading-accounts')

  return parseApiResponse(
    response,
    TradingAccountListResponseSchema,
    'No fue posible obtener las cuentas de trading',
  )
}

// ===================
// GET BY ID
// ===================

export const getTradingAccountById = async (
  tradingAccountId: number,
): Promise<TradingAccount> => {
  const response = await fetchServer(`/trading-accounts/${tradingAccountId}`)

  return parseApiResponse(
    response,
    TradingAccountResponseSchema,
    'No fue posible obtener la cuenta de trading',
  )
}

// ===================
// CREATE
// ===================

export const createTradingAccount = async (
  input: CreateTradingAccount,
): Promise<TradingAccount> => {
  const response = await fetchServer('/trading-accounts', {
    method: 'POST',
    body: JSON.stringify(input),
  })

  return parseApiResponse(
    response,
    TradingAccountResponseSchema,
    'No fue posible crear la cuenta de trading',
  )
}

// ===================
// UPDATE
// ===================

export const updateTradingAccount = async (
  tradingAccountId: number,
  input: UpdateTradingAccount,
): Promise<TradingAccount> => {
  const response = await fetchServer(`/trading-accounts/${tradingAccountId}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  })

  return parseApiResponse(
    response,
    TradingAccountResponseSchema,
    'No fue posible actualizar la cuenta de trading',
  )
}

// ===================
// DELETE
// ===================

export const deleteTradingAccount = async (
  tradingAccountId: number,
): Promise<void> => {
  await fetchServer(`/trading-accounts/${tradingAccountId}`, {
    method: 'DELETE',
  })
}
