'use client'

import Image from 'next/image'
import { Pencil, Trash2, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type AdminCatalogItemProps = {
  title: string
  subtitle?: string
  icon?: LucideIcon
  image?: {
    src: string
    alt: string
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
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-surface text-text-muted">
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                unoptimized
                sizes="44px"
                className="object-cover"
              />
            ) : (
              Icon && <Icon className="h-4 w-4" />
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

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={onEdit}
            aria-label={editLabel}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label={deleteLabel}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-primary-soft hover:text-primary"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {details && (
        <div className="mt-5 border-t border-border pt-4">{details}</div>
      )}
    </article>
  )
}
