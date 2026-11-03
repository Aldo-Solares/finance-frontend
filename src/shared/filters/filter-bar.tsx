// @/shared/filters/filter-bar.tsx

'use client'

import { ChevronDown, Filter, RotateCcw } from 'lucide-react'
import type { ReactNode } from 'react'

type FilterBarProps = {
  primaryFilters: ReactNode
  advancedFilters?: ReactNode
  advancedFilterCount?: number
  hasActiveFilters?: boolean
  onReset?: () => void
  title?: string
  description?: string
  advancedDescription?: string
}

export function FilterBar({
  primaryFilters,
  advancedFilters,
  advancedFilterCount = 0,
  hasActiveFilters = false,
  onReset,
  title = 'Filtros',
  description = 'Elige qué información quieres consultar.',
  advancedDescription = 'Opciones adicionales para acotar los resultados.',
}: FilterBarProps) {
  return (
    <section className="relative overflow-visible rounded-2xl border border-border bg-background shadow-sm">
      <header className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <Filter className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-semibold tracking-tight text-foreground">
                {title}
              </h2>
              {hasActiveFilters && (
                <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold text-primary">
                  Aplicados
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs leading-4 text-text-muted">
              {description}
            </p>
          </div>
        </div>

        {hasActiveFilters && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-9 shrink-0 cursor-pointer items-center justify-center gap-1.5 self-start rounded-xl border border-border bg-background px-3 text-xs font-medium text-text-muted transition-colors hover:border-primary/30 hover:bg-primary-soft hover:text-primary sm:self-auto"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Limpiar
          </button>
        )}
      </header>

      <div className="grid gap-4 px-4 py-4 sm:grid-cols-2 sm:px-5 lg:grid-cols-3">
        {primaryFilters}
      </div>

      {advancedFilters && (
        <details
          open={advancedFilterCount > 0}
          className="group border-t border-border"
        >
          <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 transition-colors hover:bg-surface/60 sm:px-5 [&::-webkit-details-marker]:hidden">
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold text-foreground">
                Más filtros
              </span>
              <span className="mt-0.5 block truncate text-[11px] text-text-muted">
                {advancedDescription}
              </span>
            </span>
            <span className="rounded-full bg-surface px-2.5 py-1 text-[10px] font-semibold text-text-muted">
              {advancedFilterCount > 0
                ? `${advancedFilterCount} activo${advancedFilterCount === 1 ? '' : 's'}`
                : 'Opcional'}
            </span>
            <ChevronDown
              className="h-4 w-4 shrink-0 text-text-muted transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="grid gap-4 border-t border-border bg-surface/40 px-4 py-4 sm:grid-cols-2 sm:px-5 lg:grid-cols-3 xl:grid-cols-4">
            {advancedFilters}
          </div>
        </details>
      )}
    </section>
  )
}
