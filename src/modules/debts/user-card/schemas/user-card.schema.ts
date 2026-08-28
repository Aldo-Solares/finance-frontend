// @/modules/debts/user-card/schemas/user-card.schema.ts

import { z } from 'zod'

// ===================
// USER CARD RESPONSE
// ===================

export const UserCardSchema = z.object({
  userCardId: z.number().int(),
  userId: z.number().int(),
  cardId: z.number().int(),
  bank: z.string(),
  cardName: z.string(),
  active: z.boolean(),
})

// ===================
// CREATE USER CARD
// ===================

export const CreateUserCardRequestSchema = z.object({
  cardId: z.number().int().positive(),
  active: z.boolean(),
})

// ===================
// UPDATE USER CARD
// ===================

export const UpdateUserCardRequestSchema = z.object({
  active: z.boolean(),
})

// ===================
// TYPES
// ===================

export type UserCard = z.infer<typeof UserCardSchema>

export type CreateUserCardRequest = z.infer<typeof CreateUserCardRequestSchema>

export type UpdateUserCardRequest = z.infer<typeof UpdateUserCardRequestSchema>
