// @/core/utils/zod-helpers.ts

import { z } from 'zod'

export const requiredString = (message: string) =>
  z.string().trim().min(1, message)
