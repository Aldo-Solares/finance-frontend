// @/modules/trading/user-trading-account/components/user-trading-account-empty-state.tsx

import { WalletCards } from 'lucide-react'

type UserTradingAccountEmptyStateProps = {
  canCreate: boolean
}

export function UserTradingAccountEmptyState({
  canCreate,
}: UserTradingAccountEmptyStateProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-6 py-14 sm:px-10 sm:py-16">
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-primary/[0.05] blur-3xl" />

      <div className="relative mx-auto flex max-w-lg flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background text-text-muted">
          <WalletCards className="h-6 w-6" />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
          Sin cuentas
        </p>

        <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          Aún no tienes cuentas
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-text-muted">
          {canCreate
            ? 'Agrega una cuenta disponible para organizar las operaciones de trading.'
            : 'No hay cuentas disponibles en el catálogo para asociar en este momento.'}
        </p>
      </div>
    </div>
  )
}
