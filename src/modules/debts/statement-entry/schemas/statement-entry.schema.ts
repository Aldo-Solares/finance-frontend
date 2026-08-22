// @/modules/debts/statement-entry/schemas/statement-entry.schema.ts

import { z } from 'zod'

import { requiredString } from '@/core/utils/zod-helpers'

const nullableDateSchema = z.string().nullable()

const nullableNonNegativeNumberSchema = z.number().nonnegative().nullable()

const nullableNonNegativeIntegerSchema = z
  .number()
  .int()
  .nonnegative()
  .nullable()

// ===================
// STATEMENT ENTRY
// ===================

export const StatementEntrySchema = z.object({
  entryId: z.number().int(),
  statementId: z.number().int(),
  conceptId: z.number().int(),
  debtor: z.string(),
  description: z.string().nullable(),
  purchaseDate: nullableDateSchema,
  installmentAmount: nullableNonNegativeNumberSchema,
  paid: z.boolean(),
  msiCurrent: nullableNonNegativeIntegerSchema,
  msiTotal: nullableNonNegativeIntegerSchema,
  purchaseTotal: nullableNonNegativeNumberSchema,
  remainingMonths: nullableNonNegativeIntegerSchema,
  remainingTotal: nullableNonNegativeNumberSchema,
})

// ===================
// CREATE
// ===================

export const CreateStatementEntryRequestSchema = z.object({
  statementId: z.number().int().positive(),

  conceptId: z.number().int().positive(),

  debtor: requiredString('El deudor es obligatorio'),

  description: z.string().trim().nullable(),

  purchaseDate: nullableDateSchema,

  installmentAmount: nullableNonNegativeNumberSchema,

  paid: z.boolean().nullable().optional(),

  msiCurrent: nullableNonNegativeIntegerSchema,

  msiTotal: nullableNonNegativeIntegerSchema,

  purchaseTotal: nullableNonNegativeNumberSchema,

  remainingMonths: nullableNonNegativeIntegerSchema,

  remainingTotal: nullableNonNegativeNumberSchema,
})

// ===================
// UPDATE
// ===================

export const UpdateStatementEntryRequestSchema = z.object({
  statementId: z.number().int().positive(),

  conceptId: z.number().int().positive(),

  debtor: requiredString('El deudor es obligatorio'),

  description: z.string().trim().nullable(),

  purchaseDate: nullableDateSchema,

  installmentAmount: nullableNonNegativeNumberSchema,

  paid: z.boolean(),

  msiCurrent: nullableNonNegativeIntegerSchema,

  msiTotal: nullableNonNegativeIntegerSchema,

  purchaseTotal: nullableNonNegativeNumberSchema,

  remainingMonths: nullableNonNegativeIntegerSchema,

  remainingTotal: nullableNonNegativeNumberSchema,
})

// ===================
// TYPES
// ===================

export type StatementEntry = z.infer<typeof StatementEntrySchema>

export type CreateStatementEntryRequest = z.infer<
  typeof CreateStatementEntryRequestSchema
>

export type UpdateStatementEntryRequest = z.infer<
  typeof UpdateStatementEntryRequestSchema
>
