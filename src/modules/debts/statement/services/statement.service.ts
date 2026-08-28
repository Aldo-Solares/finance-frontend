// @/modules/debts/statement/services/statement.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { createApiResponseSchema } from '@/core/schemas/api-response.schema'
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

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.array(StatementSchema)).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible obtener los estados de cuenta',
    )
  }

  if (result.data === null) {
    throw new Error('La respuesta de estados de cuenta no contiene datos')
  }

  return result.data
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

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.array(StatementSchema)).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ??
        'No fue posible obtener los estados de cuenta de la tarjeta',
    )
  }

  if (result.data === null) {
    throw new Error('La respuesta de estados de cuenta no contiene datos')
  }

  return result.data
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

  const json: unknown = await response.json()

  const result = createApiResponseSchema(StatementSchema).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible obtener el estado de cuenta',
    )
  }

  if (result.data === null) {
    throw new Error('La respuesta del estado de cuenta no contiene datos')
  }

  return result.data
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

  const json: unknown = await response.json()

  const result = createApiResponseSchema(StatementSchema).parse(json)

  if (!result.success || result.data === null) {
    throw new Error(
      result.message ?? 'No fue posible crear el estado de cuenta',
    )
  }

  return result.data
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

  const json: unknown = await response.json()

  const result = createApiResponseSchema(StatementSchema).parse(json)

  if (!result.success || result.data === null) {
    throw new Error(
      result.message ?? 'No fue posible actualizar el estado de cuenta',
    )
  }

  return result.data
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

  const json: unknown = await response.json()

  const result = createApiResponseSchema(StatementSchema).parse(json)

  if (!result.success || result.data === null) {
    throw new Error(result.message ?? 'No fue posible actualizar el pago')
  }

  return result.data
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

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.array(StatementSchema)).parse(json)

  if (!result.success || result.data === null) {
    throw new Error(result.message ?? 'No fue posible pagar todos los periodos')
  }

  return result.data
}

// ===================
// DELETE
// ===================

export async function deleteStatement(statementId: number): Promise<void> {
  const response = await fetchServer(`/statements/${statementId}`, {
    method: 'DELETE',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.null()).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible eliminar el estado de cuenta',
    )
  }
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
    `/statements/suggestion?${params.toString()}`,
    {
      method: 'GET',
    },
  )

  const json: unknown = await response.json()

  const result = createApiResponseSchema(StatementDateSuggestionSchema).parse(
    json,
  )

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible obtener las fechas sugeridas',
    )
  }

  if (result.data === null) {
    throw new Error('La respuesta de fechas sugeridas no contiene datos')
  }

  return result.data
}
