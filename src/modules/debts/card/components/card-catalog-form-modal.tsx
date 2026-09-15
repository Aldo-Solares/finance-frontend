// @/modules/debts/card/components/card-catalog-form-modal.tsx

'use client'

import {
  useActionState,
  useEffect,
} from 'react'
import { useFormStatus } from 'react-dom'
import {
  LoaderCircle,
  Plus,
  Save,
  X,
} from 'lucide-react'

import type { ActionState } from '@/core/utils/action-state'
import {
  createCardAction,
  updateCardAction,
} from '@/modules/debts/card/actions/card.actions'
import type { Card } from '@/modules/debts/card/schemas/card.schema'

type CardCatalogFormModalProps = {
  card: Card | null
  onClose: () => void
}

const initialState: ActionState<Card> = {
  success: false,
  message: null,
  data: null,
}

export function CardCatalogFormModal({
  card,
  onClose,
}: CardCatalogFormModalProps) {
  const editing = card !== null

  const [
    createState,
    createAction,
  ] = useActionState(
    createCardAction,
    initialState,
  )

  const [
    updateState,
    updateAction,
  ] = useActionState(
    updateCardAction,
    initialState,
  )

  const state = editing
    ? updateState
    : createState

  const action = editing
    ? updateAction
    : createAction

  useEffect(() => {
    if (state.success) {
      onClose()
    }
  }, [
    state.success,
    onClose,
  ])

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
            <h2 className="font-semibold text-foreground">
              {editing
                ? 'Editar tarjeta'
                : 'Nueva tarjeta'}
            </h2>

            <p className="mt-1 text-sm text-text-muted">
              {editing
                ? 'Modifica la información de la tarjeta del catálogo.'
                : 'Agrega una tarjeta al catálogo global.'}
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
          {editing && (
            <input
              type="hidden"
              name="cardId"
              value={card.cardId}
            />
          )}

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
                defaultValue={
                  card?.bank ?? ''
                }
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
                defaultValue={
                  card?.cardName ?? ''
                }
                required
                maxLength={100}
                placeholder="Ej. Azul"
                className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none placeholder:text-text-muted focus:border-primary"
              />
            </div>

            <div className="rounded-xl border border-border bg-surface px-4 py-3">
              <label className="flex cursor-pointer items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Tarjeta activa
                  </p>

                  <p className="mt-0.5 text-xs text-text-muted">
                    Las tarjetas activas pueden ser seleccionadas por los usuarios.
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="activeCheckbox"
                  defaultChecked={
                    card?.active ?? true
                  }
                  className="peer sr-only"
                />

                <span className="relative h-6 w-11 shrink-0 rounded-full bg-surface transition-colors peer-checked:bg-primary after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-background after:transition-transform peer-checked:after:translate-x-5" />
              </label>

              <ActiveValueInput
                defaultActive={
                  card?.active ?? true
                }
              />
            </div>

            {!state.success &&
              state.message && (
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

            <SaveButton
              editing={editing}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

function ActiveValueInput({
  defaultActive,
}: {
  defaultActive: boolean
}) {
  return (
    <>
      <input
        type="hidden"
        name="active"
        value={
          defaultActive
            ? 'true'
            : 'false'
        }
      />

      <script
        dangerouslySetInnerHTML={{
          __html: '',
        }}
      />
    </>
  )
}

function SaveButton({
  editing,
}: {
  editing: boolean
}) {
  const { pending } =
    useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex min-w-36 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
    >
      {pending ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : editing ? (
        <Save className="h-4 w-4" />
      ) : (
        <Plus className="h-4 w-4" />
      )}

      {pending
        ? 'Guardando...'
        : editing
          ? 'Guardar cambios'
          : 'Crear tarjeta'}
    </button>
  )
}
