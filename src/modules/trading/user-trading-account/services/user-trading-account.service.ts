// @/modules/trading/user-trading-account/services/user-trading-account.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { createApiResponseSchema } from '@/core/schemas/api-response.schema'
import {
  CreateUserTradingAccountSchema,
  UpdateUserTradingAccountSchema,
  UserTradingAccountSchema,
  type CreateUserTradingAccount,
  type UpdateUserTradingAccount,
  type UserTradingAccount,
} from '@/modules/trading/user-trading-account/schemas/user-trading-account.schema'

// ===================
// SCHEMAS
// ===================

const UserTradingAccountResponseSchema = createApiResponseSchema(
  UserTradingAccountSchema,
)

const UserTradingAccountListResponseSchema = createApiResponseSchema(
  z.array(UserTradingAccountSchema),
)

// ===================
// GET ALL
// ===================

export const getUserTradingAccounts = async (): Promise<
  UserTradingAccount[]
> => {
  const response = await fetchServer('/user-trading-accounts')

  const json: unknown = await response.json()

  const parsed = UserTradingAccountListResponseSchema.parse(json)

  if (!parsed.success || !parsed.data) {
    throw new Error(
      parsed.message ?? 'No fue posible obtener tus cuentas de trading',
    )
  }

  return parsed.data
}

// ===================
// GET BY ID
// ===================

export const getUserTradingAccountById = async (
  userTradingAccountId: number,
): Promise<UserTradingAccount> => {
  const response = await fetchServer(
    `/user-trading-accounts/${userTradingAccountId}`,
  )

  const json: unknown = await response.json()

  const parsed = UserTradingAccountResponseSchema.parse(json)

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

export const createUserTradingAccount = async (
  input: CreateUserTradingAccount,
): Promise<UserTradingAccount> => {
  const payload = CreateUserTradingAccountSchema.parse(input)

  const response = await fetchServer('/user-trading-accounts', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const json: unknown = await response.json()

  const parsed = UserTradingAccountResponseSchema.parse(json)

  if (!parsed.success || !parsed.data) {
    throw new Error(
      parsed.message ?? 'No fue posible agregar la cuenta de trading',
    )
  }

  return parsed.data
}

// ===================
// UPDATE
// ===================

export const updateUserTradingAccount = async (
  userTradingAccountId: number,
  input: UpdateUserTradingAccount,
): Promise<UserTradingAccount> => {
  const payload = UpdateUserTradingAccountSchema.parse(input)

  const response = await fetchServer(
    `/user-trading-accounts/${userTradingAccountId}`,
    {
      method: 'PUT',
      body: JSON.stringify(payload),
    },
  )

  const json: unknown = await response.json()

  const parsed = UserTradingAccountResponseSchema.parse(json)

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

export const deleteUserTradingAccount = async (
  userTradingAccountId: number,
): Promise<void> => {
  await fetchServer(`/user-trading-accounts/${userTradingAccountId}`, {
    method: 'DELETE',
  })
}
