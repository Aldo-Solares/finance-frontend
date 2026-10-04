// @/modules/trading/instrument/components/instrument-page.tsx

'use client'

import { ChartCandlestick, Coins, Plus } from 'lucide-react'

import { useState } from 'react'

import type { Currency } from '@/modules/catalogs/currency/schemas/currency.schema'

import { deleteInstrumentAction } from '@/modules/trading/instrument/actions/instrument.actions'

import type { Instrument } from '@/modules/trading/instrument/schemas/instrument.schema'

import { DeleteModal } from '@/shared/modal/delete-modal'

import { HeroComponent } from '@/shared/hero/hero-component'

import { InstrumentCreateFormModal } from './instrument-create-form-modal'

import { InstrumentEditFormModal } from './instrument-edit-form-modal'

import { InstrumentEmptyState } from './instrument-empty-state'

import { InstrumentList } from './instrument-list'
import { MetricCard } from '@/shared/metrics/metric-card'

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
  const [deletingInstrument, setDeletingInstrument] =
    useState<Instrument | null>(null)

  const handleCreate = () => {
    setFormOpen(true)
  }

  const handleEdit = (instrument: Instrument) => {
    setEditingInstrument(instrument)
  }

  const handleDelete = (instrument: Instrument) => {
    setDeletingInstrument(instrument)
  }

  return (
    <>
      <div className="space-y-8">
        <HeroComponent
          eyebrow="Trading"
          title="Instrumentos"
          description="Administra los instrumentos disponibles para registrar y consultar tus operaciones de trading."
          action={{
            label: 'Nuevo instrumento',
            icon: Plus,
            onClick: handleCreate,
          }}
        />

        <section className="grid gap-3 sm:grid-cols-2">
          <MetricCard
            icon={ChartCandlestick}
            label="Instrumentos disponibles"
            value={instruments.length}
          />

          <MetricCard
            icon={Coins}
            label="Monedas disponibles"
            value={currencies.length}
          />
        </section>

        <section>
          {instruments.length === 0 ? (
            <InstrumentEmptyState onCreate={handleCreate} />
          ) : (
            <InstrumentList
              instruments={instruments}
              currencies={currencies}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>

      {formOpen && (
        <InstrumentCreateFormModal
          currencies={currencies}
          onClose={() => setFormOpen(false)}
        />
      )}

      {editingInstrument && (
        <InstrumentEditFormModal
          instrument={editingInstrument}
          currencies={currencies}
          onClose={() => setEditingInstrument(null)}
        />
      )}

      {deletingInstrument && (
        <DeleteModal
          title="Eliminar instrumento"
          description={`¿Estás seguro de que deseas eliminar ${deletingInstrument.symbol}? Esta acción no se puede deshacer.`}
          onClose={() => setDeletingInstrument(null)}
          onConfirm={async () => {
            await deleteInstrumentAction(deletingInstrument.instrumentId)
          }}
        />
      )}
    </>
  )
}
