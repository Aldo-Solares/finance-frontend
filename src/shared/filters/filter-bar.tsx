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
    <section className="relative rounded-[1.5rem] border border-neutral-200 bg-white shadow-sm shadow-neutral-950/[0.02]">
      <div className="flex flex-col gap-4 border-b border-neutral-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-white shadow-sm">
            <Filter className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold tracking-tight text-neutral-950">
                {title}
              </p>

              {hasActiveFilters && (
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-600">
                  Activos
                </span>
              )}
            </div>

            <p className="mt-0.5 text-xs leading-5 text-neutral-400">
              {description}
            </p>
          </div>
        </div>

        {hasActiveFilters && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-9 shrink-0 cursor-pointer items-center justify-center gap-1.5 self-start rounded-xl border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-500 transition hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-950 sm:self-auto"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="bg-neutral-50/50 p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {children}
        </div>
      </div>
    </section>
  )
}
