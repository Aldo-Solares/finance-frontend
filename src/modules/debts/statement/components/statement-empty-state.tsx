// @/modules/debts/statement/components/statement-empty-state.tsx

import {
  CreditCard,
  ReceiptText,
} from 'lucide-react';

type StatementEmptyStateProps = {
  hasCards: boolean;
};

export function StatementEmptyState({
  hasCards,
}: StatementEmptyStateProps) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-neutral-300 bg-white px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-neutral-100 text-neutral-500">
        {hasCards ? (
          <ReceiptText className="h-6 w-6" />
        ) : (
          <CreditCard className="h-6 w-6" />
        )}
      </div>

      <h2 className="mt-5 text-base font-semibold text-neutral-950">
        {hasCards
          ? 'No hay estados de cuenta'
          : 'Primero agrega una tarjeta'}
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">
        {hasCards
          ? 'Esta tarjeta todavía no tiene periodos registrados.'
          : 'Necesitas una tarjeta antes de poder registrar estados de cuenta.'}
      </p>
    </div>
  );
}