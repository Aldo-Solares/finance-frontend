// @/modules/catalogs/currency/services/currency.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { createApiResponseSchema } from '@/core/schemas/api-response.schema'
import {
  CreateCurrencySchema,
  CurrencySchema,
  UpdateCurrencySchema,
  type CreateCurrency,
  type Currency,
  type UpdateCurrency,
} from '@/modules/catalogs/currency/schemas/currency.schema'

// ===================
// SCHEMAS
// ===================

const CurrencyResponseSchema = createApiResponseSchema(CurrencySchema)

const CurrencyListResponseSchema = createApiResponseSchema(
  z.array(CurrencySchema),
)

// ===================
// GET ALL
// ===================

export const getCurrencies = async (): Promise<Currency[]> => {
  const response = await fetchServer('/catalogs/currencies')

  const json: unknown = await response.json()

  const parsed = CurrencyListResponseSchema.parse(json)

  if (!parsed.success || !parsed.data) {
    throw new Error(parsed.message ?? 'No fue posible obtener las monedas')
  }

  return parsed.data
}

// ===================
// GET BY ID
// ===================

export const getCurrencyById = async (
  currencyId: number,
): Promise<Currency> => {
  const response = await fetchServer(`/catalogs/currencies/${currencyId}`)

  const json: unknown = await response.json()

  const parsed = CurrencyResponseSchema.parse(json)

  if (!parsed.success || !parsed.data) {
    throw new Error(parsed.message ?? 'No fue posible obtener la moneda')
  }

  return parsed.data
}

// ===================
// CREATE
// ===================

export const createCurrency = async (
  input: CreateCurrency,
): Promise<Currency> => {
  const payload = CreateCurrencySchema.parse(input)

  const response = await fetchServer('/catalogs/currencies', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const json: unknown = await response.json()

  const parsed = CurrencyResponseSchema.parse(json)

  if (!parsed.success || !parsed.data) {
    throw new Error(parsed.message ?? 'No fue posible crear la moneda')
  }

  return parsed.data
}

// ===================
// UPDATE
// ===================

export const updateCurrency = async (
  currencyId: number,
  input: UpdateCurrency,
): Promise<Currency> => {
  const payload = UpdateCurrencySchema.parse(input)

  const response = await fetchServer(`/catalogs/currencies/${currencyId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

  const json: unknown = await response.json()

  const parsed = CurrencyResponseSchema.parse(json)

  if (!parsed.success || !parsed.data) {
    throw new Error(parsed.message ?? 'No fue posible actualizar la moneda')
  }

  return parsed.data
}

// ===================
// DELETE
// ===================

export const deleteCurrency = async (currencyId: number): Promise<void> => {
  await fetchServer(`/catalogs/currencies/${currencyId}`, {
    method: 'DELETE',
  })
}
