// @/modules/user/components/profile-image/profile-image-selector.tsx

'use client'

import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, LoaderCircle, X } from 'lucide-react'

import type { ActionState } from '@/core/utils/action-state'
import {
  removeCurrentUserProfileImageAction,
  updateCurrentUserProfileImageAction,
} from '@/modules/user/actions/user.actions'
import { updateProfileImageBackgroundAction } from '@/modules/user/actions/user-settings.actions'
import {
  PROFILE_IMAGE_BACKGROUND_CLASSES,
  PROFILE_IMAGE_BACKGROUNDS,
} from '@/modules/user/constants/profile-image.constants'
import { useUserSettings } from '@/modules/user/providers/user-settings-provider'
import type { ProfileImage } from '@/modules/user/schemas/profile-image.schema'
import type { User } from '@/modules/user/schemas/user.schema'
import type { UserSettings } from '@/modules/user/schemas/user-settings.schema'

import { ProfileAvatar } from './profile-avatar'

type ProfileImageSelectorProps = {
  user: User
  profileImages: ProfileImage[]
}

const initialImageState: ActionState<User> = {
  success: false,
  message: null,
  data: null,
}

const initialRemoveState: ActionState<null> = {
  success: false,
  message: null,
  data: null,
}

const initialBackgroundState: ActionState<UserSettings> = {
  success: false,
  message: null,
  data: null,
}

const backgroundLabels: Record<UserSettings['profileImageBackground'], string> =
  {
    PINK: 'Rosa',
    PURPLE: 'Morado',
    BLUE: 'Azul',
    CYAN: 'Cian',
    GREEN: 'Verde',
    LIME: 'Lima',
    YELLOW: 'Amarillo',
    ORANGE: 'Naranja',
    RED: 'Rojo',
    ROSE: 'Rosa intenso',
    INDIGO: 'Índigo',
    VIOLET: 'Violeta',
    TEAL: 'Verde azulado',
    SLATE: 'Pizarra',
    GRAY: 'Gris',
    BLACK: 'Negro',
    WHITE: 'Blanco',
  }

