// @/modules/debts/concept/components/concept-item.tsx

'use client';

import {
  Pencil,
  Tag,
  Trash2,
} from 'lucide-react';

import type { Concept } from '@/modules/debts/concept/schemas/concept.schema';

type ConceptItemProps = {
  concept: Concept;
  onEdit: (concept: Concept) => void;
  onDelete: (concept: Concept) => void;
};

export function ConceptItem({
  concept,
  onEdit,
  onDelete,
}: ConceptItemProps) {
  return (
    <article className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-neutral-200 bg-white p-5 transition-all duration-300 hover:border-neutral-300 hover:shadow-[0_20px_50px_-35px_rgba(0,0,0,0.3)]">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-600">
          <Tag className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-neutral-950">
            {concept.name}
          </p>

          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-300">
            Concepto #{concept.conceptId}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={() => onEdit(concept)}
          aria-label="Editar concepto"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
        >
          <Pencil className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => onDelete(concept)}
          aria-label="Eliminar concepto"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}