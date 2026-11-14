// @/app/(protected)/debts/statement/page.tsx

import { StatementPage } from '@/modules/debts/statement/components/statement-page'
import { findAllCards } from '@/modules/debts/card/services/card.service'
import { findAllStatements } from '@/modules/debts/statement/services/statement.service'
import { findAllUserCards } from '@/modules/debts/user-card/services/user-card.service'

export default async function Page() {
  const [statements, userCards, cards] = await Promise.all([
    findAllStatements(),
    findAllUserCards(),
    findAllCards(),
  ])

  return <StatementPage statements={statements} userCards={userCards} cards={cards} />
}
