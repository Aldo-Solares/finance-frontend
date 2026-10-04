// @/core/utils/action-state.ts

export type ActionState<T = null> = {
  success: boolean
  message: string | null
  data: T | null
}

// ===================
// RESULT HELPERS
// ===================

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

// ===================
// ACTION WRAPPER
// ===================

export async function withActionState<T>(
  action: () => Promise<T>,
  fallbackMessage: string,
  successMessage: string | null = null,
): Promise<ActionState<T>> {
  try {
    const result = await action()

    return actionSuccess(result, successMessage)
  } catch (error) {
    return actionError(error instanceof Error ? error.message : fallbackMessage)
  }
}
