// @/shared/page/page-header.tsx

import type { ReactNode } from 'react'

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-[2rem] border border-border bg-background px-7 py-8 text-foreground sm:px-9 sm:py-9">
      <div className="relative flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              {eyebrow}
            </p>
          )}

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            {title}
          </h1>

          {description && (
            <p className="mt-3 max-w-2xl text-sm leading-6 text-text-muted">
              {description}
            </p>
          )}
        </div>

        {action && (
          <div className="relative shrink-0">
            {action}
          </div>
        )}
      </div>
    </header>
  )
}
