// @/shared/modal/delete-modal.tsx

'use client'

import { Trash2, X } from 'lucide-react'
import { useState } from 'react'

type DeleteModalProps = {
  title: string
  description?: string
  error?: string | null
  confirmLabel?: string
  pendingLabel?: string
  onClose: () => void
  onConfirm: () => Promise<void>
}

export function DeleteModal({
  title,
  description,
  error,
  confirmLabel = 'Eliminar',
  pendingLabel = 'Eliminando...',
  onClose,
  onConfirm,
}: DeleteModalProps) {
  const [pending, setPending] = useState(false)

  const handleConfirm = async () => {
    setPending(true)

    try {
      await onConfirm()
      onClose()
    } catch {
      // El error se mantiene controlado por el componente consumidor.
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        disabled={pending}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] border border-border bg-background shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Trash2 className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                {title}
              </h2>

              {description && (
                <p className="mt-1 text-sm leading-5 text-text-muted">
                  {description}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            disabled={pending}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-surface hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="px-6 pt-5">
            <div
              role="alert"
              className="rounded-xl border border-primary/20 bg-primary-soft px-4 py-3 text-sm text-primary"
            >
              {error}
            </div>
          </div>
        )}

        <div className="flex flex-col-reverse gap-2 border-t border-border bg-surface/60 px-6 py-4 sm:flex-row sm:justify-end sm:gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="h-11 cursor-pointer rounded-xl px-4 text-sm font-medium text-text-muted transition-colors hover:bg-surface hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={pending}
            className="h-11 cursor-pointer rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? pendingLabel : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
