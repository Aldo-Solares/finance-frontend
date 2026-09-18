// @/modules/debts/card/components/card-edit-modal.tsx

'use client'

import { useActionState, useEffect } from 'react'

import { useFormStatus } from 'react-dom'

import { LoaderCircle, Save, X } from 'lucide-react'

import type { ActionState } from '@/core/utils/action-state'

import { updateCardAction } from '@/modules/debts/card/actions/card.actions'

import type { Card } from '@/modules/debts/card/schemas/card.schema'

type CardEditModalProps = {
  card: Card
  onClose: () => void
}

const initialState: ActionState<Card> = {
  success: false,
  message: null,
  data: null,
}

export function CardEditModal({ card, onClose }: CardEditModalProps) {
  const [state, action] = useActionState(updateCardAction, initialState)

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
        className="absolute inset-0 bg-foreground/55 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] border border-border bg-background shadow-2xl">
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div>
            <h2 className="font-semibold text-foreground">Editar tarjeta</h2>

            <p className="mt-1 text-sm text-text-muted">
              Modifica la información de la tarjeta del catálogo.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-text-muted hover:bg-surface"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form action={action}>
          <input type="hidden" name="cardId" value={card.cardId} />

          <div className="space-y-5 p-6">
            <div>
              <label
                htmlFor="bank"
                className="mb-2 block text-xs font-medium text-text-muted"
              >
                Banco
              </label>

              <input
                id="bank"
                name="bank"
                type="text"
                defaultValue={card.bank}
                required
                maxLength={100}
                placeholder="Ej. BBVA"
                className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none placeholder:text-text-muted focus:border-primary"
              />
            </div>

            <div>
              <label
                htmlFor="cardName"
                className="mb-2 block text-xs font-medium text-text-muted"
              >
                Nombre de la tarjeta
              </label>

              <input
                id="cardName"
                name="cardName"
                type="text"
                defaultValue={card.cardName}
                required
                maxLength={100}
                placeholder="Ej. Azul"
                className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none placeholder:text-text-muted focus:border-primary"
              />
            </div>

            {!state.success && state.message && (
              <div className="rounded-xl bg-primary-soft px-4 py-3 text-sm text-primary">
                {state.message}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-border bg-surface/60 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl px-4 py-2.5 text-sm text-text-muted hover:bg-surface"
            >
              Cancelar
            </button>

            <SaveButton />
          </div>
        </form>
      </div>
    </div>
  )
}

function SaveButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex min-w-36 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
    >
      {pending ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <Save className="h-4 w-4" />
      )}

      {pending ? 'Guardando...' : 'Guardar cambios'}
    </button>
  )
}
