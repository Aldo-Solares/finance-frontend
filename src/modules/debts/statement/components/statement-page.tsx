// @/modules/debts/statement/components/statement-page.tsx

'use client';

import { useMemo, useState } from 'react';
import {
  CheckCheck,
  Plus,
} from 'lucide-react';

import type { Card } from '@/modules/debts/card/schemas/card.schema';
import type { Statement } from '@/modules/debts/statement/schemas/statement.schema';
import { PageHeader } from '@/shared/components/page/page-header';

import { StatementDeleteModal } from './statement-delete-modal';
import { StatementFormModal } from './statement-form-modal';
import { StatementGrid } from './statement-grid';
import { StatementPayAllModal } from './statement-pay-all-modal';

type StatementPageProps = {
  statements: Statement[];
  cards: Card[];
  initialCardId: number | null;
};

export function StatementPage({
  statements,
  cards,
  initialCardId,
}: StatementPageProps) {
  const [cardId, setCardId] =
    useState<number | null>(
      initialCardId,
    );

  const [formStatement, setFormStatement] =
    useState<Statement | null>(null);

  const [formOpen, setFormOpen] =
    useState(false);

  const [
    deleteStatement,
    setDeleteStatement,
  ] = useState<Statement | null>(null);

  const [payAllOpen, setPayAllOpen] =
    useState(false);

  const filteredStatements = useMemo(
    () =>
      cardId === null
        ? []
        : statements.filter(
            (statement) =>
              statement.cardId === cardId,
          ),
    [statements, cardId],
  );

  const selectedCard = cards.find(
    (card) => card.cardId === cardId,
  );

  const handleCreate = () => {
    setFormStatement(null);
    setFormOpen(true);
  };

  const handleEdit = (
    statement: Statement,
  ) => {
    setFormStatement(statement);
    setFormOpen(true);
  };

  return (
    <>
      <section className="w-full space-y-8">
        <PageHeader
          eyebrow="Deudas"
          title="Estados de cuenta"
          description="Consulta periodos, fechas de pago y pagos de tus tarjetas."
          action={
            cards.length > 0 ? (
              <button
                type="button"
                onClick={handleCreate}
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                <Plus className="h-4 w-4" />

                Nuevo periodo
              </button>
            ) : undefined
          }
        />

        {cards.length > 0 && (
          <div className="flex flex-col gap-4 rounded-[1.5rem] border border-neutral-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium text-neutral-400">
                Tarjeta
              </p>

              <select
                value={cardId ?? ''}
                onChange={(event) =>
                  setCardId(
                    Number(
                      event.target.value,
                    ),
                  )
                }
                className="mt-1 bg-transparent text-sm font-semibold text-neutral-950 outline-none"
              >
                {cards.map((card) => (
                  <option
                    key={card.cardId}
                    value={card.cardId}
                  >
                    {card.cardCode} ·{' '}
                    {card.bank}{' '}
                    {card.cardName}
                  </option>
                ))}
              </select>
            </div>

            {filteredStatements.some(
              (statement) =>
                !statement.paid,
            ) && (
              <button
                type="button"
                onClick={() =>
                  setPayAllOpen(true)
                }
                className="flex cursor-pointer items-center gap-2 self-start rounded-xl border border-neutral-200 px-3.5 py-2 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 sm:self-auto"
              >
                <CheckCheck className="h-4 w-4" />

                Marcar todos como pagados
              </button>
            )}
          </div>
        )}

        <StatementGrid
          statements={filteredStatements}
          hasCards={cards.length > 0}
          onEdit={handleEdit}
          onDelete={setDeleteStatement}
        />
      </section>

      {formOpen && (
        <StatementFormModal
          key={
            formStatement?.statementId ??
            `create-${cardId}`
          }
          cards={cards}
          selectedCardId={cardId}
          statement={formStatement}
          onClose={() => {
            setFormOpen(false);
            setFormStatement(null);
          }}
        />
      )}

      {deleteStatement && (
        <StatementDeleteModal
          key={
            deleteStatement.statementId
          }
          statement={deleteStatement}
          onClose={() =>
            setDeleteStatement(null)
          }
        />
      )}

      {payAllOpen &&
        selectedCard && (
          <StatementPayAllModal
            key={selectedCard.cardId}
            card={selectedCard}
            onClose={() =>
              setPayAllOpen(false)
            }
          />
        )}
    </>
  );
}