// @/modules/debts/concept/components/concept-grid.tsx
'use client'

import type { Concept } from '@/modules/debts/concept/schemas/concept.schema'
import { AdminCatalogGrid } from '@/shared/admin/admin-catalog-grid'
import { AdminCatalogItem } from '@/shared/admin/admin-catalog-item'

import { getCategoryIcon } from './category-icon'

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
          key={concept.categoryId}
          icon={getCategoryIcon(concept.name)}
          iconClassName="text-primary"
          title={concept.name}
          subtitle={`Categoría #${concept.categoryId}`}
          editLabel={`Editar ${concept.name}`}
          deleteLabel={`Eliminar ${concept.name}`}
          onEdit={() => onEdit(concept)}
          onDelete={() => onDelete(concept)}
        />
      ))}
    </AdminCatalogGrid>
  )
}
