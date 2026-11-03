// @/modules/dashboard/debts/components/debt-dashboard-statements.tsx

import Link from 'next/link'

import { ArrowUpRight, CalendarDays, CircleCheck, Clock3 } from 'lucide-react'

import { formatDisplayDate } from '@/shared/utils/date-format'
import { DebtDashboardPanelHeader } from '@/modules/dashboard/debts/components/debt-dashboard-panel-header'
import type {
  DebtDashboardStatement,
  DebtDashboardStatus,
} from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'

type DebtDashboardStatementsProps = {
  statements: DebtDashboardStatement[]
}

const statusLabels: Record<DebtDashboardStatus, string> = {
  UPCOMING: 'Próximo',
  ACTIVE: 'Activo',
  PAYMENT_PENDING: 'Pendiente de pago',
  CLOSED: 'Cerrado',
}

function formatMoney(value: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function formatDate(value: string | null) {
  if (!value) {
    return 'Sin fecha'
  }

  return formatDisplayDate(value)
}

function getStatusClassName(statement: DebtDashboardStatement) {
  return statement.paid || statement.status !== 'UPCOMING'
    ? 'border-primary/30 bg-primary-soft/50 text-primary'
    : 'border-border bg-surface text-text-muted'
}

function getStatusIcon(statement: DebtDashboardStatement) {
  return statement.paid ? CircleCheck : Clock3
}

export function DebtDashboardStatements({
  statements,
}: DebtDashboardStatementsProps) {
  return (
    <section>
      <div className="mb-4">
        <DebtDashboardPanelHeader
          eyebrow="Detalle"
          title="Estados de cuenta"
          description="Estado de tus tarjetas para el periodo seleccionado."
          icon={CalendarDays}
        />
      </div>

      {statements.length === 0 ? (
        <div className="flex min-h-32 items-center justify-center rounded-2xl border border-dashed border-border bg-surface/40 px-6 text-center">
          <p className="text-sm text-text-muted">
            No hay estados de cuenta para este periodo.
          </p>
        </div>
      ) : (
        <div className="grid items-stretch gap-3 lg:grid-cols-2 xl:grid-cols-3">
          {statements.map((statement) => {
            const StatusIcon = getStatusIcon(statement)

            return (
              <Link
                key={statement.statementId}
                href={`/debts/statement/${statement.statementId}`}
                className={[
                  'group relative flex h-full flex-col overflow-hidden rounded-2xl',
                  'border border-border bg-background p-5',
                  'transition-all duration-200',
                  'hover:-translate-y-0.5 hover:border-primary/25',
                  'hover:shadow-sm',
                ].join(' ')}
              >
                <div className="grid min-h-11 grid-cols-[minmax(0,1fr)_1rem] items-start gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {statement.cardName}
                    </p>

                    <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-text-muted">
                      <CalendarDays className="h-3 w-3" />
                      <span className="truncate">{statement.bank} · {statement.month}/{statement.year}</span>
                    </div>
                  </div>

                  <ArrowUpRight
                    className={[
                      'h-4 w-4 shrink-0 text-text-muted/60',
                      'transition-all duration-200',
                      'group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
                      'group-hover:text-primary',
                    ].join(' ')}
                  />
                </div>

                <div className="mt-5 grid min-h-12 grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-text-muted">
                      Gastos
                    </p>

                    <p className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                      {formatMoney(statement.totalExpenses)}
                    </p>
                  </div>

                  <span
                    className={[
                      'inline-flex shrink-0 items-center gap-1.5 rounded-full',
                      'max-w-full whitespace-nowrap border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.06em]',
                      getStatusClassName(statement),
                    ].join(' ')}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {statement.paid ? 'Pagado' : statusLabels[statement.status]}
                  </span>
                </div>

                <div className="mt-auto grid grid-cols-3 divide-x divide-border border-t border-border pt-4">
                  <div className="pr-3">
                    <p className="text-[10px] text-text-muted">Pagado</p>

                    <p className="mt-1 truncate text-xs font-semibold text-foreground">
                      {formatMoney(statement.totalPaid)}
                    </p>
                  </div>

                  <div className="px-3">
                    <p className="text-[10px] text-text-muted">Pendiente</p>

                    <p className="mt-1 truncate text-xs font-semibold text-foreground">
                      {formatMoney(statement.totalPending)}
                    </p>
                  </div>

                  <div className="pl-3">
                    <p className="text-[10px] text-text-muted">Pago</p>

                    <p className="mt-1 truncate text-xs font-semibold text-foreground">
                      {formatDate(statement.paymentDate)}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}
