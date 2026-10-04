// @/modules/investments/investment-snapshot/services/investment-snapshot.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { parseApiResponse } from '@/core/api/api-response'
import {
  InvestmentPerformanceSchema,
  InvestmentSnapshotSchema,
  type CreateInvestmentSnapshotRequest,
  type InvestmentPerformance,
  type InvestmentSnapshot,
  type UpdateInvestmentSnapshotRequest,
} from '@/modules/investments/investment-snapshot/schemas/investment-snapshot.schema'

// ===================
// FIND ALL
// ===================

export async function findAllInvestmentSnapshots(): Promise<
  InvestmentSnapshot[]
> {
  const response = await fetchServer('/investment-snapshots', {
    method: 'GET',
  })

  return parseApiResponse(
    response,
    z.array(InvestmentSnapshotSchema),
    'No fue posible obtener los registros de inversión',
  )
}

// ===================
// FIND BY ID
// ===================

export async function findInvestmentSnapshotById(
  investmentSnapshotId: number,
): Promise<InvestmentSnapshot> {
  const response = await fetchServer(
    `/investment-snapshots/${investmentSnapshotId}`,
    {
      method: 'GET',
    },
  )

  return parseApiResponse(
    response,
    InvestmentSnapshotSchema,
    'No fue posible obtener el registro de inversión',
  )
}

// ===================
// PERFORMANCE
// ===================

export async function findInvestmentPerformance(): Promise<InvestmentPerformance> {
  const response = await fetchServer('/investment-snapshots/performance', {
    method: 'GET',
  })

  return parseApiResponse(
    response,
    InvestmentPerformanceSchema,
    'No fue posible obtener el rendimiento',
  )
}

// ===================
// CREATE
// ===================

export async function createInvestmentSnapshot(
  request: CreateInvestmentSnapshotRequest,
): Promise<InvestmentSnapshot> {
  const response = await fetchServer('/investment-snapshots', {
    method: 'POST',
    body: JSON.stringify(request),
  })

  return parseApiResponse(
    response,
    InvestmentSnapshotSchema,
    'No fue posible crear el registro de inversión',
  )
}

// ===================
// UPDATE
// ===================

export async function updateInvestmentSnapshot(
  investmentSnapshotId: number,
  request: UpdateInvestmentSnapshotRequest,
): Promise<InvestmentSnapshot> {
  const response = await fetchServer(
    `/investment-snapshots/${investmentSnapshotId}`,
    {
      method: 'PUT',
      body: JSON.stringify(request),
    },
  )

  return parseApiResponse(
    response,
    InvestmentSnapshotSchema,
    'No fue posible actualizar el registro de inversión',
  )
}

// ===================
// DELETE
// ===================

export async function deleteInvestmentSnapshot(
  investmentSnapshotId: number,
): Promise<void> {
  const response = await fetchServer(
    `/investment-snapshots/${investmentSnapshotId}`,
    {
      method: 'DELETE',
    },
  )

  await parseApiResponse(
    response,
    z.null(),
    'No fue posible eliminar el registro de inversión',
  )
}
