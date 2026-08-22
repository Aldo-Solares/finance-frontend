// @/modules/debts/card-product/actions/card-product.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  actionSuccess,
  type ActionState,
} from '@/core/utils/action-state'
import {
  CreateCardProductRequestSchema,
  UpdateCardProductRequestSchema,
  type CardProduct,
} from '@/modules/debts/card-product/schemas/card-product.schema'
import {
  createCardProduct,
  deleteCardProduct,
  updateCardProduct,
} from '@/modules/debts/card-product/services/card-product.service'

// ===================
// CREATE
// ===================

export async function createCardProductAction(
  _previousState: ActionState<CardProduct>,
  formData: FormData,
): Promise<ActionState<CardProduct>> {
  const parsed = CreateCardProductRequestSchema.safeParse({
    bank: formData.get('bank'),
    cardName: formData.get('cardName'),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos del producto no son válidos',
    )
  }

  try {
    const product = await createCardProduct(parsed.data)

    revalidatePath('/admin/card-product')

    return actionSuccess(product)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible crear el producto de tarjeta',
    )
  }
}

// ===================
// UPDATE
// ===================

export async function updateCardProductAction(
  _previousState: ActionState<CardProduct>,
  formData: FormData,
): Promise<ActionState<CardProduct>> {
  const productId = Number(formData.get('productId'))

  if (!Number.isInteger(productId) || productId <= 0) {
    return actionError('El producto de tarjeta no es válido')
  }

  const parsed = UpdateCardProductRequestSchema.safeParse({
    bank: formData.get('bank'),
    cardName: formData.get('cardName'),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos del producto no son válidos',
    )
  }

  try {
    const product = await updateCardProduct(productId, parsed.data)

    revalidatePath('/admin/card-product')

    return actionSuccess(product)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar el producto de tarjeta',
    )
  }
}

// ===================
// DELETE
// ===================

export async function deleteCardProductAction(
  _previousState: ActionState<null>,
  formData: FormData,
): Promise<ActionState<null>> {
  const productId = Number(formData.get('productId'))

  if (!Number.isInteger(productId) || productId <= 0) {
    return actionError('El producto de tarjeta no es válido')
  }

  try {
    await deleteCardProduct(productId)

    revalidatePath('/admin/card-product')

    return actionSuccess(null)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible eliminar el producto de tarjeta',
    )
  }
}
