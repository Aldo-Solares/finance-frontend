// @/modules/debts/statement-entry/components/statement-entry-item.tsx

'use client';

import {
  Check,
  Clock3,
  Pencil,
  Trash2,
} from 'lucide-react';

import type { Concept } from '@/modules/debts/concept/schemas/concept.schema';
import type { StatementEntry } from '@/modules/debts/statement-entry/schemas/statement-entry.schema';

type StatementEntryItemProps = {
  entry: StatementEntry;
  concepts: Concept[];
  onEdit: (entry: StatementEntry) => void;
  onDelete: (entry: StatementEntry) => void;
};

export function StatementEntryItem({
  entry,
  concepts,
  onEdit,
  onDelete,
}: StatementEntryItemProps) {
  const concept = concepts.find(
    (item) =>
      item.conceptId === entry.conceptId,
  );

  return (
    <tr className="transition-colors hover:bg-neutral-50/70">
      <td className="px-5 py-4">
        <p className="text-sm font-medium text-neutral-950">
          {concept?.name ??
            `Concepto #${entry.conceptId}`}
        </p>
      </td>

      <td className="px-5 py-4">
        <p className="max-w-56 truncate text-sm text-neutral-600">
          {entry.description ?? '—'}
        </p>
      </td>

      <td className="px-5 py-4 text-sm text-neutral-600">
        {entry.debtor}
      </td>

      <td className="px-5 py-4 text-sm text-neutral-500">
        {entry.purchaseDate ?? '—'}
      </td>

      <td className="px-5 py-4">
        {entry.msiCurrent !== null &&
        entry.msiTotal !== null ? (
          <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">
            {entry.msiCurrent}/
            {entry.msiTotal}
          </span>
        ) : (
          <span className="text-sm text-neutral-300">
            —
          </span>
        )}
      </td>

      <td className="px-5 py-4 text-right text-sm font-medium text-neutral-700">
        {formatMoney(
          entry.installmentAmount,
        )}
      </td>

      <td className="px-5 py-4 text-right text-sm text-neutral-500">
        {formatMoney(
          entry.remainingTotal,
        )}
      </td>

      <td className="px-5 py-4">
        <span
          className={[
            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
            entry.paid
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-amber-50 text-amber-700',
          ].join(' ')}
        >
          {entry.paid ? (
            <Check className="h-3 w-3" />
          ) : (
            <Clock3 className="h-3 w-3" />
          )}

          {entry.paid
            ? 'Pagado'
            : 'Pendiente'}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-1">
          <button
            type="button"
            onClick={() => onEdit(entry)}
            aria-label="Editar movimiento"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(entry)
            }
            aria-label="Eliminar movimiento"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

function formatMoney(
  value: number | null,
): string {
  if (value === null) {
    return '—';
  }

  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(value);
}