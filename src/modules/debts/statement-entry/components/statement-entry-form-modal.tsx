// @/modules/debts/statement-entry/components/statement-entry-form-modal.tsx

'use client'

import {
  CalendarDays,
  CircleDollarSign,
  CreditCard,
  LoaderCircle,
  Plus,
  ReceiptText,
  Save,
  X,
} from 'lucide-react'
import {
  useActionState,
  useEffect,
  useState,
} from 'react'
import { useFormStatus } from 'react-dom'

import type { ActionState } from '@/core/utils/action-state'
import type { Concept } from '@/modules/debts/concept/schemas/concept.schema'
import {
  createStatementEntryAction,
  updateStatementEntryAction,
} from '@/modules/debts/statement-entry/actions/statement-entry.actions'
import { STATEMENT_ENTRY_TYPE_OPTIONS } from '@/modules/debts/statement-entry/constants/statement-entry.constants'
import type {
  StatementEntry,
  StatementEntryType,
} from '@/modules/debts/statement-entry/schemas/statement-entry.schema'

type StatementEntryFormModalProps = {
  statementId: number
  entry: StatementEntry | null
  concepts: Concept[]
  onClose: () => void
}

const initialState: ActionState<StatementEntry> = {
  success: false,
  message: null,
  data: null,
}

