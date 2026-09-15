// @/modules/investments/investment-snapshot/components/investment-snapshot-empty-state.tsx

export function InvestmentSnapshotEmptyState() {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background px-6 text-center">
      <h2 className="text-base font-semibold text-foreground">
        Aún no tienes registros
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-text-muted">
        Registra cuánto tienes actualmente en SmartCash para comenzar a medir tu rendimiento.
      </p>
    </div>
  )
}