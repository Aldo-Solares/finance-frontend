// @/modules/trading/instrument/constants/instrument.constants.ts

// ===================
// INSTRUMENT TYPE
// ===================

export const INSTRUMENT_TYPE = {
  STOCK: 'STOCK',
} as const

// ===================
// INSTRUMENT TYPE VALUES
// ===================

export const INSTRUMENT_TYPE_VALUES = [INSTRUMENT_TYPE.STOCK] as const

// ===================
// INSTRUMENT TYPE LABELS
// ===================

export const INSTRUMENT_TYPE_LABELS = {
  [INSTRUMENT_TYPE.STOCK]: 'Acción',
} as const
