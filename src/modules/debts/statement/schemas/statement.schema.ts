// @/modules/debts/statement/schemas/statement.schema.ts

import { z } from 'zod'

import { StatementStatus } from '@/modules/debts/statement/enums/statement-status.enum'

const nullableDateSchema = z.string().nullable()
const requiredDateSchema = z.string().min(1)

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
  status: z.nativeEnum(StatementStatus),
  paid: z.boolean(),
  notes: z.string().nullable(),
})

export const CreateStatementRequestSchema = z.object({
  userCardId: z.number().int().positive(),
  periodStart: requiredDateSchema,
  periodEnd: requiredDateSchema,
  paymentDate: requiredDateSchema,
})

export const UpdateStatementRequestSchema = z.object({
  userCardId: z.number().int().positive(),
  periodStart: requiredDateSchema,
  periodEnd: requiredDateSchema,
  paymentDate: requiredDateSchema,
  notes: z.string().nullable(),
})

export const UpdateStatementPaidRequestSchema = z.object({
  paid: z.boolean(),
})

export const StatementDateSuggestionSchema = z.object({
  periodStart: nullableDateSchema,
  periodEnd: nullableDateSchema,
  paymentDate: nullableDateSchema,
})

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
