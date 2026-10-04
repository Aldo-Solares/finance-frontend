// @/modules/trading/instrument/services/instrument.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { parseApiResponse } from '@/core/api/api-response'

import {
  CreateInstrument,
  Instrument,
  InstrumentSchema,
  UpdateInstrument,
} from '@/modules/trading/instrument/schemas/instrument.schema'

// ===================
// SCHEMAS
// ===================

const InstrumentResponseSchema = InstrumentSchema

const InstrumentListResponseSchema = z.array(InstrumentSchema)

// ===================
// GET ALL
// ===================

export const getInstruments = async (): Promise<Instrument[]> => {
  const response = await fetchServer('/instruments')

  return parseApiResponse(
    response,
    InstrumentListResponseSchema,
    'No fue posible obtener los instrumentos',
  )
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

  return parseApiResponse(
    response,
    InstrumentResponseSchema,
    'No fue posible crear el instrumento',
  )
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

  return parseApiResponse(
    response,
    InstrumentResponseSchema,
    'No fue posible actualizar el instrumento',
  )
}

// ===================
// DELETE
// ===================

export const deleteInstrument = async (instrumentId: number): Promise<void> => {
  await fetchServer(`/instruments/${instrumentId}`, {
    method: 'DELETE',
  })
}
