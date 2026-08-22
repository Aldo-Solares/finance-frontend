// @/modules/debts/card/components/card-empty-state.tsx

import { CreditCard } from 'lucide-react';

export function CardEmptyState() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-200 bg-white/70 px-6 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
        <CreditCard className="h-5 w-5" />
      </div>

      <h2 className="mt-4 text-base font-semibold text-neutral-950">
        Todavía no tienes tarjetas
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
        Cuando agregues una tarjeta disponible a tu cuenta, aparecerá aquí.
      </p>
    </div>
  );
}