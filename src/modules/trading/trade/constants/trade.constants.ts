// @/modules/trading/trade/constants/trade.constants.ts

// ===================
// TRADE STATUS
// ===================

export const TRADE_STATUS = {
  OPEN: 'OPEN',
  PARTIALLY_SOLD: 'PARTIALLY_SOLD',
  CLOSED: 'CLOSED',
} as const

// ===================
// TRADE STATUS VALUES
// ===================

export const TRADE_STATUS_VALUES = [
  TRADE_STATUS.OPEN,
  TRADE_STATUS.PARTIALLY_SOLD,
  TRADE_STATUS.CLOSED,
] as const

// ===================
// TRADE STATUS LABELS
// ===================

export const TRADE_STATUS_LABELS = {
  [TRADE_STATUS.OPEN]: 'Abierta',
  [TRADE_STATUS.PARTIALLY_SOLD]: 'Venta parcial',
  [TRADE_STATUS.CLOSED]: 'Cerrada',
} as const
