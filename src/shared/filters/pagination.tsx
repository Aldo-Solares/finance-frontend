// @/shared/filters/pagination.tsx

'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  const canGoPrevious = currentPage > 1
  const canGoNext = currentPage < totalPages

  return (
    <nav
      aria-label="Paginación de movimientos"
      className="inline-flex items-center gap-1 rounded-xl border border-border bg-background p-1 shadow-sm"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        aria-label="Página anterior"
        className={[
          'flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg',
          'text-text-muted',
          'transition-all duration-200',
          'hover:bg-primary-soft hover:text-primary',
          'disabled:cursor-not-allowed disabled:opacity-40',
        ].join(' ')}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="min-w-[6.5rem] px-2 text-center text-[11px] font-medium tabular-nums text-text-muted">
        Página <span className="text-foreground">{currentPage}</span> de {totalPages}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        aria-label="Página siguiente"
        className={[
          'flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg',
          'text-text-muted',
          'transition-all duration-200',
          'hover:bg-primary-soft hover:text-primary',
          'disabled:cursor-not-allowed disabled:opacity-40',
        ].join(' ')}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}
