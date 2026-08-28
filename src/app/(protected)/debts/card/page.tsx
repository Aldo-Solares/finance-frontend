// @/app/(protected)/debts/card/page.tsx

import { findAllActiveCards } from '@/modules/debts/card/services/card.service'
import { UserCardPage } from '@/modules/debts/user-card/components/user-card-page'
import { findAllUserCards } from '@/modules/debts/user-card/services/user-card.service'

export default async function CardsPage() {
  const [
    userCards,
    cards,
  ] = await Promise.all([
    findAllUserCards(),
    findAllActiveCards(),
  ])

  return (
    <UserCardPage
      userCards={userCards}
      cards={cards}
    />
  )
}