export function ProfileImageSelector({
  user,
  profileImages,
}: ProfileImageSelectorProps) {
  const router = useRouter()
  const { userSettings } = useUserSettings()

  const [imageState, imageAction, isImagePending] = useActionState(
    updateCurrentUserProfileImageAction,
    initialImageState,
  )

  const [removeState, removeAction, isRemovePending] = useActionState(
    removeCurrentUserProfileImageAction,
    initialRemoveState,
  )

  const [backgroundState, backgroundAction, isBackgroundPending] =
    useActionState(updateProfileImageBackgroundAction, initialBackgroundState)

  const [selectedBackground, setSelectedBackground] = useState<
    UserSettings['profileImageBackground']
  >(userSettings.profileImageBackground)

  useEffect(() => {
    if (imageState.success || removeState.success || backgroundState.success) {
      router.refresh()
    }
  }, [imageState.success, removeState.success, backgroundState.success, router])

  const message =
    imageState.message ?? removeState.message ?? backgroundState.message

  const success =
    imageState.success || removeState.success || backgroundState.success

  const isAnyPending = isImagePending || isRemovePending || isBackgroundPending

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-background">
      <div className="border-b border-border px-5 py-5 sm:px-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
          Personalización
        </p>

        <div className="mt-1.5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Imagen de perfil
            </h2>

            <p className="mt-1 text-xs leading-5 text-text-muted">
              Elige una imagen y ajusta su fondo.
            </p>
          </div>

          {user.profileImage && (
            <ProfileAvatar
              profileImage={user.profileImage}
              background={selectedBackground}
              size="sm"
              shape="circle"
            />
          )}
        </div>
      </div>

      <div className="space-y-7 p-5 sm:p-6">
        <div>
          <div className="mb-3 flex items-end justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Imagen</h3>

              <p className="mt-0.5 text-xs text-text-muted">
                Selecciona la imagen de tu perfil.
              </p>
            </div>

            {user.profileImage && (
              <span className="text-[11px] text-text-muted">Imagen actual</span>
            )}
          </div>

          {profileImages.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border px-5 py-7 text-center">
              <p className="text-sm font-medium text-foreground">
                No hay imágenes disponibles
              </p>

              <p className="mt-1 text-xs text-text-muted">
                No tienes imágenes de perfil para seleccionar.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2.5">
              {profileImages.map((profileImage) => {
                const isSelected =
                  user.profileImage?.profileImageId ===
                  profileImage.profileImageId

                return (
                  <form key={profileImage.profileImageId} action={imageAction}>
                    <input
                      type="hidden"
                      name="profileImageId"
                      value={profileImage.profileImageId}
                    />

                    <button
                      type="submit"
                      disabled={isAnyPending}
                      aria-label={`Seleccionar ${profileImage.name}`}
                      className={[
                        'group relative cursor-pointer rounded-xl p-1',
                        'transition-all duration-200',
                        isSelected
                          ? 'bg-primary'
                          : 'bg-transparent hover:bg-surface',
                        'disabled:cursor-not-allowed disabled:opacity-60',
                      ].join(' ')}
                    >
                      <div
                        className={[
                          'relative h-16 w-16 overflow-hidden rounded-lg sm:h-[4.5rem] sm:w-[4.5rem]',
                          'border bg-surface',
                          isSelected
                            ? 'border-primary-foreground/20'
                            : 'border-border',
                        ].join(' ')}
                      >
                        <ProfileAvatar
                          profileImage={profileImage}
                          background={selectedBackground}
                          size="fill"
                          shape="rounded"
                        />

                        {isSelected && (
                          <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                            <Check className="h-3 w-3" />
                          </span>
                        )}
                      </div>

                      <span
                        className={[
                          'mt-1.5 block max-w-[4.5rem] truncate text-center text-[10px] font-medium',
                          isSelected
                            ? 'text-primary'
                            : 'text-text-muted group-hover:text-foreground',
                        ].join(' ')}
                      >
                        {profileImage.name}
                      </span>
                    </button>
                  </form>
                )
              })}

              {user.profileImage && (
                <form action={removeAction}>
                  <button
                    type="submit"
                    disabled={isAnyPending}
                    className={[
                      'group flex h-[4.75rem] w-[4.75rem] cursor-pointer flex-col',
                      'items-center justify-center rounded-xl',
                      'border border-dashed border-border bg-surface/40',
                      'text-text-muted transition-all duration-200',
                      'hover:border-red-200 hover:bg-red-50 hover:text-red-600',
                      'disabled:cursor-not-allowed disabled:opacity-60',
                      'dark:hover:border-red-900/60 dark:hover:bg-red-950/30 dark:hover:text-red-400',
                    ].join(' ')}
                  >
                    {isRemovePending ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}

                    <span className="mt-1.5 text-[10px] font-medium">
                      Quitar
                    </span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-border pt-6">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Fondo</h3>

            <p className="mt-0.5 text-xs text-text-muted">
              Elige el color que aparecerá detrás de tu imagen.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {PROFILE_IMAGE_BACKGROUNDS.map((background) => {
              const isSelected = selectedBackground === background

              return (
                <form key={background} action={backgroundAction}>
                  <input
                    type="hidden"
                    name="profileImageBackground"
                    value={background}
                  />

                  <button
                    type="submit"
                    disabled={isAnyPending}
                    aria-label={backgroundLabels[background]}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedBackground(background)}
                    className={[
                      'group relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full',
                      'transition-all duration-200',
                      'disabled:cursor-not-allowed disabled:opacity-60',
                      isSelected
                        ? 'scale-110 ring-2 ring-foreground ring-offset-2 ring-offset-background'
                        : 'hover:scale-110',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'h-full w-full rounded-full border',
                        PROFILE_IMAGE_BACKGROUND_CLASSES[background],
                        isSelected ? 'border-foreground' : 'border-transparent',
                      ].join(' ')}
                    />

                    {isSelected && (
                      <Check
                        className={[
                          'absolute h-3.5 w-3.5',
                          background === 'BLACK' ||
                          background === 'INDIGO' ||
                          background === 'PURPLE' ||
                          background === 'VIOLET' ||
                          background === 'BLUE' ||
                          background === 'TEAL' ||
                          background === 'SLATE'
                            ? 'text-white'
                            : 'text-foreground',
                        ].join(' ')}
                      />
                    )}

                    <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[9px] font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
                      {backgroundLabels[background]}
                    </span>
                  </button>
                </form>
              )
            })}
          </div>
        </div>

        {message && (
          <div
            className={[
              'rounded-lg border px-3 py-2.5 text-xs font-medium',
              success
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-400'
                : 'border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-400',
            ].join(' ')}
          >
            {message}
          </div>
        )}
      </div>
    </section>
  )
}
