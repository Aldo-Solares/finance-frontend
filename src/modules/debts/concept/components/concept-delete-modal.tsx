// @/modules/debts/concept/components/concept-delete-modal.tsx

'use client';

import {
  useActionState,
  useEffect,
} from 'react';
import { useFormStatus } from 'react-dom';
import {
  LoaderCircle,
  Trash2,
  TriangleAlert,
} from 'lucide-react';

import type { ActionState } from '@/core/utils/action-state';
import { deleteConceptAction } from '@/modules/debts/concept/actions/concept.actions';
import type { Concept } from '@/modules/debts/concept/schemas/concept.schema';

type ConceptDeleteModalProps = {
  concept: Concept;
  onClose: () => void;
};

const initialState: ActionState<null> = {
  success: false,
  message: null,
  data: null,
};

export function ConceptDeleteModal({
  concept,
  onClose,
}: ConceptDeleteModalProps) {
  const [state, action] = useActionState(
    deleteConceptAction,
    initialState,
  );

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
        className="absolute inset-0 bg-foreground/55 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-border bg-background p-6 text-center shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <TriangleAlert className="h-5 w-5" />
        </div>

        <h2 className="mt-5 text-lg font-semibold text-foreground">
          Eliminar concepto
        </h2>

        <p className="mt-2 text-sm leading-6 text-text-muted">
          Vas a eliminar{' '}
          <span className="font-medium text-foreground">
            {concept.name}
          </span>
          .
        </p>

        <form
          action={action}
          className="mt-6"
        >
          <input
            type="hidden"
            name="conceptId"
            value={concept.conceptId}
          />

          {!state.success &&
            state.message && (
              <div className="mb-4 rounded-xl bg-primary-soft px-4 py-3 text-left text-sm text-primary">
                {state.message}
              </div>
            )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 cursor-pointer rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-text-muted hover:bg-surface"
            >
              Cancelar
            </button>

            <ConceptDeleteButton />
          </div>
        </form>
      </div>
    </div>
  );
}

function ConceptDeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
    >
      {pending ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}

      {pending
        ? 'Eliminando...'
        : 'Eliminar'}
    </button>
  );
}
