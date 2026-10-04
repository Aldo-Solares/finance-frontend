// @/modules/trading/instrument/schemas/instrument.schema.ts

import { z } from 'zod'

import { requiredNumber, requiredString } from '@/core/utils/zod-helpers'

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
  symbol: requiredString('El símbolo es obligatorio'),
  name: requiredString('El nombre del instrumento es obligatorio'),
  currencyId: requiredNumber('Selecciona una moneda', 'La moneda no es válida')
    .int('La moneda no es válida')
    .positive('La moneda no es válida'),
})

export type CreateInstrument = z.infer<typeof CreateInstrumentSchema>

// ===================
// UPDATE
// ===================

export const UpdateInstrumentSchema = z.object({
  symbol: requiredString('El símbolo es obligatorio'),
  name: requiredString('El nombre del instrumento es obligatorio'),
  currencyId: requiredNumber('Selecciona una moneda', 'La moneda no es válida')
    .int('La moneda no es válida')
    .positive('La moneda no es válida'),
})

export type UpdateInstrument = z.infer<typeof UpdateInstrumentSchema>
