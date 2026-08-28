// @/modules/debts/statement/schemas/statement.schema.ts

import { z } from 'zod'

import { STATEMENT_STATUS_VALUES } from '@/modules/debts/statement/constants/statement.constants'

const nullableDateSchema = z.string().nullable()
const requiredDateSchema = z.string().min(1)

// ===================
// STATUS
// ===================

export const StatementStatusSchema = z.enum(STATEMENT_STATUS_VALUES)

export type StatementStatus = z.infer<typeof StatementStatusSchema>

// ===================
// STATEMENT
// ===================

export const StatementSchema = z.object({
  statementId: z.number().int(),
  userCardId: z.number().int(),
  cardId: z.number().int(),
  bank: z.string(),
  cardName: z.string(),
  year: z.number().int(),
  month: z.number().int().min(1).max(12),
  periodStart: nullableDateSchema,
  periodEnd: nullableDateSchema,
  paymentDate: nullableDateSchema,
  status: StatementStatusSchema,
  paid: z.boolean(),
  notes: z.string().nullable(),
})

// ===================
// CREATE
// ===================

export const CreateStatementRequestSchema = z.object({
  userCardId: z.number().int().positive(),
  periodStart: requiredDateSchema,
  periodEnd: requiredDateSchema,
  paymentDate: requiredDateSchema,
})

// ===================
// UPDATE
// ===================

export const UpdateStatementRequestSchema = z.object({
  userCardId: z.number().int().positive(),
  periodStart: requiredDateSchema,
  periodEnd: requiredDateSchema,
  paymentDate: requiredDateSchema,
  notes: z.string().nullable(),
})

// ===================
// UPDATE PAID
// ===================

export const UpdateStatementPaidRequestSchema = z.object({
  paid: z.boolean(),
})

// ===================
// DATE SUGGESTION
// ===================

export const StatementDateSuggestionSchema = z.object({
  periodStart: nullableDateSchema,
  periodEnd: nullableDateSchema,
  paymentDate: nullableDateSchema,
})

// ===================
// TYPES
// ===================

export type Statement = z.infer<typeof StatementSchema>

export type CreateStatementRequest = z.infer<
  typeof CreateStatementRequestSchema
>

export type UpdateStatementRequest = z.infer<
  typeof UpdateStatementRequestSchema
>

export type UpdateStatementPaidRequest = z.infer<
  typeof UpdateStatementPaidRequestSchema
>

export type StatementDateSuggestion = z.infer<
  typeof StatementDateSuggestionSchema
>
