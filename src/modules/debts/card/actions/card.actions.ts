// @/modules/debts/card/actions/card.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  actionSuccess,
  type ActionState,
} from '@/core/utils/action-state'
import {
  CreateCardRequestSchema,
  UpdateCardRequestSchema,
  type Card,
} from '@/modules/debts/card/schemas/card.schema'
import {
  createCard,
  deleteCard,
  updateCard,
} from '@/modules/debts/card/services/card.service'

// ===================
// CREATE
// ===================

export async function createCardAction(
  _previousState: ActionState<Card>,
  formData: FormData,
): Promise<ActionState<Card>> {
  const parsed = CreateCardRequestSchema.safeParse({
    bank: normalizeRequiredString(formData.get('bank')),
    cardName: normalizeRequiredString(formData.get('cardName')),
    active: formData.get('active') === 'true',
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ?? 'Los datos no son válidos',
    )
  }

  try {
    const card = await createCard(parsed.data)

    revalidatePath('/admin/card')
    revalidatePath('/debts/card')

    return actionSuccess(card)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible crear la tarjeta',
    )
  }
}

// ===================
// UPDATE
// ===================

export async function updateCardAction(
  _previousState: ActionState<Card>,
  formData: FormData,
): Promise<ActionState<Card>> {
  const cardId = Number(formData.get('cardId'))

  if (!Number.isInteger(cardId) || cardId <= 0) {
    return actionError('La tarjeta no es válida')
  }

  const parsed = UpdateCardRequestSchema.safeParse({
    bank: normalizeRequiredString(formData.get('bank')),
    cardName: normalizeRequiredString(formData.get('cardName')),
    active: formData.get('active') === 'true',
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ?? 'Los datos no son válidos',
    )
  }

  try {
    const card = await updateCard(cardId, parsed.data)

    revalidatePath('/admin/card')
    revalidatePath('/debts/card')

    return actionSuccess(card)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar la tarjeta',
    )
  }
}

// ===================
// DELETE
// ===================

export async function deleteCardAction(
  _previousState: ActionState<null>,
  formData: FormData,
): Promise<ActionState<null>> {
  const cardId = Number(formData.get('cardId'))

  if (!Number.isInteger(cardId) || cardId <= 0) {
    return actionError('La tarjeta no es válida')
  }

  try {
    await deleteCard(cardId)

    revalidatePath('/admin/card')
    revalidatePath('/debts/card')

    return actionSuccess(null)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible eliminar la tarjeta',
    )
  }
}

// ===================
// NORMALIZATION
// ===================

function normalizeRequiredString(value: FormDataEntryValue | null): string {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim()
}
