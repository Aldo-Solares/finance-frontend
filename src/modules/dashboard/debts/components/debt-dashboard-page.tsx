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

import { HeroComponent } from '@/shared/hero/hero-component'
import { getDashboardPeriodLabel } from '@/modules/dashboard/debts/utils/debt-dashboard-formatters'

type DebtDashboardPageProps = {
  dashboard: DebtDashboard
  userCards: UserCard[]
  concepts: Concept[]
  statements: Statement[]
  statementEntries: StatementEntry[]
}

export function DebtDashboardPage({
  dashboard,
  userCards,
  concepts,
  statements,
  statementEntries,
}: DebtDashboardPageProps) {
  const periodLabel = getDashboardPeriodLabel(dashboard.year, dashboard.month)

  return (
    <div className="w-full space-y-6">
      <HeroComponent
        eyebrow="Dashboard"
        title="Gastos de tarjetas"
        description={`${periodLabel} · Analiza tus gastos, pagos y distribución por tarjeta y categoría.`}
      />

      <DebtDashboardFilters
        year={dashboard.year}
        month={dashboard.month}
        userCards={userCards}
        concepts={concepts}
        statements={statements}
        statementEntries={statementEntries}
      />

      <DebtDashboardSummary dashboard={dashboard} />

      <div className="grid items-start gap-4 xl:grid-cols-2">
        <DebtDashboardCardBreakdown cards={dashboard.cards} />

        <DebtDashboardConceptBreakdown concepts={dashboard.categories} />
      </div>

      <DebtDashboardStatements statements={dashboard.statements} />
    </div>
  )
}
