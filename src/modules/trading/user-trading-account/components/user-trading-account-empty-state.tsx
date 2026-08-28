// @/modules/trading/user-trading-account/components/user-trading-account-empty-state.tsx

'use client'

import {
  Plus,
  WalletCards,
} from 'lucide-react'

type UserTradingAccountEmptyStateProps = {
  canCreate: boolean
  onCreate: () => void
}

export function UserTradingAccountEmptyState({
  canCreate,
  onCreate,
}: UserTradingAccountEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-neutral-100">
        <WalletCards className="size-5 text-neutral-600" />
      </div>

      <h2 className="mt-4 font-semibold text-neutral-950">
        No tienes cuentas de trading
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500">
        Agrega una cuenta disponible para
        comenzar a registrar tus operaciones.
      </p>

      {canCreate && (
        <button
          type="button"
          onClick={onCreate}
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          <Plus className="size-4" />
          Agregar cuenta
        </button>
      )}
    </div>
  )
}