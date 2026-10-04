// @/modules/catalogs/currency/services/currency.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { parseApiResponse } from '@/core/api/api-response'
import {
  CurrencySchema,
  type CreateCurrency,
  type Currency,
  type UpdateCurrency,
} from '@/modules/catalogs/currency/schemas/currency.schema'

// ===================
// SCHEMAS
// ===================

const CurrencyResponseSchema = CurrencySchema

const CurrencyListResponseSchema = z.array(CurrencySchema)

// ===================
// GET ALL
// ===================

export const getCurrencies = async (): Promise<Currency[]> => {
  const response = await fetchServer('/catalogs/currencies')

  return parseApiResponse(
    response,
    CurrencyListResponseSchema,
    'No fue posible obtener las monedas',
  )
}

// ===================
// GET BY ID
// ===================

export const getCurrencyById = async (
  currencyId: number,
): Promise<Currency> => {
  const response = await fetchServer(`/catalogs/currencies/${currencyId}`)

  return parseApiResponse(
    response,
    CurrencyResponseSchema,
    'No fue posible obtener la moneda',
  )
}

// ===================
// CREATE
// ===================

export const createCurrency = async (
  input: CreateCurrency,
): Promise<Currency> => {
  const response = await fetchServer('/catalogs/currencies', {
    method: 'POST',
    body: JSON.stringify(input),
  })

  return parseApiResponse(
    response,
    CurrencyResponseSchema,
    'No fue posible crear la moneda',
  )
}

// ===================
// UPDATE
// ===================

export const updateCurrency = async (
  currencyId: number,
  input: UpdateCurrency,
): Promise<Currency> => {
  const response = await fetchServer(`/catalogs/currencies/${currencyId}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  })

  return parseApiResponse(
    response,
    CurrencyResponseSchema,
    'No fue posible actualizar la moneda',
  )
}

// ===================
// DELETE
// ===================

export const deleteCurrency = async (currencyId: number): Promise<void> => {
  await fetchServer(`/catalogs/currencies/${currencyId}`, {
    method: 'DELETE',
  })
}
