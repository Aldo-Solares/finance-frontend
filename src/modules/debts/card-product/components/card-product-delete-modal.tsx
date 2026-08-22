// @/modules/debts/card-product/components/card-product-delete-modal.tsx

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
  X,
} from 'lucide-react';

import type { ActionState } from '@/core/utils/action-state';
import { deleteCardProductAction } from '@/modules/debts/card-product/actions/card-product.actions';
import type { CardProduct } from '@/modules/debts/card-product/schemas/card-product.schema';

type CardProductDeleteModalProps = {
  product: CardProduct | null;
  onClose: () => void;
};

const initialState: ActionState<null> = {
  success: false,
  message: null,
  data: null,
};

export function CardProductDeleteModal({
  product,
  onClose,
}: CardProductDeleteModalProps) {
  const [state, formAction] =
    useActionState(
      deleteCardProductAction,
      initialState,
    );

  useEffect(() => {
    if (!state.success) {
      return;
    }

    onClose();
  }, [state.success, onClose]);

  if (product === null) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar modal"
        className="absolute inset-0 cursor-default bg-neutral-950/55 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-[0_35px_100px_-30px_rgba(0,0,0,0.5)]">
        <div className="flex justify-end px-5 pt-5">
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 pb-7 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <TriangleAlert className="h-5 w-5" />
          </div>

          <h2 className="mt-5 text-lg font-semibold tracking-tight text-neutral-950">
            Eliminar producto
          </h2>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            Vas a eliminar{' '}
            <span className="font-medium text-neutral-950">
              {product.bank} {product.cardName}
            </span>
            .
          </p>

          <p className="mt-1 text-xs text-neutral-400">
            Esta acción no se puede deshacer.
          </p>

          <form
            action={formAction}
            className="mt-6"
          >
            <input
              type="hidden"
              name="productId"
              value={product.productId}
            />

            {!state.success &&
              state.message && (
                <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-left text-sm text-red-600">
                  {state.message}
                </div>
              )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 cursor-pointer rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100"
              >
                Cancelar
              </button>

              <DeleteButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
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