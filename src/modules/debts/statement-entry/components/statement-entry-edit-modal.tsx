// @/modules/debts/statement-entry/components/statement-entry-edit-modal.tsx

'use client'

import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  CreditCard,
  LoaderCircle,
  ReceiptText,
  Save,
  X,
} from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

import type { ActionState } from '@/core/utils/action-state'
import type { Concept } from '@/modules/debts/concept/schemas/concept.schema'
import { updateStatementEntryAction } from '@/modules/debts/statement-entry/actions/statement-entry.actions'
import { STATEMENT_ENTRY_TYPE_OPTIONS } from '@/modules/debts/statement-entry/constants/statement-entry.constants'
import type {
  StatementEntry,
  StatementEntryType,
} from '@/modules/debts/statement-entry/schemas/statement-entry.schema'
import { DateInput } from '@/shared/inputs/date-input'
import { TextInput } from '@/shared/inputs/text-input'
import { NumberInput } from '@/shared/inputs/number-input'

type StatementEntryEditModalProps = {
  entry: StatementEntry
  concepts: Concept[]
  onClose: () => void
}

const initialState: ActionState<StatementEntry> = {
  success: false,
  message: null,
  data: null,
}

export function StatementEntryEditModal({
  entry,
  concepts,
  onClose,
}: StatementEntryEditModalProps) {
  const [state, action] = useActionState(
    updateStatementEntryAction,
    initialState,
  )

  const [date, setDate] = useState(entry.date ?? '')

  const [paid, setPaid] = useState(entry.paid)

  const [entryType, setEntryType] = useState<StatementEntryType>(
    entry.entryType,
  )

  const [msiOpen, setMsiOpen] = useState(
    entry.msiCurrent !== null || entry.msiTotal !== null,
  )

  const [paymentOpen, setPaymentOpen] = useState(false)

  const isPurchase = entryType === 'PURCHASE'

  const hasMsiData = entry.msiCurrent !== null || entry.msiTotal !== null

  useEffect(() => {
    if (state.success) {
      onClose()
    }
  }, [state.success, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-scrollbar overflow-y-auto">
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar modal"
        className="absolute inset-0 cursor-default bg-foreground/60 backdrop-blur-sm"
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-border bg-background shadow-2xl">
        <div className="flex shrink-0 items-start justify-between border-b border-border px-6 py-5 sm:px-7">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <ReceiptText className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                  Movimiento #{entry.entryId}
                </p>

                <h2 className="mt-0.5 text-xl font-semibold tracking-tight text-foreground">
                  Editar movimiento
                </h2>
              </div>
            </div>

            <p className="mt-3 text-sm text-text-muted">
              Actualiza la información registrada para este movimiento.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl text-text-muted transition hover:bg-surface hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form action={action} className="flex min-h-0 flex-1 flex-col">
          <input type="hidden" name="entryId" value={entry.entryId} />

          <input type="hidden" name="statementId" value={entry.statementId} />

          <input type="hidden" name="paid" value={paid ? 'true' : 'false'} />

          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="space-y-4 bg-surface/50 p-5 sm:p-7">
              <FormSection
                icon={ReceiptText}
                title="Información del movimiento"
                description="Los datos principales de este cargo."
              >
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <FieldLabel htmlFor="entryType">Tipo</FieldLabel>

                    <select
                      id="entryType"
                      name="entryType"
                      value={entryType}
                      onChange={(event) =>
                        setEntryType(event.target.value as StatementEntryType)
                      }
                      required
                      className={fieldClassName}
                    >
                      {STATEMENT_ENTRY_TYPE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <FieldLabel htmlFor="conceptId">Concepto</FieldLabel>

                    <select
                      id="conceptId"
                      name="conceptId"
                      defaultValue={entry.conceptId}
                      required
                      className={fieldClassName}
                    >
                      {concepts.map((concept) => (
                        <option
                          key={concept.conceptId}
                          value={concept.conceptId}
                        >
                          {concept.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Field
                    label="Deudor"
                    name="debtor"
                    type="text"
                    defaultValue={entry.debtor}
                    placeholder="Ej. Yo"
                    required
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="specification">
                    Especificación
                  </FieldLabel>

                  <TextInput
                    id="specification"
                    name="specification"
                    defaultValue={entry.specification ?? ''}
                    placeholder="Especificación"
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="notes">Notas</FieldLabel>

                  <TextInput
                    id="notes"
                    name="notes"
                    defaultValue={entry.notes ?? ''}
                    placeholder="Notas"
                  />
                </div>
              </FormSection>

              <FormSection
                icon={CalendarDays}
                title={isPurchase ? 'Compra' : 'Cargo recurrente'}
                description={
                  isPurchase
                    ? 'Fecha y monto correspondientes a esta compra.'
                    : 'Fecha y monto correspondientes a este cargo.'
                }
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <FieldLabel htmlFor="date">
                      {isPurchase ? 'Fecha de compra' : 'Fecha del cargo'}
                    </FieldLabel>

                    <DateInput
                      id="date"
                      name="date"
                      value={date}
                      onChange={setDate}
                    />

                    <p className="mt-1.5 text-xs text-text-muted">
                      Puedes dejar la fecha vacía si no deseas registrarla.
                    </p>
                  </div>

                  <div>
                    <FieldLabel htmlFor="amount">
                      {isPurchase ? 'Monto de esta parcialidad' : 'Monto'}
                    </FieldLabel>

                    <NumberInput
                      id="amount"
                      name="amount"
                      defaultValue={entry.amount}
                      min={0}
                      step="0.01"
                      placeholder="0.00"
                      prefix="$"
                      required
                    />
                  </div>
                </div>
              </FormSection>

              {isPurchase && (
                <CollapsibleSection
                  icon={CreditCard}
                  title="Meses sin intereses"
                  description={
                    hasMsiData
                      ? 'Esta compra tiene información MSI configurada.'
                      : 'Información opcional para una compra a MSI.'
                  }
                  open={msiOpen}
                  onToggle={() => setMsiOpen((current) => !current)}
                  active={hasMsiData}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Mes actual"
                      name="msiCurrent"
                      type="number"
                      min={1}
                      defaultValue={entry.msiCurrent ?? ''}
                      placeholder="Ej. 3"
                    />

                    <Field
                      label="Total de meses"
                      name="msiTotal"
                      type="number"
                      min={1}
                      defaultValue={entry.msiTotal ?? ''}
                      placeholder="Ej. 12"
                    />

                    <CalculatedField
                      label="Total de la compra"
                      value={entry.purchaseAmount}
                      prefix="$"
                    />

                    <CalculatedField
                      label="Meses restantes"
                      value={entry.remainingMsi}
                    />

                    <div className="sm:col-span-2">
                      <CalculatedField
                        label="Saldo restante de la compra"
                        value={entry.remainingMsiAmount}
                        prefix="$"
                      />
                    </div>
                  </div>
                </CollapsibleSection>
              )}

              <CollapsibleSection
                icon={CircleDollarSign}
                title="Estado del pago"
                description="Indica si ya cubriste este movimiento."
                open={paymentOpen}
                onToggle={() => setPaymentOpen((current) => !current)}
                active={paid}
              >
                <button
                  type="button"
                  onClick={() => setPaid((current) => !current)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border border-border bg-background px-4 py-3.5 text-left transition hover:border-primary/20 hover:bg-surface"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={[
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition',
                        paid
                          ? 'bg-primary-soft text-primary'
                          : 'bg-surface text-text-muted',
                      ].join(' ')}
                    >
                      <Check className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">
                          {paid ? 'Movimiento pagado' : 'Pago pendiente'}
                        </p>

                        <span
                          className={[
                            'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                            paid
                              ? 'bg-primary-soft text-primary'
                              : 'bg-surface text-text-muted',
                          ].join(' ')}
                        >
                          {paid ? 'Pagado' : 'Pendiente'}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-text-muted">
                        {paid
                          ? 'Este movimiento ya fue cubierto.'
                          : 'Todavía tienes este importe pendiente de pago.'}
                      </p>
                    </div>
                  </div>

                  <div
                    className={[
                      'relative h-6 w-11 shrink-0 rounded-full transition-colors',
                      paid ? 'bg-primary' : 'bg-surface',
                    ].join(' ')}
                  >
                    <div
                      className={[
                        'absolute top-1 h-4 w-4 rounded-full bg-background shadow-sm transition-transform',
                        paid ? 'translate-x-6' : 'translate-x-1',
                      ].join(' ')}
                    />
                  </div>
                </button>
              </CollapsibleSection>

              {!state.success && state.message && (
                <div className="rounded-xl border border-primary bg-primary-soft px-4 py-3 text-sm text-primary">
                  {state.message}
                </div>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-2 border-t border-border bg-background px-6 py-4 sm:px-7">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium text-text-muted transition hover:bg-surface hover:text-foreground"
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

type FormSectionProps = {
  icon: typeof ReceiptText
  title: string
  description: string
  children: React.ReactNode
}

function FormSection({
  icon: Icon,
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded-[1.5rem] border border-border bg-background p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface text-foreground">
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>

          <p className="mt-1 text-xs leading-5 text-text-muted">
            {description}
          </p>
        </div>
      </div>

      <div className="space-y-4">{children}</div>
    </section>
  )
}

type CollapsibleSectionProps = {
  icon: typeof CreditCard
  title: string
  description: string
  open: boolean
  onToggle: () => void
  active: boolean
  children: React.ReactNode
}

function CollapsibleSection({
  icon: Icon,
  title,
  description,
  open,
  onToggle,
  active,
  children,
}: CollapsibleSectionProps) {
  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-border bg-background shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center gap-3 p-5 text-left transition hover:bg-surface sm:p-6"
      >
        <div
          className={[
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
            active
              ? 'bg-primary text-primary-foreground'
              : 'bg-surface text-foreground',
          ].join(' ')}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>

            {active && (
              <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary">
                Configurado
              </span>
            )}
          </div>

          <p className="mt-1 text-xs leading-5 text-text-muted">
            {description}
          </p>
        </div>

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-muted">
          {open ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </button>

      {open && (
        <div className="border-t border-border bg-surface/40 p-5 sm:p-6">
          {children}
        </div>
      )}
    </section>
  )
}

type FieldProps = {
  label: string
  name: string
  type: string
  defaultValue: string | number
  min?: number
  step?: string
  placeholder?: string
  prefix?: string
  required?: boolean
}

function Field({
  label,
  name,
  type,
  defaultValue,
  min,
  step,
  placeholder,
  prefix,
  required = false,
}: FieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>

      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm text-text-muted">
            {prefix}
          </span>
        )}

        <input
          id={name}
          name={name}
          type={type}
          min={min}
          step={step}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          className={[fieldClassName, prefix ? 'pl-8' : ''].join(' ')}
        />
      </div>
    </div>
  )
}

type CalculatedFieldProps = {
  label: string
  value: string | number | null
  prefix?: string
}

function CalculatedField({ label, value, prefix }: CalculatedFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={label}>{label}</FieldLabel>

      <div
        className={[
          fieldClassName,
          'flex cursor-not-allowed items-center bg-surface text-text-muted',
          prefix ? 'pl-8' : '',
        ].join(' ')}
      >
        {prefix && (
          <span className="pointer-events-none absolute text-sm text-text-muted">
            {prefix}
          </span>
        )}

        {value ?? '—'}
      </div>
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

function SaveButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex min-w-40 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
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

const fieldClassName =
  'h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition placeholder:text-text-muted focus:border-primary focus:bg-background'
