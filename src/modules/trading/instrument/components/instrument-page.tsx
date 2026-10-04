'use client'

import { ChartCandlestick, Coins } from 'lucide-react'

import type { Currency } from '@/modules/catalogs/currency/schemas/currency.schema'
import { deleteInstrumentAction } from '@/modules/trading/instrument/actions/instrument.actions'
import { InstrumentCreateFormModal } from '@/modules/trading/instrument/components/instrument-create-form-modal'
import { InstrumentEditFormModal } from '@/modules/trading/instrument/components/instrument-edit-form-modal'
import { InstrumentList } from '@/modules/trading/instrument/components/instrument-list'
import type { Instrument } from '@/modules/trading/instrument/schemas/instrument.schema'
import { AdminCatalogPage } from '@/shared/admin/admin-catalog-page'

type InstrumentPageProps = {
  instruments: Instrument[]
  currencies: Currency[]
}

export const InstrumentPage = ({
  instruments,
  currencies,
}: InstrumentPageProps) => {
  return (
    <AdminCatalogPage
      title="Instrumentos"
      description="Administra los instrumentos disponibles para registrar y consultar tus operaciones de trading."
      createLabel="Nuevo instrumento"
      items={instruments}
      metrics={[
        {
          icon: ChartCandlestick,
          label: 'Instrumentos disponibles',
          value: instruments.length,
        },
        {
          icon: Coins,
          label: 'Monedas disponibles',
          value: currencies.length,
        },
      ]}
      emptyIcon={ChartCandlestick}
      emptyTitle="No hay instrumentos"
      emptyDescription="Agrega los instrumentos financieros que utilizarás para registrar tus operaciones."
      deleteTitle="Eliminar instrumento"
      getDeleteDescription={(instrument) =>
        `¿Estás seguro de que deseas eliminar ${instrument.symbol}? Esta acción no se puede deshacer.`
      }
      onDelete={async (instrument) => {
        await deleteInstrumentAction(instrument.instrumentId)
      }}
      renderItems={({ onEdit, onDelete }) => (
        <InstrumentList
          instruments={instruments}
          currencies={currencies}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      renderCreateDialog={(onClose) => (
        <InstrumentCreateFormModal currencies={currencies} onClose={onClose} />
      )}
      renderEditDialog={(instrument, onClose) => (
        <InstrumentEditFormModal
          key={instrument.instrumentId}
          instrument={instrument}
          currencies={currencies}
          onClose={onClose}
        />
      )}
    />
  )
}
