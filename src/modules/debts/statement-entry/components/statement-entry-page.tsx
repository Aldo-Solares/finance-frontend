// @/modules/debts/statement-entry/components/statement-entry-page.tsx

'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Plus,
} from 'lucide-react';

import type { Concept } from '@/modules/debts/concept/schemas/concept.schema';
import type { StatementEntry } from '@/modules/debts/statement-entry/schemas/statement-entry.schema';
import type { Statement } from '@/modules/debts/statement/schemas/statement.schema';
import { PageHeader } from '@/shared/page/page-header';

import { StatementEntryDeleteModal } from './statement-entry-delete-modal';
import { StatementEntryFormModal } from './statement-entry-form-modal';
import { StatementEntryTable } from './statement-entry-table';

type StatementEntryPageProps = {
  statement: Statement;
  entries: StatementEntry[];
  concepts: Concept[];
};

export function StatementEntryPage({
  statement,
  entries,
  concepts,
}: StatementEntryPageProps) {
  const [formOpen, setFormOpen] =
    useState(false);

  const [selectedEntry, setSelectedEntry] =
    useState<StatementEntry | null>(null);

  const [deleteEntry, setDeleteEntry] =
    useState<StatementEntry | null>(null);

  const total = useMemo(
    () =>
      entries.reduce(
        (current, entry) =>
          current +
          (entry.amount ?? 0),
        0,
      ),
    [entries],
  );

  const pendingTotal = useMemo(
    () =>
      entries.reduce(
        (current, entry) =>
          current +
          (!entry.paid
            ? entry.amount ?? 0
            : 0),
        0,
      ),
    [entries],
  );

  const handleCreate = () => {
    setSelectedEntry(null);
    setFormOpen(true);
  };

  const handleEdit = (
    entry: StatementEntry,
  ) => {
    setSelectedEntry(entry);
    setFormOpen(true);
  };

  return (
    <>
      <section className="w-full space-y-8">
        <div>
          <Link
            href="/debts/statement"
            className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 transition-colors hover:text-neutral-950"
          >
            <ArrowLeft className="h-3.5 w-3.5" />

            Estados de cuenta
          </Link>

          <div className="mt-5">
            <PageHeader
              eyebrow={`${statement.bank} · ${statement.cardName}`}
              title={`${statement.month}/${statement.year}`}
              description="Consulta y administra los movimientos de este estado de cuenta."
              action={
                concepts.length > 0 ? (
                  <button
                    type="button"
                    onClick={handleCreate}
                    className="flex cursor-pointer items-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                  >
                    <Plus className="h-4 w-4" />

                    Nuevo movimiento
                  </button>
                ) : undefined
              }
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
  <InfoCard
    label="Inicio del periodo"
    value={formatDate(statement.periodStart)}
  />

  <InfoCard
    label="Corte"
    value={formatDate(statement.periodEnd)}
  />

  <InfoCard
    label="Fecha límite"
    value={formatDate(statement.paymentDate)}
    highlight
  />

  <InfoCard
    label="Estado"
    value={formatStatementStatus(statement.status)}
  />
</div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Movimientos"
            value={String(entries.length)}
          />

          <SummaryCard
            label="Total del periodo"
            value={formatMoney(total)}
          />

          <SummaryCard
            label="Pendiente"
            value={formatMoney(pendingTotal)}
          />
        </div>

        {concepts.length === 0 && (
          <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="text-sm font-medium text-amber-800">
              No existen conceptos disponibles.
            </p>

            <p className="mt-1 text-xs text-amber-700/70">
              Un administrador debe crear al menos un concepto antes de registrar movimientos.
            </p>
          </div>
        )}

        <StatementEntryTable
          entries={entries}
          concepts={concepts}
          onEdit={handleEdit}
          onDelete={setDeleteEntry}
        />
      </section>

      {formOpen && (
        <StatementEntryFormModal
          key={
            selectedEntry?.entryId ??
            'create'
          }
          statementId={
            statement.statementId
          }
          entry={selectedEntry}
          concepts={concepts}
          onClose={() => {
            setFormOpen(false);
            setSelectedEntry(null);
          }}
        />
      )}

      {deleteEntry && (
        <StatementEntryDeleteModal
          key={deleteEntry.entryId}
          entry={deleteEntry}
          onClose={() =>
            setDeleteEntry(null)
          }
        />
      )}
    </>
  );
}

type SummaryCardProps = {
  label: string;
  value: string;
};

function SummaryCard({
  label,
  value,
}: SummaryCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5">
      <p className="text-xs font-medium text-neutral-400">
        {label}
      </p>

      <p className="mt-2 text-xl font-semibold tracking-tight text-neutral-950">
        {value}
      </p>
    </div>
  );
}

function formatMoney(
  value: number,
): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(value);
}

type InfoCardProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

function InfoCard({
  label,
  value,
  highlight = false,
}: InfoCardProps) {
  return (
    <div
      className={[
        'rounded-[1.5rem] border p-5',
        highlight
          ? 'border-amber-200 bg-amber-50'
          : 'border-neutral-200 bg-white',
      ].join(' ')}
    >
      <p className="text-xs font-medium text-neutral-400">
        {label}
      </p>

      <p
        className={[
          'mt-2 text-sm font-semibold',
          highlight
            ? 'text-amber-800'
            : 'text-neutral-950',
        ].join(' ')}
      >
        {value}
      </p>
    </div>
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
    },
  ).format(
    new Date(`${value}T00:00:00`),
  );
}

function formatStatementStatus(
  status: Statement['status'],
): string {
  switch (status) {
    case 'UPCOMING':
      return 'Próximo';

    case 'ACTIVE':
      return 'Periodo activo';

    case 'PAYMENT_PENDING':
      return 'Pago pendiente';

    case 'CLOSED':
      return 'Cerrado';

    default:
      return status;
  }
}