// @/modules/debts/concept/services/concept.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { parseApiResponse } from '@/core/api/api-response'
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

  return parseApiResponse(
    response,
    z.array(ConceptSchema),
    'No fue posible obtener los conceptos',
  )
}

// ===================
// FIND BY ID
// ===================

export async function findConceptById(conceptId: number): Promise<Concept> {
  const response = await fetchServer(`/concepts/${conceptId}`, {
    method: 'GET',
  })

  return parseApiResponse(
    response,
    ConceptSchema,
    'No fue posible obtener el concepto',
  )
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

  return parseApiResponse(
    response,
    ConceptSchema,
    'No fue posible crear el concepto',
  )
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

  return parseApiResponse(
    response,
    ConceptSchema,
    'No fue posible actualizar el concepto',
  )
}

// ===================
// DELETE
// ===================

export async function deleteConcept(conceptId: number): Promise<void> {
  const response = await fetchServer(`/concepts/${conceptId}`, {
    method: 'DELETE',
  })

  await parseApiResponse(
    response,
    z.null(),
    'No fue posible eliminar el concepto',
  )
}
