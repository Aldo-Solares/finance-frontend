// @/modules/trading/instrument/actions/instrument.actions.ts

'use server'

import {
  ActionState,
  actionError,
  withActionState,
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
  deleteInstrument,
  updateInstrument,
} from '@/modules/trading/instrument/services/instrument.service'
import { revalidatePath } from 'next/cache'

// ===================
// CREATE
// ===================

export const createInstrumentAction = async (
  payload: CreateInstrument,
): Promise<ActionState<Instrument>> => {
  const result = CreateInstrumentSchema.safeParse(payload)

  if (!result.success) {
    return actionError(
      result.error.issues[0]?.message ??
        'Los datos del instrumento no son válidos',
    )
  }

  return withActionState(async () => {
    const instrument = await createInstrument(result.data)

    return instrument
  }, 'No fue posible crear el instrumento', 'Instrumento creado correctamente')
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
    return actionError(
      result.error.issues[0]?.message ??
        'Los datos del instrumento no son válidos',
    )
  }

  return withActionState(async () => {
    const instrument = await updateInstrument(instrumentId, result.data)

    return instrument
  }, 'No fue posible actualizar el instrumento', 'Instrumento actualizado correctamente')
}

// ===================
// DELETE INSTRUMENT
// ===================

export async function deleteInstrumentAction(instrumentId: number) {
  await deleteInstrument(instrumentId)

  revalidatePath('/', 'layout')
}
