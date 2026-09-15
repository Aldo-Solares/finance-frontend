// @/shared/filters/filter-bar.tsx

'use client'

import { Filter, RotateCcw } from 'lucide-react'
import type { ReactNode } from 'react'

type FilterBarProps = {
  children: ReactNode
  hasActiveFilters?: boolean
  onReset?: () => void
  title?: string
  description?: string
}

export function FilterBar({
  children,
  hasActiveFilters = false,
  onReset,
  title = 'Filtros',
  description = 'Filtra los resultados que deseas consultar.',
}: FilterBarProps) {
  return (
    <section className="overflow-visible rounded-2xl border border-border bg-background shadow-sm">
      {/* ===================
          HEADER
          =================== */}

      <div className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface text-text-muted">
            <Filter className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold tracking-tight text-foreground">
                {title}
              </p>

              {hasActiveFilters && (
                <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                  Activos
                </span>
              )}
            </div>

            <p className="mt-0.5 text-xs leading-5 text-text-muted">
              {description}
            </p>
          </div>
        </div>

        {hasActiveFilters && onReset && (
          <button
            type="button"
            onClick={onReset}
            className={[
              'inline-flex h-9 shrink-0 cursor-pointer items-center justify-center',
              'gap-1.5 self-start rounded-xl border border-border',
              'bg-background px-3 text-xs font-medium text-text-muted',
              'transition-all duration-200',
              'hover:border-primary/30 hover:bg-primary-soft hover:text-primary',
              'sm:self-auto',
            ].join(' ')}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Limpiar filtros
          </button>
        )}
      </div>

      {/* ===================
          FILTERS
          =================== */}

      <div className="bg-surface/50 p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {children}
        </div>
      </div>
    </section>
  )
}
