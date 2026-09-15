// @/modules/user/components/profile-image-catalog-delete-modal.tsx

'use client'

import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { ImageOff, LoaderCircle } from 'lucide-react'

import type { ActionState } from '@/core/utils/action-state'
import { deleteProfileImageAction } from '@/modules/user/actions/profile-image.actions'
import type { ProfileImage } from '@/modules/user/schemas/profile-image.schema'

type ProfileImageCatalogDeleteModalProps = {
  profileImage: ProfileImage
  onClose: () => void
}

const initialState: ActionState<null> = {
  success: false,
  message: null,
  data: null,
}

export function ProfileImageCatalogDeleteModal({
  profileImage,
  onClose,
}: ProfileImageCatalogDeleteModalProps) {
  const [state, action] = useActionState(deleteProfileImageAction, initialState)

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

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-background p-6 text-center text-foreground shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary bg-primary-soft/30 text-primary">
          <ImageOff className="h-5 w-5" />
        </div>

        <h2 className="mt-5 text-lg font-semibold text-foreground">
          Eliminar imagen
        </h2>

        <p className="mt-2 text-sm leading-6 text-text-muted">
          Se eliminará{' '}
          <span className="font-medium text-foreground">
            {profileImage.name}
          </span>{' '}
          del catálogo.
        </p>

        <form action={action} className="mt-6">
          <input
            type="hidden"
            name="profileImageId"
            value={profileImage.profileImageId}
          />

          {!state.success && state.message && (
            <p className="mb-4 rounded-xl border border-primary bg-primary-soft px-4 py-3 text-left text-sm text-primary border-primary/60 bg-primary-soft/30 text-primary">
              {state.message}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className={[
                'flex-1 cursor-pointer rounded-xl border border-border',
                'bg-background px-4 py-2.5 text-sm text-text-muted',
                'transition-colors',
                'hover:bg-surface hover:text-foreground',
              ].join(' ')}
            >
              Cancelar
            </button>

            <DeleteButton />
          </div>
        </form>
      </div>
    </div>
  )
}

function DeleteButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={[
        'flex flex-1 cursor-pointer items-center justify-center gap-2',
        'rounded-xl bg-primary px-4 py-2.5',
        'text-sm font-medium text-primary-foreground',
        'transition-colors hover:bg-primary-hover',
        'disabled:cursor-not-allowed disabled:opacity-60',
      ].join(' ')}
    >
      {pending && <LoaderCircle className="h-4 w-4 animate-spin" />}
      {pending ? 'Eliminando...' : 'Eliminar'}
    </button>
  )
}
