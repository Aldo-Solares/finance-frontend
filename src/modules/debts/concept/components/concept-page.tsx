// @/modules/debts/concept/components/concept-page.tsx

'use client'

import { useState } from 'react'

import { Plus } from 'lucide-react'

import type { Concept } from '@/modules/debts/concept/schemas/concept.schema'
import { deleteConceptAction } from '@/modules/debts/concept/actions/concept.actions'

import { HeroComponent } from '@/shared/hero/hero-component'
import { DeleteModal } from '@/shared/modal/delete-modal'

import { ConceptFormModal } from './concept-form-modal'
import { ConceptGrid } from './concept-grid'

type ConceptPageProps = {
  concepts: Concept[]
}

export function ConceptPage({ concepts }: ConceptPageProps) {
  const [formOpen, setFormOpen] = useState(false)
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null)
  const [deleteConcept, setDeleteConcept] = useState<Concept | null>(null)

  const handleCreate = () => {
    setSelectedConcept(null)
    setFormOpen(true)
  }

  const handleEdit = (concept: Concept) => {
    setSelectedConcept(concept)
    setFormOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!deleteConcept) return

    await deleteConceptAction(deleteConcept.conceptId)
  }

  return (
    <>
      <section className="w-full space-y-8">
        <HeroComponent
          eyebrow="Administración"
          title="Conceptos"
          description="Administra los conceptos utilizados para clasificar movimientos."
          action={{
            label: 'Nuevo concepto',
            icon: Plus,
            onClick: handleCreate,
          }}
        />

        <ConceptGrid
          concepts={concepts}
          onEdit={handleEdit}
          onDelete={setDeleteConcept}
        />
      </section>

      {formOpen && (
        <ConceptFormModal
          key={selectedConcept?.conceptId ?? 'create'}
          concept={selectedConcept}
          onClose={() => {
            setFormOpen(false)
            setSelectedConcept(null)
          }}
        />
      )}

      {deleteConcept && (
        <DeleteModal
          title="Eliminar concepto"
          description={`¿Seguro que deseas eliminar "${deleteConcept.name}"?`}
          onClose={() => setDeleteConcept(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  )
}