export function StatementEntryFormModal({
  statementId,
  entry,
  concepts,
  onClose,
}: StatementEntryFormModalProps) {
  const editing = entry !== null

  // ===================
  // STATE
  // ===================

  const [purchaseDate, setPurchaseDate] =
    useState(
      () =>
        entry?.date ??
        getLocalDateInputValue(),
    )

  const [paid, setPaid] = useState(
    entry?.paid ?? false,
  )

  const [entryType, setEntryType] =
    useState<StatementEntryType>(
      entry?.entryType ?? 'PURCHASE',
    )

  const [createState, createAction] =
    useActionState(
      createStatementEntryAction,
      initialState,
    )

  const [updateState, updateAction] =
    useActionState(
      updateStatementEntryAction,
      initialState,
    )

  const state = editing
    ? updateState
    : createState

  const action = editing
    ? updateAction
    : createAction

  // ===================
  // EFFECTS
  // ===================

  useEffect(() => {
    if (state.success) {
      onClose()
    }
  }, [state.success, onClose])

  // ===================
  // DERIVED
  // ===================

  const isPurchase =
    entryType === 'PURCHASE'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar modal"
        className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-2xl">
        {/* ===================
            HEADER
        =================== */}

        <div className="flex shrink-0 items-start justify-between border-b border-neutral-100 px-6 py-5 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
              Estado de cuenta
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-tight text-neutral-950">
              {editing
                ? 'Editar movimiento'
                : 'Nuevo movimiento'}
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              {editing
                ? 'Actualiza la información registrada para este movimiento.'
                : 'Registra una compra o cargo dentro de este estado de cuenta.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ===================
            FORM
        =================== */}

        <form
          action={action}
          className="flex min-h-0 flex-1 flex-col"
        >
          <input
            type="hidden"
            name="statementId"
            value={statementId}
          />

          <input
            type="hidden"
            name="paid"
            value={paid ? 'true' : 'false'}
          />

          {editing && (
            <input
              type="hidden"
              name="entryId"
              value={entry.entryId}
            />
          )}

          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="space-y-6 bg-neutral-50/40 p-6 sm:p-7">
              {/* ===================
                  MOVEMENT
              =================== */}

              <FormSection
                icon={ReceiptText}
                title="Movimiento"
                description="Información principal del cargo."
              >
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <FieldLabel htmlFor="entryType">
                      Tipo de movimiento
                    </FieldLabel>

                    <select
                      id="entryType"
                      name="entryType"
                      value={entryType}
                      onChange={(event) =>
                        setEntryType(
                          event.target
                            .value as StatementEntryType,
                        )
                      }
                      required
                      className={fieldClassName}
                    >
                      {STATEMENT_ENTRY_TYPE_OPTIONS.map(
                        (option) => (
                          <option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  <div>
                    <FieldLabel htmlFor="conceptId">
                      Concepto
                    </FieldLabel>

                    <select
                      id="conceptId"
                      name="conceptId"
                      defaultValue={
                        entry?.conceptId ??
                        concepts[0]
                          ?.conceptId ??
                        ''
                      }
                      required
                      className={fieldClassName}
                    >
                      {concepts.map(
                        (concept) => (
                          <option
                            key={
                              concept.conceptId
                            }
                            value={
                              concept.conceptId
                            }
                          >
                            {concept.name}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  <Field
                    label="Deudor"
                    name="debtor"
                    type="text"
                    defaultValue={
                      entry?.debtor ?? ''
                    }
                    placeholder="Ej. Yo"
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="description">
                    Descripción
                  </FieldLabel>

                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    defaultValue={
                      entry?.description ??
                      ''
                    }
                    placeholder="Ej. Compra en Amazon, supermercado, suscripción..."
                    className="w-full resize-none rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-300 focus:border-neutral-400 focus:bg-white"
                  />
                </div>
              </FormSection>

              {/* ===================
                  PURCHASE
              =================== */}

              <FormSection
                icon={CalendarDays}
                title={
                  isPurchase
                    ? 'Compra'
                    : 'Cargo recurrente'
                }
                description={
                  isPurchase
                    ? 'Fecha y monto correspondiente a esta compra.'
                    : 'Fecha y monto correspondiente a este cargo recurrente.'
                }
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <FieldLabel htmlFor="purchaseDate">
                      {isPurchase
                        ? 'Fecha de compra'
                        : 'Fecha del cargo'}
                    </FieldLabel>

                    <input
                      id="purchaseDate"
                      name="purchaseDate"
                      type="date"
                      value={purchaseDate}
                      onChange={(event) =>
                        setPurchaseDate(
                          event.target.value,
                        )
                      }
                      className={fieldClassName}
                    />

                    {!editing && (
                      <p className="mt-1.5 text-xs text-neutral-400">
                        Por defecto se utiliza la fecha de hoy.
                      </p>
                    )}
                  </div>

                  <Field
                    label={
                      isPurchase
                        ? 'Monto de parcialidad'
                        : 'Monto'
                    }
                    name="installmentAmount"
                    type="number"
                    min={0}
                    step="0.01"
                    defaultValue={
                      entry?.amount ?? ''
                    }
                    placeholder="0.00"
                    prefix="$"
                  />
                </div>
              </FormSection>

              {/* ===================
                  MSI
              =================== */}

              {isPurchase && (
                <FormSection
                  icon={CreditCard}
                  title="Meses sin intereses"
                  description="Completa esta sección únicamente cuando la compra sea a meses sin intereses."
                  optional
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Mes actual"
                      name="msiCurrent"
                      type="number"
                      min={0}
                      defaultValue={
                        entry?.msiCurrent ??
                        ''
                      }
                      placeholder="Ej. 3"
                    />

                    <Field
                      label="Total de meses"
                      name="msiTotal"
                      type="number"
                      min={0}
                      defaultValue={
                        entry?.msiTotal ?? ''
                      }
                      placeholder="Ej. 12"
                    />

                    <Field
                      label="Total de compra"
                      name="purchaseTotal"
                      type="number"
                      min={0}
                      step="0.01"
                      defaultValue={
                        entry?.purchaseAmount ??
                        ''
                      }
                      placeholder="0.00"
                      prefix="$"
                    />

                    <Field
                      label="Meses restantes"
                      name="remainingMonths"
                      type="number"
                      min={0}
                      defaultValue={
                        entry?.remainingMsi ??
                        ''
                      }
                      placeholder="Ej. 9"
                    />

                    <div className="sm:col-span-2">
                      <Field
                        label="Total restante"
                        name="remainingTotal"
                        type="number"
                        min={0}
                        step="0.01"
                        defaultValue={
                          entry?.remainingMsiAmount ??
                          ''
                        }
                        placeholder="0.00"
                        prefix="$"
                      />
                    </div>
                  </div>
                </FormSection>
              )}

              {/* ===================
                  PAYMENT STATUS
              =================== */}

              <FormSection
                icon={CircleDollarSign}
                title="Estado del pago"
                description="Indica si este movimiento ya fue cubierto."
              >
                <button
                  type="button"
                  onClick={() =>
                    setPaid(
                      (current) =>
                        !current,
                    )
                  }
                  className="flex w-full items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4 text-left transition hover:border-neutral-300 hover:bg-neutral-100/70"
                >
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {paid
                        ? 'Movimiento pagado'
                        : 'Pago pendiente'}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-neutral-400">
                      {paid
                        ? 'Este movimiento ya fue cubierto.'
                        : 'Este movimiento todavía forma parte del saldo pendiente.'}
                    </p>
                  </div>

                  <span
                    className={[
                      'relative h-6 w-11 shrink-0 rounded-full transition-colors',
                      paid
                        ? 'bg-neutral-950'
                        : 'bg-neutral-300',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
                        paid
                          ? 'translate-x-6'
                          : 'translate-x-1',
                      ].join(' ')}
                    />
                  </span>
                </button>
              </FormSection>

              {/* ===================
                  ERROR
              =================== */}

              {!state.success &&
                state.message && (
                  <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {state.message}
                  </div>
                )}
            </div>
          </div>

          {/* ===================
              FOOTER
          =================== */}

          <div className="flex shrink-0 items-center justify-end gap-3 border-t border-neutral-100 bg-white px-6 py-4 sm:px-7">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-800"
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

// ===================
// FORM SECTION
// ===================

type FormSectionProps = {
  icon: typeof ReceiptText
  title: string
  description: string
  optional?: boolean
  children: React.ReactNode
}

function FormSection({
  icon: Icon,
  title,
  description,
  optional = false,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded-[1.5rem] border border-neutral-200 bg-white p-5 shadow-sm shadow-neutral-950/[0.02] sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-neutral-950">
              {title}
            </h3>

            {optional && (
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                Opcional
              </span>
            )}
          </div>

          <p className="mt-1 text-xs leading-5 text-neutral-400">
            {description}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {children}
      </div>
    </section>
  )
}

// ===================
// FIELD
// ===================

type FieldProps = {
  label: string
  name: string
  type: string
  defaultValue: string | number
  min?: number
  step?: string
  placeholder?: string
  prefix?: string
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
}: FieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={name}>
        {label}
      </FieldLabel>

      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm text-neutral-400">
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
          className={[
            fieldClassName,
            prefix ? 'pl-8' : '',
          ].join(' ')}
        />
      </div>
    </div>
  )
}

// ===================
// FIELD LABEL
// ===================

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

// ===================
// SAVE BUTTON
// ===================

function SaveButton({
  editing,
}: {
  editing: boolean
}) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex min-w-40 cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
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
          : 'Crear movimiento'}
    </button>
  )
}

// ===================
// DATE
// ===================

function getLocalDateInputValue() {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(
    now.getMonth() + 1,
  ).padStart(2, '0')

  const day = String(
    now.getDate(),
  ).padStart(2, '0')

  return `${year}-${month}-${day}`
}

// ===================
// FIELD STYLE
// ===================

const fieldClassName =
  'h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-300 focus:border-neutral-400 focus:bg-white'