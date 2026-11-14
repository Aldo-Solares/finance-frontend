// @/app/(protected)/debts/card/page.tsx

import { findAllCards } from '@/modules/debts/card/services/card.service'
import { getDebtDashboard } from '@/modules/dashboard/debts/services/debt-dashboard.service'
import { findAllStatements } from '@/modules/debts/statement/services/statement.service'
import { findAllUserCards } from '@/modules/debts/user-card/services/user-card.service'

import { UserCardPage } from '@/modules/debts/user-card/components/user-card-page'

export default async function Page() {
  const [userCards, cards, statements] = await Promise.all([
    findAllUserCards(),
    findAllCards(),
    findAllStatements(),
  ])

  const latestByUserCard = new Map(
    userCards.map((userCard) => {
      const latest = statements
        .filter((statement) => statement.userCardId === userCard.userCardId)
        .sort((left, right) => right.year - left.year || right.month - left.month)[0]

      return [userCard.userCardId, latest] as const
    }),
  )

  const latestPeriods = Array.from(
    new Set(
      [...latestByUserCard.values()]
        .filter((statement) => statement !== undefined)
        .map((statement) => `${statement.year}-${statement.month}`),
    ),
  )

  const dashboards = await Promise.all(
    latestPeriods.map((period) => {
      const [year, month] = period.split('-').map(Number)
      return getDebtDashboard({ year, month })
    }),
  )

  const dashboardByStatementId = new Map(
    dashboards.flatMap((dashboard) => dashboard.statements).map((statement) => [
      statement.statementId,
      statement,
    ]),
  )

  const latestStatements = [...latestByUserCard.values()]
    .filter((statement) => statement !== undefined)
    .map((statement) =>
      dashboardByStatementId.get(statement.statementId) ?? {
        statementId: statement.statementId,
        userCardId: statement.userCardId,
        cardId: statement.cardId,
        bank: statement.bank,
        cardName: statement.cardName,
        year: statement.year,
        month: statement.month,
        paymentDate: statement.paymentDate,
        paid: statement.paid,
        status: statement.status,
        totalExpenses: 0,
        totalPaid: 0,
        totalPending: 0,
        totalEntries: 0,
      },
    )

  return (
    <UserCardPage
      userCards={userCards}
      cards={cards}
      latestStatements={latestStatements}
    />
  )
}
