// @/modules/investments/investment-snapshot/components/investment-snapshot-delete-modal.tsx

'use client'

import {
  useActionState,
  useEffect,
} from 'react'

import { deleteInvestmentSnapshotAction } from '@/modules/investments/investment-snapshot/actions/investment-snapshot.actions'
import type { InvestmentSnapshot } from '@/modules/investments/investment-snapshot/schemas/investment-snapshot.schema'

type InvestmentSnapshotDeleteModalProps = {
  snapshot: InvestmentSnapshot
  onClose: () => void
}

const initialState = {
  success: false,
  message: null,
  data: null,
}

export function InvestmentSnapshotDeleteModal({
  snapshot,
  onClose,
}: InvestmentSnapshotDeleteModalProps) {
  const [state, formAction, pending] =
    useActionState(
      deleteInvestmentSnapshotAction,
      initialState,
    )

  useEffect(() => {
    if (state.success) {
      onClose()
    }
  }, [state.success, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-neutral-950">
          Eliminar actualización
        </h2>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          Los rendimientos posteriores serán recalculados automáticamente.
        </p>

        <form
          action={formAction}
          className="mt-6"
        >
          <input
            type="hidden"
            name="investmentSnapshotId"
            value={
              snapshot.investmentSnapshotId
            }
          />

          {!state.success &&
            state.message && (
              <p className="mb-4 text-sm text-red-600">
                {state.message}
              </p>
            )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="cursor-pointer rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-600"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={pending}
              className="cursor-pointer rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white"
            >
              {pending
                ? 'Eliminando...'
                : 'Eliminar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}