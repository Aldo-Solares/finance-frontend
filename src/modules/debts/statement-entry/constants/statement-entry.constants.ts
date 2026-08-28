// @/modules/debts/statement-entry/constants/statement-entry.constants.ts

import type { StatementEntryType } from '@/modules/debts/statement-entry/schemas/statement-entry.schema'

// ===================
// ENTRY TYPES
// ===================

export const STATEMENT_ENTRY_TYPE_OPTIONS: {
  value: StatementEntryType
  label: string
}[] = [
  {
    value: 'PURCHASE',
    label: 'Compra',
  },
  {
    value: 'RECURRING',
    label: 'Recurrente',
  },
]
