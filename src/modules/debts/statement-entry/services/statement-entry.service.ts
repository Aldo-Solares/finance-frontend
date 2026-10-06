// @/modules/debts/statement-entry/services/statement-entry.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { parseApiResponse } from '@/core/api/api-response'
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

  return parseApiResponse(
    response,
    z.array(StatementEntrySchema),
    'No fue posible obtener los movimientos',
  )
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

  return parseApiResponse(
    response,
    StatementEntrySchema,
    'No fue posible obtener el movimiento',
  )
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

  return parseApiResponse(
    response,
    z.array(StatementEntrySchema),
    'No fue posible obtener los movimientos del estado de cuenta',
  )
}

// ===================
// FIND BY DEBTOR
// ===================

export async function findStatementEntriesByDebtor(
  debtor: string,
): Promise<StatementEntry[]> {
  const response = await fetchServer(
    `/statement-entries/debtor/${encodeURIComponent(debtor)
}`,
    {
      method: 'GET',
    },
  )

  return parseApiResponse(
    response,
    z.array(StatementEntrySchema),
    'No fue posible obtener los movimientos del deudor',
  )
}

// ===================
// FIND BY STATEMENT + DEBTOR
// ===================

export async function findStatementEntriesByStatementIdAndDebtor(
  statementId: number,
  debtor: string,
): Promise<StatementEntry[]> {
  const response = await fetchServer(
    `/statement-entries/statement/${statementId}/debtor/${encodeURIComponent(debtor)
}`,
    {
      method: 'GET',
    },
  )

  return parseApiResponse(
    response,
    z.array(StatementEntrySchema),
    'No fue posible obtener los movimientos',
  )
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

  return parseApiResponse(
    response,
    StatementEntrySchema,
    'No fue posible crear el movimiento',
  )
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

  return parseApiResponse(
    response,
    StatementEntrySchema,
    'No fue posible actualizar el movimiento',
  )
}

// ===================
// PAY SELECTED
// ===================

export async function paySelectedStatementEntries(
  entryIds: number[],
): Promise<StatementEntry[]> {
  const response = await fetchServer('/statement-entries/pay-selected', {
    method: 'PATCH',
    body: JSON.stringify({ entryIds }),
  })

  return parseApiResponse(
    response,
    z.array(StatementEntrySchema),
    'No fue posible marcar los movimientos como pagados',
  )
}

// ===================
// DELETE
// ===================

export async function deleteStatementEntry(entryId: number): Promise<void> {
  const response = await fetchServer(`/statement-entries/${entryId}`, {
    method: 'DELETE',
  })

  await parseApiResponse(
    response,
    z.null(),
    'No fue posible eliminar el movimiento',
  )
}
