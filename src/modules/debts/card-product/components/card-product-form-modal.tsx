// @/modules/debts/card-product/components/card-product-form-modal.tsx

'use client';

import {
  useActionState,
  useEffect,
} from 'react';
import { useFormStatus } from 'react-dom';
import {
  Building2,
  CreditCard,
  LoaderCircle,
  Plus,
  Save,
  X,
} from 'lucide-react';

import type { ActionState } from '@/core/utils/action-state';
import {
  createCardProductAction,
  updateCardProductAction,
} from '@/modules/debts/card-product/actions/card-product.actions';
import type { CardProduct } from '@/modules/debts/card-product/schemas/card-product.schema';

type CardProductFormModalProps = {
  open: boolean;
  product: CardProduct | null;
  onClose: () => void;
};

const initialState: ActionState<CardProduct> = {
  success: false,
  message: null,
  data: null,
};

export function CardProductFormModal({
  open,
  product,
  onClose,
}: CardProductFormModalProps) {
  const editing = product !== null;

  const [createState, createAction] =
    useActionState(
      createCardProductAction,
      initialState,
    );

  const [updateState, updateAction] =
    useActionState(
      updateCardProductAction,
      initialState,
    );

  const state = editing
    ? updateState
    : createState;

  const formAction = editing
    ? updateAction
    : createAction;

  useEffect(() => {
    if (!state.success) {
      return;
    }

    onClose();
  }, [state.success, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* ===================
      BACKDROP
      =================== */}

      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar modal"
        className="absolute inset-0 cursor-default bg-neutral-950/55 backdrop-blur-sm"
      />

      {/* ===================
      MODAL
      =================== */}

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-[0_35px_100px_-30px_rgba(0,0,0,0.5)]">
        {/* ===================
        HEADER
        =================== */}

        <div className="flex items-start justify-between border-b border-neutral-100 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-950 text-white">
              {editing ? (
                <Save className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </div>

            <div>
              <h2 className="text-base font-semibold text-neutral-950">
                {editing
                  ? 'Editar producto'
                  : 'Nuevo producto'}
              </h2>

              <p className="mt-1 text-sm text-neutral-400">
                {editing
                  ? 'Modifica la información del producto.'
                  : 'Agrega un producto al catálogo de tarjetas.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ===================
        FORM
        =================== */}

        <form action={formAction}>
          {editing && (
            <input
              type="hidden"
              name="productId"
              value={product.productId}
            />
          )}

          <div className="space-y-5 p-6">
            {/* ===================
            BANK
            =================== */}

            <div>
              <label
                htmlFor="bank"
                className="mb-2 block text-xs font-medium text-neutral-500"
              >
                Banco
              </label>

              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

                <input
                  key={`${product?.productId ?? 'new'}-bank`}
                  id="bank"
                  name="bank"
                  type="text"
                  maxLength={100}
                  defaultValue={product?.bank ?? ''}
                  placeholder="Ej. BBVA"
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-10 pr-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-300 focus:border-neutral-400 focus:bg-white"
                />
              </div>
            </div>

            {/* ===================
            CARD NAME
            =================== */}

            <div>
              <label
                htmlFor="cardName"
                className="mb-2 block text-xs font-medium text-neutral-500"
              >
                Nombre de la tarjeta
              </label>

              <div className="relative">
                <CreditCard className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

                <input
                  key={`${product?.productId ?? 'new'}-cardName`}
                  id="cardName"
                  name="cardName"
                  type="text"
                  maxLength={100}
                  defaultValue={
                    product?.cardName ?? ''
                  }
                  placeholder="Ej. Oro"
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-10 pr-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-300 focus:border-neutral-400 focus:bg-white"
                />
              </div>
            </div>

            {/* ===================
            ERROR
            =================== */}

            {!state.success &&
              state.message && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {state.message}
                </div>
              )}
          </div>

          {/* ===================
          ACTIONS
          =================== */}

          <div className="flex justify-end gap-3 border-t border-neutral-100 bg-neutral-50/60 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-200/60 hover:text-neutral-950"
            >
              Cancelar
            </button>

            <CardProductSaveButton
              editing={editing}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

type CardProductSaveButtonProps = {
  editing: boolean;
};

function CardProductSaveButton({
  editing,
}: CardProductSaveButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex min-w-36 cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      )}

      {pending
        ? 'Guardando...'
        : editing
          ? 'Guardar cambios'
          : 'Crear producto'}
    </button>
  );
}