'use client'

import { Tag } from 'lucide-react'

import type { Concept } from '@/modules/debts/concept/schemas/concept.schema'
import { AdminCatalogGrid } from '@/shared/admin/admin-catalog-grid'
import { AdminCatalogItem } from '@/shared/admin/admin-catalog-item'

type ConceptGridProps = {
  concepts: Concept[]
  onEdit: (concept: Concept) => void
  onDelete: (concept: Concept) => void
}

export function ConceptGrid({ concepts, onEdit, onDelete }: ConceptGridProps) {
  return (
    <AdminCatalogGrid>
      {concepts.map((concept) => (
        <AdminCatalogItem
          key={concept.conceptId}
          icon={Tag}
          title={concept.name}
          subtitle={`Concepto #${concept.conceptId}`}
          editLabel={`Editar ${concept.name}`}
          deleteLabel={`Eliminar ${concept.name}`}
          onEdit={() => onEdit(concept)}
          onDelete={() => onDelete(concept)}
        />
      ))}
    </AdminCatalogGrid>
  )
}
