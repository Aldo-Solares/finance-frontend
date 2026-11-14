// @/modules/debts/statement-entry/components/statement-entry-edit-modal.tsx

'use client'

import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  CreditCard,
  LoaderCircle,
  ReceiptText,
  Save,
  Trash2,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

import type { ActionState } from '@/core/utils/action-state'
import type { Concept } from '@/modules/debts/concept/schemas/concept.schema'
import { updateStatementEntryAction } from '@/modules/debts/statement-entry/actions/statement-entry.actions'
import type { StatementEntry } from '@/modules/debts/statement-entry/schemas/statement-entry.schema'
import { DateInput } from '@/shared/inputs/date-input'
import { MoneyInput } from '@/shared/inputs/money-input'
import { NumberInput } from '@/shared/inputs/number-input'
import { SearchableSelectInput } from '@/shared/inputs/searchable-select-input'
import { TextInput } from '@/shared/inputs/text-input'

import { PaidStateToggle } from './paid-state-toggle'
import { formatDisplayDate } from '@/shared/utils/date-format'

type StatementEntryEditModalProps = {
  entry: StatementEntry
  defaultMerchant: string | null
  concepts: Concept[]
  onClose: () => void
  onDelete: (entry: StatementEntry) => void
}

const initialState: ActionState<StatementEntry> = {
  success: false,
  message: null,
  data: null,
}

