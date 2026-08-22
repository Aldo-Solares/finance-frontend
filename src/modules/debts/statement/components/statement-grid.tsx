// @/modules/debts/statement/components/statement-grid.tsx

'use client';

import { useMemo } from 'react';

import type { Statement } from '@/modules/debts/statement/schemas/statement.schema';

import { StatementEmptyState } from './statement-empty-state';
import { StatementItem } from './statement-item';

type StatementGridProps = {
  statements: Statement[];
  hasCards: boolean;
  onEdit: (statement: Statement) => void;
  onDelete: (statement: Statement) => void;
};

type StatementGroup = {
  year: number;
  statements: Statement[];
};

export function StatementGrid({
  statements,
  hasCards,
  onEdit,
  onDelete,
}: StatementGridProps) {
  const groups = useMemo<StatementGroup[]>(() => {
    const sorted = [...statements].sort(
      (left, right) =>
        right.year - left.year ||
        right.month - left.month,
    );

    const grouped = new Map<
      number,
      Statement[]
    >();

    for (const statement of sorted) {
      const current =
        grouped.get(statement.year) ?? [];

      current.push(statement);

      grouped.set(
        statement.year,
        current,
      );
    }

    return Array.from(grouped.entries()).map(
      ([year, yearStatements]) => ({
        year,
        statements: yearStatements,
      }),
    );
  }, [statements]);

  if (statements.length === 0) {
    return (
      <StatementEmptyState
        hasCards={hasCards}
      />
    );
  }

  return (
    <div className="space-y-14">
      {groups.map((group) => (
        <section key={group.year}>
          <div className="mb-5 flex items-end gap-5">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-neutral-950">
              {group.year}
            </h2>

            <div className="mb-1 h-px flex-1 bg-neutral-200" />

            <span className="mb-0.5 text-xs text-neutral-400">
              {group.statements.length}{' '}
              {group.statements.length === 1
                ? 'periodo'
                : 'periodos'}
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            {group.statements.map(
              (statement, index) => (
                <StatementItem
                  key={
                    statement.statementId
                  }
                  statement={statement}
                  separated={index > 0}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ),
            )}
          </div>
        </section>
      ))}
    </div>
  );
}