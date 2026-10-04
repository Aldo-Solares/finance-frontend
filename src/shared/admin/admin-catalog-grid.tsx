import type { ReactNode } from 'react'

type AdminCatalogGridProps = {
  children: ReactNode
}

export function AdminCatalogGrid({ children }: AdminCatalogGridProps) {
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{children}</div>
}
