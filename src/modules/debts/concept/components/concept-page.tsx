'use client'

import { Tags } from 'lucide-react'

import { deleteConceptAction } from '@/modules/debts/concept/actions/concept.actions'
import type { Concept } from '@/modules/debts/concept/schemas/concept.schema'
import { AdminCatalogPage } from '@/shared/admin/admin-catalog-page'

import { ConceptFormModal } from './concept-form-modal'
import { ConceptGrid } from './concept-grid'

type ConceptPageProps = {
  concepts: Concept[]
}

export function ConceptPage({ concepts }: ConceptPageProps) {
  return (
    <AdminCatalogPage
      title="Categorías"
      description="Administra las categorías utilizadas para clasificar movimientos."
      createLabel="Nueva categoría"
      items={concepts}
      metrics={[
        {
          icon: Tags,
          label: 'Categorías disponibles',
          value: concepts.length,
        },
      ]}
      emptyIcon={Tags}
      emptyTitle="No hay categorías"
      emptyDescription="Agrega la primera categoría para clasificar movimientos."
      deleteTitle="Eliminar categoría"
      getDeleteDescription={(concept) =>
        `¿Seguro que deseas eliminar "${concept.name}"?`
      }
      onDelete={async (concept) => {
        await deleteConceptAction(concept.categoryId)
      }}
      renderItems={({ onEdit, onDelete }) => (
        <ConceptGrid
          concepts={concepts}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      renderCreateDialog={(onClose) => (
        <ConceptFormModal concept={null} onClose={onClose} />
      )}
      renderEditDialog={(concept, onClose) => (
        <ConceptFormModal
          key={concept.categoryId}
          concept={concept}
          onClose={onClose}
        />
      )}
    />
  )
}
