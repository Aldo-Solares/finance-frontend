// @/modules/debts/user-card/components/user-card-form-modal.tsx

'use client'

import {
  Plus,
  X,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  type FormEvent,
  useState,
} from 'react'

import type { Card } from '@/modules/debts/card/schemas/card.schema'
import { createUserCardAction } from '@/modules/debts/user-card/actions/user-card.action'

type UserCardFormModalProps = {
  cards: Card[]
  onClose: () => void
}

export function UserCardFormModal({
  cards,
  onClose,
}: UserCardFormModalProps) {
  const router = useRouter()

  const [cardId, setCardId] = useState(
    cards[0]?.cardId ?? 0,
  )

  const [active, setActive] =
    useState(true)

  const [pending, setPending] =
    useState(false)

  const [error, setError] =
    useState<string | null>(null)

  // ===================
  // SUBMIT
  // ===================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
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
        className="absolute inset-0 bg-foreground/55 backdrop-blur-sm"
        aria-label="Cerrar"
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] border border-border bg-background shadow-2xl">
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div>
            <h2 className="font-semibold text-foreground">
              Agregar tarjeta
            </h2>

            <p className="mt-1 text-sm text-text-muted">
              Selecciona una tarjeta del catálogo para agregarla a tu cuenta.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-text-muted transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 p-6">
            <div>
              <label
                htmlFor="user-card"
                className="mb-2 block text-xs font-medium text-text-muted"
              >
                Tarjeta
              </label>

              <select
                id="user-card"
                value={cardId}
                onChange={(event) =>
                  setCardId(
                    Number(
                      event.target.value,
                    ),
                  )
                }
                disabled={pending}
                required
                className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition focus:border-primary"
              >
                {cards.map((card) => (
                  <option
                    key={card.cardId}
                    value={card.cardId}
                  >
                    {card.bank} ·{' '}
                    {card.cardName}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-xl border border-border bg-surface px-4 py-3">
              <label className="flex cursor-pointer items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Tarjeta activa
                  </p>

                  <p className="mt-0.5 text-xs text-text-muted">
                    La tarjeta estará disponible para estados de cuenta y movimientos.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={active}
                  onChange={(event) =>
                    setActive(
                      event.target.checked,
                    )
                  }
                  disabled={pending}
                  className="peer sr-only"
                />

                <span className="relative h-6 w-11 shrink-0 rounded-full bg-surface transition-colors peer-checked:bg-primary after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-background after:transition-transform peer-checked:after:translate-x-5" />
              </label>
            </div>

            {error && (
              <div className="rounded-xl bg-primary-soft px-4 py-3 text-sm text-primary">
                {error}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-border bg-surface/60 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="cursor-pointer rounded-xl px-4 py-2.5 text-sm text-text-muted transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={
                pending ||
                cards.length === 0
              }
              className="flex min-w-36 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus className="h-4 w-4" />

              {pending
                ? 'Agregando...'
                : 'Agregar tarjeta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
