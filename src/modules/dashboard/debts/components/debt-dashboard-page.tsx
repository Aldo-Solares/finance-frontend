// @/modules/dashboard/debts/components/debt-dashboard-page.tsx

import { DebtDashboardCardBreakdown } from '@/modules/dashboard/debts/components/debt-dashboard-card-breakdown'
import { DebtDashboardConceptBreakdown } from '@/modules/dashboard/debts/components/debt-dashboard-concept-breakdown'
import { DebtDashboardFilters } from '@/modules/dashboard/debts/components/debt-dashboard-filters'
import { DebtDashboardStatements } from '@/modules/dashboard/debts/components/debt-dashboard-statements'
import { DebtDashboardSummary } from '@/modules/dashboard/debts/components/debt-dashboard-summary'

import type { DebtDashboard } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'

import type { Concept } from '@/modules/debts/concept/schemas/concept.schema'
import type { Card } from '@/modules/debts/card/schemas/card.schema'
import type { StatementEntry } from '@/modules/debts/statement-entry/schemas/statement-entry.schema'
import type { Statement } from '@/modules/debts/statement/schemas/statement.schema'
import type { UserCard } from '@/modules/debts/user-card/schemas/user-card.schema'

import { getDashboardPeriodLabel } from '@/modules/dashboard/debts/utils/debt-dashboard-formatters'
import { HeroComponent } from '@/shared/components/hero-component'

type DebtDashboardPageProps = {
  dashboard: DebtDashboard
  userCards: UserCard[]
  concepts: Concept[]
  statements: Statement[]
  statementEntries: StatementEntry[]
  cards: Card[]
}

export function DebtDashboardPage({
  dashboard,
  userCards,
  concepts,
  statements,
  statementEntries,
  cards,
}: DebtDashboardPageProps) {
  const periodLabel = getDashboardPeriodLabel(dashboard.year, dashboard.month)

  return (
    <div className="w-full space-y-6">
      <HeroComponent
        eyebrow="Resumen financiero"
        title="Gastos de tarjetas"
        description="Revisa tus gastos, pagos y distribución por tarjeta y categoría."
        rightContent={{
          type: 'info',
          label: 'Periodo seleccionado',
          value: periodLabel,
        }}
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
        <DebtDashboardCardBreakdown cards={dashboard.cards} catalogCards={cards} />

        <DebtDashboardConceptBreakdown concepts={dashboard.categories} />
      </div>

      <DebtDashboardStatements statements={dashboard.statements} cards={cards} />

    </div>
  )
}
