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
      title="Conceptos"
      description="Administra los conceptos utilizados para clasificar movimientos."
      createLabel="Nuevo concepto"
      items={concepts}
      metrics={[
        {
          icon: Tags,
          label: 'Conceptos disponibles',
          value: concepts.length,
        },
      ]}
      emptyIcon={Tags}
      emptyTitle="No hay conceptos"
      emptyDescription="Agrega el primer concepto para comenzar a clasificar movimientos."
      deleteTitle="Eliminar concepto"
      getDeleteDescription={(concept) =>
        `¿Seguro que deseas eliminar "${concept.name}"?`
      }
      onDelete={async (concept) => {
        await deleteConceptAction(concept.conceptId)
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
          key={concept.conceptId}
          concept={concept}
          onClose={onClose}
        />
      )}
    />
  )
}
