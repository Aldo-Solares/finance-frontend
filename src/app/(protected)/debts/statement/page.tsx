// @/app/(protected)/debts/statement/page.tsx

import { findAllCards } from '@/modules/debts/card/services/card.service';
import { StatementPage } from '@/modules/debts/statement/components/statement-page';
import { findAllStatements } from '@/modules/debts/statement/services/statement.service';

type StatementRoutePageProps = {
  searchParams: Promise<{
    cardId?: string;
  }>;
};

export default async function StatementRoutePage({
  searchParams,
}: StatementRoutePageProps) {
  const { cardId } = await searchParams;

  const [statements, cards] = await Promise.all([
    findAllStatements(),
    findAllCards(),
  ]);

  const requestedCardId = cardId
    ? Number(cardId)
    : null;

  const selectedCardId =
    requestedCardId !== null &&
    cards.some(
      (card) =>
        card.cardId === requestedCardId,
    )
      ? requestedCardId
      : cards[0]?.cardId ?? null;

  return (
    <StatementPage
      statements={statements}
      cards={cards}
      initialCardId={selectedCardId}
    />
  );
}