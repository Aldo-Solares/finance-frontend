// @/core/utils/extract-error-message.ts

import { z } from 'zod'

const ErrorResponseSchema = z.object({
  message: z.string().nullable().optional(),
})

export const extractErrorMessage = async (
  response: Response,
): Promise<string> => {
  const fallbackMessage = `Request failed with status ${response.status}`

  const text = await response.text()

  if (!text) {
    return fallbackMessage
  }

  try {
    const json: unknown = JSON.parse(text)

    const result = ErrorResponseSchema.safeParse(json)

    if (result.success && result.data.message) {
      return result.data.message
    }
  } catch {
    return text
  }

  return fallbackMessage
}
