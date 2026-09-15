// @/modules/investments/investment-snapshot/components/investment-snapshot-create-modal.tsx

'use client'

import { useActionState, useEffect, useState } from 'react'

import { createInvestmentSnapshotAction } from '@/modules/investments/investment-snapshot/actions/investment-snapshot.actions'
import { DateInput } from '@/shared/inputs/date-input'
import { NumberInput } from '@/shared/inputs/number-input'

const initialState = {
  success: false,
  message: null,
  data: null,
}

type InvestmentSnapshotCreateModalProps = {
  onClose: () => void
}

export function InvestmentSnapshotCreateModal({
  onClose,
}: InvestmentSnapshotCreateModalProps) {
  const [balanceDate, setBalanceDate] = useState('')

  const [state, formAction, pending] = useActionState(
    createInvestmentSnapshotAction,
    initialState,
  )

  useEffect(() => {
    if (state.success) {
      onClose()
    }
  }, [state.success, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-background shadow-xl">
        <div className="border-b border-border px-6 py-5">
          <h2 className="text-lg font-semibold text-foreground">
            Actualizar SmartCash
          </h2>

          <p className="mt-1 text-sm text-text-muted">
            Indica cuánto tienes actualmente y si desde el registro anterior
            depositaste o retiraste dinero.
          </p>
        </div>

        <form action={formAction} className="space-y-5 p-6">
          <div>
            <label
              htmlFor="balanceDate"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Fecha
            </label>

            <DateInput
              id="balanceDate"
              name="balanceDate"
              value={balanceDate}
              onChange={setBalanceDate}
            />
          </div>

          <div>
            <label
              htmlFor="balance"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              ¿Cuánto tienes actualmente?
            </label>

            <NumberInput
              id="balance"
              name="balance"
              min={0}
              step={0.01}
              placeholder="0"
              required
            />
          </div>

          <div>
            <label
              htmlFor="contribution"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              ¿Cuánto depositaste desde la última actualización?
            </label>

            <NumberInput
              id="contribution"
              name="contribution"
              min={0}
              step={0.01}
              defaultValue={0}
              required
            />
          </div>

          <div>
            <label
              htmlFor="withdrawal"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              ¿Cuánto retiraste desde la última actualización?
            </label>

            <NumberInput
              id="withdrawal"
              name="withdrawal"
              min={0}
              step={0.01}
              defaultValue={0}
              required
            />
          </div>

          {!state.success && state.message && (
            <p className="rounded-xl bg-primary-soft px-3 py-2 text-sm text-primary">
              {state.message}
            </p>
          )}

          <div className="flex justify-end gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="cursor-pointer rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-text-muted transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={pending}
              className="cursor-pointer rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? 'Guardando...' : 'Guardar actualización'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
