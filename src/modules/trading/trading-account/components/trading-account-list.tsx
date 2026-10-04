import { Building2 } from 'lucide-react'

import type { TradingAccount } from '@/modules/trading/trading-account/schemas/trading-account.schema'
import { AdminCatalogGrid } from '@/shared/admin/admin-catalog-grid'
import { AdminCatalogItem } from '@/shared/admin/admin-catalog-item'

type TradingAccountListProps = {
  tradingAccounts: TradingAccount[]
  onEdit: (tradingAccount: TradingAccount) => void
  onDelete: (tradingAccount: TradingAccount) => void
}

export const TradingAccountList = ({
  tradingAccounts,
  onEdit,
  onDelete,
}: TradingAccountListProps) => {
  return (
    <AdminCatalogGrid>
      {tradingAccounts.map((tradingAccount) => (
        <AdminCatalogItem
          key={tradingAccount.tradingAccountId}
          icon={Building2}
          title={tradingAccount.name}
          subtitle={tradingAccount.institution}
          details={
            <>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                Moneda
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {tradingAccount.currencyCode}
              </p>
            </>
          }
          editLabel={`Editar ${tradingAccount.name}`}
          deleteLabel={`Eliminar ${tradingAccount.name}`}
          onEdit={() => onEdit(tradingAccount)}
          onDelete={() => onDelete(tradingAccount)}
        />
      ))}
    </AdminCatalogGrid>
  )
}
