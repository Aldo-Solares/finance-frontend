// @/modules/trading/trading-account/components/trading-account-delete-modal.tsx

'use client'

import { AlertTriangle, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { deleteTradingAccountAction } from '@/modules/trading/trading-account/actions/trading-account.actions'
import type { TradingAccount } from '@/modules/trading/trading-account/schemas/trading-account.schema'

type TradingAccountDeleteModalProps = {
  tradingAccount: TradingAccount
  onClose: () => void
}

export const TradingAccountDeleteModal = ({
  tradingAccount,
  onClose,
}: TradingAccountDeleteModalProps) => {
  const router = useRouter()

  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setPending(true)
    setError(null)

    try {
      const result = await deleteTradingAccountAction(
        tradingAccount.tradingAccountId,
      )

      if (!result.success) {
        setError(result.message ?? 'No fue posible eliminar la cuenta')
        return
      }

      onClose()
      router.refresh()
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/55 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
        <div className="flex items-start justify-between gap-4 p-6">
          <div className="flex min-w-0 gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <AlertTriangle className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Eliminar cuenta
              </h2>

              <p className="mt-2 text-sm leading-6 text-text-muted">
                ¿Seguro que quieres eliminar{' '}
                <span className="font-medium text-foreground">
                  {tradingAccount.name}
                </span>
                ?
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className={[
              'flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center',
              'rounded-lg text-text-muted transition-colors duration-200',
              'hover:bg-surface hover:text-foreground',
              'disabled:cursor-not-allowed disabled:opacity-50',
            ].join(' ')}
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="px-6 pb-2">
            <p className="rounded-xl border border-border bg-primary-soft px-3 py-2 text-sm text-primary">
              {error}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3 border-t border-border px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className={[
              'h-10 cursor-pointer rounded-xl border border-border',
              'bg-background px-4 text-sm font-medium text-text-muted',
              'transition-colors duration-200',
              'hover:bg-surface hover:text-foreground',
              'disabled:cursor-not-allowed disabled:opacity-50',
            ].join(' ')}
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={pending}
            className={[
              'h-10 cursor-pointer rounded-xl bg-primary px-4',
              'text-sm font-semibold text-primary-foreground',
              'transition-colors duration-200',
              'hover:bg-primary-hover',
              'disabled:cursor-not-allowed disabled:opacity-50',
            ].join(' ')}
          >
            {pending ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  )
}
