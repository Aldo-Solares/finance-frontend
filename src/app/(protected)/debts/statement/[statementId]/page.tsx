// @/app/(protected)/debts/statement/[statementId]/page.tsx

import { findAllConcepts } from '@/modules/debts/concept/services/concept.service'
import { StatementEntryPage } from '@/modules/debts/statement-entry/components/statement-entry-page'
import { findStatementEntriesByStatementId } from '@/modules/debts/statement-entry/services/statement-entry.service'
import { findStatementById } from '@/modules/debts/statement/services/statement.service'
import { getCurrentUser } from '@/modules/user/services/user.service'
import { USER_ROLE } from '@/modules/user/constants/user.constants'

type StatementEntryRoutePageProps = {
  params: Promise<{
    statementId: string
  }>
}

export default async function Page({ params }: StatementEntryRoutePageProps) {
  const { statementId } = await params

  const parsedStatementId = Number(statementId)

  const [statement, entries, concepts, user] = await Promise.all([
    findStatementById(parsedStatementId),
    findStatementEntriesByStatementId(parsedStatementId),
    findAllConcepts(),
    getCurrentUser(),
  ])

  return (
    <StatementEntryPage
      statement={statement}
      entries={entries}
      concepts={concepts}
      canExport={user.role === USER_ROLE.ADMIN}
    />
  )
}
