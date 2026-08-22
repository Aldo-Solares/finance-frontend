// @/modules/debts/concept/components/concept-grid.tsx

'use client';

import type { Concept } from '@/modules/debts/concept/schemas/concept.schema';

import { ConceptEmptyState } from './concept-empty-state';
import { ConceptItem } from './concept-item';

type ConceptGridProps = {
  concepts: Concept[];
  onEdit: (concept: Concept) => void;
  onDelete: (concept: Concept) => void;
};

export function ConceptGrid({
  concepts,
  onEdit,
  onDelete,
}: ConceptGridProps) {
  if (concepts.length === 0) {
    return <ConceptEmptyState />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {concepts.map((concept) => (
        <ConceptItem
          key={concept.conceptId}
          concept={concept}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}