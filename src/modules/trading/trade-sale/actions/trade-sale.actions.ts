// @/modules/trading/trade-sale/actions/trade-sale.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  type ActionState,
  withActionState,
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
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos de la venta no son válidos.',
    )
  }

  return withActionState(async () => {
    const sale = await createTradeSale(parsed.data)

    revalidatePath('/trading/trade')

    return sale
  }, 'No fue posible registrar la venta.', 'Venta registrada correctamente.')
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
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos de la venta no son válidos.',
    )
  }

  return withActionState(async () => {
    const sale = await updateTradeSale(tradeSaleId, parsed.data)

    revalidatePath('/trading/trade')

    return sale
  }, 'No fue posible actualizar la venta.', 'Venta actualizada correctamente.')
}

// ===================
// DELETE
// ===================

export async function deleteTradeSaleAction(tradeSaleId: number) {
  await deleteTradeSale(tradeSaleId)

  revalidatePath('/trading/trade')
}
