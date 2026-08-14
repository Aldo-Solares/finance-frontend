// @/core/utils/zod-helpers.ts

import { z } from 'zod'

export const requiredString = (message: string) =>
  z.string().trim().min(1, message)

export const optionalNullableString = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((value) => {
    if (value == null) {
      return null
    }

    const normalized = value.trim()

    return normalized.length === 0 ? null : normalized
  })
