'use client'

import { WalletCards } from 'lucide-react'

import type { Currency } from '@/modules/catalogs/currency/schemas/currency.schema'
import { deleteTradingAccountAction } from '@/modules/trading/trading-account/actions/trading-account.actions'
import type { TradingAccount } from '@/modules/trading/trading-account/schemas/trading-account.schema'
import { AdminCatalogPage } from '@/shared/admin/admin-catalog-page'

import { TradingAccountAddModal } from './trading-account-add-modal'
import { TradingAccountEditModal } from './trading-account-edit-modal'
import { TradingAccountList } from './trading-account-list'

type TradingAccountPageProps = {
  tradingAccounts: TradingAccount[]
  currencies: Currency[]
}

export const TradingAccountPage = ({
  tradingAccounts,
  currencies,
}: TradingAccountPageProps) => {
  return (
    <AdminCatalogPage
      title="Cuentas de trading"
      description="Administra las cuentas de trading disponibles en el sistema."
      createLabel="Nueva cuenta"
      items={tradingAccounts}
      metrics={[
        {
          icon: WalletCards,
          label: 'Cuentas disponibles',
          value: tradingAccounts.length,
        },
      ]}
      emptyIcon={WalletCards}
      emptyTitle="No hay cuentas de trading"
      emptyDescription="Crea una cuenta para comenzar a registrar movimientos y operaciones."
      deleteTitle="Eliminar cuenta"
      getDeleteDescription={() =>
        '¿Seguro que deseas eliminar esta cuenta de trading?'
      }
      onDelete={async (tradingAccount) => {
        await deleteTradingAccountAction(tradingAccount.tradingAccountId)
      }}
      renderItems={({ onEdit, onDelete }) => (
        <TradingAccountList
          tradingAccounts={tradingAccounts}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      renderCreateDialog={(onClose) => (
        <TradingAccountAddModal currencies={currencies} onClose={onClose} />
      )}
      renderEditDialog={(tradingAccount, onClose) => (
        <TradingAccountEditModal
          key={tradingAccount.tradingAccountId}
          tradingAccount={tradingAccount}
          currencies={currencies}
          onClose={onClose}
        />
      )}
    />
  )
}
