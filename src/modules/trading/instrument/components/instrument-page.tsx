// @/modules/trading/instrument/components/instrument-page.tsx

'use client'

import { ChartCandlestick, Coins, Plus } from 'lucide-react'
import { useState } from 'react'

import type { Currency } from '@/modules/catalogs/currency/schemas/currency.schema'
import type { Instrument } from '@/modules/trading/instrument/schemas/instrument.schema'

import { InstrumentCreateFormModal } from './instrument-create-form-modal'
import { InstrumentEditFormModal } from './instrument-edit-form-modal'
import { InstrumentEmptyState } from './instrument-empty-state'
import { InstrumentList } from './instrument-list'

type InstrumentPageProps = {
  instruments: Instrument[]
  currencies: Currency[]
}

export const InstrumentPage = ({
  instruments,
  currencies,
}: InstrumentPageProps) => {
  const [formOpen, setFormOpen] = useState(false)

  const [editingInstrument, setEditingInstrument] = useState<Instrument | null>(
    null,
  )

  const handleCreate = () => {
    setFormOpen(true)
  }

  const handleEdit = (instrument: Instrument) => {
    setEditingInstrument(instrument)
  }

  return (
    <>
      <div className="space-y-8">
        {/* ===================
            HEADER
            =================== */}

        <section className="relative overflow-hidden rounded-3xl border border-border bg-background">
          <div className="absolute -right-20 -top-24 size-624 rounded-full bg-surface/80 blur-3xl" />

          <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <ChartCandlestick className="size-6" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    Instrumentos
                  </h1>

                  <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-text-muted">
                    {instruments.length}
                  </span>
                </div>

                <p className="mt-2 max-w-xl text-sm leading-6 text-text-muted">
                  Administra los instrumentos disponibles para registrar y
                  consultar tus operaciones de trading.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-medium text-text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <ChartCandlestick className="size-3.5" />
                    {instruments.length === 1
                      ? 'instrumento disponible'
                      : 'instrumentos disponibles'}
                  </span>

                  <span className="text-text-muted">•</span>

                  <span className="inline-flex items-center gap-1.5">
                    <Coins className="size-3.5" />
                    {currencies.length === 1
                      ? '1 moneda disponible'
                      : `${currencies.length} monedas disponibles`}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCreate}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Plus className="size-4" />
              Nuevo instrumento
            </button>
          </div>
        </section>

        {/* ===================
            CONTENT
            =================== */}

        <section>
          {instruments.length === 0 ? (
            <InstrumentEmptyState onCreate={handleCreate} />
          ) : (
            <InstrumentList
              instruments={instruments}
              currencies={currencies}
              onEdit={handleEdit}
            />
          )}
        </section>
      </div>

      {/* ===================
          CREATE MODAL
          =================== */}

      {formOpen && (
        <InstrumentCreateFormModal
          currencies={currencies}
          onClose={() => setFormOpen(false)}
        />
      )}

      {/* ===================
          EDIT MODAL
          =================== */}

      {editingInstrument && (
        <InstrumentEditFormModal
          instrument={editingInstrument}
          currencies={currencies}
          onClose={() => setEditingInstrument(null)}
        />
      )}
    </>
  )
}
