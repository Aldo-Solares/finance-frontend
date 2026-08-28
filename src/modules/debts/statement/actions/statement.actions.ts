// @/modules/debts/statement/actions/statement.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  actionSuccess,
  type ActionState,
} from '@/core/utils/action-state'
import {
  CreateStatementRequestSchema,
  UpdateStatementRequestSchema,
  type Statement,
  type StatementDateSuggestion,
} from '@/modules/debts/statement/schemas/statement.schema'
import {
  createStatement,
  deleteStatement,
  getStatementDateSuggestion,
  payAllStatements,
  updateStatement,
  updateStatementPaid,
} from '@/modules/debts/statement/services/statement.service'

// ===================
// CREATE
// ===================

export async function createStatementAction(
  _previousState: ActionState<Statement>,
  formData: FormData,
): Promise<ActionState<Statement>> {
  const parsed = CreateStatementRequestSchema.safeParse({
    userCardId: Number(formData.get('userCardId')),
    periodStart: normalizeRequiredString(formData.get('periodStart')),
    periodEnd: normalizeRequiredString(formData.get('periodEnd')),
    paymentDate: normalizeRequiredString(formData.get('paymentDate')),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ?? 'Los datos no son válidos',
    )
  }

  try {
    const statement = await createStatement(parsed.data)

    revalidatePath('/debts/statement')

    return actionSuccess(statement)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible crear el estado de cuenta',
    )
  }
}

// ===================
// UPDATE
// ===================

export async function updateStatementAction(
  _previousState: ActionState<Statement>,
  formData: FormData,
): Promise<ActionState<Statement>> {
  const statementId = Number(formData.get('statementId'))

  if (!Number.isInteger(statementId) || statementId <= 0) {
    return actionError('El estado de cuenta no es válido')
  }

  const parsed = UpdateStatementRequestSchema.safeParse({
    userCardId: Number(formData.get('userCardId')),
    periodStart: normalizeRequiredString(formData.get('periodStart')),
    periodEnd: normalizeRequiredString(formData.get('periodEnd')),
    paymentDate: normalizeRequiredString(formData.get('paymentDate')),
    notes: normalizeNullableString(formData.get('notes')),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ?? 'Los datos no son válidos',
    )
  }

  try {
    const statement = await updateStatement(statementId, parsed.data)

    revalidatePath('/debts/statement')

    return actionSuccess(statement)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar el estado de cuenta',
    )
  }
}

// ===================
// PAID
// ===================

export async function updateStatementPaidAction(
  _previousState: ActionState<Statement>,
  formData: FormData,
): Promise<ActionState<Statement>> {
  const statementId = Number(formData.get('statementId'))

  const paid = formData.get('paid') === 'true'

  try {
    const statement = await updateStatementPaid(statementId, {
      paid,
    })

    revalidatePath('/debts/statement')

    return actionSuccess(statement)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar el pago',
    )
  }
}

// ===================
// PAY ALL
// ===================

export async function payAllStatementsAction(
  _previousState: ActionState<Statement[]>,
  formData: FormData,
): Promise<ActionState<Statement[]>> {
  const userCardId = Number(formData.get('userCardId'))

  if (!Number.isInteger(userCardId) || userCardId <= 0) {
    return actionError('La tarjeta no es válida')
  }

  try {
    const statements = await payAllStatements(userCardId)

    revalidatePath('/debts/statement')

    return actionSuccess(statements)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible marcar todos los periodos como pagados',
    )
  }
}

// ===================
// DELETE
// ===================

export async function deleteStatementAction(
  _previousState: ActionState<null>,
  formData: FormData,
): Promise<ActionState<null>> {
  const statementId = Number(formData.get('statementId'))

  if (!Number.isInteger(statementId) || statementId <= 0) {
    return actionError('El estado de cuenta no es válido')
  }

  try {
    await deleteStatement(statementId)

    revalidatePath('/debts/statement')

    return actionSuccess(null)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible eliminar el estado de cuenta',
    )
  }
}

// ===================
// DATE SUGGESTION
// ===================

export async function getStatementDateSuggestionAction(
  userCardId: number,
): Promise<ActionState<StatementDateSuggestion>> {
  if (!Number.isInteger(userCardId) || userCardId <= 0) {
    return actionError('La tarjeta no es válida')
  }

  try {
    const suggestion = await getStatementDateSuggestion(userCardId)

    return actionSuccess(suggestion)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible obtener las fechas sugeridas',
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

function normalizeNullableString(
  value: FormDataEntryValue | null,
): string | null {
  if (typeof value !== 'string' || value.trim() === '') {
    return null
  }

  return value.trim()
}
