// @/modules/debts/card/components/card-grid.tsx

import type { Card } from '@/modules/debts/card/schemas/card.schema';

import { CardEmptyState } from './card-empty-state';
import { CardItem } from './card-item';

type CardGridProps = {
  cards: Card[];
};

export function CardGrid({
  cards,
}: CardGridProps) {
  if (cards.length === 0) {
    return <CardEmptyState />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <CardItem
          key={card.cardId}
          card={card}
        />
      ))}
    </div>
  );
}