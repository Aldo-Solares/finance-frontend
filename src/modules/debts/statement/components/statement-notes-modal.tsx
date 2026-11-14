// @/modules/debts/statement/components/statement-notes-modal.tsx
'use client'

import { FileText, LoaderCircle, Save, X } from 'lucide-react'
import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'

import type { ActionState } from '@/core/utils/action-state'
import { updateStatementNotesAction } from '@/modules/debts/statement/actions/statement.actions'
import type { Statement } from '@/modules/debts/statement/schemas/statement.schema'

const initialState: ActionState<Statement> = {
  success: false,
  message: null,
  data: null,
}

export function StatementNotesModal({
  statement,
  subtitle,
  onClose,
}: {
  statement: Statement
  subtitle: string
  onClose: () => void
}) {
  const [state, action] = useActionState(updateStatementNotesAction, initialState)

  useEffect(() => {
    if (state.success) onClose()
  }, [state.success, onClose])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/45 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <section role="dialog" aria-modal="true" aria-labelledby={`statement-notes-title-${statement.statementId}`} onMouseDown={(event) => event.stopPropagation()} className="w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-background shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary"><FileText className="h-4 w-4" /></span>
            <div className="min-w-0">
              <h2 id={`statement-notes-title-${statement.statementId}`} className="text-base font-semibold text-foreground">Notas del estado de cuenta</h2>
              <p className="mt-1 truncate text-xs text-text-muted">{subtitle}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar notas" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-muted transition hover:bg-surface hover:text-foreground"><X className="h-4 w-4" /></button>
        </header>
        <form action={action}>
          <input type="hidden" name="statementId" value={statement.statementId} />
          <div className="space-y-3 px-6 py-5">
            <label htmlFor={`statement-notes-${statement.statementId}`} className="block text-xs font-medium text-text-muted">Nota</label>
            <textarea id={`statement-notes-${statement.statementId}`} name="notes" defaultValue={statement.notes ?? ''} placeholder="Escribe una nota..." rows={5} className="w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-6 text-foreground outline-none transition placeholder:text-text-muted focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/[0.08]" />
            {state.message && !state.success && <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-600">{state.message}</p>}
          </div>
          <footer className="flex justify-end gap-2 border-t border-border bg-surface/50 px-6 py-4">
            <button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-sm font-medium text-text-muted transition hover:bg-surface hover:text-foreground">Cancelar</button>
            <SaveButton />
          </footer>
        </form>
      </section>
    </div>
  )
}

function SaveButton() {
  const { pending } = useFormStatus()
  return <button type="submit" disabled={pending} className="inline-flex min-w-32 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60">{pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{pending ? 'Guardando…' : 'Guardar nota'}</button>
}
