// @/shared/components/record-actions.component.tsx
'use client'

import { FileText, Pencil, Trash2 } from 'lucide-react'

type RecordActionsComponentProps = {
  onNotes?: () => void
  notesDisabled?: boolean
  onEdit?: () => void
  onDelete?: () => void
  notesLabel?: string
  editLabel?: string
  deleteLabel?: string
  className?: string
}

export function RecordActionsComponent({
  onNotes,
  notesDisabled = true,
  onEdit,
  onDelete,
  notesLabel = 'Ver notas',
  editLabel = 'Editar',
  deleteLabel = 'Eliminar',
  className = '',
}: RecordActionsComponentProps) {
  return (
    <div className={`flex shrink-0 items-center gap-0.5 ${className}`}>
      <button
        type="button"
        onClick={onNotes}
        disabled={notesDisabled}
        aria-label={notesDisabled ? 'No hay notas' : notesLabel}
        title={notesDisabled ? 'Sin notas' : notesLabel}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-primary transition hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent"
      >
        <FileText className="h-4 w-4" />
      </button>
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          aria-label={editLabel}
          title={editLabel}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-text-muted transition hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <Pencil className="h-4 w-4" />
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          aria-label={deleteLabel}
          title={deleteLabel}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-text-muted transition hover:bg-primary-soft hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
