// @/modules/debts/statement/components/statement-item.tsx

'use client';

import Link from 'next/link';
import {
  ArrowUpRight,
  Check,
  Clock3,
  MoreHorizontal,
} from 'lucide-react';

import { StatementStatus } from '@/modules/debts/statement/enums/statement-status.enum';
import type { Statement } from '@/modules/debts/statement/schemas/statement.schema';

type StatementItemProps = {
  statement: Statement;
  separated?: boolean;
  onEdit: (statement: Statement) => void;
  onDelete: (statement: Statement) => void;
};

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const shortMonths = [
  'ENE',
  'FEB',
  'MAR',
  'ABR',
  'MAY',
  'JUN',
  'JUL',
  'AGO',
  'SEP',
  'OCT',
  'NOV',
  'DIC',
];

export function StatementItem({
  statement,
  separated = false,
  onEdit,
  onDelete,
}: StatementItemProps) {
  return (
    <article
      className={[
        'group relative px-5 py-5 transition-colors hover:bg-neutral-50/70 sm:px-6',
        separated
          ? 'border-t border-neutral-100'
          : '',
      ].join(' ')}
    >
      <div className="grid gap-5 lg:grid-cols-[110px_minmax(180px,1fr)_minmax(180px,1fr)_auto] lg:items-center">
        {/* MONTH */}

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-[11px] font-semibold tracking-[0.12em] text-neutral-500">
            {shortMonths[
              statement.month - 1
            ]}
          </div>

          <div className="lg:hidden">
            <p className="font-semibold text-neutral-950">
              {months[
                statement.month - 1
              ]}
            </p>

            <p className="mt-0.5 text-xs text-neutral-400">
              {statement.bank} · {statement.cardName}
            </p>
          </div>
        </div>

        {/* PERIOD */}

        <div className="hidden lg:block">
          <p className="font-semibold text-neutral-950">
            {months[
              statement.month - 1
            ]}
          </p>

          <p className="mt-1 text-sm text-neutral-400">
            {formatPeriod(
              statement.periodStart,
              statement.periodEnd,
            )}
          </p>
        </div>

        {/* PAYMENT */}

        <div>
          <p className="text-xs text-neutral-400">
            Fecha de pago
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-700">
            {formatDate(
              statement.paymentDate,
            )}
          </p>
        </div>

        {/* STATUS + ACTION */}

        <div className="flex items-center justify-between gap-4 lg:justify-end">
          <div className="flex flex-wrap items-center justify-end gap-2">
            <StatementStatusBadge
              status={statement.status}
            />

            <PaidBadge
              paid={statement.paid}
            />
          </div>

          <div className="flex items-center gap-1">
            <Link
              href={`/debts/statement/${statement.statementId}`}
              aria-label="Ver movimientos"
              title="Ver movimientos"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-white hover:text-neutral-950 hover:shadow-sm"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <StatementMenu
              statement={statement}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        </div>
      </div>

      <div className="mt-3 lg:hidden">
        <p className="text-sm text-neutral-400">
          {formatPeriod(
            statement.periodStart,
            statement.periodEnd,
          )}
        </p>
      </div>

      {statement.notes && (
        <p className="mt-4 max-w-3xl text-sm leading-6 text-neutral-500">
          {statement.notes}
        </p>
      )}
    </article>
  );
}

function StatementStatusBadge({
  status,
}: {
  status: StatementStatus;
}) {
  const values = {
    [StatementStatus.UPCOMING]: {
      label: 'Próximo',
      className:
        'bg-neutral-100 text-neutral-500',
    },
    [StatementStatus.ACTIVE]: {
      label: 'Activo',
      className:
        'bg-blue-50 text-blue-700',
    },
    [StatementStatus.PAYMENT_PENDING]: {
      label: 'Pago pendiente',
      className:
        'bg-amber-50 text-amber-700',
    },
    [StatementStatus.CLOSED]: {
      label: 'Cerrado',
      className:
        'bg-neutral-100 text-neutral-500',
    },
  };

  const value = values[status];

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${value.className}`}
    >
      {value.label}
    </span>
  );
}

function PaidBadge({
  paid,
}: {
  paid: boolean;
}) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium',
        paid
          ? 'bg-emerald-50 text-emerald-700'
          : 'bg-neutral-100 text-neutral-500',
      ].join(' ')}
    >
      {paid ? (
        <Check className="h-3 w-3" />
      ) : (
        <Clock3 className="h-3 w-3" />
      )}

      {paid ? 'Pagado' : 'Pendiente'}
    </span>
  );
}

type StatementMenuProps = {
  statement: Statement;
  onEdit: (statement: Statement) => void;
  onDelete: (statement: Statement) => void;
};

function StatementMenu({
  statement,
  onEdit,
  onDelete,
}: StatementMenuProps) {
  return (
    <details className="relative">
      <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-white hover:text-neutral-950 hover:shadow-sm">
        <MoreHorizontal className="h-4 w-4" />
      </summary>

      <div className="absolute right-0 top-11 z-20 w-48 overflow-hidden rounded-xl border border-neutral-200 bg-white p-1 shadow-xl">
        <button
          type="button"
          onClick={() =>
            onEdit(statement)
          }
          className="w-full rounded-lg px-3 py-2 text-left text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950"
        >
          Editar periodo
        </button>

        <button
          type="button"
          onClick={() =>
            onDelete(statement)
          }
          className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
        >
          Eliminar
        </button>
      </div>
    </details>
  );
}

function formatDate(
  value: string | null,
): string {
  if (!value) {
    return '—';
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
    new Date(`${value}T00:00:00Z`),
  );
}

function formatPeriod(
  start: string | null,
  end: string | null,
): string {
  if (!start || !end) {
    return 'Periodo sin fechas';
  }

  const formatter =
    new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      timeZone: 'UTC',
    });

  return `${formatter.format(
    new Date(`${start}T00:00:00Z`),
  )} — ${formatter.format(
    new Date(`${end}T00:00:00Z`),
  )}`;
}