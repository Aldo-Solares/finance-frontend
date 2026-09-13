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
    <section className="overflow-hidden rounded-[2rem] border border-[#eee7e9] bg-white">
      <div className="border-b border-[#f3edef] px-6 py-6 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
          Personalización
        </p>

        <h2 className="mt-2 text-xl font-semibold text-neutral-950">
          Imagen de perfil
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
          Elige la imagen que quieres utilizar en tu perfil y personaliza su
          apariencia.
        </p>
      </div>

      <div className="space-y-10 p-6 sm:p-8">
        <div>
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-neutral-950">
              Selecciona una imagen
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              Puedes cambiarla cuando quieras.
            </p>
          </div>

          {profileImages.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-200 px-6 py-10 text-center">
              <p className="text-sm font-medium text-neutral-700">
                No hay imágenes disponibles
              </p>

              <p className="mt-1 text-sm text-neutral-500">
                No tienes imágenes de perfil para seleccionar.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {profileImages.map((profileImage) => {
                const isSelected =
                  user.profileImage?.profileImageId ===
                  profileImage.profileImageId

                return (
                  <form
                    key={profileImage.profileImageId}
                    action={imageAction}
                    className="group"
                  >
                    <input
                      type="hidden"
                      name="profileImageId"
                      value={profileImage.profileImageId}
                    />

                    <button
                      type="submit"
                      disabled={isAnyPending}
                      className="relative block w-full overflow-hidden rounded-2xl border border-[#eee7e9] bg-neutral-50 p-3 transition hover:border-neutral-300 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                        <ProfileAvatar
                          profileImage={profileImage}
                          background={selectedBackground}
                          size="fill"
                          shape="rounded"
                        />
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="truncate text-sm font-medium text-neutral-800">
                          {profileImage.name}
                        </span>

                        {isSelected && (
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </div>
                    </button>
                  </form>
                )
              })}

              {user.profileImage && (
                <form action={removeAction} className="group">
                  <button
                    type="submit"
                    disabled={isAnyPending}
                    className="flex aspect-[1/1.16] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 text-neutral-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isRemovePending ? (
                      <LoaderCircle className="h-5 w-5 animate-spin" />
                    ) : (
                      <X className="h-5 w-5" />
                    )}

                    <span className="mt-2 text-sm font-medium">
                      Quitar imagen
                    </span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-[#f3edef] pt-8">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-neutral-950">
              Fondo de la imagen
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              Selecciona el color que aparecerá detrás de tu imagen de perfil.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-9">
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
                    className="group flex w-full flex-col items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span
                      className={[
                        'flex h-11 w-11 items-center justify-center rounded-full border-2 transition',
                        PROFILE_IMAGE_BACKGROUND_CLASSES[background],
                        isSelected
                          ? 'border-neutral-950 ring-2 ring-neutral-950 ring-offset-2'
                          : 'border-transparent group-hover:scale-105',
                      ].join(' ')}
                    >
                      {isSelected && (
                        <Check
                          className={[
                            'h-4 w-4',
                            background === 'BLACK' ||
                            background === 'INDIGO' ||
                            background === 'PURPLE' ||
                            background === 'VIOLET' ||
                            background === 'BLUE' ||
                            background === 'TEAL' ||
                            background === 'SLATE'
                              ? 'text-white'
                              : 'text-neutral-950',
                          ].join(' ')}
                        />
                      )}
                    </span>

                    <span className="text-[11px] font-medium text-neutral-500">
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
              'rounded-xl px-4 py-3 text-sm',
              success
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-red-50 text-red-700',
            ].join(' ')}
          >
            {message}
          </div>
        )}
      </div>
    </section>
  )
}
