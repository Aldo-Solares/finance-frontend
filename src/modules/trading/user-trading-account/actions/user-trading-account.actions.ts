// @/modules/trading/user-trading-account/actions/user-trading-account.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  actionSuccess,
  type ActionState,
} from '@/core/utils/action-state'
import {
  CreateUserTradingAccountSchema,
  UpdateUserTradingAccountSchema,
  type UserTradingAccount,
} from '@/modules/trading/user-trading-account/schemas/user-trading-account.schema'
import {
  createUserTradingAccount,
  deleteUserTradingAccount,
  updateUserTradingAccount,
} from '@/modules/trading/user-trading-account/services/user-trading-account.service'

// ===================
// CREATE
// ===================

export async function createUserTradingAccountAction(
  input: unknown,
): Promise<ActionState<UserTradingAccount>> {
  const parsed = CreateUserTradingAccountSchema.safeParse(input)

  if (!parsed.success) {
    return actionError<UserTradingAccount>(
      'Los datos de la cuenta de trading no son válidos.',
    )
  }

  try {
    const userTradingAccount = await createUserTradingAccount(parsed.data)

    revalidatePath('/trading/account')
    revalidatePath('/trading/trade')

    return actionSuccess(
      userTradingAccount,
      'Cuenta de trading agregada correctamente.',
    )
  } catch (error) {
    return actionError<UserTradingAccount>(
      error instanceof Error
        ? error.message
        : 'No fue posible agregar la cuenta de trading.',
    )
  }
}

// ===================
// UPDATE
// ===================

export async function updateUserTradingAccountAction(
  userTradingAccountId: number,
  input: unknown,
): Promise<ActionState<UserTradingAccount>> {
  const parsed = UpdateUserTradingAccountSchema.safeParse(input)

  if (!parsed.success) {
    return actionError<UserTradingAccount>(
      'Los datos de la cuenta de trading no son válidos.',
    )
  }

  try {
    const userTradingAccount = await updateUserTradingAccount(
      userTradingAccountId,
      parsed.data,
    )

    revalidatePath('/trading/account')
    revalidatePath('/trading/trade')

    return actionSuccess(
      userTradingAccount,
      'Cuenta de trading actualizada correctamente.',
    )
  } catch (error) {
    return actionError<UserTradingAccount>(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar la cuenta de trading.',
    )
  }
}

// @/modules/trading/account/actions/user-trading-account.actions.ts

// ===================
// DELETE
// ===================

export async function deleteUserTradingAccountAction(
  userTradingAccountId: number,
) {
  await deleteUserTradingAccount(userTradingAccountId)

  revalidatePath('/trading/account')
  revalidatePath('/trading/trade')
}
