// @/modules/debts/concept/components/concept-form-modal.tsx

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
  Tag,
  X,
} from 'lucide-react';

import type { ActionState } from '@/core/utils/action-state';
import {
  createConceptAction,
  updateConceptAction,
} from '@/modules/debts/concept/actions/concept.actions';
import type { Concept } from '@/modules/debts/concept/schemas/concept.schema';

type ConceptFormModalProps = {
  concept: Concept | null;
  onClose: () => void;
};

const initialState: ActionState<Concept> = {
  success: false,
  message: null,
  data: null,
};

export function ConceptFormModal({
  concept,
  onClose,
}: ConceptFormModalProps) {
  const editing = concept !== null;

  const [createState, createAction] =
    useActionState(
      createConceptAction,
      initialState,
    );

  const [updateState, updateAction] =
    useActionState(
      updateConceptAction,
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

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-neutral-100 px-6 py-5">
          <div>
            <h2 className="text-base font-semibold text-neutral-950">
              {editing
                ? 'Editar concepto'
                : 'Nuevo concepto'}
            </h2>

            <p className="mt-1 text-sm text-neutral-400">
              {editing
                ? 'Actualiza el nombre del concepto.'
                : 'Agrega una nueva clasificación para tus movimientos.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-neutral-400 hover:bg-neutral-100 hover:text-neutral-950"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form action={action}>
          {editing && (
            <input
              type="hidden"
              name="conceptId"
              value={concept.conceptId}
            />
          )}

          <div className="p-6">
            <label
              htmlFor="name"
              className="mb-2 block text-xs font-medium text-neutral-500"
            >
              Nombre
            </label>

            <div className="relative">
              <Tag className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

              <input
                id="name"
                name="name"
                type="text"
                maxLength={100}
                defaultValue={
                  concept?.name ?? ''
                }
                placeholder="Ej. Supermercado"
                className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-10 pr-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-300 focus:border-neutral-400 focus:bg-white"
              />
            </div>

            {!state.success &&
              state.message && (
                <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {state.message}
                </div>
              )}
          </div>

          <div className="flex justify-end gap-3 border-t border-neutral-100 bg-neutral-50/60 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-500 hover:bg-neutral-200"
            >
              Cancelar
            </button>

            <ConceptSaveButton
              editing={editing}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

function ConceptSaveButton({
  editing,
}: {
  editing: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex min-w-36 cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
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
          : 'Crear concepto'}
    </button>
  );
}