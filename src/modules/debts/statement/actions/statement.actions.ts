// @/modules/debts/statement/actions/statement.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  type ActionState,
  withActionState,
} from '@/core/utils/action-state'
import {
  CreateStatementRequestSchema,
  UpdateStatementPaidRequestSchema,
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
import {
  normalizeNullableString,
  normalizeRequiredNumber,
  normalizeRequiredString,
} from '@/core/utils/form-data'

// ===================
// CREATE
// ===================

export async function createStatementAction(
  _previousState: ActionState<Statement>,
  formData: FormData,
): Promise<ActionState<Statement>> {
  const parsed = CreateStatementRequestSchema.safeParse({
    userCardId: normalizeRequiredNumber(formData.get('userCardId')),
    periodStart: normalizeRequiredString(formData.get('periodStart')),
    periodEnd: normalizeRequiredString(formData.get('periodEnd')),
    paymentDate: normalizeRequiredString(formData.get('paymentDate')),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ?? 'Los datos no son válidos',
    )
  }

  return withActionState(async () => {
    const statement = await createStatement(parsed.data)

    revalidatePath('/debts/statement')

    return statement
  }, 'No fue posible crear el estado de cuenta')
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
    userCardId: normalizeRequiredNumber(formData.get('userCardId')),
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

  return withActionState(async () => {
    const statement = await updateStatement(statementId, parsed.data)

    revalidatePath('/debts/statement')

    return statement
  }, 'No fue posible actualizar el estado de cuenta')
}

// ===================
// PAID
// ===================

export async function updateStatementPaidAction(
  _previousState: ActionState<Statement>,
  formData: FormData,
): Promise<ActionState<Statement>> {
  const statementId = Number(formData.get('statementId'))
  const paidValue = formData.get('paid')

  if (!Number.isInteger(statementId) || statementId <= 0) {
    return actionError('El estado de cuenta no es válido')
  }

  if (paidValue !== 'true' && paidValue !== 'false') {
    return actionError('El estado de pago no es válido')
  }

  const parsed = UpdateStatementPaidRequestSchema.safeParse({
    paid: paidValue === 'true',
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ?? 'El estado de pago no es válido',
    )
  }

  return withActionState(async () => {
    const statement = await updateStatementPaid(statementId, parsed.data)

    revalidatePath('/debts/statement')

    return statement
  }, 'No fue posible actualizar el pago')
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

  return withActionState(async () => {
    const statements = await payAllStatements(userCardId)

    revalidatePath('/debts/statement')

    return statements
  }, 'No fue posible marcar todos los periodos como pagados')
}

// ===================
// DELETE
// ===================

export async function deleteStatementAction(statementId: number) {
  await deleteStatement(statementId)

  revalidatePath('/debts/statement')
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

  return withActionState(async () => {
    const suggestion = await getStatementDateSuggestion(userCardId)

    return suggestion
  }, 'No fue posible obtener las fechas sugeridas')
}
