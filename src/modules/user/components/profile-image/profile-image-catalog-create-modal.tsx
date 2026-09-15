// @/modules/user/components/profile-image-catalog-create-modal.tsx

'use client'

import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { ImagePlus, LoaderCircle, Upload, X } from 'lucide-react'
import Image from 'next/image'

import type { ActionState } from '@/core/utils/action-state'
import { createProfileImageAction } from '@/modules/user/actions/profile-image.actions'
import {
  PROFILE_IMAGE_ALLOWED_EXTENSIONS,
  PROFILE_IMAGE_MAX_SIZE,
} from '@/modules/user/constants/profile-image.constants'
import type { ProfileImage } from '@/modules/user/schemas/profile-image.schema'

type ProfileImageCatalogCreateModalProps = {
  onClose: () => void
}

const initialState: ActionState<ProfileImage> = {
  success: false,
  message: null,
  data: null,
}

export function ProfileImageCatalogCreateModal({
  onClose,
}: ProfileImageCatalogCreateModalProps) {
  const [state, action] = useActionState(createProfileImageAction, initialState)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)

  useEffect(() => {
    if (state.success) {
      onClose()
    }
  }, [state.success, onClose])

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    setFileError(null)

    if (!file) {
      setPreview(null)
      return
    }

    if (file.size > PROFILE_IMAGE_MAX_SIZE) {
      setPreview(null)
      setFileError('La imagen no puede superar los 5 MB')
      event.target.value = ''
      return
    }

    setPreview(URL.createObjectURL(file))
  }

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
              Nueva imagen de perfil
            </h2>

            <p className="mt-1 text-sm text-text-muted">
              Agrega una imagen al catálogo global.
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
                placeholder="Ej. Gato negro"
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
              <label
                htmlFor="profileImageFile"
                className="mb-2 block text-xs font-medium text-text-muted"
              >
                Imagen
              </label>

              <label
                htmlFor="profileImageFile"
                className={[
                  'flex cursor-pointer flex-col items-center justify-center',
                  'rounded-2xl border border-dashed border-border bg-surface',
                  'px-6 py-8 text-center transition-all duration-200',
                  'hover:border-primary/30 hover:bg-primary-soft',
                ].join(' ')}
              >
                {preview ? (
                  <div className="overflow-hidden rounded-2xl border border-border bg-background">
                    <Image
                      src={preview}
                      alt="Vista previa"
                      width={160}
                      height={160}
                      unoptimized
                      className="h-40 w-40 object-cover"
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background text-text-muted shadow-sm">
                      <Upload className="h-5 w-5" />
                    </div>

                    <p className="mt-4 text-sm font-medium text-foreground">
                      Selecciona una imagen
                    </p>
                  </>
                )}

                <p className="mt-2 text-xs text-text-muted">
                  PNG, JPG, JPEG o WebP · Máximo 5 MB
                </p>

                <input
                  id="profileImageFile"
                  name="file"
                  type="file"
                  accept={PROFILE_IMAGE_ALLOWED_EXTENSIONS.join(',')}
                  required
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>

              {fileError && (
                <p className="mt-2 text-xs text-primary text-primary">
                  {fileError}
                </p>
              )}
            </div>

            {!state.success && state.message && (
              <div className="rounded-xl border border-primary bg-primary-soft px-4 py-3 text-sm text-primary border-primary/60 bg-primary-soft/30 text-primary">
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

            <SubmitButton disabled={fileError !== null} />
          </div>
        </form>
      </div>
    </div>
  )
}

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending || disabled}
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
        <ImagePlus className="h-4 w-4" />
      )}

      {pending ? 'Subiendo...' : 'Agregar imagen'}
    </button>
  )
}
