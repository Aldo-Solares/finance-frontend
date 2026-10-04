import { ChartCandlestick } from 'lucide-react'

import type { Currency } from '@/modules/catalogs/currency/schemas/currency.schema'
import type { Instrument } from '@/modules/trading/instrument/schemas/instrument.schema'
import { AdminCatalogGrid } from '@/shared/admin/admin-catalog-grid'
import { AdminCatalogItem } from '@/shared/admin/admin-catalog-item'

type InstrumentListProps = {
  instruments: Instrument[]
  currencies: Currency[]
  onEdit: (instrument: Instrument) => void
  onDelete: (instrument: Instrument) => void
}

export const InstrumentList = ({
  instruments,
  currencies,
  onEdit,
  onDelete,
}: InstrumentListProps) => {
  return (
    <AdminCatalogGrid>
      {instruments.map((instrument) => {
        const currency = currencies.find(
          (item) => item.currencyId === instrument.currencyId,
        )

        return (
          <AdminCatalogItem
            key={instrument.instrumentId}
            icon={ChartCandlestick}
            title={instrument.symbol}
            subtitle={instrument.name}
            details={
              <>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                  Moneda
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {currency ? currency.code : 'Moneda no encontrada'}
                </p>
              </>
            }
            editLabel={`Editar ${instrument.symbol}`}
            deleteLabel={`Eliminar ${instrument.symbol}`}
            onEdit={() => onEdit(instrument)}
            onDelete={() => onDelete(instrument)}
          />
        )
      })}
    </AdminCatalogGrid>
  )
}
