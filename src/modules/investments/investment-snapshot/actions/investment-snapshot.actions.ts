// @/modules/investments/investment-snapshot/actions/investment-snapshot.actions.ts

'use server'

import { revalidatePath } from 'next/cache'

import {
  actionError,
  actionSuccess,
  type ActionState,
} from '@/core/utils/action-state'
import {
  CreateInvestmentSnapshotRequestSchema,
  UpdateInvestmentSnapshotRequestSchema,
  type InvestmentSnapshot,
} from '@/modules/investments/investment-snapshot/schemas/investment-snapshot.schema'
import {
  createInvestmentSnapshot,
  deleteInvestmentSnapshot,
  updateInvestmentSnapshot,
} from '@/modules/investments/investment-snapshot/services/investment-snapshot.service'

// ===================
// CREATE
// ===================

export async function createInvestmentSnapshotAction(
  _previousState: ActionState<InvestmentSnapshot>,
  formData: FormData,
): Promise<ActionState<InvestmentSnapshot>> {
  const parsed = CreateInvestmentSnapshotRequestSchema.safeParse({
    balanceDate: formData.get('balanceDate'),
    balance: Number(formData.get('balance')),
    contribution: Number(formData.get('contribution')),
    withdrawal: Number(formData.get('withdrawal')),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos del registro no son válidos',
    )
  }

  try {
    const snapshot = await createInvestmentSnapshot(parsed.data)

    revalidatePath('/investments')

    return actionSuccess(snapshot)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible crear el registro',
    )
  }
}

// ===================
// UPDATE
// ===================

export async function updateInvestmentSnapshotAction(
  _previousState: ActionState<InvestmentSnapshot>,
  formData: FormData,
): Promise<ActionState<InvestmentSnapshot>> {
  const investmentSnapshotId = Number(formData.get('investmentSnapshotId'))

  if (!Number.isInteger(investmentSnapshotId) || investmentSnapshotId <= 0) {
    return actionError('El registro de inversión no es válido')
  }

  const parsed = UpdateInvestmentSnapshotRequestSchema.safeParse({
    balanceDate: formData.get('balanceDate'),
    balance: Number(formData.get('balance')),
    contribution: Number(formData.get('contribution')),
    withdrawal: Number(formData.get('withdrawal')),
  })

  if (!parsed.success) {
    return actionError(
      parsed.error.issues[0]?.message ??
        'Los datos del registro no son válidos',
    )
  }

  try {
    const snapshot = await updateInvestmentSnapshot(
      investmentSnapshotId,
      parsed.data,
    )

    revalidatePath('/investments')

    return actionSuccess(snapshot)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible actualizar el registro',
    )
  }
}

// ===================
// DELETE
// ===================

export async function deleteInvestmentSnapshotAction(
  _previousState: ActionState<null>,
  formData: FormData,
): Promise<ActionState<null>> {
  const investmentSnapshotId = Number(formData.get('investmentSnapshotId'))

  if (!Number.isInteger(investmentSnapshotId) || investmentSnapshotId <= 0) {
    return actionError('El registro de inversión no es válido')
  }

  try {
    await deleteInvestmentSnapshot(investmentSnapshotId)

    revalidatePath('/investments')

    return actionSuccess(null)
  } catch (error) {
    return actionError(
      error instanceof Error
        ? error.message
        : 'No fue posible eliminar el registro',
    )
  }
}
