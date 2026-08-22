// @/modules/debts/card/components/card-page.tsx

import type { Card } from '@/modules/debts/card/schemas/card.schema';

import { PageHeader } from '@/shared/components/page/page-header';

import { CardGrid } from './card-grid';

type CardPageProps = {
  cards: Card[];
};

export function CardPage({
  cards,
}: CardPageProps) {
  return (
    <section className="space-y-8">
      <PageHeader
        eyebrow="Tarjetas"
        title="Mis tarjetas"
        description="Consulta las tarjetas asociadas a tu cuenta y administra su información."
      />

      <CardGrid cards={cards} />
    </section>
  );
}