// @/modules/debts/statement-entry/schemas/statement-entry.schema.ts

import { z } from 'zod'

import { requiredNumber, requiredString } from '@/core/utils/zod-helpers'

// ===================
// COMMON SCHEMAS
// ===================

const nullableDateSchema = z.string().nullable()
const nullablePositiveIntegerSchema = z.number().int().positive().nullable()
const requestNullablePositiveIntegerSchema = z
  .number({ error: 'Los meses sin intereses deben ser un número válido' })
  .int('Los meses sin intereses deben ser un número entero')
  .positive('Los meses sin intereses deben ser mayores que cero')
  .nullable()

function getMsiValidationIssue(value: {
  monthlyPaymentNumber: number | null
  totalMonthlyPayments: number | null
}) {
  const { monthlyPaymentNumber, totalMonthlyPayments } = value

  if ((monthlyPaymentNumber === null) !== (totalMonthlyPayments === null)) {
    return {
      path: 'totalMonthlyPayments' as const,
      message: 'Indica la mensualidad actual y el total de mensualidades',
    }
  }

  if (
    monthlyPaymentNumber !== null &&
    totalMonthlyPayments !== null &&
    monthlyPaymentNumber > totalMonthlyPayments
  ) {
    return {
      path: 'monthlyPaymentNumber' as const,
      message: 'La mensualidad actual no puede superar el total',
    }
  }

  return null
}
// ===================
// ENTRY TYPE
// ===================

// ===================
// STATEMENT ENTRY
// ===================

export const StatementEntrySchema = z.object({
  entryId: z.number().int(),
  statementId: z.number().int(),
  categoryId: z.number().int(),
  categoryName: z.string(),
  debtor: z.string(),
  description: z.string().nullable(),
  merchant: z.string().nullable(),
  notes: z.string().nullable(),
  isRecurring: z.boolean(),
  date: nullableDateSchema,
  amount: z.number().positive(),
  paid: z.boolean(),
  msiPurchaseId: z.number().int().nullable(),
  monthlyPaymentNumber: nullablePositiveIntegerSchema,
  totalMonthlyPayments: nullablePositiveIntegerSchema,
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
  categoryId: requiredNumber(
    'Selecciona una categoría',
    'La categoría no es válida',
  )
    .int('La categoría no es válida')
    .positive('La categoría no es válida'),
  debtor: requiredString('El deudor es obligatorio'),
  description: z.string().trim().nullable(),
  merchant: z.string().trim().nullable(),
  notes: z.string().nullable(),
  date: nullableDateSchema,
  amount: requiredNumber('El importe es obligatorio', 'El importe debe ser válido')
    .positive('El importe debe ser mayor que cero'),
  paid: z.boolean(),
  isRecurring: z.boolean(),
  monthlyPaymentNumber: requestNullablePositiveIntegerSchema,
  totalMonthlyPayments: requestNullablePositiveIntegerSchema,
}).superRefine((value, context) => {
  const issue = getMsiValidationIssue(value)
  if (issue) {
    context.addIssue({
      code: 'custom',
      path: [issue.path],
      message: issue.message,
    })
  }
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
  categoryId: requiredNumber(
    'Selecciona una categoría',
    'La categoría no es válida',
  )
    .int('La categoría no es válida')
    .positive('La categoría no es válida'),
  debtor: requiredString('El deudor es obligatorio'),
  description: z.string().trim().nullable(),
  merchant: z.string().trim().nullable(),
  notes: z.string().nullable(),
  date: nullableDateSchema,
  amount: requiredNumber('El importe es obligatorio', 'El importe debe ser válido')
    .positive('El importe debe ser mayor que cero'),
  paid: z.boolean(),
  isRecurring: z.boolean(),
  monthlyPaymentNumber: requestNullablePositiveIntegerSchema,
  totalMonthlyPayments: requestNullablePositiveIntegerSchema,
}).superRefine((value, context) => {
  const issue = getMsiValidationIssue(value)
  if (issue) {
    context.addIssue({
      code: 'custom',
      path: [issue.path],
      message: issue.message,
    })
  }
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
