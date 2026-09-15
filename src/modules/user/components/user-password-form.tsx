// @/modules/user/components/user-password-form.tsx

'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Check, LoaderCircle } from 'lucide-react'

import type { ActionState } from '@/core/utils/action-state'
import { changePasswordAction } from '@/modules/user/actions/user.actions'
import { PasswordField } from '@/shared/inputs/password-field'

const initialState: ActionState<null> = {
  success: false,
  message: null,
  data: null,
}

export function UserPasswordForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useActionState(changePasswordAction, initialState)

  useEffect(() => {
    if (!state.success) {
      return
    }

    formRef.current?.reset()
  }, [state.success])

  return (
    <form ref={formRef} action={formAction}>
      <div className="space-y-5 px-6 py-7 sm:px-8 sm:py-8">
        {/* ===================
            CURRENT PASSWORD
            =================== */}

        <PasswordField
          id="currentPassword"
          name="currentPassword"
          label="Contraseña actual"
          autoComplete="current-password"
          required
        />

        {/* ===================
            NEW PASSWORD
            =================== */}

        <PasswordField
          id="newPassword"
          name="newPassword"
          label="Nueva contraseña"
          autoComplete="new-password"
          required
        />

        <p className="-mt-2 text-xs leading-5 text-text-muted">
          Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un
          carácter especial.
        </p>

        {/* ===================
            RESPONSE
            =================== */}

        {state.message && (
          <div
            className={[
              'flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm',
              state.success
                ? [
                    'border-primary bg-primary-soft text-primary',
                    'border-primary/60 bg-primary-soft/30 text-primary',
                  ].join(' ')
                : [
                    'border-primary bg-primary-soft text-primary',
                    'border-primary/60 bg-primary-soft/30 text-primary',
                  ].join(' '),
            ].join(' ')}
          >
            {state.success && <Check className="h-4 w-4 shrink-0" />}
            <span>{state.message}</span>
          </div>
        )}
      </div>

      {/* ===================
          ACTIONS
          =================== */}

      <div className="flex items-center justify-end border-t border-border bg-surface/50 px-6 py-4 sm:px-8">
        <PasswordSaveButton />
      </div>
    </form>
  )
}

// ===================
// SAVE
// ===================

function PasswordSaveButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={[
        'inline-flex min-w-44 items-center justify-center gap-2',
        'rounded-xl bg-primary px-5 py-2.5',
        'text-sm font-semibold text-primary-foreground',
        'shadow-sm transition-all duration-200',
        'hover:bg-primary-hover hover:shadow-md',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-primary/40 focus-visible:ring-offset-2',
        'focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none',
      ].join(' ')}
    >
      {pending && <LoaderCircle className="h-4 w-4 animate-spin" />}
      {pending ? 'Actualizando...' : 'Cambiar contraseña'}
    </button>
  )
}
