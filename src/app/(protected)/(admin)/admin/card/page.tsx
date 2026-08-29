// @/app/(protected)/admin/card/page.tsx

import { CardCatalogPage } from '@/modules/debts/card/components/card-catalog-page'
import { findAllCards } from '@/modules/debts/card/services/card.service'

export default async function Page() {
  const cards = await findAllCards()

  return (
    <CardCatalogPage
      cards={cards}
    />
  )
}