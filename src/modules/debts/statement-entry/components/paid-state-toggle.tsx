// @/modules/debts/statement-entry/components/paid-state-toggle.tsx
'use client'

export function PaidStateToggle({
  paid,
  onToggle,
  compact = false,
}: {
  paid: boolean
  onToggle: () => void
  compact?: boolean
}) {
  if (compact) {
    return (
      <div className="flex h-11 items-center justify-center gap-3 rounded-xl border border-primary/20 bg-primary-soft/30 px-3.5">
        <span className={`whitespace-nowrap text-sm font-semibold ${paid ? 'text-primary' : 'text-text-muted'}`}>
          {paid ? 'Pagado' : 'Pendiente'}
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={paid}
          aria-label={paid ? 'Marcar como pendiente' : 'Marcar como pagado'}
          onClick={onToggle}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${paid ? 'bg-primary' : 'bg-border'}`}
        >
          <span className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-background shadow-sm transition-transform ${paid ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
      </div>
    )
  }

  return (
    <section className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background px-4 py-3">
      <span className="min-w-0">
        <span className="block text-sm font-medium text-foreground">
          Movimiento pagado
        </span>
        <span className="mt-0.5 block text-xs text-text-muted">
          {paid ? 'Este importe ya fue cubierto.' : 'Actívalo si ya lo cubriste.'}
        </span>
      </span>

      <span className="flex shrink-0 items-center gap-2.5">
        <span
          className={`text-xs font-medium ${paid ? 'text-primary' : 'text-text-muted'}`}
        >
          {paid ? 'Pagado' : 'Pendiente'}
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={paid}
          aria-label={paid ? 'Marcar como pendiente' : 'Marcar como pagado'}
          onClick={onToggle}
          className={`relative h-6 w-11 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${paid ? 'bg-primary' : 'bg-border'}`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-background shadow-sm transition-transform ${paid ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
      </span>
    </section>
  )
}
