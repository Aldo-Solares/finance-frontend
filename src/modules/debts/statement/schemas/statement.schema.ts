// @/modules/debts/statement/schemas/statement.schema.ts

import { z } from 'zod'

import { StatementStatus } from '@/modules/debts/statement/enums/statement-status.enum'

const nullableDateSchema = z.string().nullable()

export const StatementSchema = z.object({
  statementId: z.number().int(),
  cardId: z.number().int(),
  cardCode: z.string(),
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
  cardId: z.number().int().positive(),
  year: z.number().int(),
  month: z.number().int().min(1).max(12),
  periodStart: nullableDateSchema,
  periodEnd: nullableDateSchema,
  paymentDate: nullableDateSchema,
})

export const UpdateStatementRequestSchema = z.object({
  cardId: z.number().int().positive(),
  year: z.number().int(),
  month: z.number().int().min(1).max(12),
  periodStart: nullableDateSchema,
  periodEnd: nullableDateSchema,
  paymentDate: nullableDateSchema,
  notes: z.string().nullable(),
})

export const UpdateStatementPaidRequestSchema = z.object({
  paid: z.boolean(),
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
