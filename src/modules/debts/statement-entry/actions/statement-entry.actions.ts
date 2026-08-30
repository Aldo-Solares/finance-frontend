// @/modules/debts/statement-entry/actions/statement-entry.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  actionSuccess,
  type ActionState,
} from '@/core/utils/action-state'
import {
  CreateStatementEntryRequestSchema,
  UpdateStatementEntryRequestSchema,
  type StatementEntry,
} from '@/modules/debts/statement-entry/schemas/statement-entry.schema'
import {
  createStatementEntry,
  deleteStatementEntry,
  updateStatementEntry,
} from '@/modules/debts/statement-entry/services/statement-entry.service'

// ===================
// CREATE
// ===================

export async function createStatementEntryAction(
  _previousState: ActionState<StatementEntry>,
  formData: FormData,
): Promise<ActionState<StatementEntry>> {
  const parsed = CreateStatementEntryRequestSchema.safeParse({
    statementId: Number(formData.get('statementId')),
    conceptId: Number(formData.get('conceptId')),
    debtor: formData.get('debtor'),
    specification: nullableString(formData.get('specification')),
    notes: nullableString(formData.get('notes')),
    entryType: formData.get('entryType'),
    date: nullableString(formData.get('date')),
    amount: nullableNumber(formData.get('amount')),
    paid: formData.get('paid') === 'true',
    msiCurrent: nullableNumber(formData.get('msiCurrent')),
    msiTotal: nullableNumber(formData.get('msiTotal')),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos del movimiento no son válidos',
    )
  }

  try {
    const entry = await createStatementEntry(parsed.data)

    revalidatePath('/debts/statement')

    return actionSuccess(entry)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible crear el movimiento',
    )
  }
}

// ===================
// UPDATE
// ===================

export async function updateStatementEntryAction(
  _previousState: ActionState<StatementEntry>,
  formData: FormData,
): Promise<ActionState<StatementEntry>> {
  const entryId = Number(formData.get('entryId'))

  if (!Number.isInteger(entryId) || entryId <= 0) {
    return actionError('El movimiento no es válido')
  }

  const parsed = UpdateStatementEntryRequestSchema.safeParse({
    statementId: Number(formData.get('statementId')),
    conceptId: Number(formData.get('conceptId')),
    debtor: formData.get('debtor'),
    specification: nullableString(formData.get('specification')),
    notes: nullableString(formData.get('notes')),
    entryType: formData.get('entryType'),
    date: nullableString(formData.get('date')),
    amount: nullableNumber(formData.get('amount')),
    paid: formData.get('paid') === 'true',
    msiCurrent: nullableNumber(formData.get('msiCurrent')),
    msiTotal: nullableNumber(formData.get('msiTotal')),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos del movimiento no son válidos',
    )
  }

  try {
    const entry = await updateStatementEntry(entryId, parsed.data)

    revalidatePath('/debts/statement')

    return actionSuccess(entry)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar el movimiento',
    )
  }
}

// ===================
// DELETE
// ===================

export async function deleteStatementEntryAction(
  _previousState: ActionState<null>,
  formData: FormData,
): Promise<ActionState<null>> {
  const entryId = Number(formData.get('entryId'))

  if (!Number.isInteger(entryId) || entryId <= 0) {
    return actionError('El movimiento no es válido')
  }

  try {
    await deleteStatementEntry(entryId)

    revalidatePath('/debts/statement')

    return actionSuccess(null)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible eliminar el movimiento',
    )
  }
}

// ===================
// NORMALIZATION
// ===================

function nullableString(value: FormDataEntryValue | null): string | null {
  if (typeof value !== 'string' || value.trim() === '') {
    return null
  }

  return value.trim()
}

function nullableNumber(value: FormDataEntryValue | null): number | null {
  if (typeof value !== 'string' || value.trim() === '') {
    return null
  }

  const number = Number(value)

  if (!Number.isFinite(number)) {
    return null
  }

  return number
}
