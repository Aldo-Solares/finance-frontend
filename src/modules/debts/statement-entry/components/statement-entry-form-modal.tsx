// @/modules/debts/statement-entry/components/statement-entry-form-modal.tsx

'use client';

import {
  useActionState,
  useEffect,
} from 'react';
import { useFormStatus } from 'react-dom';
import {
  LoaderCircle,
  Plus,
  Save,
  X,
} from 'lucide-react';
import type { Concept } from '@/modules/debts/concept/schemas/concept.schema';
import type { ActionState } from '@/core/utils/action-state';
import {
  createStatementEntryAction,
  updateStatementEntryAction,
} from '@/modules/debts/statement-entry/actions/statement-entry.actions';
import type { StatementEntry } from '@/modules/debts/statement-entry/schemas/statement-entry.schema';

type StatementEntryFormModalProps = {
  statementId: number;
  entry: StatementEntry | null;
  concepts: Concept[];
  onClose: () => void;
};

const initialState: ActionState<StatementEntry> = {
  success: false,
  message: null,
  data: null,
};

export function StatementEntryFormModal({
  statementId,
  entry,
  concepts,
  onClose,
}: StatementEntryFormModalProps) {
  const editing = entry !== null;

  const [createState, createAction] =
    useActionState(
      createStatementEntryAction,
      initialState,
    );

  const [updateState, updateAction] =
    useActionState(
      updateStatementEntryAction,
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
        aria-label="Cerrar modal"
        className="absolute inset-0 bg-neutral-950/55 backdrop-blur-sm"
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-neutral-100 bg-white px-6 py-5">
          <div>
            <h2 className="font-semibold text-neutral-950">
              {editing
                ? 'Editar movimiento'
                : 'Nuevo movimiento'}
            </h2>

            <p className="mt-1 text-sm text-neutral-400">
              Registra la información del movimiento.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-neutral-400 hover:bg-neutral-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form action={action}>
          <input
            type="hidden"
            name="statementId"
            value={statementId}
          />

          {editing && (
            <input
              type="hidden"
              name="entryId"
              value={entry.entryId}
            />
          )}

          <div className="space-y-5 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="conceptId"
                  className="mb-2 block text-xs font-medium text-neutral-500"
                >
                  Concepto
                </label>

                <select
                  id="conceptId"
                  name="conceptId"
                  defaultValue={
                    entry?.conceptId ??
                    concepts[0]?.conceptId ??
                    ''
                  }
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-950 outline-none transition-colors focus:border-neutral-400"
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
                defaultValue={
                  entry?.debtor ?? ''
                }
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-xs font-medium text-neutral-500"
              >
                Descripción
              </label>

              <textarea
                id="description"
                name="description"
                rows={3}
                defaultValue={
                  entry?.description ?? ''
                }
                className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Fecha de compra"
                name="purchaseDate"
                type="date"
                defaultValue={
                  entry?.date ?? ''
                }
              />

              <Field
                label="Monto de parcialidad"
                name="installmentAmount"
                type="number"
                min={0}
                step="0.01"
                defaultValue={
                  entry?.amount ??
                  ''
                }
              />
            </div>

            <div className="rounded-[1.5rem] border border-neutral-200 bg-neutral-50/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-neutral-400">
                Meses sin intereses
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Mes actual"
                  name="msiCurrent"
                  type="number"
                  min={0}
                  defaultValue={
                    entry?.msiCurrent ?? ''
                  }
                />

                <Field
                  label="Total de meses"
                  name="msiTotal"
                  type="number"
                  min={0}
                  defaultValue={
                    entry?.msiTotal ?? ''
                  }
                />

                <Field
                  label="Total de compra"
                  name="purchaseTotal"
                  type="number"
                  min={0}
                  step="0.01"
                  defaultValue={
                    entry?.purchaseAmount ?? ''
                  }
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
                />

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
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-neutral-700">
                  Pagado
                </p>

                <p className="mt-0.5 text-xs text-neutral-400">
                  Indica si este movimiento ya fue cubierto.
                </p>
              </div>

              <select
                name="paid"
                defaultValue={
                  entry?.paid
                    ? 'true'
                    : 'false'
                }
                className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none"
              >
                <option value="false">
                  Pendiente
                </option>

                <option value="true">
                  Pagado
                </option>
              </select>
            </div>

            {!state.success &&
              state.message && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {state.message}
                </div>
              )}
          </div>

          <div className="sticky bottom-0 flex justify-end gap-3 border-t border-neutral-100 bg-white px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl px-4 py-2.5 text-sm text-neutral-500 hover:bg-neutral-100"
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
  step?: string;
};

function Field({
  label,
  name,
  type,
  defaultValue,
  min,
  step,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-medium text-neutral-500"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        min={min}
        step={step}
        defaultValue={defaultValue}
        className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-950 outline-none focus:border-neutral-400"
      />
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
      className="flex min-w-40 cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
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
  );
}