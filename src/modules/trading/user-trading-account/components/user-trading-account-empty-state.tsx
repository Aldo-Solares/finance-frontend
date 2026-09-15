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
    <div className="rounded-2xl border border-dashed border-border bg-background px-6 py-12 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-surface">
        <WalletCards className="size-5 text-text-muted" />
      </div>

      <h2 className="mt-4 font-semibold text-foreground">
        No tienes cuentas de trading
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm text-text-muted">
        Agrega una cuenta disponible para
        comenzar a registrar tus operaciones.
      </p>

      {canCreate && (
        <button
          type="button"
          onClick={onCreate}
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover"
        >
          <Plus className="size-4" />
          Agregar cuenta
        </button>
      )}
    </div>
  )
}