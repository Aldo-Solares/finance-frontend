// @/modules/debts/user-card/actions/user-card.action.ts
'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  type ActionState,
  withActionState,
} from '@/core/utils/action-state'
import { CreateUserCardRequestSchema } from '@/modules/debts/user-card/schemas/user-card.schema'

import {
  createUserCard,
  deleteUserCard,
} from '@/modules/debts/user-card/services/user-card.service'
import type { UserCard } from '@/modules/debts/user-card/schemas/user-card.schema'

// ===================
// CREATE
// ===================

export async function createUserCardAction(
  input: unknown,
): Promise<ActionState<UserCard>> {
  const parsed = CreateUserCardRequestSchema.safeParse(input)

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ?? 'Los datos de la tarjeta no son válidos',
    )
  }

  return withActionState(async () => {
    const userCard = await createUserCard(parsed.data)

    revalidatePath('/debts/card')
    revalidatePath('/debts/statement')

    return userCard
  }, 'No fue posible agregar la tarjeta')
}

// ===================
// DELETE
// ===================

export async function deleteUserCardAction(userCardId: number) {
  await deleteUserCard(userCardId)

  revalidatePath('/debts/card')
  revalidatePath('/debts/statement')
}
