// @/modules/user/components/user-profile-form.tsx

'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'
import { Check, LoaderCircle, Mail, UserRound } from 'lucide-react'

import type { ActionState } from '@/core/utils/action-state'
import { updateCurrentUserAction } from '@/modules/user/actions/user.actions'
import type {
  UpdateUserResponse,
  User,
} from '@/modules/user/schemas/user.schema'
import { TextInput } from '@/shared/inputs/text-input'

type UserProfileFormProps = {
  user: User
}

const initialState: ActionState<UpdateUserResponse> = {
  success: false,
  message: null,
  data: null,
}

export function UserProfileForm({ user }: UserProfileFormProps) {
  const router = useRouter()

  const [state, formAction] = useActionState(
    updateCurrentUserAction,
    initialState,
  )

  useEffect(() => {
    if (!state.success) {
      return
    }

    router.refresh()
  }, [state.success, router])

  return (
    <form action={formAction} className="overflow-hidden">
      <div className="px-6 py-7 sm:px-8 sm:py-8">
        {/* ===================
            PERSONAL INFORMATION
            =================== */}

        <div className="mb-7">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <UserRound className="h-4 w-4" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Datos personales
              </h3>

              <p className="mt-0.5 text-xs text-text-muted">
                Mantén actualizada tu información personal.
              </p>
            </div>
          </div>
        </div>

        {/* ===================
            NAME
            =================== */}

        <div className="space-y-5">
          <TextInput
            id="name"
            name="name"
            label="Nombre"
            defaultValue={user.name}
            autoComplete="given-name"
            icon={UserRound}
          />

          {/* ===================
              LAST NAMES
              =================== */}

          <div className="grid gap-5 sm:grid-cols-2">
            <TextInput
              id="lastName"
              name="lastName"
              label="Primer apellido"
              defaultValue={user.lastName ?? ''}
              autoComplete="family-name"
            />

            <TextInput
              id="secondLastName"
              name="secondLastName"
              label="Segundo apellido"
              defaultValue={user.secondLastName ?? ''}
            />
          </div>
        </div>

        {/* ===================
            CONTACT
            =================== */}

        <div className="my-8 border-t border-border" />

        <div className="mb-7">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Mail className="h-4 w-4" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Información de contacto
              </h3>

              <p className="mt-0.5 text-xs text-text-muted">
                Utiliza una dirección de correo que tengas disponible.
              </p>
            </div>
          </div>
        </div>

        {/* ===================
            EMAIL
            =================== */}

        <TextInput
          id="email"
          name="email"
          label="Correo electrónico"
          type="email"
          defaultValue={user.email}
          autoComplete="email"
          icon={Mail}
          description="Si cambias tu correo electrónico tendrás que verificar la nueva dirección."
        />

        {/* ===================
            RESPONSE
            =================== */}

        {state.message && (
          <div
            className={[
              'mt-6 flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm',
              state.success
                ? 'border-primary bg-primary-soft text-primary'
                : 'border-primary/60 bg-primary-soft/30 text-primary',
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
        <ProfileSaveButton />
      </div>
    </form>
  )
}

// ===================
// SAVE
// ===================

function ProfileSaveButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={[
        'inline-flex min-w-40 items-center justify-center gap-2 rounded-xl',
        'bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground',
        'shadow-sm transition-all duration-200',
        'hover:bg-primary-hover hover:shadow-md',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-primary/40 focus-visible:ring-offset-2',
        'focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none',
      ].join(' ')}
    >
      {pending && <LoaderCircle className="h-4 w-4 animate-spin" />}
      {pending ? 'Guardando...' : 'Guardar cambios'}
    </button>
  )
}
