// @/modules/dashboard/debts/services/debt-dashboard.service.ts

import { fetchServer } from '@/core/api/api-server'
import { parseApiResponse } from '@/core/api/api-response'
import {
  DebtDashboardFilterSchema,
  DebtDashboardSchema,
  type DebtDashboard,
  type DebtDashboardFilter,
} from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'

export async function getDebtDashboard(
  input: DebtDashboardFilter = {},
): Promise<DebtDashboard> {
  const filter = DebtDashboardFilterSchema.parse(input)

  const params = new URLSearchParams()

  if (filter.year !== undefined) {
    params.set('year', filter.year.toString())
  }

  if (filter.month !== undefined) {
    params.set('month', filter.month.toString())
  }

  if (filter.userCardId !== undefined) {
    params.set('cardId', filter.userCardId.toString())
  }

  if (filter.conceptId !== undefined) {
    params.set('conceptId', filter.conceptId.toString())
  }

  if (filter.paid !== undefined) {
    params.set('paid', filter.paid.toString())
  }

  if (filter.status !== undefined) {
    params.set('status', filter.status)
  }

  if (filter.debtor !== undefined) {
    params.set('debtor', filter.debtor)
  }

  const query = params.toString()

  const response = await fetchServer(
    query ? `/dashboard/debts?${query}` : '/dashboard/debts',
    {
      method: 'GET',
    },
  )

  return parseApiResponse(
    response,
    DebtDashboardSchema,
    'No fue posible obtener el dashboard.',
  )
}
