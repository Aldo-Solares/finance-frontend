// @/modules/debts/statement-entry/services/statement-entry.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { createApiResponseSchema } from '@/core/schemas/api-response.schema'
import {
  StatementEntrySchema,
  type CreateStatementEntryRequest,
  type StatementEntry,
  type UpdateStatementEntryRequest,
} from '@/modules/debts/statement-entry/schemas/statement-entry.schema'

// ===================
// FIND ALL
// ===================

export async function findAllStatementEntries(): Promise<StatementEntry[]> {
  const response = await fetchServer('/statement-entries', {
    method: 'GET',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.array(StatementEntrySchema)).parse(
    json,
  )

  if (!result.success) {
    throw new Error(result.message ?? 'No fue posible obtener los movimientos')
  }

  if (result.data === null) {
    throw new Error('La respuesta de movimientos no contiene datos')
  }

  return result.data
}

// ===================
// FIND BY ID
// ===================

export async function findStatementEntryById(
  entryId: number,
): Promise<StatementEntry> {
  const response = await fetchServer(`/statement-entries/${entryId}`, {
    method: 'GET',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(StatementEntrySchema).parse(json)

  if (!result.success || result.data === null) {
    throw new Error(result.message ?? 'No fue posible obtener el movimiento')
  }

  return result.data
}

// ===================
// FIND BY STATEMENT
// ===================

export async function findStatementEntriesByStatementId(
  statementId: number,
): Promise<StatementEntry[]> {
  const response = await fetchServer(
    `/statement-entries/statement/${statementId}`,
    {
      method: 'GET',
    },
  )

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.array(StatementEntrySchema)).parse(
    json,
  )

  if (!result.success || result.data === null) {
    throw new Error(
      result.message ??
        'No fue posible obtener los movimientos del estado de cuenta',
    )
  }

  return result.data
}

// ===================
// FIND BY DEBTOR
// ===================

export async function findStatementEntriesByDebtor(
  debtor: string,
): Promise<StatementEntry[]> {
  const response = await fetchServer(
    `/statement-entries/debtor/${encodeURIComponent(debtor)}`,
    {
      method: 'GET',
    },
  )

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.array(StatementEntrySchema)).parse(
    json,
  )

  if (!result.success || result.data === null) {
    throw new Error(
      result.message ?? 'No fue posible obtener los movimientos del deudor',
    )
  }

  return result.data
}

// ===================
// FIND BY STATEMENT + DEBTOR
// ===================

export async function findStatementEntriesByStatementIdAndDebtor(
  statementId: number,
  debtor: string,
): Promise<StatementEntry[]> {
  const response = await fetchServer(
    `/statement-entries/statement/${statementId}/debtor/${encodeURIComponent(debtor)}`,
    {
      method: 'GET',
    },
  )

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.array(StatementEntrySchema)).parse(
    json,
  )

  if (!result.success || result.data === null) {
    throw new Error(result.message ?? 'No fue posible obtener los movimientos')
  }

  return result.data
}

// ===================
// CREATE
// ===================

export async function createStatementEntry(
  request: CreateStatementEntryRequest,
): Promise<StatementEntry> {
  const response = await fetchServer('/statement-entries', {
    method: 'POST',
    body: JSON.stringify(request),
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(StatementEntrySchema).parse(json)

  if (!result.success || result.data === null) {
    throw new Error(result.message ?? 'No fue posible crear el movimiento')
  }

  return result.data
}

// ===================
// UPDATE
// ===================

export async function updateStatementEntry(
  entryId: number,
  request: UpdateStatementEntryRequest,
): Promise<StatementEntry> {
  const response = await fetchServer(`/statement-entries/${entryId}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(StatementEntrySchema).parse(json)

  if (!result.success || result.data === null) {
    throw new Error(result.message ?? 'No fue posible actualizar el movimiento')
  }

  return result.data
}

// ===================
// DELETE
// ===================

export async function deleteStatementEntry(entryId: number): Promise<void> {
  const response = await fetchServer(`/statement-entries/${entryId}`, {
    method: 'DELETE',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.null()).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'No fue posible eliminar el movimiento')
  }
}
