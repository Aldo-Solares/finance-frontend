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
} from '@/modules/trading/instrument/schemas/instrument.schema'
import { createInstrument } from '@/modules/trading/instrument/services/instrument.service'

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
