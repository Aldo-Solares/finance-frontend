// @/modules/debts/concept/services/concept.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { createApiResponseSchema } from '@/core/schemas/api-response.schema'
import {
  ConceptSchema,
  type Concept,
  type CreateConceptRequest,
  type UpdateConceptRequest,
} from '@/modules/debts/concept/schemas/concept.schema'

// ===================
// FIND ALL
// ===================

export async function findAllConcepts(): Promise<Concept[]> {
  const response = await fetchServer('/concepts', {
    method: 'GET',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.array(ConceptSchema)).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'No fue posible obtener los conceptos')
  }

  if (result.data === null) {
    throw new Error('La respuesta de conceptos no contiene datos')
  }

  return result.data
}

// ===================
// FIND BY ID
// ===================

export async function findConceptById(conceptId: number): Promise<Concept> {
  const response = await fetchServer(`/concepts/${conceptId}`, {
    method: 'GET',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(ConceptSchema).parse(json)

  if (!result.success || result.data === null) {
    throw new Error(result.message ?? 'No fue posible obtener el concepto')
  }

  return result.data
}

// ===================
// CREATE
// ===================

export async function createConcept(
  request: CreateConceptRequest,
): Promise<Concept> {
  const response = await fetchServer('/concepts', {
    method: 'POST',
    body: JSON.stringify(request),
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(ConceptSchema).parse(json)

  if (!result.success || result.data === null) {
    throw new Error(result.message ?? 'No fue posible crear el concepto')
  }

  return result.data
}

// ===================
// UPDATE
// ===================

export async function updateConcept(
  conceptId: number,
  request: UpdateConceptRequest,
): Promise<Concept> {
  const response = await fetchServer(`/concepts/${conceptId}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(ConceptSchema).parse(json)

  if (!result.success || result.data === null) {
    throw new Error(result.message ?? 'No fue posible actualizar el concepto')
  }

  return result.data
}

// ===================
// DELETE
// ===================

export async function deleteConcept(conceptId: number): Promise<void> {
  const response = await fetchServer(`/concepts/${conceptId}`, {
    method: 'DELETE',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.null()).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? 'No fue posible eliminar el concepto')
  }
}
