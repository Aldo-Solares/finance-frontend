// @/modules/user/components/profile-image-selector.tsx

'use client'

import Image from 'next/image'
import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Check, LoaderCircle, X } from 'lucide-react'

import type { ActionState } from '@/core/utils/action-state'
import {
  removeCurrentUserProfileImageAction,
  updateCurrentUserProfileImageAction,
} from '@/modules/user/actions/user.actions'
import type { ProfileImage } from '@/modules/user/schemas/profile-image.schema'
import type { User } from '@/modules/user/schemas/user.schema'

type ProfileImageSelectorProps = {
  user: User
  profileImages: ProfileImage[]
}

const initialState: ActionState<User> = {
  success: false,
  message: null,
  data: null,
}

const removeInitialState: ActionState<null> = {
  success: false,
  message: null,
  data: null,
}

export function ProfileImageSelector({
  user,
  profileImages,
}: ProfileImageSelectorProps) {
  const router = useRouter()

  const [state, action, isPending] = useActionState(
    updateCurrentUserProfileImageAction,
    initialState,
  )

  const [removeState, removeAction, isRemovePending] = useActionState(
    removeCurrentUserProfileImageAction,
    removeInitialState,
  )

  useEffect(() => {
    if (state.success || removeState.success) {
      router.refresh()
    }
  }, [state.success, removeState.success, router])

  const message = state.message ?? removeState.message
  const success = state.success || removeState.success

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white">
      <div className="border-b border-neutral-100 px-6 py-5">
        <h2 className="text-sm font-semibold text-neutral-950">
          Imagen de perfil
        </h2>

        <p className="mt-0.5 text-xs text-neutral-400">
          Selecciona una imagen disponible para tu perfil.
        </p>
      </div>

      <div className="p-6">
        {user.profileImage && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <Image
                src={user.profileImage.imageUrl}
                alt={user.profileImage.name}
                width={56}
                height={56}
                unoptimized
                className="h-14 w-14 shrink-0 rounded-xl object-cover"
              />

              <div className="min-w-0">
                <p className="text-xs text-neutral-400">Imagen actual</p>

                <p className="mt-1 truncate text-sm font-medium text-neutral-700">
                  {user.profileImage.name}
                </p>
              </div>
            </div>

            <form action={removeAction}>
              <button
                type="submit"
                disabled={isRemovePending || isPending}
                className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isRemovePending ? (
                  <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <X className="h-3.5 w-3.5" />
                )}

                {isRemovePending ? 'Quitando...' : 'Quitar imagen'}
              </button>
            </form>
          </div>
        )}

        {profileImages.length === 0 ? (
          <p className="text-sm text-neutral-400">
            No hay imágenes disponibles.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
            {profileImages.map((profileImage) => {
              const selected =
                user.profileImage?.profileImageId ===
                profileImage.profileImageId

              return (
                <form
                  key={profileImage.profileImageId}
                  action={action}
                  className="group"
                >
                  <input
                    type="hidden"
                    name="profileImageId"
                    value={profileImage.profileImageId}
                  />

                  <button
                    type="submit"
                    disabled={selected || isPending || isRemovePending}
                    className={[
                      'relative aspect-square w-full overflow-hidden rounded-2xl border-2 transition-all',
                      selected
                        ? 'border-neutral-950'
                        : 'border-transparent hover:border-neutral-300',
                      isPending && !selected ? 'cursor-wait opacity-70' : '',
                    ].join(' ')}
                  >
                    <Image
                      src={profileImage.imageUrl}
                      alt={profileImage.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {selected && (
                      <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-950 text-white shadow-lg">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}

                    {isPending && !selected && (
                      <span className="absolute inset-0 flex items-center justify-center bg-neutral-950/30">
                        <LoaderCircle className="h-5 w-5 animate-spin text-white" />
                      </span>
                    )}
                  </button>

                  <p className="mt-2 text-center text-xs font-medium text-neutral-600">
                    {profileImage.name}
                  </p>
                </form>
              )
            })}
          </div>
        )}

        {message && (
          <div
            className={[
              'mt-4 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm',
              success
                ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                : 'border-red-100 bg-red-50 text-red-600',
            ].join(' ')}
          >
            {success && <Check className="h-4 w-4 shrink-0" />}

            {message}
          </div>
        )}
      </div>
    </section>
  )
}
