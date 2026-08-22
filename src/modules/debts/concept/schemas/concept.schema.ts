// @/modules/debts/concept/schemas/concept.schema.ts

import { z } from 'zod'

import { requiredString } from '@/core/utils/zod-helpers'

export const ConceptSchema = z.object({
  conceptId: z.number().int(),
  name: z.string(),
})

export const CreateConceptRequestSchema = z.object({
  name: requiredString('El nombre del concepto es obligatorio').max(
    100,
    'El nombre del concepto no puede superar los 100 caracteres',
  ),
})

export const UpdateConceptRequestSchema = z.object({
  name: requiredString('El nombre del concepto es obligatorio').max(
    100,
    'El nombre del concepto no puede superar los 100 caracteres',
  ),
})

export type Concept = z.infer<typeof ConceptSchema>

export type CreateConceptRequest = z.infer<typeof CreateConceptRequestSchema>

export type UpdateConceptRequest = z.infer<typeof UpdateConceptRequestSchema>
