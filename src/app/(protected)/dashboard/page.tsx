// @/app/(protected)/dashboard/debts/page.tsx

import { DebtDashboardPage } from '@/modules/dashboard/debts/components/debt-dashboard-page'
import {
  DebtDashboardStatusSchema,
  type DebtDashboardFilter,
} from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'
import { getDebtDashboard } from '@/modules/dashboard/debts/services/debt-dashboard.service'
import { findAllConcepts } from '@/modules/debts/concept/services/concept.service'
import { findAllStatementEntries } from '@/modules/debts/statement-entry/services/statement-entry.service'
import { findAllStatements } from '@/modules/debts/statement/services/statement.service'
import { findAllUserCards } from '@/modules/debts/user-card/services/user-card.service'

type PageProps = {
  searchParams: Promise<{
    year?: string
    month?: string
    userCardId?: string
    conceptId?: string
    paid?: string
    status?: string
    debtor?: string
  }>
}

function parseOptionalNumber(
  value: string | undefined,
) {
  if (!value) {
    return undefined
  }

  const parsed = Number(value)

  return Number.isFinite(parsed)
    ? parsed
    : undefined
}

function parseOptionalBoolean(
  value: string | undefined,
) {
  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  return undefined
}

function parseOptionalStatus(
  value: string | undefined,
) {
  if (!value) {
    return undefined
  }

  const result =
    DebtDashboardStatusSchema.safeParse(
      value,
    )

  return result.success
    ? result.data
    : undefined
}

export default async function Page({
  searchParams,
}: PageProps) {
  const params =
    await searchParams

  const filter: DebtDashboardFilter = {
    year: parseOptionalNumber(
      params.year,
    ),

    month: parseOptionalNumber(
      params.month,
    ),

    userCardId: parseOptionalNumber(
      params.userCardId,
    ),

    conceptId: parseOptionalNumber(
      params.conceptId,
    ),

    paid: parseOptionalBoolean(
      params.paid,
    ),

    status: parseOptionalStatus(
      params.status,
    ),

    debtor:
      params.debtor?.trim()
      || undefined,
  }

  const [
    dashboard,
    userCards,
    concepts,
    statements,
    statementEntries,
  ] = await Promise.all([
    getDebtDashboard(filter),
    findAllUserCards(),
    findAllConcepts(),
    findAllStatements(),
    findAllStatementEntries(),
  ])

  return (
    <DebtDashboardPage
      dashboard={dashboard}
      userCards={userCards}
      concepts={concepts}
      statements={statements}
      statementEntries={
        statementEntries
      }
    />
  )
}