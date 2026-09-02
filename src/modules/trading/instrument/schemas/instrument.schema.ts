// @/modules/trading/instrument/schemas/instrument.schema.ts

import { z } from 'zod'

// ===================
// INSTRUMENT
// ===================

export const InstrumentSchema = z.object({
  instrumentId: z.number(),
  symbol: z.string(),
  name: z.string(),
  currencyId: z.number(),
  currencyCode: z.string(),
})

export type Instrument = z.infer<typeof InstrumentSchema>

// ===================
// CREATE
// ===================

export const CreateInstrumentSchema = z.object({
  symbol: z.string().min(1),
  name: z.string().min(1),
  currencyId: z.number(),
})

export type CreateInstrument = z.infer<typeof CreateInstrumentSchema>

// ===================
// UPDATE
// ===================

export const UpdateInstrumentSchema = z.object({
  symbol: z.string().min(1),
  name: z.string().min(1),
  currencyId: z.number(),
})

export type UpdateInstrument = z.infer<typeof UpdateInstrumentSchema>
