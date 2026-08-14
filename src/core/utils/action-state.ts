// @/core/utils/action-state.ts

export type ActionState<T = null> = {
  success: boolean
  message: string | null
  data: T | null
}

export const actionSuccess = <T>(
  data: T,
  message: string | null = null,
): ActionState<T> => ({
  success: true,
  message,
  data,
})

export const actionError = <T = null>(message: string): ActionState<T> => ({
  success: false,
  message,
  data: null,
})
