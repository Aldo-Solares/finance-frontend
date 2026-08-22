// @/app/(protected)/debts/card/page.tsx

import { CardPage } from '@/modules/debts/card/components/card-page';
import { findAllCards } from '@/modules/debts/card/services/card.service';

export default async function CardsPage() {
  const cards = await findAllCards();

  return <CardPage cards={cards} />;
}