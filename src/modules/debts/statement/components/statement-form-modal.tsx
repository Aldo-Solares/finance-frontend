// @/modules/debts/statement/components/statement-form-modal.tsx

'use client';

import {
  useActionState,
  useEffect,
} from 'react';
import { useFormStatus } from 'react-dom';
import {
  CalendarDays,
  LoaderCircle,
  Plus,
  Save,
  X,
} from 'lucide-react';

import type { ActionState } from '@/core/utils/action-state';
import type { Card } from '@/modules/debts/card/schemas/card.schema';
import {
  createStatementAction,
  updateStatementAction,
} from '@/modules/debts/statement/actions/statement.actions';
import type { Statement } from '@/modules/debts/statement/schemas/statement.schema';

type StatementFormModalProps = {
  cards: Card[];
  selectedCardId: number | null;
  statement: Statement | null;
  onClose: () => void;
};

const initialState: ActionState<Statement> = {
  success: false,
  message: null,
  data: null,
};

export function StatementFormModal({
  cards,
  selectedCardId,
  statement,
  onClose,
}: StatementFormModalProps) {
  const editing = statement !== null;

  const [createState, createAction] =
    useActionState(
      createStatementAction,
      initialState,
    );

  const [updateState, updateAction] =
    useActionState(
      updateStatementAction,
      initialState,
    );

  const state = editing
    ? updateState
    : createState;

  const action = editing
    ? updateAction
    : createAction;

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [state.success, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/55 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-neutral-100 px-6 py-5">
          <div>
            <h2 className="font-semibold text-neutral-950">
              {editing
                ? 'Editar estado de cuenta'
                : 'Nuevo estado de cuenta'}
            </h2>

            <p className="mt-1 text-sm text-neutral-400">
              Registra las fechas del periodo.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-neutral-400 hover:bg-neutral-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form action={action}>
          {editing && (
            <input
              type="hidden"
              name="statementId"
              value={statement.statementId}
            />
          )}

          <div className="space-y-5 p-6">
            <div>
              <label
                htmlFor="cardId"
                className="mb-2 block text-xs font-medium text-neutral-500"
              >
                Tarjeta
              </label>

              <select
                id="cardId"
                name="cardId"
                defaultValue={String(
                  statement?.cardId ??
                    selectedCardId ??
                    '',
                )}
                className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-950 outline-none focus:border-neutral-400"
              >
                {cards.map((card) => (
                  <option
                    key={card.cardId}
                    value={String(card.cardId)}
                  >
                    {card.cardCode} · {card.bank}{' '}
                    {card.cardName}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Año"
                name="year"
                type="number"
                defaultValue={
                  statement?.year ??
                  new Date().getFullYear()
                }
              />

              <Field
                label="Mes"
                name="month"
                type="number"
                min={1}
                max={12}
                defaultValue={
                  statement?.month ??
                  new Date().getMonth() + 1
                }
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field
                label="Inicio"
                name="periodStart"
                type="date"
                defaultValue={
                  statement?.periodStart ?? ''
                }
              />

              <Field
                label="Corte"
                name="periodEnd"
                type="date"
                defaultValue={
                  statement?.periodEnd ?? ''
                }
              />

              <Field
                label="Fecha de pago"
                name="paymentDate"
                type="date"
                defaultValue={
                  statement?.paymentDate ?? ''
                }
              />
            </div>

            {editing && (
              <div>
                <label
                  htmlFor="notes"
                  className="mb-2 block text-xs font-medium text-neutral-500"
                >
                  Notas
                </label>

                <textarea
                  id="notes"
                  name="notes"
                  defaultValue={
                    statement.notes ?? ''
                  }
                  rows={4}
                  className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
                />
              </div>
            )}

            {!state.success &&
              state.message && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {state.message}
                </div>
              )}
          </div>

          <div className="flex justify-end gap-3 border-t border-neutral-100 bg-neutral-50/60 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl px-4 py-2.5 text-sm text-neutral-500 hover:bg-neutral-200"
            >
              Cancelar
            </button>

            <SaveButton editing={editing} />
          </div>
        </form>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type: string;
  defaultValue: string | number;
  min?: number;
  max?: number;
};

function Field({
  label,
  name,
  type,
  defaultValue,
  min,
  max,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-medium text-neutral-500"
      >
        {label}
      </label>

      <div className="relative">
        {type === 'date' && (
          <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        )}

        <input
          id={name}
          name={name}
          type={type}
          min={min}
          max={max}
          defaultValue={defaultValue}
          className={[
            'h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 pr-4 text-sm outline-none focus:border-neutral-400',
            type === 'date'
              ? 'pl-10'
              : 'px-4',
          ].join(' ')}
        />
      </div>
    </div>
  );
}

function SaveButton({
  editing,
}: {
  editing: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex min-w-36 cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
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
          : 'Crear periodo'}
    </button>
  );
}