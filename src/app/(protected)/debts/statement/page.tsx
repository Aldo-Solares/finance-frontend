// @/app/(protected)/debts/statement/page.tsx

import { StatementPage } from '@/modules/debts/statement/components/statement-page'
import { findAllStatements } from '@/modules/debts/statement/services/statement.service'
import { findAllUserCards } from '@/modules/debts/user-card/services/user-card.service'

type StatementRoutePageProps = {
  searchParams: Promise<{
    userCardId?: string
  }>
}

export default async function Page({
  searchParams,
}: StatementRoutePageProps) {
  const { userCardId } = await searchParams

  const [statements, userCards] = await Promise.all([
    findAllStatements(),
    findAllUserCards(),
  ])

  const requestedUserCardId = userCardId
    ? Number(userCardId)
    : null

  const selectedUserCardId =
    requestedUserCardId !== null &&
    userCards.some(
      (userCard) =>
        userCard.userCardId === requestedUserCardId,
    )
      ? requestedUserCardId
      : userCards[0]?.userCardId ?? null

  return (
    <StatementPage
      statements={statements}
      userCards={userCards}
      initialUserCardId={selectedUserCardId}
    />
  )
}