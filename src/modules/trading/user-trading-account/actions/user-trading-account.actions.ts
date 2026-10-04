// @/modules/trading/user-trading-account/actions/user-trading-account.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  type ActionState,
  withActionState,
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
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos de la cuenta de trading no son válidos.',
    )
  }

  return withActionState(async () => {
    const userTradingAccount = await createUserTradingAccount(parsed.data)

    revalidatePath('/trading/account')
    revalidatePath('/trading/trade')

    return userTradingAccount
  }, 'No fue posible agregar la cuenta de trading.', 'Cuenta de trading agregada correctamente.')
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
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos de la cuenta de trading no son válidos.',
    )
  }

  return withActionState(async () => {
    const userTradingAccount = await updateUserTradingAccount(
      userTradingAccountId,
      parsed.data,
    )

    revalidatePath('/trading/account')
    revalidatePath('/trading/trade')

    return userTradingAccount
  }, 'No fue posible actualizar la cuenta de trading.', 'Cuenta de trading actualizada correctamente.')
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
