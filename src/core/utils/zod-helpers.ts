// @/core/utils/zod-helpers.ts

import { z } from 'zod'

export const requiredString = (message: string) =>
  z.string({ error: message }).trim().min(1, message)

export const requiredNumber = (
  requiredMessage: string,
  invalidMessage: string,
) =>
  z.number({
    error: (issue) =>
      issue.input === undefined ? requiredMessage : invalidMessage,
  })
