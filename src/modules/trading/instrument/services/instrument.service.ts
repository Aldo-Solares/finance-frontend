// @/modules/trading/instrument/services/instrument.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { createApiResponseSchema } from '@/core/schemas/api-response.schema'
import {
  CreateInstrument,
  Instrument,
  InstrumentSchema,
  UpdateInstrument,
} from '@/modules/trading/instrument/schemas/instrument.schema'

// ===================
// SCHEMAS
// ===================

const InstrumentResponseSchema = createApiResponseSchema(InstrumentSchema)

const InstrumentListResponseSchema = createApiResponseSchema(
  z.array(InstrumentSchema),
)

// ===================
// GET ALL
// ===================

export const getInstruments = async (): Promise<Instrument[]> => {
  const response = await fetchServer('/instruments')

  const json: unknown = await response.json()

  const parsed = InstrumentListResponseSchema.parse(json)

  if (!parsed.success || !parsed.data) {
    throw new Error(parsed.message ?? 'No fue posible obtener los instrumentos')
  }

  return parsed.data
}

// ===================
// CREATE
// ===================

export const createInstrument = async (
  payload: CreateInstrument,
): Promise<Instrument> => {
  const response = await fetchServer('/instruments', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const json: unknown = await response.json()

  const parsed = InstrumentResponseSchema.parse(json)

  if (!parsed.success || !parsed.data) {
    throw new Error(parsed.message ?? 'No fue posible crear el instrumento')
  }

  return parsed.data
}

// ===================
// UPDATE
// ===================

export const updateInstrument = async (
  instrumentId: number,
  payload: UpdateInstrument,
): Promise<Instrument> => {
  const response = await fetchServer(`/instruments/${instrumentId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

  const json: unknown = await response.json()

  const parsed = InstrumentResponseSchema.parse(json)

  if (!parsed.success || !parsed.data) {
    throw new Error(
      parsed.message ?? 'No fue posible actualizar el instrumento',
    )
  }

  return parsed.data
}
