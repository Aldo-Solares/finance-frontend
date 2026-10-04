// @/modules/debts/statement/services/statement.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { parseApiResponse } from '@/core/api/api-response'
import {
  StatementDateSuggestionSchema,
  StatementSchema,
  type CreateStatementRequest,
  type Statement,
  type StatementDateSuggestion,
  type UpdateStatementPaidRequest,
  type UpdateStatementRequest,
} from '@/modules/debts/statement/schemas/statement.schema'

// ===================
// FIND ALL
// ===================

export async function findAllStatements(): Promise<Statement[]> {
  const response = await fetchServer('/statements', {
    method: 'GET',
  })

  return parseApiResponse(
    response,
    z.array(StatementSchema),
    'No fue posible obtener los estados de cuenta',
  )
}

// ===================
// FIND BY USER CARD
// ===================

export async function findStatementsByUserCardId(
  userCardId: number,
): Promise<Statement[]> {
  const response = await fetchServer(`/statements/user-card/${userCardId}`, {
    method: 'GET',
  })

  return parseApiResponse(
    response,
    z.array(StatementSchema),
    'No fue posible obtener los estados de cuenta de la tarjeta',
  )
}

// ===================
// FIND BY ID
// ===================

export async function findStatementById(
  statementId: number,
): Promise<Statement> {
  const response = await fetchServer(`/statements/${statementId}`, {
    method: 'GET',
  })

  return parseApiResponse(
    response,
    StatementSchema,
    'No fue posible obtener el estado de cuenta',
  )
}

// ===================
// CREATE
// ===================

export async function createStatement(
  request: CreateStatementRequest,
): Promise<Statement> {
  const response = await fetchServer('/statements', {
    method: 'POST',
    body: JSON.stringify(request),
  })

  return parseApiResponse(
    response,
    StatementSchema,
    'No fue posible crear el estado de cuenta',
  )
}

// ===================
// UPDATE
// ===================

export async function updateStatement(
  statementId: number,
  request: UpdateStatementRequest,
): Promise<Statement> {
  const response = await fetchServer(`/statements/${statementId}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  })

  return parseApiResponse(
    response,
    StatementSchema,
    'No fue posible actualizar el estado de cuenta',
  )
}

// ===================
// PAID
// ===================

export async function updateStatementPaid(
  statementId: number,
  request: UpdateStatementPaidRequest,
): Promise<Statement> {
  const response = await fetchServer(`/statements/${statementId}/paid`, {
    method: 'PATCH',
    body: JSON.stringify(request),
  })

  return parseApiResponse(
    response,
    StatementSchema,
    'No fue posible actualizar el pago',
  )
}

// ===================
// PAY ALL
// ===================

export async function payAllStatements(
  userCardId: number,
): Promise<Statement[]> {
  const response = await fetchServer(
    `/statements/user-card/${userCardId}/pay-all`,
    {
      method: 'PATCH',
    },
  )

  return parseApiResponse(
    response,
    z.array(StatementSchema),
    'No fue posible pagar todos los periodos',
  )
}

// ===================
// DELETE
// ===================

export async function deleteStatement(statementId: number): Promise<void> {
  const response = await fetchServer(`/statements/${statementId}`, {
    method: 'DELETE',
  })

  await parseApiResponse(
    response,
    z.null(),
    'No fue posible eliminar el estado de cuenta',
  )
}

// ===================
// DATE SUGGESTION
// ===================

export async function getStatementDateSuggestion(
  userCardId: number,
): Promise<StatementDateSuggestion> {
  const params = new URLSearchParams({
    userCardId: String(userCardId),
  })

  const response = await fetchServer(
    `/statements/suggestion?${params.toString()
}`,
    {
      method: 'GET',
    },
  )

  return parseApiResponse(
    response,
    StatementDateSuggestionSchema,
    'No fue posible obtener las fechas sugeridas',
  )
}
