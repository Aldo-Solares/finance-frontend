// @/modules/debts/statement-entry/components/statement-entry-pagination.tsx

'use client'

type StatementEntryPaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function StatementEntryPagination({
  currentPage,
  totalPages,
  onPageChange,
}: StatementEntryPaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-between rounded-[1.25rem] border border-neutral-200 bg-white px-4 py-3">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="cursor-pointer rounded-lg px-3 py-2 text-xs font-medium text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Anterior
      </button>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={[
                'flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-lg px-2 text-xs font-medium transition',
                page === currentPage
                  ? 'bg-neutral-950 text-white'
                  : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900',
              ].join(' ')}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="cursor-pointer rounded-lg px-3 py-2 text-xs font-medium text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Siguiente
      </button>
    </div>
  )
}
