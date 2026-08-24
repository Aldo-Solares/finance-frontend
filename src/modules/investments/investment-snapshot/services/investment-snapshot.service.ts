// @/modules/investments/investment-snapshot/services/investment-snapshot.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { createApiResponseSchema } from '@/core/schemas/api-response.schema'
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

  const json: unknown = await response.json()

  const result = createApiResponseSchema(
    z.array(InvestmentSnapshotSchema),
  ).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible obtener los registros de inversión',
    )
  }

  if (result.data === null) {
    throw new Error('La respuesta de inversiones no contiene datos')
  }

  return result.data
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

  const json: unknown = await response.json()

  const result = createApiResponseSchema(InvestmentSnapshotSchema).parse(json)

  if (!result.success || result.data === null) {
    throw new Error(
      result.message ?? 'No fue posible obtener el registro de inversión',
    )
  }

  return result.data
}

// ===================
// PERFORMANCE
// ===================

export async function findInvestmentPerformance(): Promise<InvestmentPerformance> {
  const response = await fetchServer('/investment-snapshots/performance', {
    method: 'GET',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(InvestmentPerformanceSchema).parse(
    json,
  )

  if (!result.success || result.data === null) {
    throw new Error(result.message ?? 'No fue posible obtener el rendimiento')
  }

  return result.data
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

  const json: unknown = await response.json()

  const result = createApiResponseSchema(InvestmentSnapshotSchema).parse(json)

  if (!result.success || result.data === null) {
    throw new Error(
      result.message ?? 'No fue posible crear el registro de inversión',
    )
  }

  return result.data
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

  const json: unknown = await response.json()

  const result = createApiResponseSchema(InvestmentSnapshotSchema).parse(json)

  if (!result.success || result.data === null) {
    throw new Error(
      result.message ?? 'No fue posible actualizar el registro de inversión',
    )
  }

  return result.data
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

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.null()).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible eliminar el registro de inversión',
    )
  }
}
