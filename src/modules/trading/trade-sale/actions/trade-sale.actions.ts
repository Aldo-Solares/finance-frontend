// @/modules/trading/trade-sale/actions/trade-sale.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  CreateTradeSaleSchema,
  UpdateTradeSaleSchema,
  type TradeSale,
} from '@/modules/trading/trade-sale/schemas/trade-sale.schema'
import {
  createTradeSale,
  deleteTradeSale,
  updateTradeSale,
} from '@/modules/trading/trade-sale/services/trade-sale.service'
import {
  actionError,
  actionSuccess,
  type ActionState,
} from '@/core/utils/action-state'

export async function createTradeSaleAction(
  input: unknown,
): Promise<ActionState<TradeSale>> {
  const parsed = CreateTradeSaleSchema.safeParse(input)

  if (!parsed.success) {
    return actionError<TradeSale>('Los datos de la venta no son válidos.')
  }

  try {
    const sale = await createTradeSale(parsed.data)

    revalidatePath('/trading/trade')

    return actionSuccess(sale, 'Venta registrada correctamente.')
  } catch (error) {
    return actionError<TradeSale>(
      error instanceof Error
        ? error.message
        : 'No fue posible registrar la venta.',
    )
  }
}

export async function updateTradeSaleAction(
  tradeSaleId: number,
  input: unknown,
): Promise<ActionState<TradeSale>> {
  const parsed = UpdateTradeSaleSchema.safeParse(input)

  if (!parsed.success) {
    return actionError<TradeSale>('Los datos de la venta no son válidos.')
  }

  try {
    const sale = await updateTradeSale(tradeSaleId, parsed.data)

    revalidatePath('/trading/trade')

    return actionSuccess(sale, 'Venta actualizada correctamente.')
  } catch (error) {
    return actionError<TradeSale>(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar la venta.',
    )
  }
}

export async function deleteTradeSaleAction(
  tradeSaleId: number,
): Promise<ActionState> {
  try {
    await deleteTradeSale(tradeSaleId)

    revalidatePath('/trading/trade')

    return actionSuccess(null, 'Venta eliminada correctamente.')
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible eliminar la venta.',
    )
  }
}
