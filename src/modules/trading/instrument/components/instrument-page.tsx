// @/modules/trading/instrument/components/instrument-page.tsx

'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import type { Instrument } from '@/modules/trading/instrument/schemas/instrument.schema'

import { InstrumentEmptyState } from './instrument-empty-state'
import { InstrumentFormModal } from './instrument-form-modal'
import { InstrumentList } from './instrument-list'

type InstrumentPageProps = {
  instruments: Instrument[]
}

export const InstrumentPage = ({
  instruments,
}: InstrumentPageProps) => {
  const [formOpen, setFormOpen] =
    useState(false)

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">
              Instrumentos
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Administra los instrumentos disponibles para registrar tus
              operaciones.
            </p>
          </div>

          {instruments.length > 0 && (
            <button
              type="button"
              onClick={() =>
                setFormOpen(true)
              }
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              <Plus className="size-4" />
              Nuevo instrumento
            </button>
          )}
        </div>

        {instruments.length === 0 ? (
          <InstrumentEmptyState
            onCreate={() =>
              setFormOpen(true)
            }
          />
        ) : (
          <InstrumentList
            instruments={instruments}
          />
        )}
      </div>

      {formOpen && (
        <InstrumentFormModal
          onClose={() =>
            setFormOpen(false)
          }
        />
      )}
    </>
  )
}