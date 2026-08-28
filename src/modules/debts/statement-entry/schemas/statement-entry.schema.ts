// @/modules/debts/statement-entry/schemas/statement-entry.schema.ts

import { z } from 'zod'

import { requiredString } from '@/core/utils/zod-helpers'

const nullableDateSchema = z.string().nullable()

const nullablePositiveNumberSchema = z.number().positive().nullable()

const nullableNonNegativeNumberSchema = z.number().nonnegative().nullable()

const nullablePositiveIntegerSchema = z.number().int().positive().nullable()

const nullableNonNegativeIntegerSchema = z
  .number()
  .int()
  .nonnegative()
  .nullable()

export const StatementEntryTypeSchema = z.enum(['PURCHASE', 'RECURRING'])

// ===================
// STATEMENT ENTRY
// ===================

export const StatementEntrySchema = z.object({
  entryId: z.number().int(),
  statementId: z.number().int(),
  conceptId: z.number().int(),
  conceptName: z.string(),
  debtor: z.string(),
  description: z.string().nullable(),
  entryType: StatementEntryTypeSchema,
  date: nullableDateSchema,
  amount: z.number().positive(),
  paid: z.boolean(),
  msiCurrent: nullablePositiveIntegerSchema,
  msiTotal: nullablePositiveIntegerSchema,
  purchaseAmount: nullablePositiveNumberSchema,
  remainingMsi: nullableNonNegativeIntegerSchema,
  remainingMsiAmount: nullableNonNegativeNumberSchema,
})

// ===================
// CREATE
// ===================

export const CreateStatementEntryRequestSchema = z.object({
  statementId: z.number().int().positive(),

  conceptId: z.number().int().positive(),

  debtor: requiredString('El deudor es obligatorio'),

  description: z.string().trim().nullable(),

  entryType: StatementEntryTypeSchema,

  date: nullableDateSchema,

  amount: z.number().positive(),

  paid: z.boolean(),

  msiCurrent: nullablePositiveIntegerSchema,

  msiTotal: nullablePositiveIntegerSchema,

  purchaseAmount: nullablePositiveNumberSchema,

  remainingMsi: nullableNonNegativeIntegerSchema,

  remainingMsiAmount: nullableNonNegativeNumberSchema,
})

// ===================
// UPDATE
// ===================

export const UpdateStatementEntryRequestSchema = z.object({
  statementId: z.number().int().positive(),

  conceptId: z.number().int().positive(),

  debtor: requiredString('El deudor es obligatorio'),

  description: z.string().trim().nullable(),

  entryType: StatementEntryTypeSchema,

  date: nullableDateSchema,

  amount: z.number().positive(),

  paid: z.boolean(),

  msiCurrent: nullablePositiveIntegerSchema,

  msiTotal: nullablePositiveIntegerSchema,

  purchaseAmount: nullablePositiveNumberSchema,

  remainingMsi: nullableNonNegativeIntegerSchema,

  remainingMsiAmount: nullableNonNegativeNumberSchema,
})

// ===================
// TYPES
// ===================

export type StatementEntryType = z.infer<typeof StatementEntryTypeSchema>

export type StatementEntry = z.infer<typeof StatementEntrySchema>

export type CreateStatementEntryRequest = z.infer<
  typeof CreateStatementEntryRequestSchema
>

export type UpdateStatementEntryRequest = z.infer<
  typeof UpdateStatementEntryRequestSchema
>
