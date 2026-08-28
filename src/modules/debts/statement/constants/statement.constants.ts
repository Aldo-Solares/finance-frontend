// @/modules/debts/statement/constants/statement.constants.ts

// ===================
// STATEMENT STATUS
// ===================

export const STATEMENT_STATUS = {
  UPCOMING: 'UPCOMING',
  ACTIVE: 'ACTIVE',
  PAYMENT_PENDING: 'PAYMENT_PENDING',
  CLOSED: 'CLOSED',
} as const

// ===================
// STATUS VALUES
// ===================

export const STATEMENT_STATUS_VALUES = [
  STATEMENT_STATUS.UPCOMING,
  STATEMENT_STATUS.ACTIVE,
  STATEMENT_STATUS.PAYMENT_PENDING,
  STATEMENT_STATUS.CLOSED,
] as const

// ===================
// STATUS LABELS
// ===================

export const STATEMENT_STATUS_LABELS = {
  [STATEMENT_STATUS.UPCOMING]: 'Próximo',
  [STATEMENT_STATUS.ACTIVE]: 'Activo',
  [STATEMENT_STATUS.PAYMENT_PENDING]: 'Pago pendiente',
  [STATEMENT_STATUS.CLOSED]: 'Cerrado',
} as const
