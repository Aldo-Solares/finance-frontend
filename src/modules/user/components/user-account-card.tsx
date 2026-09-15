// @/modules/user/components/user-account-card.tsx

'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import {
  BadgeCheck,
  CircleAlert,
  LoaderCircle,
  LogOut,
  MailCheck,
  ShieldCheck,
} from 'lucide-react'

import type { ActionState } from '@/core/utils/action-state'
import {
  logoutAction,
  resendVerificationAction,
} from '@/modules/auth/actions/auth.actions'
import { ProfileAvatar } from '@/modules/user/components/profile-image/profile-avatar'
import { useUserSettings } from '@/modules/user/providers/user-settings-provider'
import type { User } from '@/modules/user/schemas/user.schema'

type UserAccountCardProps = {
  user: User
}

const initialState: ActionState<null> = {
  success: false,
  message: null,
  data: null,
}

export function UserAccountCard({ user }: UserAccountCardProps) {
  const { userSettings } = useUserSettings()

  const [state, resendAction] = useActionState(
    resendVerificationAction,
    initialState,
  )

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <div className="p-6">
        <ProfileAvatar
          profileImage={user.profileImage}
          background={userSettings.profileImageBackground}
          size="md"
          fallback={user.name.charAt(0).toUpperCase()}
        />

        <p className="mt-4 font-semibold text-foreground">
          {user.name}
          {user.lastName ? ` ${user.lastName}` : ''}
        </p>

        <p className="mt-1 break-all text-xs text-text-muted">{user.email}</p>
      </div>

      <div className="space-y-4 border-t border-border px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <ShieldCheck className="h-4 w-4" />
            Rol
          </div>

          <span className="rounded-full bg-surface px-2.5 py-1 text-[10px] font-semibold text-text-muted">
            {user.role}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            {user.emailVerified ? (
              <BadgeCheck className="h-4 w-4 text-emerald-500" />
            ) : (
              <CircleAlert className="h-4 w-4 text-amber-500" />
            )}
            Correo
          </div>

          <span
            className={[
              'rounded-full px-2.5 py-1 text-[10px] font-semibold',
              user.emailVerified
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                : 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
            ].join(' ')}
          >
            {user.emailVerified ? 'Verificado' : 'Pendiente'}
          </span>
        </div>
      </div>

      {!user.emailVerified && (
        <form
          action={resendAction}
          className="border-t border-border px-6 py-5"
        >
          <input type="hidden" name="email" value={user.email} />

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
            <div className="flex gap-3">
              <MailCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />

              <div>
                <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                  Verifica tu correo
                </p>

                <p className="mt-1 text-xs leading-5 text-amber-700/70 dark:text-amber-300/70">
                  Tu dirección todavía necesita ser verificada.
                </p>
              </div>
            </div>

            <ResendButton />
          </div>

          {state.message && (
            <p
              className={[
                'mt-3 text-xs',
                state.success
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-red-600 dark:text-red-400',
              ].join(' ')}
            >
              {state.message}
            </p>
          )}
        </form>
      )}

      <div className="border-t border-border p-4">
        <form action={logoutAction}>
          <button
            type="submit"
            className={[
              'flex w-full cursor-pointer items-center gap-3 rounded-xl',
              'px-3 py-2.5 text-sm font-medium text-text-muted',
              'transition-all duration-200',
              'hover:bg-red-50 hover:text-red-600',
              'dark:hover:bg-red-950/30 dark:hover:text-red-400',
            ].join(' ')}
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </form>
      </div>
    </div>
  )
}

function ResendButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={[
        'mt-4 inline-flex cursor-pointer items-center gap-2',
        'text-xs font-semibold text-amber-800',
        'transition-opacity hover:opacity-70',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'dark:text-amber-300',
      ].join(' ')}
    >
      {pending && <LoaderCircle className="h-3.5 w-3.5 animate-spin" />}
      {pending ? 'Enviando...' : 'Reenviar verificación'}
    </button>
  )
}
