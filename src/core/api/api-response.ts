// @/core/api/api-response.ts

import { z } from 'zod'

import { createApiResponseSchema } from '@/core/schemas/api-response.schema'
import { extractErrorMessage } from '@/core/utils/extract-error-message'

export async function parseApiResponse<T>(
  response: Response,
  dataSchema: z.ZodType<T>,
  fallbackMessage: string,
): Promise<T> {
  if (!response.ok) {
    throw new Error(await extractErrorMessage(response))
  }

  const json: unknown = await response.json()

  const result = createApiResponseSchema(dataSchema).parse(json)

  if (!result.success) {
    throw new Error(result.message ?? fallbackMessage)
  }

  if (result.data === null) {
    throw new Error(fallbackMessage)
  }

  return result.data
}
