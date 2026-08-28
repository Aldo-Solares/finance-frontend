// @/modules/trading/trading-account/services/trading-account.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { createApiResponseSchema } from '@/core/schemas/api-response.schema'
import {
  CreateTradingAccountSchema,
  TradingAccountSchema,
  UpdateTradingAccountSchema,
  type CreateTradingAccount,
  type TradingAccount,
  type UpdateTradingAccount,
} from '@/modules/trading/trading-account/schemas/trading-account.schema'

// ===================
// SCHEMAS
// ===================

const TradingAccountResponseSchema =
  createApiResponseSchema(TradingAccountSchema)

const TradingAccountListResponseSchema = createApiResponseSchema(
  z.array(TradingAccountSchema),
)

// ===================
// GET ALL
// ===================

export const getTradingAccounts = async (): Promise<TradingAccount[]> => {
  const response = await fetchServer('/trading-accounts')

  const json: unknown = await response.json()

  const parsed = TradingAccountListResponseSchema.parse(json)

  if (!parsed.success || !parsed.data) {
    throw new Error(
      parsed.message ?? 'No fue posible obtener las cuentas de trading',
    )
  }

  return parsed.data
}

// ===================
// GET BY ID
// ===================

export const getTradingAccountById = async (
  tradingAccountId: number,
): Promise<TradingAccount> => {
  const response = await fetchServer(`/trading-accounts/${tradingAccountId}`)

  const json: unknown = await response.json()

  const parsed = TradingAccountResponseSchema.parse(json)

  if (!parsed.success || !parsed.data) {
    throw new Error(
      parsed.message ?? 'No fue posible obtener la cuenta de trading',
    )
  }

  return parsed.data
}

// ===================
// CREATE
// ===================

export const createTradingAccount = async (
  input: CreateTradingAccount,
): Promise<TradingAccount> => {
  const payload = CreateTradingAccountSchema.parse(input)

  const response = await fetchServer('/trading-accounts', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const json: unknown = await response.json()

  const parsed = TradingAccountResponseSchema.parse(json)

  if (!parsed.success || !parsed.data) {
    throw new Error(
      parsed.message ?? 'No fue posible crear la cuenta de trading',
    )
  }

  return parsed.data
}

// ===================
// UPDATE
// ===================

export const updateTradingAccount = async (
  tradingAccountId: number,
  input: UpdateTradingAccount,
): Promise<TradingAccount> => {
  const payload = UpdateTradingAccountSchema.parse(input)

  const response = await fetchServer(`/trading-accounts/${tradingAccountId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

  const json: unknown = await response.json()

  const parsed = TradingAccountResponseSchema.parse(json)

  if (!parsed.success || !parsed.data) {
    throw new Error(
      parsed.message ?? 'No fue posible actualizar la cuenta de trading',
    )
  }

  return parsed.data
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
