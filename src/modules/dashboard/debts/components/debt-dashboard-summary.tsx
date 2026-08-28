// @/modules/dashboard/debts/components/debt-dashboard-summary.tsx

import {
  CircleDollarSign,
  Clock3,
  CreditCard,
  ReceiptText,
} from 'lucide-react';

import type { DebtDashboard } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema';

type DebtDashboardSummaryProps = {
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

export function DebtDashboardSummary({
  dashboard,
}: DebtDashboardSummaryProps) {
  const items = [
    {
      label: 'Gasto total',
      value: formatMoney(
        dashboard.totalExpenses,
      ),
      description: `${dashboard.totalEntries} movimientos`,
      icon: CreditCard,
    },
    {
      label: 'Pagado',
      value: formatMoney(
        dashboard.totalPaid,
      ),
      description:
        'Movimientos pagados',
      icon: CircleDollarSign,
    },
    {
      label: 'Pendiente',
      value: formatMoney(
        dashboard.totalPending,
      ),
      description:
        'Movimientos pendientes',
      icon: Clock3,
    },
    {
      label: 'Promedio',
      value: formatMoney(
        dashboard.averageExpense,
      ),
      description:
        'Promedio por movimiento',
      icon: ReceiptText,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-2xl border border-neutral-200 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-neutral-500">
                  {item.label}
                </p>

                <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
                  {item.value}
                </p>

                <p className="mt-1 text-xs text-neutral-400">
                  {item.description}
                </p>
              </div>

              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
                <Icon className="size-4" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}