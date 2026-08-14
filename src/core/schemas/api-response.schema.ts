// @/core/schemas/api-response.schema.ts

import { z } from 'zod'

export const createApiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string().nullable(),
    data: dataSchema.nullable(),
  })

export type ApiResponse<T extends z.ZodType> = z.infer<
  ReturnType<typeof createApiResponseSchema<T>>
>
