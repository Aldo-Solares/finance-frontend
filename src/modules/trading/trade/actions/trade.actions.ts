// @/modules/trading/trade/actions/trade.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  actionSuccess,
  type ActionState,
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

export async function createTradeAction(
  input: unknown,
): Promise<ActionState<Trade>> {
  const parsed = CreateTradeSchema.safeParse(input)

  if (!parsed.success) {
    return actionError<Trade>('Los datos de la compra no son válidos.')
  }

  try {
    const trade = await createTrade(parsed.data)

    revalidatePath('/trading/trade')

    return actionSuccess(trade, 'Compra registrada correctamente.')
  } catch (error) {
    return actionError<Trade>(
      error instanceof Error
        ? error.message
        : 'No fue posible registrar la compra.',
    )
  }
}

export async function updateTradeAction(
  tradeId: number,
  input: unknown,
): Promise<ActionState<Trade>> {
  const parsed = UpdateTradeSchema.safeParse(input)

  if (!parsed.success) {
    return actionError<Trade>('Los datos de la compra no son válidos.')
  }

  try {
    const trade = await updateTrade(tradeId, parsed.data)

    revalidatePath('/trading/trade')

    return actionSuccess(trade, 'Compra actualizada correctamente.')
  } catch (error) {
    return actionError<Trade>(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar la compra.',
    )
  }
}

export async function deleteTradeAction(tradeId: number): Promise<ActionState> {
  try {
    await deleteTrade(tradeId)

    revalidatePath('/trading/trade')

    return actionSuccess(null, 'Compra eliminada correctamente.')
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible eliminar la compra.',
    )
  }
}