export function StatementEntryEditModal({
  entry,
  defaultMerchant,
  concepts,
  onClose,
  onDelete,
}: StatementEntryEditModalProps) {
  const [state, action] = useActionState(updateStatementEntryAction, initialState)
  const [date, setDate] = useState(entry.date ?? '')
  const [amount, setAmount] = useState(String(entry.amount))
  const [paid, setPaid] = useState(entry.paid)
  const [isRecurring, setIsRecurring] = useState(entry.isRecurring)
  const [categoryId, setCategoryId] = useState(
    String(entry.categoryId),
  )
  const [merchant, setMerchant] = useState(entry.merchant ?? defaultMerchant ?? '')
  const hasPersistedMsi =
    entry.msiPurchaseId !== null ||
    entry.monthlyPaymentNumber !== null ||
    entry.totalMonthlyPayments !== null
  const [msiOpen, setMsiOpen] = useState(hasPersistedMsi)
  const [monthlyPaymentNumber, setMonthlyPaymentNumber] = useState(
    entry.monthlyPaymentNumber?.toString() ?? '',
  )
  const [totalMonthlyPayments, setTotalMonthlyPayments] = useState(
    entry.totalMonthlyPayments?.toString() ?? '',
  )

  const isMsi = !isRecurring && Boolean(monthlyPaymentNumber || totalMonthlyPayments)

  const clearMsi = () => {
    setMonthlyPaymentNumber('')
    setTotalMonthlyPayments('')
    setMsiOpen(false)
  }

  const handleRecurringToggle = () => {
    const nextValue = !isRecurring
    setIsRecurring(nextValue)
    if (nextValue) clearMsi()
  }

  useEffect(() => {
    if (state.success) onClose()
  }, [state.success, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 select-scrollbar">
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar formulario"
        className="absolute inset-0 cursor-default bg-foreground/60 backdrop-blur-sm"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-entry-title"
        className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-border bg-background shadow-2xl"
      >
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-6 py-5 sm:px-7">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <ReceiptText className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                  Editar movimiento
                </p>
                <h2 id="edit-entry-title" className="mt-0.5 text-xl font-semibold tracking-tight text-foreground">
                  Editar movimiento
                </h2>
              </div>
            </div>
            <p className="mt-3 text-sm text-text-muted">
              Ajusta los datos del movimiento.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <PaidStateToggle
              compact
              paid={paid}
              onToggle={() => setPaid((current) => !current)}
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-text-muted transition hover:bg-surface hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        <form action={action} className="flex min-h-0 flex-1 flex-col">
          <input type="hidden" name="entryId" value={entry.entryId} />
          <input type="hidden" name="statementId" value={entry.statementId} />
          <input type="hidden" name="paid" value={paid ? 'true' : 'false'} />
          <input type="hidden" name="isRecurring" value={isRecurring ? 'true' : 'false'} />

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-surface/40 p-5 sm:p-7">
            <FormSection
              icon={ReceiptText}
              title="Información del movimiento"
              description="Los datos principales de este cargo."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Categoría" htmlFor="categoryId">
                  <SearchableSelectInput
                    id="categoryId"
                    name="categoryId"
                    value={categoryId}
                    onChange={setCategoryId}
                    options={concepts.map((concept) => ({
                      value: concept.categoryId,
                      label: concept.name,
                    }))}
                    placeholder="Seleccionar categoría..."
                    searchPlaceholder="Buscar categoría..."
                    emptyMessage="No se encontraron categorías."
                    required
                  />
                </Field>
                <Field label="Deudor" htmlFor="debtor">
                  <TextInput id="debtor" name="debtor" defaultValue={entry.debtor} placeholder="Deudor" required />
                </Field>
              </div>

              <Field label="Descripción del gasto" htmlFor="description">
                <TextInput id="description" name="description" defaultValue={entry.description ?? ''} placeholder="Descripción del gasto" />
              </Field>

              <Field label="Comercio" htmlFor="merchant">
                <TextInput
                  id="merchant"
                  name="merchant"
                  value={merchant}
                  onChange={setMerchant}
                  placeholder="Comercio"
                  description={!entry.merchant && defaultMerchant ? `Sugerido por la tarjeta: ${defaultMerchant}. Puedes cambiarlo para este movimiento.` : undefined}
                />
              </Field>

              <Field label="Notas" htmlFor="notes">
                <TextInput id="notes" name="notes" defaultValue={entry.notes ?? ''} placeholder="Notas" />
              </Field>

              <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface/50 px-4 py-3">
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-foreground">Movimiento recurrente</span>
                  <span className="mt-0.5 block text-xs text-text-muted">
                    {hasPersistedMsi && !isRecurring
                      ? 'No se puede marcar recurrente porque pertenece a una compra MSI.'
                      : isRecurring
                        ? 'Se repite de forma periódica.'
                        : 'Actívalo si este cargo se repite.'}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-2.5">
                  <span className={`text-xs font-medium ${isRecurring ? 'text-primary' : 'text-text-muted'}`}>
                    {isRecurring ? 'Sí' : 'No'}
                  </span>
                  <button type="button" role="switch" aria-checked={isRecurring} aria-label={isRecurring ? 'Marcar como no recurrente' : 'Marcar como recurrente'} onClick={handleRecurringToggle} disabled={hasPersistedMsi && !isRecurring} className={`relative h-6 w-11 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50 ${isRecurring ? 'bg-primary' : 'bg-border'}`}>
                    <span className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-background shadow-sm transition-transform ${isRecurring ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </span>
              </div>
            </FormSection>

            <FormSection
              icon={CalendarDays}
              title="Fecha e importe"
              description="Indica cuándo ocurrió el movimiento y cuánto fue."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={hasPersistedMsi ? 'Fecha de compra' : 'Fecha'} htmlFor="date">
                  {hasPersistedMsi ? (
                    <>
                      <input type="hidden" name="date" value={date} />
                      <div id="date" className={readOnlyClassName}>
                        {date ? formatDisplayDate(date) : 'Fecha de compra sin registrar'}
                      </div>
                      <p className="mt-1.5 text-xs text-text-muted">
                        La fecha original de compra se conserva para todas las mensualidades MSI.
                      </p>
                    </>
                  ) : (
                    <DateInput id="date" name="date" value={date} onChange={setDate} />
                  )}
                </Field>
                <Field label={isMsi ? 'Importe de esta mensualidad' : 'Importe'} htmlFor="amount">
                  <MoneyInput
                    id="amount"
                    name="amount"
                    min={0.01}
                    step="0.01"
                    value={amount}
                    onChange={setAmount}
                    placeholder="0.00"
                    required
                  />
                </Field>
              </div>
            </FormSection>

            {!isRecurring && (
              <CollapsibleSection
                icon={CreditCard}
                title="Meses sin intereses"
                description="Solo abre esta sección si la compra fue a MSI."
                open={msiOpen}
                active={isMsi}
                status={isMsi ? `${monthlyPaymentNumber || '—'} de ${totalMonthlyPayments || '—'} mensualidades` : 'Opcional'}
                onToggle={() => setMsiOpen((current) => !current)}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Mensualidad actual" htmlFor="monthlyPaymentNumber">
                    <NumberInput
                      id="monthlyPaymentNumber"
                      name="monthlyPaymentNumber"
                      min={1}
                      step={1}
                      value={monthlyPaymentNumber}
                      onChange={setMonthlyPaymentNumber}
                      placeholder="Mensualidad actual"
                    />
                  </Field>
                  <Field label="Total de mensualidades" htmlFor="totalMonthlyPayments">
                    <NumberInput
                      id="totalMonthlyPayments"
                      name="totalMonthlyPayments"
                      min={1}
                      step={1}
                      value={totalMonthlyPayments}
                      onChange={setTotalMonthlyPayments}
                      placeholder="Total de mensualidades"
                    />
                  </Field>
                  <div className="rounded-xl border border-dashed border-border bg-surface px-4 py-3 sm:col-span-2">
                    <p className="text-xs leading-5 text-text-muted">
                      El importe es la mensualidad que aparece en este estado de cuenta. La fecha de compra se conserva para todas las mensualidades.
                    </p>
                  </div>
                  {monthlyPaymentNumber && totalMonthlyPayments && Number(monthlyPaymentNumber) > Number(totalMonthlyPayments) && (
                    <p className="text-xs text-red-500 sm:col-span-2">La mensualidad actual no puede superar el total.</p>
                  )}
                </div>
              </CollapsibleSection>
            )}

            {state.message && !state.success && <ErrorMessage message={state.message} />}
          </div>

          <footer className="flex shrink-0 items-center justify-between gap-2 border-t border-border bg-background px-5 py-4 sm:px-6">
            <button type="button" onClick={() => onDelete(entry)} className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-500/5">
              <Trash2 className="h-4 w-4" />
              Eliminar
            </button>
            <div className="flex items-center gap-2">
              <button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-sm font-medium text-text-muted transition hover:bg-surface hover:text-foreground">
              Cancelar
              </button>
              <SubmitButton />
            </div>
          </footer>
        </form>
      </section>
    </div>
  )
}

function FormSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="space-y-4 rounded-[1.5rem] border border-border bg-background p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-text-muted">{description}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

function CollapsibleSection({
  icon: Icon,
  title,
  description,
  open,
  active,
  status,
  onToggle,
  children,
}: {
  icon: LucideIcon
  title: string
  description: string
  open: boolean
  active: boolean
  status: string
  onToggle: () => void
  children: ReactNode
}) {
  const Chevron = open ? ChevronUp : ChevronDown
  return (
    <section className={`overflow-hidden rounded-[1.5rem] border bg-background shadow-sm ${active ? 'border-primary/30' : 'border-border'}`}>
      <button type="button" aria-expanded={open} onClick={onToggle} className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-surface/60 sm:px-6">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${active ? 'bg-primary-soft text-primary' : 'bg-surface text-text-muted'}`}>
          <Icon className="h-4 w-4" />
        </div>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
            {title}
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${active ? 'bg-primary-soft text-primary' : 'bg-surface text-text-muted'}`}>
              {status}
            </span>
          </span>
          <span className="mt-1 block text-xs leading-5 text-text-muted">{description}</span>
        </span>
        <Chevron className="h-4 w-4 shrink-0 text-text-muted" />
      </button>
      <div hidden={!open} className="border-t border-border bg-surface/40 p-5 sm:px-6">
        {children}
      </div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-xs font-medium text-text-muted">
        {label}
      </label>
      {children}
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className="flex min-w-40 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60">
      {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      {pending ? 'Guardando…' : 'Guardar cambios'}
    </button>
  )
}

function ErrorMessage({ message }: { message: string }) {
  return <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-600">{message}</p>
}

const readOnlyClassName = 'flex h-11 items-center rounded-xl border border-border bg-surface px-4 text-sm text-foreground'
