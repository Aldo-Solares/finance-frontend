// @/modules/dashboard/debts/components/debt-dashboard-overview.tsx

import {
  Clock3,
  CreditCard,
  ReceiptText,
  WalletCards,
} from 'lucide-react';

import type { DebtDashboard } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema';

type DebtDashboardOverviewProps = {
  dashboard: DebtDashboard;
};

function formatMoney(value: number) {
  return new Intl.NumberFormat(
    'es-MX',
    {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  ).format(value);
}

export function DebtDashboardOverview({
  dashboard,
}: DebtDashboardOverviewProps) {
  const topCard =
    dashboard.cards[0];

  const topConcept =
    dashboard.concepts[0];

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-neutral-950">
            Gastos del mes
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Resumen rápido de tus tarjetas.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-neutral-500">
                Gasto total
              </p>

              <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
                {formatMoney(
                  dashboard.totalExpenses,
                )}
              </p>

              <p className="mt-1 text-xs text-neutral-400">
                {dashboard.totalEntries}{' '}
                movimientos
              </p>
            </div>

            <div className="flex size-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
              <CreditCard className="size-4" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-neutral-500">
                Pendiente
              </p>

              <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
                {formatMoney(
                  dashboard.totalPending,
                )}
              </p>

              <p className="mt-1 text-xs text-neutral-400">
                Por pagar
              </p>
            </div>

            <div className="flex size-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
              <Clock3 className="size-4" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm text-neutral-500">
                Mayor gasto
              </p>

              <p className="mt-2 truncate text-lg font-semibold text-neutral-950">
                {topCard
                  ? `${topCard.bank} · ${topCard.cardName}`
                  : 'Sin datos'}
              </p>

              <p className="mt-1 text-xs text-neutral-400">
                {topCard
                  ? formatMoney(
                      topCard.totalExpenses,
                    )
                  : 'Sin movimientos'}
              </p>
            </div>

            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
              <WalletCards className="size-4" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm text-neutral-500">
                Principal concepto
              </p>

              <p className="mt-2 truncate text-lg font-semibold text-neutral-950">
                {topConcept
                  ? topConcept.conceptName
                  : 'Sin datos'}
              </p>

              <p className="mt-1 text-xs text-neutral-400">
                {topConcept
                  ? formatMoney(
                      topConcept.totalExpenses,
                    )
                  : 'Sin movimientos'}
              </p>
            </div>

            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
              <ReceiptText className="size-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}