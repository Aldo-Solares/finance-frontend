// @/shared/admin/admin-catalog-page.tsx

'use client'

import { Plus, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'

import { HeroComponent } from '@/shared/components/hero-component'
import { DeleteModal } from '@/shared/modals/delete-modal'

type AdminCatalogMetric = {
  icon: LucideIcon
  label: string
  value: string | number
}

type AdminCatalogItemActions<T> = {
  onEdit: (item: T) => void
  onDelete: (item: T) => void
}

type AdminCatalogPageProps<T> = {
  title: string
  description: string
  createLabel: string
  items: T[]
  metrics?: AdminCatalogMetric[]
  emptyIcon: LucideIcon
  emptyTitle: string
  emptyDescription: string
  deleteTitle: string
  getDeleteDescription: (item: T) => string
  onDelete: (item: T) => Promise<void>
  renderItems: (actions: AdminCatalogItemActions<T>) => ReactNode
  renderCreateDialog: (onClose: () => void) => ReactNode
  renderEditDialog: (item: T, onClose: () => void) => ReactNode
}

export function AdminCatalogPage<T>({
  title,
  description,
  createLabel,
  items,
  metrics = [],
  emptyIcon,
  emptyTitle,
  emptyDescription,
  deleteTitle,
  getDeleteDescription,
  onDelete,
  renderItems,
  renderCreateDialog,
  renderEditDialog,
}: AdminCatalogPageProps<T>) {
  const [creating, setCreating] = useState(false)
  const [editingItem, setEditingItem] = useState<T | null>(null)
  const [deletingItem, setDeletingItem] = useState<T | null>(null)

  const handleConfirmDelete = async () => {
    if (!deletingItem) return

    await onDelete(deletingItem)
  }

  return (
    <>
      <section className="w-full space-y-8">
        <HeroComponent
          eyebrow="Administración"
          title={title}
          description={description}
          rightContent={{
            type: 'actions',
            info: metrics.map((metric) => ({
              label: metric.label,
              value: metric.value,
              icon: metric.icon,
            })),
            items: [
              {
                label: createLabel,
                icon: Plus,
                variant: 'primary',
                onClick: () => setCreating(true),
              },
            ],
          }}
        />

        {items.length === 0 ? (
          <AdminCatalogEmptyState
            icon={emptyIcon}
            title={emptyTitle}
            description={emptyDescription}
          />
        ) : (
          renderItems({
            onEdit: setEditingItem,
            onDelete: setDeletingItem,
          })
        )}
      </section>

      {creating && renderCreateDialog(() => setCreating(false))}
      {editingItem !== null &&
        renderEditDialog(editingItem, () => setEditingItem(null))}
      {deletingItem !== null && (
        <DeleteModal
          title={deleteTitle}
          description={getDeleteDescription(deletingItem)}
          onClose={() => setDeletingItem(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  )
}

type AdminCatalogEmptyStateProps = {
  icon: LucideIcon
  title: string
  description: string
}

function AdminCatalogEmptyState({
  icon: Icon,
  title,
  description,
}: AdminCatalogEmptyStateProps) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-border bg-background px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-surface text-text-muted">
        <Icon className="h-6 w-6" />
      </div>

      <h2 className="mt-5 text-base font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-text-muted">
        {description}
      </p>
    </div>
  )
}
