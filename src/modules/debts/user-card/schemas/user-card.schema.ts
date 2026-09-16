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
})

// ===================
// CREATE USER CARD
// ===================

export const CreateUserCardRequestSchema = z.object({
  cardId: z.number().int().positive(),
})

// ===================
// TYPES
// ===================

export type UserCard = z.infer<typeof UserCardSchema>

export type CreateUserCardRequest = z.infer<typeof CreateUserCardRequestSchema>
