// @/modules/catalogs/currency/actions/currency.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  actionSuccess,
  type ActionState,
} from '@/core/utils/action-state'
import {
  CreateCurrencySchema,
  UpdateCurrencySchema,
  type Currency,
} from '@/modules/catalogs/currency/schemas/currency.schema'
import {
  createCurrency,
  deleteCurrency,
  updateCurrency,
} from '@/modules/catalogs/currency/services/currency.service'

// ===================
// CREATE
// ===================

export async function createCurrencyAction(
  input: unknown,
): Promise<ActionState<Currency>> {
  const parsed = CreateCurrencySchema.safeParse(input)

  if (!parsed.success) {
    return actionError<Currency>('Los datos de la moneda no son válidos.')
  }

  try {
    const currency = await createCurrency(parsed.data)

    revalidatePath('/admin/currency')

    return actionSuccess(currency, 'Moneda creada correctamente.')
  } catch (error) {
    return actionError<Currency>(
      error instanceof Error
        ? error.message
        : 'No fue posible crear la moneda.',
    )
  }
}

// ===================
// UPDATE
// ===================

export async function updateCurrencyAction(
  currencyId: number,
  input: unknown,
): Promise<ActionState<Currency>> {
  const parsed = UpdateCurrencySchema.safeParse(input)

  if (!parsed.success) {
    return actionError<Currency>('Los datos de la moneda no son válidos.')
  }

  try {
    const currency = await updateCurrency(currencyId, parsed.data)

    revalidatePath('/admin/currency')

    return actionSuccess(currency, 'Moneda actualizada correctamente.')
  } catch (error) {
    return actionError<Currency>(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar la moneda.',
    )
  }
}

// ===================
// DELETE
// ===================

export async function deleteCurrencyAction(
  currencyId: number,
): Promise<ActionState<null>> {
  try {
    await deleteCurrency(currencyId)

    revalidatePath('/admin/currency')

    return actionSuccess(null, 'Moneda eliminada correctamente.')
  } catch (error) {
    return actionError<null>(
      error instanceof Error
        ? error.message
        : 'No fue posible eliminar la moneda.',
    )
  }
}
