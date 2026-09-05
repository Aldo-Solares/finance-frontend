// @/modules/user/components/profile-image-catalog-edit-modal.tsx

'use client'

import Image from 'next/image'
import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { LoaderCircle, Pencil, X } from 'lucide-react'

import type { ActionState } from '@/core/utils/action-state'
import { updateProfileImageAction } from '@/modules/user/actions/profile-image.actions'
import type { ProfileImage } from '@/modules/user/schemas/profile-image.schema'

type ProfileImageCatalogEditModalProps = {
  profileImage: ProfileImage
  onClose: () => void
}

const initialState: ActionState<ProfileImage> = {
  success: false,
  message: null,
  data: null,
}

export function ProfileImageCatalogEditModal({
  profileImage,
  onClose,
}: ProfileImageCatalogEditModalProps) {
  const [state, action] = useActionState(updateProfileImageAction, initialState)

  useEffect(() => {
    if (state.success) {
      onClose()
    }
  }, [state.success, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/55 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-neutral-100 px-6 py-5">
          <div>
            <h2 className="font-semibold text-neutral-950">
              Editar imagen de perfil
            </h2>

            <p className="mt-1 text-sm text-neutral-400">
              Actualiza el nombre de la imagen del catálogo.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-neutral-400 hover:bg-neutral-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form action={action}>
          <div className="space-y-5 p-6">
            <input
              type="hidden"
              name="profileImageId"
              value={profileImage.profileImageId}
            />

            <div>
              <label
                htmlFor="profileImageName"
                className="mb-2 block text-xs font-medium text-neutral-500"
              >
                Nombre
              </label>

              <input
                id="profileImageName"
                name="name"
                type="text"
                required
                maxLength={100}
                defaultValue={profileImage.name}
                className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-950 outline-none placeholder:text-neutral-300 focus:border-neutral-400"
              />
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-neutral-500">
                Imagen
              </p>

              <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                <Image
                  src={profileImage.imageUrl}
                  alt={profileImage.name}
                  width={80}
                  height={80}
                  unoptimized
                  className="h-20 w-20 rounded-2xl object-cover"
                />

                <div>
                  <p className="text-sm font-medium text-neutral-700">
                    Imagen actual
                  </p>

                  <p className="mt-1 text-xs leading-5 text-neutral-400">
                    La imagen no se modifica al editar el nombre.
                  </p>
                </div>
              </div>
            </div>

            {!state.success && state.message && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {state.message}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-neutral-100 bg-neutral-50/60 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl px-4 py-2.5 text-sm text-neutral-500 hover:bg-neutral-200"
            >
              Cancelar
            </button>

            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex min-w-36 cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <Pencil className="h-4 w-4" />
      )}

      {pending ? 'Guardando...' : 'Guardar cambios'}
    </button>
  )
}
