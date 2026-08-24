// @/modules/investments/investment-snapshot/schemas/investment-snapshot.schema.ts

import { z } from 'zod'

export const InvestmentSnapshotSchema = z.object({
  investmentSnapshotId: z.number().int(),
  balanceDate: z.string(),
  balance: z.number().nonnegative(),
  contribution: z.number().nonnegative(),
  withdrawal: z.number().nonnegative(),
  generatedAmount: z.number(),
})

export const InvestmentPerformanceSchema = z.object({
  currentBalance: z.number(),
  generatedLastPeriod: z.number(),
  generatedTotal: z.number(),
  totalContributions: z.number(),
  totalWithdrawals: z.number(),
  lastBalanceDate: z.string().nullable(),
})

export const CreateInvestmentSnapshotRequestSchema = z.object({
  balanceDate: z.string().min(1, 'La fecha es obligatoria'),

  balance: z.number().nonnegative('El saldo no puede ser negativo'),

  contribution: z.number().nonnegative('La aportación no puede ser negativa'),

  withdrawal: z.number().nonnegative('El retiro no puede ser negativo'),
})

export const UpdateInvestmentSnapshotRequestSchema =
  CreateInvestmentSnapshotRequestSchema

export type InvestmentSnapshot = z.infer<typeof InvestmentSnapshotSchema>

export type InvestmentPerformance = z.infer<typeof InvestmentPerformanceSchema>

export type CreateInvestmentSnapshotRequest = z.infer<
  typeof CreateInvestmentSnapshotRequestSchema
>

export type UpdateInvestmentSnapshotRequest = z.infer<
  typeof UpdateInvestmentSnapshotRequestSchema
>
