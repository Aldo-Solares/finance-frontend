// @/modules/trading/trading-account/actions/trading-account.actions.ts

'use server'

import {
  ActionState,
  actionError,
  actionSuccess,
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

// ===================
// CREATE
// ===================

export const createTradingAccountAction = async (
  payload: CreateTradingAccount,
): Promise<ActionState<TradingAccount>> => {
  const result = CreateTradingAccountSchema.safeParse(payload)

  if (!result.success) {
    return actionError<TradingAccount>(
      'Los datos de la cuenta de trading no son válidos',
    )
  }

  try {
    const tradingAccount = await createTradingAccount(result.data)

    return actionSuccess(
      tradingAccount,
      'Cuenta de trading creada correctamente',
    )
  } catch (error) {
    return actionError<TradingAccount>(
      error instanceof Error
        ? error.message
        : 'No fue posible crear la cuenta de trading',
    )
  }
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
    return actionError<TradingAccount>(
      'Los datos de la cuenta de trading no son válidos',
    )
  }

  try {
    const tradingAccount = await updateTradingAccount(
      tradingAccountId,
      result.data,
    )

    return actionSuccess(
      tradingAccount,
      'Cuenta de trading actualizada correctamente',
    )
  } catch (error) {
    return actionError<TradingAccount>(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar la cuenta de trading',
    )
  }
}

// ===================
// DELETE
// ===================

export const deleteTradingAccountAction = async (
  tradingAccountId: number,
): Promise<ActionState<null>> => {
  try {
    await deleteTradingAccount(tradingAccountId)

    return actionSuccess(null, 'Cuenta de trading eliminada correctamente')
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible eliminar la cuenta de trading',
    )
  }
}
