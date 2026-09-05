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
        className="absolute inset-0 bg-neutral-950/55 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-neutral-100 px-6 py-5">
          <div>
            <h2 className="font-semibold text-neutral-950">
              Nueva imagen de perfil
            </h2>

            <p className="mt-1 text-sm text-neutral-400">
              Agrega una imagen al catálogo global.
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
                placeholder="Ej. Gato negro"
                className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-950 outline-none placeholder:text-neutral-300 focus:border-neutral-400"
              />
            </div>

            <div>
              <label
                htmlFor="profileImageFile"
                className="mb-2 block text-xs font-medium text-neutral-500"
              >
                Imagen
              </label>

              <label
                htmlFor="profileImageFile"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-8 text-center transition-colors hover:border-neutral-400 hover:bg-neutral-100"
              >
                {preview ? (
                  <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
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
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-neutral-500 shadow-sm">
                      <Upload className="h-5 w-5" />
                    </div>

                    <p className="mt-4 text-sm font-medium text-neutral-700">
                      Selecciona una imagen
                    </p>
                  </>
                )}

                <p className="mt-2 text-xs text-neutral-400">
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
                <p className="mt-2 text-xs text-red-600">{fileError}</p>
              )}
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
      className="flex min-w-36 cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
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
