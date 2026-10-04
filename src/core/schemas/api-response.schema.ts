// @/core/schemas/api-response.schema.ts

import { z } from 'zod'

export const createApiResponseSchema = <T>(dataSchema: z.ZodType<T>) =>
  z.object({
    success: z.boolean(),
    message: z.string().nullable(),
    data: dataSchema.nullable(),
  })

export type ApiResponse<T> = z.infer<
  ReturnType<typeof createApiResponseSchema<T>>
>
