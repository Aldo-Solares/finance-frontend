// @/modules/debts/statement-entry/actions/statement-entry.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  type ActionState,
  withActionState,
} from '@/core/utils/action-state'
import {
  CreateStatementEntryRequestSchema,
  UpdateStatementEntryRequestSchema,
  type StatementEntry,
} from '@/modules/debts/statement-entry/schemas/statement-entry.schema'
import {
  createStatementEntry,
  deleteStatementEntry,
  paySelectedStatementEntries,
  updateStatementEntry,
} from '@/modules/debts/statement-entry/services/statement-entry.service'
import {
  normalizeNullableNumber,
  normalizeNullableString,
  normalizeRequiredNumber,
} from '@/core/utils/form-data'

// ===================
// CREATE
// ===================

export async function createStatementEntryAction(
  _previousState: ActionState<StatementEntry>,
  formData: FormData,
): Promise<ActionState<StatementEntry>> {
  const parsed = CreateStatementEntryRequestSchema.safeParse({
    statementId: normalizeRequiredNumber(formData.get('statementId')),
    conceptId: normalizeRequiredNumber(formData.get('conceptId')),
    debtor: formData.get('debtor'),
    specification: normalizeNullableString(formData.get('specification')),
    notes: normalizeNullableString(formData.get('notes')),
    entryType: formData.get('entryType'),
    date: normalizeNullableString(formData.get('date')),
    amount: normalizeRequiredNumber(formData.get('amount')),
    paid: formData.get('paid') === 'true',
    msiCurrent: normalizeNullableNumber(formData.get('msiCurrent')),
    msiTotal: normalizeNullableNumber(formData.get('msiTotal')),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos del movimiento no son válidos',
    )
  }

  return withActionState(async () => {
    const entry = await createStatementEntry(parsed.data)

    revalidatePath('/debts/statement')

    return entry
  }, 'No fue posible crear el movimiento')
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
    statementId: normalizeRequiredNumber(formData.get('statementId')),
    conceptId: normalizeRequiredNumber(formData.get('conceptId')),
    debtor: formData.get('debtor'),
    specification: normalizeNullableString(formData.get('specification')),
    notes: normalizeNullableString(formData.get('notes')),
    entryType: formData.get('entryType'),
    date: normalizeNullableString(formData.get('date')),
    amount: normalizeRequiredNumber(formData.get('amount')),
    paid: formData.get('paid') === 'true',
    msiCurrent: normalizeNullableNumber(formData.get('msiCurrent')),
    msiTotal: normalizeNullableNumber(formData.get('msiTotal')),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos del movimiento no son válidos',
    )
  }

  return withActionState(async () => {
    const entry = await updateStatementEntry(entryId, parsed.data)

    revalidatePath('/debts/statement')

    return entry
  }, 'No fue posible actualizar el movimiento')
}

// @/modules/debts/statement/actions/statement.actions.ts

// ===================
// DELETE
// ===================

export async function deleteStatementEntryAction(entryId: number) {
  await deleteStatementEntry(entryId)

  revalidatePath('/debts/statement')
}

// ===================
// PAY SELECTED
// ===================

export async function paySelectedStatementEntriesAction(
  entryIds: number[],
): Promise<{ success: boolean; message: string }> {
  const uniqueEntryIds = [...new Set(entryIds)]

  if (uniqueEntryIds.length === 0) {
    return { success: false, message: 'Selecciona al menos un movimiento.' }
  }

  try {
    const updatedEntries = await paySelectedStatementEntries(uniqueEntryIds)
    revalidatePath('/debts/statement')

    return {
      success: true,
      message: `${updatedEntries.length} movimientos marcados como pagados.`,
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'No fue posible marcar los movimientos como pagados.',
    }
  }
}
