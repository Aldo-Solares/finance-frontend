// @/modules/debts/card-product/services/card-product.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { createApiResponseSchema } from '@/core/schemas/api-response.schema'
import {
  CardProductSchema,
  type CardProduct,
  type CreateCardProductRequest,
  type UpdateCardProductRequest,
} from '@/modules/debts/card-product/schemas/card-product.schema'

// ===================
// FIND ALL
// ===================

export async function findAllCardProducts(): Promise<CardProduct[]> {
  const response = await fetchServer('/card-products', {
    method: 'GET',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.array(CardProductSchema)).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible obtener los productos de tarjeta',
    )
  }

  if (result.data === null) {
    throw new Error('La respuesta de productos de tarjeta no contiene datos')
  }

  return result.data
}

// ===================
// FIND BY ID
// ===================

export async function findCardProductById(
  productId: number,
): Promise<CardProduct> {
  const response = await fetchServer(`/card-products/${productId}`, {
    method: 'GET',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(CardProductSchema).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible obtener el producto de tarjeta',
    )
  }

  if (result.data === null) {
    throw new Error('La respuesta del producto de tarjeta no contiene datos')
  }

  return result.data
}

// ===================
// CREATE
// ===================

export async function createCardProduct(
  request: CreateCardProductRequest,
): Promise<CardProduct> {
  const response = await fetchServer('/card-products', {
    method: 'POST',
    body: JSON.stringify(request),
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(CardProductSchema).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible crear el producto de tarjeta',
    )
  }

  if (result.data === null) {
    throw new Error('La respuesta de creación no contiene datos')
  }

  return result.data
}

// ===================
// UPDATE
// ===================

export async function updateCardProduct(
  productId: number,
  request: UpdateCardProductRequest,
): Promise<CardProduct> {
  const response = await fetchServer(`/card-products/${productId}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(CardProductSchema).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible actualizar el producto de tarjeta',
    )
  }

  if (result.data === null) {
    throw new Error('La respuesta de actualización no contiene datos')
  }

  return result.data
}

// ===================
// DELETE
// ===================

export async function deleteCardProduct(productId: number): Promise<void> {
  const response = await fetchServer(`/card-products/${productId}`, {
    method: 'DELETE',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.null()).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible eliminar el producto de tarjeta',
    )
  }
}
