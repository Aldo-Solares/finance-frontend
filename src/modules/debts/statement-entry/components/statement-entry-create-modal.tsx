// @/modules/debts/statement-entry/components/statement-entry-create-modal.tsx

'use client'

import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  CreditCard,
  LoaderCircle,
  Plus,
  ReceiptText,
  X,
} from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

import type { ActionState } from '@/core/utils/action-state'
import type { Concept } from '@/modules/debts/concept/schemas/concept.schema'
import { createStatementEntryAction } from '@/modules/debts/statement-entry/actions/statement-entry.actions'
import { STATEMENT_ENTRY_TYPE_OPTIONS } from '@/modules/debts/statement-entry/constants/statement-entry.constants'
import type {
  StatementEntry,
  StatementEntryType,
} from '@/modules/debts/statement-entry/schemas/statement-entry.schema'
import { DateInput } from '@/shared/inputs/date-input'
import { NumberInput } from '@/shared/inputs/number-input'
import { SearchableSelectInput } from '@/shared/inputs/searchable-select-input'
import { SelectInput } from '@/shared/inputs/select-input'
import { TextInput } from '@/shared/inputs/text-input'

type StatementEntryCreateModalProps = {
  statementId: number
  concepts: Concept[]
  onClose: () => void
}

const initialState: ActionState<StatementEntry> = {
  success: false,
  message: null,
  data: null,
}

