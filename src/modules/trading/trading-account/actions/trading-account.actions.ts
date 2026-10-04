// @/modules/trading/trading-account/actions/trading-account.actions.ts

'use server'

import {
  ActionState,
  actionError,
  withActionState,
} from '@/core/utils/action-state'
import {
  CreateTradingAccount,
  CreateTradingAccountSchema,
  TradingAccount,
  UpdateTradingAccount,
  UpdateTradingAccountSchema,
} from '@/modules/trading/trading-account/schemas/trading-account.schema'
import {
  createTradingAccount,
  deleteTradingAccount,
  updateTradingAccount,
} from '@/modules/trading/trading-account/services/trading-account.service'
import { revalidatePath } from 'next/cache'

// ===================
// CREATE
// ===================

export const createTradingAccountAction = async (
  payload: CreateTradingAccount,
): Promise<ActionState<TradingAccount>> => {
  const result = CreateTradingAccountSchema.safeParse(payload)

  if (!result.success) {
    return actionError(
      result.error.issues[0]?.message ??
        'Los datos de la cuenta de trading no son válidos',
    )
  }

  return withActionState(async () => {
    const tradingAccount = await createTradingAccount(result.data)

    return tradingAccount
  }, 'No fue posible crear la cuenta de trading', 'Cuenta de trading creada correctamente')
}

// ===================
// UPDATE
// ===================

export const updateTradingAccountAction = async (
  tradingAccountId: number,
  payload: UpdateTradingAccount,
): Promise<ActionState<TradingAccount>> => {
  const result = UpdateTradingAccountSchema.safeParse(payload)

  if (!result.success) {
    return actionError(
      result.error.issues[0]?.message ??
        'Los datos de la cuenta de trading no son válidos',
    )
  }

  return withActionState(async () => {
    const tradingAccount = await updateTradingAccount(
      tradingAccountId,
      result.data,
    )

    return tradingAccount
  }, 'No fue posible actualizar la cuenta de trading', 'Cuenta de trading actualizada correctamente')
}

// ===================
// DELETE
// ===================

export const deleteTradingAccountAction = async (tradingAccountId: number) => {
  await deleteTradingAccount(tradingAccountId)

  revalidatePath('/trading/account')
}
