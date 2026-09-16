// @/modules/trading/trade-sale/actions/trade-sale.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  actionSuccess,
  type ActionState,
} from '@/core/utils/action-state'

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

// ===================
// CREATE
// ===================

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

// ===================
// UPDATE
// ===================

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

// ===================
// DELETE
// ===================

export async function deleteTradeSaleAction(tradeSaleId: number) {
  await deleteTradeSale(tradeSaleId)

  revalidatePath('/trading/trade')
}
