// @/shared/admin/admin-catalog-item.tsx

'use client'

import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { RecordActionsComponent } from '@/shared/components/record-actions.component'

type AdminCatalogItemProps = {
  title: string
  subtitle?: string
  icon?: LucideIcon
  iconClassName?: string
  image?: {
    src: string
    alt: string
    variant?: 'card' | 'square'
  }
  details?: ReactNode
  editLabel: string
  deleteLabel: string
  onEdit: () => void
  onDelete: () => void
}

export function AdminCatalogItem({
  title,
  subtitle,
  icon: Icon,
  iconClassName = 'text-text-muted',
  image,
  details,
  editLabel,
  deleteLabel,
  onEdit,
  onDelete,
}: AdminCatalogItemProps) {
  return (
    <article className="min-w-0 rounded-[1.5rem] border border-border bg-background p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div
            className={`relative flex shrink-0 items-center justify-center overflow-hidden ${image ? 'bg-surface text-text-muted' : 'bg-primary-soft'} ${image?.variant === 'card' ? 'h-12 w-[4.75rem] rounded-lg' : 'h-11 w-11 rounded-2xl'}`}
          >
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                unoptimized
                sizes={image.variant === 'card' ? '76px' : '44px'}
                className="object-cover"
              />
            ) : (
              Icon && <Icon className={`h-4 w-4 ${iconClassName}`} />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-foreground">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-1 truncate text-[10px] font-medium uppercase tracking-[0.12em] text-text-muted">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <RecordActionsComponent
          editLabel={editLabel}
          deleteLabel={deleteLabel}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      {details && (
        <div className="mt-5 border-t border-border pt-4">{details}</div>
      )}
    </article>
  )
}
