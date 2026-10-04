// @/modules/trading/user-trading-account/services/user-trading-account.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { parseApiResponse } from '@/core/api/api-response'
import {
  UserTradingAccountSchema,
  type CreateUserTradingAccount,
  type UpdateUserTradingAccount,
  type UserTradingAccount,
} from '@/modules/trading/user-trading-account/schemas/user-trading-account.schema'

// ===================
// SCHEMAS
// ===================

const UserTradingAccountResponseSchema = UserTradingAccountSchema

const UserTradingAccountListResponseSchema = z.array(UserTradingAccountSchema)

// ===================
// GET ALL
// ===================

export const getUserTradingAccounts = async (): Promise<
  UserTradingAccount[]
> => {
  const response = await fetchServer('/user-trading-accounts')

  return parseApiResponse(
    response,
    UserTradingAccountListResponseSchema,
    'No fue posible obtener tus cuentas de trading',
  )
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

  return parseApiResponse(
    response,
    UserTradingAccountResponseSchema,
    'No fue posible obtener la cuenta de trading',
  )
}

// ===================
// CREATE
// ===================

export const createUserTradingAccount = async (
  input: CreateUserTradingAccount,
): Promise<UserTradingAccount> => {
  const response = await fetchServer('/user-trading-accounts', {
    method: 'POST',
    body: JSON.stringify(input),
  })

  return parseApiResponse(
    response,
    UserTradingAccountResponseSchema,
    'No fue posible agregar la cuenta de trading',
  )
}

// ===================
// UPDATE
// ===================

export const updateUserTradingAccount = async (
  userTradingAccountId: number,
  input: UpdateUserTradingAccount,
): Promise<UserTradingAccount> => {
  const response = await fetchServer(
    `/user-trading-accounts/${userTradingAccountId}`,
    {
      method: 'PUT',
      body: JSON.stringify(input),
    },
  )

  return parseApiResponse(
    response,
    UserTradingAccountResponseSchema,
    'No fue posible actualizar la cuenta de trading',
  )
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
