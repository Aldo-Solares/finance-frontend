// @/modules/debts/card-product/components/card-product-empty-state.tsx

import {
  CreditCard,
  PackageOpen,
} from 'lucide-react';

export function CardProductEmptyState() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-neutral-300 bg-white px-6 text-center">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-neutral-100 text-neutral-500">
        <CreditCard className="h-6 w-6" />

        <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-neutral-950 text-white">
          <PackageOpen className="h-3 w-3" />
        </div>
      </div>

      <h2 className="mt-5 text-base font-semibold text-neutral-950">
        No hay productos
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">
        Agrega el primer producto de tarjeta para comenzar a construir el catálogo.
      </p>
    </div>
  );
}