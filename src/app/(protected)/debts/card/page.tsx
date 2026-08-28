// @/app/(protected)/debts/card/page.tsx

import { UserCardGrid } from '@/modules/debts/user-card/components/user-card-grid'
import { findAllUserCards } from '@/modules/debts/user-card/services/user-card.service'

export default async function CardsPage() {
  const userCards = await findAllUserCards()

  return <UserCardGrid userCards={userCards} />
}