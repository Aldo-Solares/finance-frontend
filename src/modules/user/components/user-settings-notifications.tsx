// @/modules/user/components/user-settings-notifications.tsx

'use client'

import {
  Bell,
  LoaderCircle,
  Mail,
} from 'lucide-react'
import {
  useActionState,
  useEffect,
  useRef,
} from 'react'
import { useFormStatus } from 'react-dom'

import type { UserSettings } from '@/modules/user/schemas/user-settings.schema'
import { updateCurrentUserSettingsAction } from '@/modules/user/actions/user-settings.actions'

// ===================
// TYPES
// ===================

type UserSettingsNotificationsProps = {
  userSettings: UserSettings
}

// ===================
// INITIAL STATE
// ===================

const initialState = {
  success: false,
  message: null,
  data: null,
}

// ===================
// COMPONENT
// ===================

export function UserSettingsNotifications({
  userSettings,
}: UserSettingsNotificationsProps) {
  const [state, formAction] = useActionState(
    updateCurrentUserSettingsAction,
    initialState,
  )

  const enabled =
    state.success && state.data !== null
      ? state.data.statementCutoffReminder
      : userSettings.statementCutoffReminder

  return (
    <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      {/* ===================
          HEADER
          =================== */}

      <div className="border-b border-neutral-100 px-6 py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
            <Bell className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-950">
              Notificaciones
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Controla los correos que quieres recibir de Isha.
            </p>
          </div>
        </div>
      </div>

      {/* ===================
          STATEMENT CUTOFF
          =================== */}

      <form action={formAction}>
        <div className="flex items-center justify-between gap-6 px-6 py-5">
          <div className="flex min-w-0 items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-50 text-neutral-500">
              <Mail className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-medium text-neutral-900">
                Fecha de corte de tarjetas
              </p>

              <p className="mt-1 max-w-xl text-xs leading-5 text-neutral-500">
                Recibe un correo cuando se aproxime la fecha
                de corte de tus tarjetas.
              </p>
            </div>
          </div>

          <input
            type="hidden"
            name="statementCutoffReminder"
            value={enabled ? 'false' : 'true'}
          />

          <SettingsToggle enabled={enabled} />
        </div>
      </form>

      {/* ===================
          RESPONSE
          =================== */}

      {state.message && (
        <div className="border-t border-neutral-100 px-6 py-4">
          <p
            className={[
              'text-sm',
              state.success
                ? 'text-emerald-600'
                : 'text-red-600',
            ].join(' ')}
          >
            {state.message}
          </p>
        </div>
      )}
    </section>
  )
}

// ===================
// TOGGLE
// ===================

function SettingsToggle({
  enabled,
}: {
  enabled: boolean
}) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      aria-label={
        enabled
          ? 'Desactivar recordatorio de fecha de corte'
          : 'Activar recordatorio de fecha de corte'
      }
      aria-pressed={enabled}
      className={[
        'relative flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors',
        enabled
          ? 'bg-neutral-950'
          : 'bg-neutral-300',
        pending
          ? 'cursor-not-allowed opacity-60'
          : 'cursor-pointer',
      ].join(' ')}
    >
      {pending ? (
        <LoaderCircle className="mx-auto h-4 w-4 animate-spin text-white" />
      ) : (
        <span
          className={[
            'block h-5 w-5 rounded-full bg-white shadow-sm transition-transform',
            enabled
              ? 'translate-x-5'
              : 'translate-x-0',
          ].join(' ')}
        />
      )}
    </button>
  )
}