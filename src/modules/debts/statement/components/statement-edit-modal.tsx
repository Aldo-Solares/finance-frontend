// @/modules/debts/statement/components/statement-edit-modal.tsx

'use client'

import { CalendarDays, LoaderCircle, Save, X } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

import type { ActionState } from '@/core/utils/action-state'
import { updateStatementAction } from '@/modules/debts/statement/actions/statement.actions'
import type { Statement } from '@/modules/debts/statement/schemas/statement.schema'
import type { UserCard } from '@/modules/debts/user-card/schemas/user-card.schema'
import { DateInput } from '@/shared/inputs/date-input'
import { SelectInput } from '@/shared/inputs/select-input'
import { TextInput } from '@/shared/inputs/text-input'

type StatementEditModalProps = {
  statement: Statement
  userCards: UserCard[]
  onClose: () => void
}

const initialState: ActionState<Statement> = {
  success: false,
  message: null,
  data: null,
}

export function StatementEditModal({
  statement,
  userCards,
  onClose,
}: StatementEditModalProps) {
  const [userCardId, setUserCardId] = useState(statement.userCardId)

  const [periodStart, setPeriodStart] = useState(statement.periodStart ?? '')

  const [periodEnd, setPeriodEnd] = useState(statement.periodEnd ?? '')

  const [paymentDate, setPaymentDate] = useState(statement.paymentDate ?? '')

  const [state, action] = useActionState(updateStatementAction, initialState)

  useEffect(() => {
    if (state.success) {
      onClose()
    }
  }, [state.success, onClose])

  const userCardOptions = userCards.map((userCard) => ({
    value: userCard.userCardId,
    label: `${userCard.bank} · ${userCard.cardName}`,
  }))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar modal"
        className="absolute inset-0 cursor-default bg-neutral-950/55 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-neutral-100 px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-950 text-white">
                <Save className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                  Estado de cuenta
                </p>

                <h2 className="mt-0.5 text-xl font-semibold tracking-tight text-neutral-950">
                  Editar periodo
                </h2>
              </div>
            </div>

            <p className="mt-3 text-sm text-neutral-400">
              Actualiza la información de este estado de cuenta.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form action={action}>
          <input
            type="hidden"
            name="statementId"
            value={statement.statementId}
          />

          <div className="space-y-5 p-6">
            <div>
              <FieldLabel htmlFor="edit-user-card-id">Tarjeta</FieldLabel>

              <SelectInput
                id="edit-user-card-id"
                name="userCardId"
                options={userCardOptions}
                value={String(userCardId)}
                onChange={(value) => setUserCardId(Number(value))}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <DateField
                id="edit-period-start"
                name="periodStart"
                label="Inicio"
                value={periodStart}
                onChange={setPeriodStart}
              />

              <DateField
                id="edit-period-end"
                name="periodEnd"
                label="Corte"
                value={periodEnd}
                onChange={setPeriodEnd}
              />

              <DateField
                id="edit-payment-date"
                name="paymentDate"
                label="Fecha de pago"
                value={paymentDate}
                onChange={setPaymentDate}
              />
            </div>

            {periodEnd && (
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                  Periodo
                </p>

                <p className="mt-1 text-sm font-semibold text-neutral-900">
                  {formatStatementPeriod(periodEnd)}
                </p>
              </div>
            )}

            <div>
              <FieldLabel htmlFor="edit-notes">Notas</FieldLabel>

              <TextInput
                id="edit-notes"
                name="notes"
                defaultValue={statement.notes ?? ''}
                placeholder="Notas del estado de cuenta"
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
      className="flex min-w-36 cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
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
      className="mb-2 block text-xs font-medium text-neutral-500"
    >
      {children}
    </label>
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
