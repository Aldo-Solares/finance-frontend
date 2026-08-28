// @/modules/debts/user-card/components/user-card-grid.tsx

import type { UserCard } from '@/modules/debts/user-card/schemas/user-card.schema'

import { UserCardEmptyState } from './user-card-empty-state'
import { UserCardItem } from './user-card-item'

type UserCardGridProps = {
  userCards: UserCard[]
}

export function UserCardGrid({
  userCards,
}: UserCardGridProps) {
  if (userCards.length === 0) {
    return <UserCardEmptyState />
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {userCards.map((userCard) => (
        <UserCardItem
          key={userCard.userCardId}
          userCard={userCard}
        />
      ))}
    </div>
  )
}