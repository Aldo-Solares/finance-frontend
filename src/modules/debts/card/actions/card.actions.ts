// @/modules/debts/card/actions/card.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  type ActionState,
  withActionState,
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
import { normalizeRequiredString } from '@/core/utils/form-data'

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
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ?? 'Los datos no son válidos',
    )
  }

  return withActionState(async () => {
    const card = await createCard(parsed.data)

    revalidatePath('/admin/card')
    revalidatePath('/debts/card')

    return card
  }, 'No fue posible crear la tarjeta')
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
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ?? 'Los datos no son válidos',
    )
  }

  return withActionState(async () => {
    const card = await updateCard(cardId, parsed.data)

    revalidatePath('/admin/card')
    revalidatePath('/debts/card')

    return card
  }, 'No fue posible actualizar la tarjeta')
}

// ===================
// DELETE
// ===================

export async function deleteCardAction(cardId: number) {
  await deleteCard(cardId)

  revalidatePath('/admin/card')
  revalidatePath('/debts/card')
}
