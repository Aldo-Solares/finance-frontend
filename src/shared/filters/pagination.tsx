// @/shared/pagination/pagination.tsx

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
    <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
      <p className="text-xs text-text-muted">
        Página {currentPage} de {totalPages}
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          aria-label="Página anterior"
          className={[
            'flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg',
            'border border-border bg-background text-text-muted',
            'transition-all duration-200',
            'hover:border-primary/30 hover:bg-primary-soft hover:text-primary',
            'disabled:cursor-not-allowed disabled:opacity-40',
          ].join(' ')}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => {
            const active = page === currentPage

            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={active ? 'page' : undefined}
                className={[
                  'flex h-9 min-w-9 cursor-pointer items-center justify-center',
                  'rounded-lg px-2 text-xs font-medium transition-all duration-200',
                  active
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-text-muted hover:bg-surface hover:text-foreground',
                ].join(' ')}
              >
                {page}
              </button>
            )
          },
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          aria-label="Página siguiente"
          className={[
            'flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg',
            'border border-border bg-background text-text-muted',
            'transition-all duration-200',
            'hover:border-primary/30 hover:bg-primary-soft hover:text-primary',
            'disabled:cursor-not-allowed disabled:opacity-40',
          ].join(' ')}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
