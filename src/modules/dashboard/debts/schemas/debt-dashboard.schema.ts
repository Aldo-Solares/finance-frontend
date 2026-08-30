// @/modules/dashboard/debts/schemas/debt-dashboard.schema.ts

import { z } from 'zod'

export const DebtDashboardStatusSchema = z.enum([
  'UPCOMING',
  'ACTIVE',
  'PAYMENT_PENDING',
  'CLOSED',
])

export const DebtDashboardFilterSchema = z.object({
  year: z.number().int().min(0).optional(),
  month: z.number().int().min(0).max(12).optional(),
  userCardId: z.number().int().positive().optional(),
  conceptId: z.number().int().positive().optional(),
  paid: z.boolean().optional(),
  status: DebtDashboardStatusSchema.optional(),
  debtor: z.string().trim().min(1).optional(),
})

export const DebtDashboardCardSchema = z.object({
  userCardId: z.number(),
  cardId: z.number(),
  bank: z.string(),
  cardName: z.string(),
  totalExpenses: z.number(),
  totalPaid: z.number(),
  totalPending: z.number(),
  totalEntries: z.number(),
  percentage: z.number(),
})

export const DebtDashboardConceptSchema = z.object({
  conceptId: z.number(),
  conceptName: z.string(),
  totalExpenses: z.number(),
  totalEntries: z.number(),
  percentage: z.number(),
})

export const DebtDashboardStatementSchema = z.object({
  statementId: z.number(),
  userCardId: z.number(),
  cardId: z.number(),
  bank: z.string(),
  cardName: z.string(),
  year: z.number(),
  month: z.number(),
  paymentDate: z.string().nullable(),
  paid: z.boolean(),
  status: DebtDashboardStatusSchema,
  totalExpenses: z.number(),
  totalPaid: z.number(),
  totalPending: z.number(),
  totalEntries: z.number(),
})

export const DebtDashboardSchema = z.object({
  year: z.number(),
  month: z.number(),
  totalExpenses: z.number(),
  totalPaid: z.number(),
  totalPending: z.number(),
  totalEntries: z.number(),
  averageExpense: z.number(),
  cards: z.array(DebtDashboardCardSchema),
  concepts: z.array(DebtDashboardConceptSchema),
  statements: z.array(DebtDashboardStatementSchema),
})

export type DebtDashboardStatus = z.infer<typeof DebtDashboardStatusSchema>

export type DebtDashboardFilter = z.infer<typeof DebtDashboardFilterSchema>

export type DebtDashboardCard = z.infer<typeof DebtDashboardCardSchema>

export type DebtDashboardConcept = z.infer<typeof DebtDashboardConceptSchema>

export type DebtDashboardStatement = z.infer<
  typeof DebtDashboardStatementSchema
>

export type DebtDashboard = z.infer<typeof DebtDashboardSchema>
