// @/modules/debts/statement/components/statement-create-modal.tsx

'use client'

import { CalendarDays, LoaderCircle, Plus, X } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

import type { ActionState } from '@/core/utils/action-state'
import {
  createStatementAction,
  getStatementDateSuggestionAction,
} from '@/modules/debts/statement/actions/statement.actions'
import type { Statement } from '@/modules/debts/statement/schemas/statement.schema'
import type { UserCard } from '@/modules/debts/user-card/schemas/user-card.schema'
import { DateInput } from '@/shared/inputs/date-input'
import { SelectInput } from '@/shared/inputs/select-input'

type StatementCreateModalProps = {
  userCards: UserCard[]
  selectedUserCardId: number | null
  onClose: () => void
}

const initialState: ActionState<Statement> = {
  success: false,
  message: null,
  data: null,
}

export function StatementCreateModal({
  userCards,
  selectedUserCardId,
  onClose,
}: StatementCreateModalProps) {
  const initialUserCardId = selectedUserCardId ?? userCards[0]?.userCardId ?? 0

  const [userCardId, setUserCardId] = useState(initialUserCardId)

  const [periodStart, setPeriodStart] = useState('')

  const [periodEnd, setPeriodEnd] = useState('')

  const [paymentDate, setPaymentDate] = useState('')

  const [state, action] = useActionState(createStatementAction, initialState)

  useEffect(() => {
    if (userCardId <= 0) {
      return
    }

    let cancelled = false

    async function loadSuggestion() {
      const result = await getStatementDateSuggestionAction(userCardId)

      if (cancelled) {
        return
      }

      if (!result.success || result.data === null) {
        return
      }

      setPeriodStart(result.data.periodStart ?? '')

      setPeriodEnd(result.data.periodEnd ?? '')

      setPaymentDate(result.data.paymentDate ?? '')
    }

    void loadSuggestion()

    return () => {
      cancelled = true
    }
  }, [userCardId])

  useEffect(() => {
    if (state.success) {
      onClose()
    }
  }, [state.success, onClose])

  const userCardOptions = userCards.map((userCard) => ({
    value: userCard.userCardId,
    label: `${userCard.bank} · ${userCard.cardName}`,
  }))

  const handleUserCardChange = (value: string) => {
    const nextUserCardId = Number(value)

    setUserCardId(nextUserCardId)

    setPeriodStart('')
    setPeriodEnd('')
    setPaymentDate('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar modal"
        className="absolute inset-0 cursor-default bg-foreground/55 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[2rem] border border-border bg-background shadow-2xl">
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Plus className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                  Estado de cuenta
                </p>

                <h2 className="mt-0.5 text-xl font-semibold tracking-tight text-foreground">
                  Nuevo periodo
                </h2>
              </div>
            </div>

            <p className="mt-3 text-sm text-text-muted">
              Registra las fechas del periodo.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-text-muted transition hover:bg-surface hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form action={action}>
          <div className="space-y-5 p-6">
            <div>
              <FieldLabel htmlFor="create-user-card-id">Tarjeta</FieldLabel>

              <SelectInput
                id="create-user-card-id"
                name="userCardId"
                options={userCardOptions}
                value={String(userCardId)}
                onChange={handleUserCardChange}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <DateField
                id="create-period-start"
                name="periodStart"
                label="Inicio"
                value={periodStart}
                onChange={setPeriodStart}
              />

              <DateField
                id="create-period-end"
                name="periodEnd"
                label="Corte"
                value={periodEnd}
                onChange={setPeriodEnd}
              />

              <DateField
                id="create-payment-date"
                name="paymentDate"
                label="Fecha de pago"
                value={paymentDate}
                onChange={setPaymentDate}
              />
            </div>

            {periodEnd && (
              <div className="rounded-2xl border border-border bg-surface px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                  Periodo
                </p>

                <p className="mt-1 text-sm font-semibold text-foreground">
                  {formatStatementPeriod(periodEnd)}
                </p>
              </div>
            )}

            {!state.success && state.message && (
              <div className="rounded-xl border border-primary bg-primary-soft px-4 py-3 text-sm text-primary">
                {state.message}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 border-t border-border bg-surface/60 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium text-text-muted transition hover:bg-surface hover:text-foreground"
            >
              Cancelar
            </button>

            <CreateButton />
          </div>
        </form>
      </div>
    </div>
  )
}

type DateFieldProps = {
  id: string
  name: string
  label: string
  value: string
  onChange: (value: string) => void
}

function DateField({ id, name, label, value, onChange }: DateFieldProps) {
  return (
    <div className="min-w-0">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <DateInput id={id} name={name} value={value} onChange={onChange} />
    </div>
  )
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-xs font-medium text-text-muted"
    >
      {children}
    </label>
  )
}

function CreateButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex min-w-36 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <Plus className="h-4 w-4" />
      )}

      {pending ? 'Guardando...' : 'Crear periodo'}
    </button>
  )
}

function formatStatementPeriod(periodEnd: string): string {
  const [year, month] = periodEnd.split('-').map(Number)

  if (!year || !month) {
    return ''
  }

  const date = new Date(year, month - 1, 1)

  const monthName = new Intl.DateTimeFormat('es-MX', {
    month: 'long',
  }).format(date)

  return `${monthName.charAt(0).toUpperCase()}${monthName.slice(1)} ${year}`
}
