// @/modules/dashboard/debts/components/debt-dashboard-page.tsx

import { DebtDashboardCardBreakdown } from '@/modules/dashboard/debts/components/debt-dashboard-card-breakdown'
import { DebtDashboardConceptBreakdown } from '@/modules/dashboard/debts/components/debt-dashboard-concept-breakdown'
import { DebtDashboardFilters } from '@/modules/dashboard/debts/components/debt-dashboard-filters'
import { DebtDashboardStatements } from '@/modules/dashboard/debts/components/debt-dashboard-statements'
import { DebtDashboardSummary } from '@/modules/dashboard/debts/components/debt-dashboard-summary'
import type { DebtDashboard } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'
import type { Concept } from '@/modules/debts/concept/schemas/concept.schema'
import type { StatementEntry } from '@/modules/debts/statement-entry/schemas/statement-entry.schema'
import type { Statement } from '@/modules/debts/statement/schemas/statement.schema'
import type { UserCard } from '@/modules/debts/user-card/schemas/user-card.schema'
import { PageHeader } from '@/shared/page/page-header'

type DebtDashboardPageProps = {
  dashboard: DebtDashboard
  userCards: UserCard[]
  concepts: Concept[]
  statements: Statement[]
  statementEntries: StatementEntry[]
}

const monthNames: Record<number, string> = {
  1: 'Enero',
  2: 'Febrero',
  3: 'Marzo',
  4: 'Abril',
  5: 'Mayo',
  6: 'Junio',
  7: 'Julio',
  8: 'Agosto',
  9: 'Septiembre',
  10: 'Octubre',
  11: 'Noviembre',
  12: 'Diciembre',
}

function getPeriodLabel(
  year: number,
  month: number,
) {
  if (
    year === 0 &&
    month === 0
  ) {
    return 'Todo el histórico'
  }

  if (year === 0) {
    return `${
      monthNames[month] ?? 'Todos los meses'
    } · Todos los años`
  }

  if (month === 0) {
    return `Todo ${year}`
  }

  return `${
    monthNames[month] ?? month
  } ${year}`
}

export function DebtDashboardPage({
  dashboard,
  userCards,
  concepts,
  statements,
  statementEntries,
}: DebtDashboardPageProps) {
  const periodLabel =
    getPeriodLabel(
      dashboard.year,
      dashboard.month,
    )

  return (
    <div className="w-full space-y-8">
      <PageHeader
        eyebrow="Dashboard"
        title="Gastos de tarjetas"
        description={`${periodLabel} · Analiza tus gastos, pagos y distribución por tarjeta y concepto.`}
      />

      <DebtDashboardFilters
        year={dashboard.year}
        month={dashboard.month}
        userCards={userCards}
        concepts={concepts}
        statements={statements}
        statementEntries={
          statementEntries
        }
      />

      <DebtDashboardSummary
        dashboard={dashboard}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <DebtDashboardCardBreakdown
          cards={dashboard.cards}
        />

        <DebtDashboardConceptBreakdown
          concepts={
            dashboard.concepts
          }
        />
      </div>

      <DebtDashboardStatements
        statements={
          dashboard.statements
        }
      />
    </div>
  )
}