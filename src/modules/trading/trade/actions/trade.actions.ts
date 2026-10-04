// @/modules/trading/trade/actions/trade.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  type ActionState,
  withActionState,
} from '@/core/utils/action-state'

import {
  CreateTradeSchema,
  UpdateTradeSchema,
  type Trade,
} from '@/modules/trading/trade/schemas/trade.schema'

import {
  createTrade,
  deleteTrade,
  updateTrade,
} from '@/modules/trading/trade/services/trade.service'

// ===================
// CREATE
// ===================

export async function createTradeAction(
  input: unknown,
): Promise<ActionState<Trade>> {
  const parsed = CreateTradeSchema.safeParse(input)

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos de la compra no son válidos.',
    )
  }

  return withActionState(async () => {
    const trade = await createTrade(parsed.data)

    revalidatePath('/trading/trade')

    return trade
  }, 'No fue posible registrar la compra.', 'Compra registrada correctamente.')
}

// ===================
// UPDATE
// ===================

export async function updateTradeAction(
  tradeId: number,
  input: unknown,
): Promise<ActionState<Trade>> {
  const parsed = UpdateTradeSchema.safeParse(input)

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos de la compra no son válidos.',
    )
  }

  return withActionState(async () => {
    const trade = await updateTrade(tradeId, parsed.data)

    revalidatePath('/trading/trade')

    return trade
  }, 'No fue posible actualizar la compra.', 'Compra actualizada correctamente.')
}

// ===================
// DELETE
// ===================

export async function deleteTradeAction(tradeId: number) {
  await deleteTrade(tradeId)

  revalidatePath('/trading/trade')
}
