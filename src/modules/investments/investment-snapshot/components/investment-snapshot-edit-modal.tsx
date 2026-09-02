// @/modules/investments/investment-snapshot/components/investment-snapshot-edit-modal.tsx

'use client'

import { useActionState, useEffect, useState } from 'react'

import { updateInvestmentSnapshotAction } from '@/modules/investments/investment-snapshot/actions/investment-snapshot.actions'
import type { InvestmentSnapshot } from '@/modules/investments/investment-snapshot/schemas/investment-snapshot.schema'
import { DateInput } from '@/shared/inputs/date-input'
import { NumberInput } from '@/shared/inputs/number-input'

const initialState = {
  success: false,
  message: null,
  data: null,
}

type InvestmentSnapshotEditModalProps = {
  snapshot: InvestmentSnapshot
  onClose: () => void
}

export function InvestmentSnapshotEditModal({
  snapshot,
  onClose,
}: InvestmentSnapshotEditModalProps) {
  const [balanceDate, setBalanceDate] = useState(snapshot.balanceDate)

  const [balance, setBalance] = useState(String(snapshot.balance))

  const [contribution, setContribution] = useState(
    String(snapshot.contribution),
  )

  const [withdrawal, setWithdrawal] = useState(String(snapshot.withdrawal))

  const [state, action] = useActionState(
    updateInvestmentSnapshotAction,
    initialState,
  )

  useEffect(() => {
    if (state.success) {
      onClose()
    }
  }, [state.success, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar modal"
        className="absolute inset-0 cursor-default bg-neutral-950/55 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-neutral-100 px-6 py-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
              Inversiones
            </p>

            <h2 className="mt-0.5 text-xl font-semibold tracking-tight text-neutral-950">
              Editar actualización
            </h2>

            <p className="mt-3 text-sm text-neutral-400">
              Modifica los datos de esta actualización de SmartCash.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={state.success}
            aria-label="Cerrar"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ×
          </button>
        </div>

        <form action={action}>
          <input
            type="hidden"
            name="investmentSnapshotId"
            value={snapshot.investmentSnapshotId}
          />

          <div className="space-y-5 p-6">
            <div>
              <label
                htmlFor="edit-balance-date"
                className="mb-2 block text-xs font-medium text-neutral-500"
              >
                Fecha
              </label>

              <DateInput
                id="edit-balance-date"
                name="balanceDate"
                value={balanceDate}
                onChange={setBalanceDate}
              />
            </div>

            <div>
              <label
                htmlFor="edit-balance"
                className="mb-2 block text-xs font-medium text-neutral-500"
              >
                ¿Cuánto tienes actualmente?
              </label>

              <NumberInput
                id="edit-balance"
                name="balance"
                min={0}
                step={0.01}
                value={balance}
                onChange={setBalance}
                required
              />
            </div>

            <div>
              <label
                htmlFor="edit-contribution"
                className="mb-2 block text-xs font-medium text-neutral-500"
              >
                ¿Cuánto depositaste desde la última actualización?
              </label>

              <NumberInput
                id="edit-contribution"
                name="contribution"
                min={0}
                step={0.01}
                value={contribution}
                onChange={setContribution}
                required
              />
            </div>

            <div>
              <label
                htmlFor="edit-withdrawal"
                className="mb-2 block text-xs font-medium text-neutral-500"
              >
                ¿Cuánto retiraste desde la última actualización?
              </label>

              <NumberInput
                id="edit-withdrawal"
                name="withdrawal"
                min={0}
                step={0.01}
                value={withdrawal}
                onChange={setWithdrawal}
                required
              />
            </div>

            {!state.success && state.message && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                {state.message}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 border-t border-neutral-100 bg-neutral-50/60 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-500 transition hover:bg-neutral-200 hover:text-neutral-800"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={false}
              className="cursor-pointer rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
