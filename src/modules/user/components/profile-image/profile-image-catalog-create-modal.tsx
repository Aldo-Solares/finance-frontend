// @/modules/user/components/profile-image/profile-image-catalog-create-modal.tsx
'use client'

import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { ImagePlus, LoaderCircle, X } from 'lucide-react'

import type { ActionState } from '@/core/utils/action-state'
import { createProfileImageAction } from '@/modules/user/actions/profile-image.actions'
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

  useEffect(() => {
    if (state.success) onClose()
  }, [state.success, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute inset-0 bg-foreground/55 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background text-foreground shadow-2xl">
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div>
            <h2 className="font-semibold text-foreground">Agregar imagen de perfil</h2>
            <p className="mt-1 text-sm text-text-muted">
              Registra un PNG que ya esté en el proyecto.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form noValidate action={action}>
          <div className="space-y-5 p-6">
            <Field label="Nombre visible" id="profileImageName" name="name" placeholder="Nombre del avatar" />
            <Field label="Nombre del archivo PNG" id="profileImageFileName" name="fileName" placeholder="avatar-azul.png" />
            <p className="-mt-3 text-xs leading-5 text-text-muted">
              Primero coloca el archivo en{' '}
              <code className="rounded bg-surface px-1.5 py-0.5">frontend/public/images/profile-images/</code>.
              Aquí registra solo su nombre, incluyendo <code>.png</code>.
            </p>

            {!state.success && state.message && (
              <div role="alert" className="rounded-xl border border-primary/20 bg-primary-soft px-4 py-3 text-sm text-primary">
                {state.message}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-border bg-surface/50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl px-4 py-2.5 text-sm text-text-muted transition-colors hover:bg-background hover:text-foreground"
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

function Field({
  label,
  id,
  name,
  placeholder,
}: {
  label: string
  id: string
  name: string
  placeholder: string
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-medium text-text-muted">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        required
        maxLength={name === 'name' ? 100 : 255}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none placeholder:text-text-muted focus:border-primary"
      />
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-w-36 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
      {pending ? 'Guardando...' : 'Registrar imagen'}
    </button>
  )
}
