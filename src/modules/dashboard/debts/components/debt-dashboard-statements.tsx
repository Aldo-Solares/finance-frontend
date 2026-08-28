// @/modules/dashboard/debts/components/debt-dashboard-statements.tsx

import Link from 'next/link';

import type {
  DebtDashboardStatement,
  DebtDashboardStatus,
} from '@/modules/dashboard/debts/schemas/debt-dashboard.schema';

type DebtDashboardStatementsProps = {
  statements: DebtDashboardStatement[];
};

const statusLabels: Record<
  DebtDashboardStatus,
  string
> = {
  UPCOMING: 'Próximo',
  ACTIVE: 'Activo',
  PAYMENT_PENDING:
    'Pendiente de pago',
  CLOSED: 'Cerrado',
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

function formatDate(
  value: string | null,
) {
  if (!value) {
    return 'Sin fecha';
  }

  return new Intl.DateTimeFormat(
    'es-MX',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    },
  ).format(
    new Date(
      `${value}T00:00:00Z`,
    ),
  );
}

function getStatusClassName(
  statement: DebtDashboardStatement,
) {
  if (statement.paid) {
    return 'bg-emerald-50 text-emerald-700';
  }

  switch (statement.status) {
    case 'UPCOMING':
      return 'bg-neutral-100 text-neutral-600';

    case 'ACTIVE':
      return 'bg-blue-50 text-blue-700';

    case 'PAYMENT_PENDING':
      return 'bg-amber-50 text-amber-700';

    case 'CLOSED':
      return 'bg-red-50 text-red-700';
  }
}

export function DebtDashboardStatements({
  statements,
}: DebtDashboardStatementsProps) {
  return (
    <section>
      <div>
        <h2 className="text-lg font-semibold text-neutral-950">
          Estados de cuenta
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          Estado de tus tarjetas para
          el periodo seleccionado.
        </p>
      </div>

      {statements.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-500">
          No hay estados de cuenta para
          este periodo.
        </div>
      ) : (
        <div className="mt-4 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {statements.map(
            (statement) => (
              <Link
                key={
                  statement.statementId
                }
                href="/debts/statement"
                className="rounded-2xl border border-neutral-200 bg-white p-5 transition hover:border-neutral-300 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-neutral-950">
                      {
                        statement.cardName
                      }
                    </p>

                    <p className="mt-1 text-xs text-neutral-400">
                      {
                        statement.month
                      }
                      /
                      {
                        statement.year
                      }
                    </p>
                  </div>

                  <span
                    className={[
                      'rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]',
                      getStatusClassName(
                        statement,
                      ),
                    ].join(' ')}
                  >
                    {statement.paid
                      ? 'Pagado'
                      : statusLabels[
                          statement
                            .status
                        ]}
                  </span>
                </div>

                <p className="mt-6 text-2xl font-semibold tracking-tight text-neutral-950">
                  {formatMoney(
                    statement.totalExpenses,
                  )}
                </p>

                <div className="mt-4 space-y-2 border-t border-neutral-100 pt-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-neutral-500">
                      Pagado
                    </span>

                    <span className="font-medium text-neutral-900">
                      {formatMoney(
                        statement.totalPaid,
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-neutral-500">
                      Pendiente
                    </span>

                    <span className="font-medium text-neutral-900">
                      {formatMoney(
                        statement.totalPending,
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-neutral-500">
                      Fecha de pago
                    </span>

                    <span className="font-medium text-neutral-900">
                      {formatDate(
                        statement.paymentDate,
                      )}
                    </span>
                  </div>
                </div>
              </Link>
            ),
          )}
        </div>
      )}
    </section>
  );
}