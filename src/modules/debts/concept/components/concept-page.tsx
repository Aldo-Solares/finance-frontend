// @/modules/debts/concept/components/concept-page.tsx

'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

import type { Concept } from '@/modules/debts/concept/schemas/concept.schema';
import { PageHeader } from '@/shared/page/page-header';

import { ConceptDeleteModal } from './concept-delete-modal';
import { ConceptFormModal } from './concept-form-modal';
import { ConceptGrid } from './concept-grid';

type ConceptPageProps = {
  concepts: Concept[];
};

export function ConceptPage({
  concepts,
}: ConceptPageProps) {
  const [formOpen, setFormOpen] =
    useState(false);

  const [selectedConcept, setSelectedConcept] =
    useState<Concept | null>(null);

  const [deleteConcept, setDeleteConcept] =
    useState<Concept | null>(null);

  const handleCreate = () => {
    setSelectedConcept(null);
    setFormOpen(true);
  };

  const handleEdit = (concept: Concept) => {
    setSelectedConcept(concept);
    setFormOpen(true);
  };

  return (
    <>
      <section className="w-full space-y-8">
        <PageHeader
          eyebrow="Administración"
          title="Conceptos"
          description="Administra los conceptos utilizados para clasificar movimientos."
          action={
            <button
              type="button"
              onClick={handleCreate}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white"
            >
              <Plus className="h-4 w-4" />
              Nuevo concepto
            </button>
          }
        />

        <ConceptGrid
          concepts={concepts}
          onEdit={handleEdit}
          onDelete={setDeleteConcept}
        />
      </section>

      {formOpen && (
        <ConceptFormModal
          key={
            selectedConcept?.conceptId ??
            'create'
          }
          concept={selectedConcept}
          onClose={() => {
            setFormOpen(false);
            setSelectedConcept(null);
          }}
        />
      )}

      {deleteConcept && (
        <ConceptDeleteModal
          key={deleteConcept.conceptId}
          concept={deleteConcept}
          onClose={() =>
            setDeleteConcept(null)
          }
        />
      )}
    </>
  );
}