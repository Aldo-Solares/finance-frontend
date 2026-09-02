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
    <form action={formAction}>
      <div className="space-y-5 p-6">
        {/* ===================
            NAME
            =================== */}

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

        <div className="grid gap-4 sm:grid-cols-2">
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
              'flex items-center gap-2 rounded-xl border px-4 py-3 text-sm',
              state.success
                ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                : 'border-red-100 bg-red-50 text-red-600',
            ].join(' ')}
          >
            {state.success && <Check className="h-4 w-4 shrink-0" />}

            {state.message}
          </div>
        )}
      </div>

      {/* ===================
          ACTIONS
          =================== */}

      <div className="flex justify-end border-t border-neutral-100 bg-neutral-50/60 px-6 py-4">
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
      className="flex min-w-40 cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && <LoaderCircle className="h-4 w-4 animate-spin" />}

      {pending ? 'Guardando...' : 'Guardar cambios'}
    </button>
  )
}
