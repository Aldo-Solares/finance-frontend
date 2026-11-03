// @/modules/debts/statement-entry/constants/statement-entry.constants.ts

import type { StatementEntryType } from '@/modules/debts/statement-entry/schemas/statement-entry.schema'

// ===================
// ENTRY TYPES
// ===================

const RECURRING_MERCHANTS = new Set([
  'netflix',
  'totalplay',
  'gimnasio',
  'smartfit',
  'spotify',
])

export function resolveStatementEntryType(
  category: string | null | undefined,
  merchant: string | null | undefined,
): StatementEntryType {
  const normalizedCategory = (category ?? '').trim().toLocaleLowerCase()
  const normalizedMerchant = (merchant ?? '')
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]/g, '')

  if (
    normalizedCategory === 'suscripciones' ||
    RECURRING_MERCHANTS.has(normalizedMerchant)
  ) {
    return 'RECURRING'
  }

  return 'PURCHASE'
}