export function StatementEntryCreateModal({
  statementId,
  concepts,
  onClose,
}: StatementEntryCreateModalProps) {
  const [state, action] = useActionState(
    createStatementEntryAction,
    initialState,
  )

  const [date, setDate] = useState(getLocalDateInputValue())

  const [paid, setPaid] = useState(false)

  const [entryType, setEntryType] = useState<StatementEntryType>('PURCHASE')

  const [msiOpen, setMsiOpen] = useState(false)

  const [paymentOpen, setPaymentOpen] = useState(false)

  const isPurchase = entryType === 'PURCHASE'

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
        aria-label="Cerrar modal"
        className="absolute inset-0 cursor-default bg-neutral-950/60 backdrop-blur-sm"
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-2xl">
        <div className="flex shrink-0 items-start justify-between border-b border-neutral-100 px-6 py-5 sm:px-7">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-950 text-white">
                <Plus className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                  Nuevo movimiento
                </p>

                <h2 className="mt-0.5 text-xl font-semibold tracking-tight text-neutral-950">
                  Registrar movimiento
                </h2>
              </div>
            </div>

            <p className="mt-3 text-sm text-neutral-500">
              Registra una compra o cargo dentro de este estado de cuenta.
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

        <form action={action} className="flex min-h-0 flex-1 flex-col">
          <input type="hidden" name="statementId" value={statementId} />

          <input type="hidden" name="paid" value={paid ? 'true' : 'false'} />

          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="space-y-4 bg-neutral-50/50 p-5 sm:p-7">
              <FormSection
                icon={ReceiptText}
                title="Información del movimiento"
                description="Los datos principales de este cargo."
              >
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <FieldLabel htmlFor="entryType">Tipo</FieldLabel>

                    <SelectInput
                      id="entryType"
                      name="entryType"
                      value={entryType}
                      options={STATEMENT_ENTRY_TYPE_OPTIONS}
                      onChange={(value) =>
                        setEntryType(value as StatementEntryType)
                      }
                      required
                    />
                  </div>

                  <div>
                    <FieldLabel htmlFor="conceptId">Concepto</FieldLabel>

                    <SearchableSelectInput
                      id="conceptId"
                      name="conceptId"
                      defaultValue={concepts[0]?.conceptId ?? ''}
                      options={concepts.map((concept) => ({
                        value: concept.conceptId,
                        label: concept.name,
                      }))}
                      placeholder="Seleccionar concepto..."
                      searchPlaceholder="Buscar concepto..."
                      emptyMessage="No se encontraron conceptos."
                      required
                    />
                  </div>

                  <div>
                    <FieldLabel htmlFor="debtor">Deudor</FieldLabel>

                    <TextInput
                      id="debtor"
                      name="debtor"
                      defaultValue=""
                      placeholder="Deudor"
                      required
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel htmlFor="specification">
                    Especificación
                  </FieldLabel>

                  <TextInput
                    id="specification"
                    name="specification"
                    placeholder="Especificación"
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="notes">Notas</FieldLabel>

                  <TextInput id="notes" name="notes" placeholder="Notas" />
                </div>
              </FormSection>

              <FormSection
                icon={CalendarDays}
                title={isPurchase ? 'Compra' : 'Cargo recurrente'}
                description={
                  isPurchase
                    ? 'Indica cuándo se realizó la compra y cuánto corresponde a este movimiento.'
                    : 'Indica cuándo se realizó el cargo y su importe.'
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

                    <p className="mt-1.5 text-xs text-neutral-400">
                      Se utiliza la fecha de hoy por defecto.
                    </p>
                  </div>

                  <div>
                    <FieldLabel htmlFor="amount">
                      {isPurchase ? 'Monto de esta parcialidad' : 'Monto'}
                    </FieldLabel>

                    <NumberInput
                      id="amount"
                      name="amount"
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
                  description="Solo necesitas abrir esta sección si la compra fue a MSI."
                  open={msiOpen}
                  onToggle={() => setMsiOpen((current) => !current)}
                  active={msiOpen}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <FieldLabel htmlFor="msiCurrent">Mes actual</FieldLabel>

                      <NumberInput
                        id="msiCurrent"
                        name="msiCurrent"
                        min={1}
                        placeholder="Ej. 1"
                      />
                    </div>

                    <div>
                      <FieldLabel htmlFor="msiTotal">Total de meses</FieldLabel>

                      <NumberInput
                        id="msiTotal"
                        name="msiTotal"
                        min={1}
                        placeholder="Ej. 12"
                      />
                    </div>

                    <div className="sm:col-span-2 rounded-xl border border-dashed border-neutral-200 bg-neutral-50 px-4 py-3">
                      <p className="mt-1 text-xs leading-5 text-neutral-400">
                        El total de la compra, los meses restantes y el saldo
                        restante serán calculados por el sistema a partir de la
                        información MSI.
                      </p>
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
                  className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-left transition hover:border-neutral-300 hover:bg-neutral-50"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={[
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition',
                        paid
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-neutral-100 text-neutral-500',
                      ].join(' ')}
                    >
                      <Check className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-neutral-900">
                          {paid ? 'Movimiento pagado' : 'Pago pendiente'}
                        </p>

                        <span
                          className={[
                            'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                            paid
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700',
                          ].join(' ')}
                        >
                          {paid ? 'Pagado' : 'Pendiente'}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-neutral-400">
                        {paid
                          ? 'Este movimiento ya fue cubierto.'
                          : 'Todavía tienes este importe pendiente de pago.'}
                      </p>
                    </div>
                  </div>

                  <div
                    className={[
                      'relative h-6 w-11 shrink-0 rounded-full transition-colors',
                      paid ? 'bg-emerald-600' : 'bg-neutral-300',
                    ].join(' ')}
                  >
                    <div
                      className={[
                        'absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
                        paid ? 'translate-x-6' : 'translate-x-1',
                      ].join(' ')}
                    />
                  </div>
                </button>
              </CollapsibleSection>

              {!state.success && state.message && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {state.message}
                </div>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-neutral-100 bg-white px-6 py-4 sm:px-7">
            <p className="hidden text-xs text-neutral-400 sm:block">
              Los campos obligatorios deben completarse.
            </p>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-800"
              >
                Cancelar
              </button>

              <SaveButton />
            </div>
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
    <section className="rounded-[1.5rem] border border-neutral-200 bg-white p-5 shadow-sm shadow-neutral-950/[0.02] sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-neutral-950">{title}</h3>

          <p className="mt-1 text-xs leading-5 text-neutral-400">
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
    <section className="overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white shadow-sm shadow-neutral-950/[0.02]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center gap-3 p-5 text-left transition hover:bg-neutral-50 sm:p-6"
      >
        <div
          className={[
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
            active
              ? 'bg-neutral-950 text-white'
              : 'bg-neutral-100 text-neutral-700',
          ].join(' ')}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-neutral-950">{title}</h3>

            {active && (
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-700">
                Activo
              </span>
            )}
          </div>

          <p className="mt-1 text-xs leading-5 text-neutral-400">
            {description}
          </p>
        </div>

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-neutral-400">
          {open ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </button>

      {open && (
        <div className="border-t border-neutral-100 bg-neutral-50/40 p-5 sm:p-6">
          {children}
        </div>
      )}
    </section>
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

function SaveButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex min-w-40 cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <Plus className="h-4 w-4" />
      )}

      {pending ? 'Guardando...' : 'Crear movimiento'}
    </button>
  )
}

function getLocalDateInputValue() {
  const now = new Date()

  const year = now.getFullYear()

  const month = String(now.getMonth() + 1).padStart(2, '0')

  const day = String(now.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
