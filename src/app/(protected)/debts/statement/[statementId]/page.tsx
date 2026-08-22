// @/app/(protected)/debts/statement/[statementId]/page.tsx

import { findAllConcepts } from '@/modules/debts/concept/services/concept.service';
import { StatementEntryPage } from '@/modules/debts/statement-entry/components/statement-entry-page';
import { findStatementEntriesByStatementId } from '@/modules/debts/statement-entry/services/statement-entry.service';
import { findStatementById } from '@/modules/debts/statement/services/statement.service';

type StatementEntryRoutePageProps = {
  params: Promise<{
    statementId: string;
  }>;
};

export default async function StatementEntryRoutePage({
  params,
}: StatementEntryRoutePageProps) {
  const { statementId } = await params;

  const parsedStatementId = Number(statementId);

  const [
    statement,
    entries,
    concepts,
  ] = await Promise.all([
    findStatementById(parsedStatementId),
    findStatementEntriesByStatementId(
      parsedStatementId,
    ),
    findAllConcepts(),
  ]);

  return (
    <StatementEntryPage
      statement={statement}
      entries={entries}
      concepts={concepts}
    />
  );
}