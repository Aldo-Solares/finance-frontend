// @/modules/debts/card-product/components/card-product-item.tsx

'use client';

import {
  Building2,
  CreditCard,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';

import type { CardProduct } from '@/modules/debts/card-product/schemas/card-product.schema';

type CardProductItemProps = {
  product: CardProduct;
  onEdit: (product: CardProduct) => void;
  onDelete: (product: CardProduct) => void;
};

export function CardProductItem({
  product,
  onEdit,
  onDelete,
}: CardProductItemProps) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  return (
    <article className="group relative overflow-visible rounded-[1.6rem] border border-neutral-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.3)]">
      {/* ===================
      TOP
      =================== */}

      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-950 text-white">
          <CreditCard className="h-4 w-4" />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setMenuOpen((current) => !current)
            }
            aria-label="Opciones"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-[calc(100%+0.5rem)] z-20 w-40 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-xl">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(product);
                }}
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
              >
                <Pencil className="h-3.5 w-3.5" />

                Editar
              </button>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(product);
                }}
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-3.5 w-3.5" />

                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ===================
      INFORMATION
      =================== */}

      <div className="mt-8">
        <p className="text-lg font-semibold tracking-tight text-neutral-950">
          {product.cardName}
        </p>

        <div className="mt-2 flex items-center gap-2 text-sm text-neutral-400">
          <Building2 className="h-3.5 w-3.5" />

          {product.bank}
        </div>
      </div>

      {/* ===================
      FOOTER
      =================== */}

      <div className="mt-6 border-t border-neutral-100 pt-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-300">
          Producto #{product.productId}
        </p>
      </div>
    </article>
  );
}