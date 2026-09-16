// @/modules/debts/user-card/actions/user-card.action.ts
'use server'

import { revalidatePath } from 'next/cache'

import { CreateUserCardRequestSchema } from '@/modules/debts/user-card/schemas/user-card.schema'

import {
  createUserCard,
  deleteUserCard,
} from '@/modules/debts/user-card/services/user-card.service'

// ===================
// CREATE
// ===================

export async function createUserCardAction(input: unknown) {
  const request = CreateUserCardRequestSchema.parse(input)

  const userCard = await createUserCard(request)

  revalidatePath('/debts/card')
  revalidatePath('/debts/statement')

  return userCard
}

// ===================
// DELETE
// ===================

export async function deleteUserCardAction(userCardId: number) {
  await deleteUserCard(userCardId)

  revalidatePath('/debts/card')
  revalidatePath('/debts/statement')
}
