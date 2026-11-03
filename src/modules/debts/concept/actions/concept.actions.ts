// @/modules/debts/concept/actions/concept.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  type ActionState,
  withActionState,
} from '@/core/utils/action-state'
import {
  CreateConceptRequestSchema,
  UpdateConceptRequestSchema,
  type Concept,
} from '@/modules/debts/concept/schemas/concept.schema'
import {
  createConcept,
  deleteConcept,
  updateConcept,
} from '@/modules/debts/concept/services/concept.service'

// ===================
// CREATE
// ===================

export async function createConceptAction(
  _previousState: ActionState<Concept>,
  formData: FormData,
): Promise<ActionState<Concept>> {
  const parsed = CreateConceptRequestSchema.safeParse({
    name: formData.get('name'),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos del categoría no son válidos',
    )
  }

  return withActionState(async () => {
    const concept = await createConcept(parsed.data)

    revalidatePath('/admin/concept')

    return concept
  }, 'No fue posible crear el categoría')
}

// ===================
// UPDATE
// ===================

export async function updateConceptAction(
  _previousState: ActionState<Concept>,
  formData: FormData,
): Promise<ActionState<Concept>> {
  const categoryId = Number(formData.get('categoryId'))

  if (!Number.isInteger(categoryId) || categoryId <= 0) {
    return actionError('El categoría no es válido')
  }

  const parsed = UpdateConceptRequestSchema.safeParse({
    name: formData.get('name'),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos del categoría no son válidos',
    )
  }

  return withActionState(async () => {
    const concept = await updateConcept(categoryId, parsed.data)

    revalidatePath('/admin/concept')
    revalidatePath('/debts/statement')

    return concept
  }, 'No fue posible actualizar el categoría')
}

// @/modules/admin/concept/actions/concept.actions.ts

// ===================
// DELETE
// ===================

export async function deleteConceptAction(categoryId: number) {
  await deleteConcept(categoryId)

  revalidatePath('/admin/concept')
}
