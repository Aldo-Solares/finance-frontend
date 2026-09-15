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
        className="absolute inset-0 bg-foreground/55 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background text-foreground shadow-2xl">
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div>
            <h2 className="font-semibold text-foreground">
              Editar imagen de perfil
            </h2>

            <p className="mt-1 text-sm text-text-muted">
              Actualiza el nombre de la imagen del catálogo.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={[
              'flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl',
              'text-text-muted transition-colors',
              'hover:bg-surface hover:text-foreground',
            ].join(' ')}
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
                className="mb-2 block text-xs font-medium text-text-muted"
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
                className={[
                  'h-11 w-full rounded-xl border border-border bg-surface px-4',
                  'text-sm text-foreground outline-none',
                  'placeholder:text-text-muted',
                  'transition-all duration-200',
                  'focus:border-primary focus:bg-background',
                  'focus:ring-4 focus:ring-primary/[0.08]',
                ].join(' ')}
              />
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-text-muted">Imagen</p>

              <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4">
                <Image
                  src={profileImage.imageUrl}
                  alt={profileImage.name}
                  width={80}
                  height={80}
                  unoptimized
                  className="h-20 w-20 rounded-2xl object-cover"
                />

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Imagen actual
                  </p>

                  <p className="mt-1 text-xs leading-5 text-text-muted">
                    La imagen no se modifica al editar el nombre.
                  </p>
                </div>
              </div>
            </div>

            {!state.success && state.message && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-400">
                {state.message}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-border bg-surface/50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className={[
                'cursor-pointer rounded-xl px-4 py-2.5 text-sm',
                'text-text-muted transition-colors',
                'hover:bg-background hover:text-foreground',
              ].join(' ')}
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
      className={[
        'inline-flex min-w-36 cursor-pointer items-center justify-center gap-2',
        'rounded-xl bg-primary px-4 py-2.5',
        'text-sm font-semibold text-primary-foreground',
        'shadow-sm transition-all duration-200',
        'hover:bg-primary-hover hover:shadow-md',
        'disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none',
      ].join(' ')}
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
