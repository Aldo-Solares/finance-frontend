// @/modules/trading/instrument/actions/instrument.actions.ts

'use server'

import {
  ActionState,
  actionError,
  actionSuccess,
} from '@/core/utils/action-state'
import {
  CreateInstrument,
  CreateInstrumentSchema,
  Instrument,
  UpdateInstrument,
  UpdateInstrumentSchema,
} from '@/modules/trading/instrument/schemas/instrument.schema'
import {
  createInstrument,
  updateInstrument,
} from '@/modules/trading/instrument/services/instrument.service'

// ===================
// CREATE
// ===================

export const createInstrumentAction = async (
  payload: CreateInstrument,
): Promise<ActionState<Instrument>> => {
  const result = CreateInstrumentSchema.safeParse(payload)

  if (!result.success) {
    return actionError<Instrument>('Los datos del instrumento no son válidos')
  }

  try {
    const instrument = await createInstrument(result.data)

    return actionSuccess(instrument, 'Instrumento creado correctamente')
  } catch (error) {
    return actionError<Instrument>(
      error instanceof Error
        ? error.message
        : 'No fue posible crear el instrumento',
    )
  }
}

// ===================
// UPDATE
// ===================

export const updateInstrumentAction = async (
  instrumentId: number,
  payload: UpdateInstrument,
): Promise<ActionState<Instrument>> => {
  const result = UpdateInstrumentSchema.safeParse(payload)

  if (!result.success) {
    return actionError<Instrument>('Los datos del instrumento no son válidos')
  }

  try {
    const instrument = await updateInstrument(instrumentId, result.data)

    return actionSuccess(instrument, 'Instrumento actualizado correctamente')
  } catch (error) {
    return actionError<Instrument>(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar el instrumento',
    )
  }
}
