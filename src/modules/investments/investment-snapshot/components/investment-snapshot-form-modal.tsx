// @/modules/investments/investment-snapshot/components/investment-snapshot-form-modal.tsx

'use client'

import {
  useActionState,
  useEffect,
} from 'react'

import {
  createInvestmentSnapshotAction,
  updateInvestmentSnapshotAction,
} from '@/modules/investments/investment-snapshot/actions/investment-snapshot.actions'
import type { InvestmentSnapshot } from '@/modules/investments/investment-snapshot/schemas/investment-snapshot.schema'

type InvestmentSnapshotFormModalProps = {
  snapshot: InvestmentSnapshot | null
  onClose: () => void
}

const initialState = {
  success: false,
  message: null,
  data: null,
}

export function InvestmentSnapshotFormModal({
  snapshot,
  onClose,
}: InvestmentSnapshotFormModalProps) {
  const isEditing = snapshot !== null

  const action = isEditing
    ? updateInvestmentSnapshotAction
    : createInvestmentSnapshotAction

  const [state, formAction, pending] =
    useActionState(
      action,
      initialState,
    )

  useEffect(() => {
    if (state.success) {
      onClose()
    }
  }, [state.success, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="border-b border-neutral-100 px-6 py-5">
          <h2 className="text-lg font-semibold text-neutral-950">
            {isEditing
              ? 'Editar actualización'
              : 'Actualizar SmartCash'}
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Indica cuánto tienes actualmente y si desde el registro anterior depositaste o retiraste dinero.
          </p>
        </div>

        <form
          action={formAction}
          className="space-y-5 p-6"
        >
          {snapshot && (
            <input
              type="hidden"
              name="investmentSnapshotId"
              value={
                snapshot.investmentSnapshotId
              }
            />
          )}

          <div>
            <label
              htmlFor="balanceDate"
              className="text-sm font-medium text-neutral-700"
            >
              Fecha
            </label>

            <input
              id="balanceDate"
              name="balanceDate"
              type="date"
              required
              defaultValue={
                snapshot?.balanceDate ?? ''
              }
              className="mt-2 w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-400"
            />
          </div>

          <div>
            <label
              htmlFor="balance"
              className="text-sm font-medium text-neutral-700"
            >
              ¿Cuánto tienes actualmente?
            </label>

            <input
              id="balance"
              name="balance"
              type="number"
              min="0"
              step="0.01"
              required
              defaultValue={
                snapshot?.balance ?? ''
              }
              className="mt-2 w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-400"
            />
          </div>

          <div>
            <label
              htmlFor="contribution"
              className="text-sm font-medium text-neutral-700"
            >
              ¿Cuánto depositaste desde la última actualización?
            </label>

            <input
              id="contribution"
              name="contribution"
              type="number"
              min="0"
              step="0.01"
              required
              defaultValue={
                snapshot?.contribution ?? 0
              }
              className="mt-2 w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-400"
            />
          </div>

          <div>
            <label
              htmlFor="withdrawal"
              className="text-sm font-medium text-neutral-700"
            >
              ¿Cuánto retiraste desde la última actualización?
            </label>

            <input
              id="withdrawal"
              name="withdrawal"
              type="number"
              min="0"
              step="0.01"
              required
              defaultValue={
                snapshot?.withdrawal ?? 0
              }
              className="mt-2 w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-400"
            />
          </div>

          {!state.success &&
            state.message && (
              <p className="text-sm text-red-600">
                {state.message}
              </p>
            )}

          <div className="flex justify-end gap-3 border-t border-neutral-100 pt-5">
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
              className="cursor-pointer rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
            >
              {pending
                ? 'Guardando...'
                : 'Guardar actualización'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}