// @/modules/debts/concept/components/concept-empty-state.tsx

import { Tags } from 'lucide-react';

export function ConceptEmptyState() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-border bg-background px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-surface text-text-muted">
        <Tags className="h-6 w-6" />
      </div>

      <h2 className="mt-5 text-base font-semibold text-foreground">
        No hay conceptos
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-text-muted">
        Agrega el primer concepto para comenzar a clasificar movimientos.
      </p>
    </div>
  );
}