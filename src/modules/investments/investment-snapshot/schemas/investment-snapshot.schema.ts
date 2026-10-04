// @/modules/investments/investment-snapshot/schemas/investment-snapshot.schema.ts

import { z } from 'zod'

import { requiredNumber, requiredString } from '@/core/utils/zod-helpers'

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
  balanceDate: requiredString('La fecha es obligatoria'),

  balance: requiredNumber('El saldo es obligatorio', 'El saldo debe ser válido')
    .nonnegative('El saldo no puede ser negativo'),

  contribution: requiredNumber(
    'La aportación es obligatoria',
    'La aportación debe ser válida',
  ).nonnegative('La aportación no puede ser negativa'),

  withdrawal: requiredNumber('El retiro es obligatorio', 'El retiro debe ser válido')
    .nonnegative('El retiro no puede ser negativo'),
})

export const UpdateInvestmentSnapshotRequestSchema = z.object({
  balanceDate: requiredString('La fecha es obligatoria'),

  balance: requiredNumber('El saldo es obligatorio', 'El saldo debe ser válido')
    .nonnegative('El saldo no puede ser negativo'),

  contribution: requiredNumber(
    'La aportación es obligatoria',
    'La aportación debe ser válida',
  ).nonnegative('La aportación no puede ser negativa'),

  withdrawal: requiredNumber('El retiro es obligatorio', 'El retiro debe ser válido')
    .nonnegative('El retiro no puede ser negativo'),
})

export type InvestmentSnapshot = z.infer<typeof InvestmentSnapshotSchema>

export type InvestmentPerformance = z.infer<typeof InvestmentPerformanceSchema>

export type CreateInvestmentSnapshotRequest = z.infer<
  typeof CreateInvestmentSnapshotRequestSchema
>

export type UpdateInvestmentSnapshotRequest = z.infer<
  typeof UpdateInvestmentSnapshotRequestSchema
>
