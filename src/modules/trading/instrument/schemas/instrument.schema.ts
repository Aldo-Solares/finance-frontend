// @/modules/trading/instrument/schemas/instrument.schema.ts

import { z } from 'zod'

import { INSTRUMENT_TYPE_VALUES } from '@/modules/trading/instrument/constants/instrument.constants'

// ===================
// TYPE
// ===================

export const InstrumentTypeSchema = z.enum(INSTRUMENT_TYPE_VALUES)

export type InstrumentType = z.infer<typeof InstrumentTypeSchema>

// ===================
// INSTRUMENT
// ===================

export const InstrumentSchema = z.object({
  instrumentId: z.number(),
  symbol: z.string(),
  name: z.string(),
  type: InstrumentTypeSchema,
  currency: z.string(),
})

export type Instrument = z.infer<typeof InstrumentSchema>

// ===================
// CREATE
// ===================

export const CreateInstrumentSchema = z.object({
  symbol: z.string().min(1),
  name: z.string().min(1),
  type: InstrumentTypeSchema,
  currency: z.string().min(1),
})

export type CreateInstrument = z.infer<typeof CreateInstrumentSchema>
