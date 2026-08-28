// @/modules/debts/user-card/actions/user-card.action.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  CreateUserCardRequestSchema,
  UpdateUserCardRequestSchema,
} from '@/modules/debts/user-card/schemas/user-card.schema'

import {
  createUserCard,
  deleteUserCard,
  updateUserCard,
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
// UPDATE
// ===================

export async function updateUserCardAction(userCardId: number, input: unknown) {
  const request = UpdateUserCardRequestSchema.parse(input)

  const userCard = await updateUserCard(userCardId, request)

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
