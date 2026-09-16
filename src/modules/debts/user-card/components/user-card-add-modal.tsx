// @/modules/debts/user-card/components/user-card-add-modal.tsx

'use client'

import { CreditCard, Plus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'

import { createUserCardAction } from '@/modules/debts/user-card/actions/user-card.action'
import type { Card } from '@/modules/debts/card/schemas/card.schema'

type UserCardAddModalProps = {
  cards: Card[]
  onClose: () => void
}

export function UserCardAddModal({ cards, onClose }: UserCardAddModalProps) {
  const router = useRouter()

  const [cardId, setCardId] = useState(cards[0]?.cardId ?? 0)
  const [active, setActive] = useState(true)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setPending(true)
    setError(null)

    try {
      await createUserCardAction({
        cardId,
        active,
      })

      onClose()
      router.refresh()
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'No fue posible agregar la tarjeta.',
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        disabled={pending}
        aria-label="Cerrar"
        className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] border border-border bg-background shadow-2xl">
        {/* HEADER */}

        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div className="flex min-w-0 gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <CreditCard className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                Tarjetas
              </p>

              <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                Agregar tarjeta
              </h2>

              <p className="mt-1 text-sm leading-5 text-text-muted">
                Selecciona una tarjeta del catálogo para asociarla a tu cuenta.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            aria-label="Cerrar"
            className={[
              'flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl',
              'text-text-muted transition-colors',
              'hover:bg-surface hover:text-foreground',
              'disabled:cursor-not-allowed disabled:opacity-50',
            ].join(' ')}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 p-6">
            <div>
              <label
                htmlFor="user-card"
                className="mb-2 block text-xs font-semibold text-foreground"
              >
                Tarjeta del catálogo
              </label>

              <select
                id="user-card"
                value={cardId}
                onChange={(event) => setCardId(Number(event.target.value))}
                disabled={pending || cards.length === 0}
                required
                className={[
                  'h-12 w-full rounded-xl border border-border',
                  'bg-surface px-4 text-sm text-foreground',
                  'outline-none transition-all',
                  'focus:border-primary focus:ring-2 focus:ring-primary/10',
                  'disabled:cursor-not-allowed disabled:opacity-60',
                ].join(' ')}
              >
                {cards.map((card) => (
                  <option key={card.cardId} value={card.cardId}>
                    {card.bank} · {card.cardName}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-4">
              <label className="flex cursor-pointer items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    Tarjeta activa
                  </p>

                  <p className="mt-1 text-xs leading-5 text-text-muted">
                    La tarjeta estará disponible para estados de cuenta y
                    movimientos.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={active}
                  onChange={(event) => setActive(event.target.checked)}
                  disabled={pending}
                  className="peer sr-only"
                />

                <span className="relative h-6 w-11 shrink-0 rounded-full border border-border bg-background transition-colors peer-checked:border-primary peer-checked:bg-primary after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-foreground after:transition-transform peer-checked:after:translate-x-5 peer-checked:after:bg-primary-foreground" />
              </label>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-primary/20 bg-primary-soft px-4 py-3 text-sm text-primary"
              >
                {error}
              </div>
            )}
          </div>

          {/* FOOTER */}

          <div className="flex flex-col-reverse gap-2 border-t border-border bg-surface/60 px-6 py-4 sm:flex-row sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className={[
                'h-11 cursor-pointer rounded-xl px-4',
                'text-sm font-medium text-text-muted',
                'transition-colors',
                'hover:bg-surface hover:text-foreground',
                'disabled:cursor-not-allowed disabled:opacity-50',
              ].join(' ')}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={pending || cards.length === 0}
              className={[
                'inline-flex h-11 min-w-36 cursor-pointer items-center',
                'justify-center gap-2 rounded-xl bg-foreground px-5',
                'text-sm font-semibold text-background',
                'transition-all duration-200',
                'hover:-translate-y-0.5 hover:opacity-90',
                'disabled:cursor-not-allowed disabled:opacity-50',
              ].join(' ')}
            >
              <Plus className="h-4 w-4" />

              {pending ? 'Agregando...' : 'Agregar tarjeta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
