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
  const response = await fetchServer('/categories', {
    method: 'GET',
  })

  return parseApiResponse(
    response,
    z.array(ConceptSchema),
    'No fue posible obtener los categorías',
  )
}

// ===================
// FIND BY ID
// ===================

export async function findConceptById(categoryId: number): Promise<Concept> {
  const response = await fetchServer(`/categories/${categoryId}`, {
    method: 'GET',
  })

  return parseApiResponse(
    response,
    ConceptSchema,
    'No fue posible obtener el categoría',
  )
}

// ===================
// CREATE
// ===================

export async function createConcept(
  request: CreateConceptRequest,
): Promise<Concept> {
  const response = await fetchServer('/categories', {
    method: 'POST',
    body: JSON.stringify(request),
  })

  return parseApiResponse(
    response,
    ConceptSchema,
    'No fue posible crear el categoría',
  )
}

// ===================
// UPDATE
// ===================

export async function updateConcept(
  categoryId: number,
  request: UpdateConceptRequest,
): Promise<Concept> {
  const response = await fetchServer(`/categories/${categoryId}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  })

  return parseApiResponse(
    response,
    ConceptSchema,
    'No fue posible actualizar el categoría',
  )
}

// ===================
// DELETE
// ===================

export async function deleteConcept(categoryId: number): Promise<void> {
  const response = await fetchServer(`/categories/${categoryId}`, {
    method: 'DELETE',
  })

  await parseApiResponse(
    response,
    z.null(),
    'No fue posible eliminar el categoría',
  )
}
