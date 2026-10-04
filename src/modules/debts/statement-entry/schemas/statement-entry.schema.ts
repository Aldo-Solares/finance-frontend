// @/modules/debts/statement-entry/schemas/statement-entry.schema.ts

import { z } from 'zod'

import { requiredNumber, requiredString } from '@/core/utils/zod-helpers'

// ===================
// COMMON SCHEMAS
// ===================

const nullableDateSchema = z.string().nullable()
const nullablePositiveNumberSchema = z.number().positive().nullable()
const nullableNonNegativeNumberSchema = z.number().nonnegative().nullable()
const nullablePositiveIntegerSchema = z.number().int().positive().nullable()
const nullableNonNegativeIntegerSchema = z
  .number()
  .int()
  .nonnegative()
  .nullable()
const requestNullablePositiveIntegerSchema = z
  .number({ error: 'Los meses sin intereses deben ser un número válido' })
  .int('Los meses sin intereses deben ser un número entero')
  .positive('Los meses sin intereses deben ser mayores que cero')
  .nullable()
const requestEntryTypeSchema = z.enum(['PURCHASE', 'RECURRING'], {
  error: 'El tipo de movimiento no es válido',
})

// ===================
// ENTRY TYPE
// ===================

export const StatementEntryTypeSchema = z.enum(['PURCHASE', 'RECURRING'])

export type StatementEntryType = z.infer<typeof StatementEntryTypeSchema>

// ===================
// STATEMENT ENTRY
// ===================

export const StatementEntrySchema = z.object({
  entryId: z.number().int(),
  statementId: z.number().int(),
  conceptId: z.number().int(),
  conceptName: z.string(),
  debtor: z.string(),
  specification: z.string().nullable(),
  notes: z.string().nullable(),
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
  statementId: requiredNumber(
    'Selecciona un estado de cuenta',
    'El estado de cuenta no es válido',
  )
    .int('El estado de cuenta no es válido')
    .positive('El estado de cuenta no es válido'),
  conceptId: requiredNumber(
    'Selecciona un concepto',
    'El concepto no es válido',
  )
    .int('El concepto no es válido')
    .positive('El concepto no es válido'),
  debtor: requiredString('El deudor es obligatorio'),
  specification: z.string().trim().nullable(),
  notes: z.string().nullable(),
  entryType: requestEntryTypeSchema,
  date: nullableDateSchema,
  amount: requiredNumber('El monto es obligatorio', 'El monto debe ser válido')
    .positive('El monto debe ser mayor que cero'),
  paid: z.boolean(),
  msiCurrent: requestNullablePositiveIntegerSchema,
  msiTotal: requestNullablePositiveIntegerSchema,
})

// ===================
// UPDATE
// ===================

export const UpdateStatementEntryRequestSchema = z.object({
  statementId: requiredNumber(
    'Selecciona un estado de cuenta',
    'El estado de cuenta no es válido',
  )
    .int('El estado de cuenta no es válido')
    .positive('El estado de cuenta no es válido'),
  conceptId: requiredNumber(
    'Selecciona un concepto',
    'El concepto no es válido',
  )
    .int('El concepto no es válido')
    .positive('El concepto no es válido'),
  debtor: requiredString('El deudor es obligatorio'),
  specification: z.string().trim().nullable(),
  notes: z.string().nullable(),
  entryType: requestEntryTypeSchema,
  date: nullableDateSchema,
  amount: requiredNumber('El monto es obligatorio', 'El monto debe ser válido')
    .positive('El monto debe ser mayor que cero'),
  paid: z.boolean(),
  msiCurrent: requestNullablePositiveIntegerSchema,
  msiTotal: requestNullablePositiveIntegerSchema,
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
