// @/modules/debts/concept/actions/concept.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  actionSuccess,
  type ActionState,
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
        'Los datos del concepto no son válidos',
    )
  }

  try {
    const concept = await createConcept(parsed.data)

    revalidatePath('/admin/concept')

    return actionSuccess(concept)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible crear el concepto',
    )
  }
}

// ===================
// UPDATE
// ===================

export async function updateConceptAction(
  _previousState: ActionState<Concept>,
  formData: FormData,
): Promise<ActionState<Concept>> {
  const conceptId = Number(formData.get('conceptId'))

  if (!Number.isInteger(conceptId) || conceptId <= 0) {
    return actionError('El concepto no es válido')
  }

  const parsed = UpdateConceptRequestSchema.safeParse({
    name: formData.get('name'),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos del concepto no son válidos',
    )
  }

  try {
    const concept = await updateConcept(conceptId, parsed.data)

    revalidatePath('/admin/concept')
    revalidatePath('/debts/statement')

    return actionSuccess(concept)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar el concepto',
    )
  }
}

// ===================
// DELETE
// ===================

export async function deleteConceptAction(
  _previousState: ActionState<null>,
  formData: FormData,
): Promise<ActionState<null>> {
  const conceptId = Number(formData.get('conceptId'))

  if (!Number.isInteger(conceptId) || conceptId <= 0) {
    return actionError('El concepto no es válido')
  }

  try {
    await deleteConcept(conceptId)

    revalidatePath('/admin/concept')

    return actionSuccess(null)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible eliminar el concepto',
    )
  }
}
