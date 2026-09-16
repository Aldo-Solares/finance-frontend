// @/modules/user/components/user-settings.tsx

'use client'

import { Bell, LoaderCircle, Mail, Moon } from 'lucide-react'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

import {
  updateDarkModeAction,
  updateStatementCutoffReminderAction,
} from '@/modules/user/actions/user-settings.actions'
import type { UserSettings as UserSettingsType } from '@/modules/user/schemas/user-settings.schema'

type UserSettingsProps = {
  userSettings: UserSettingsType
}

const initialState = {
  success: false,
  message: null,
  data: null,
}

export function UserSettings({ userSettings }: UserSettingsProps) {
  const [reminderState, reminderFormAction] = useActionState(
    updateStatementCutoffReminderAction,
    initialState,
  )

  const [darkModeState, darkModeFormAction] = useActionState(
    updateDarkModeAction,
    initialState,
  )

  const statementCutoffReminder =
    reminderState.success && reminderState.data !== null
      ? reminderState.data.statementCutoffReminder
      : userSettings.statementCutoffReminder

  const darkMode =
    darkModeState.success && darkModeState.data !== null
      ? darkModeState.data.darkMode
      : userSettings.darkMode

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
      <header className="border-b border-border px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-text-muted">
            <Bell className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              Configuración
            </h2>

            <p className="mt-1 text-sm leading-5 text-text-muted">
              Personaliza las preferencias de tu cuenta.
            </p>
          </div>
        </div>
      </header>

      <div className="divide-y divide-border">
        <form action={darkModeFormAction}>
          <div className="group flex min-h-[76px] items-center justify-between gap-5 px-5 py-4 transition-colors hover:bg-surface/50 sm:px-6">
            <div className="flex min-w-0 items-center gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-text-muted transition-colors group-hover:text-foreground">
                <Moon className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">
                  Modo oscuro
                </p>

                <p className="mt-0.5 max-w-xl text-xs leading-5 text-text-muted">
                  Utiliza una apariencia oscura para la aplicación.
                </p>
              </div>
            </div>

            <input
              type="hidden"
              name="active"
              value={darkMode ? 'false' : 'true'}
            />

            <SettingsToggle enabled={darkMode} />
          </div>
        </form>

        <form action={reminderFormAction}>
          <div className="group flex min-h-[76px] items-center justify-between gap-5 px-5 py-4 transition-colors hover:bg-surface/50 sm:px-6">
            <div className="flex min-w-0 items-center gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-text-muted transition-colors group-hover:text-foreground">
                <Mail className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">
                  Fecha de corte de tarjetas
                </p>

                <p className="mt-0.5 max-w-xl text-xs leading-5 text-text-muted">
                  Recibe un correo cuando se aproxime la fecha de corte de tus
                  tarjetas.
                </p>
              </div>
            </div>

            <input
              type="hidden"
              name="statementCutoffReminder"
              value={statementCutoffReminder ? 'false' : 'true'}
            />

            <SettingsToggle enabled={statementCutoffReminder} />
          </div>
        </form>
      </div>

      {(darkModeState.message || reminderState.message) && (
        <div className="border-t border-border bg-surface/40 px-5 py-3.5 sm:px-6">
          <p className="text-xs leading-5 text-text-muted">
            {darkModeState.message || reminderState.message}
          </p>
        </div>
      )}
    </section>
  )
}

function SettingsToggle({ enabled }: { enabled: boolean }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      aria-pressed={enabled}
      className={[
        'relative flex h-7 w-12 shrink-0 items-center rounded-full p-0.5',
        'border transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-primary/40 focus-visible:ring-offset-2',
        'focus-visible:ring-offset-background',
        enabled ? 'border-primary bg-primary' : 'border-border bg-surface',
        pending ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
      ].join(' ')}
    >
      {pending ? (
        <LoaderCircle className="mx-auto h-4 w-4 animate-spin text-primary-foreground" />
      ) : (
        <span
          className={[
            'block h-6 w-6 rounded-full bg-background',
            'shadow-[0_1px_3px_rgba(0,0,0,0.18)]',
            'transition-transform duration-200',
            enabled ? 'translate-x-5' : 'translate-x-0',
          ].join(' ')}
        />
      )}
    </button>
  )
}
