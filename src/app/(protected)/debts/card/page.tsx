// @/app/(protected)/debts/card/page.tsx

import { findAllCards } from '@/modules/debts/card/services/card.service'
import { findAllUserCards } from '@/modules/debts/user-card/services/user-card.service'

import { UserCardPage } from '@/modules/debts/user-card/components/user-card-page'

export default async function Page() {
  const [userCards, cards] = await Promise.all([
    findAllUserCards(),
    findAllCards(),
  ])

  return <UserCardPage userCards={userCards} cards={cards} />
}
