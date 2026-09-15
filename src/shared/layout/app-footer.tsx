// @/shared/layout/app-footer.tsx

import { PawPrint } from 'lucide-react'

export function AppFooter() {
  return (
    <footer className="shrink-0">
      <div className="flex w-full flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        {/* ===================
            BRAND
            =================== */}

        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-foreground text-background">
            <PawPrint className="h-3 w-3" />
          </div>

          <p className="text-xs font-medium text-foreground">Isha</p>

          <span className="text-border">·</span>

          <p className="text-xs text-text-muted">Tus finanzas, más claras.</p>
        </div>

        {/* ===================
            META
            =================== */}

        <p className="text-[11px] text-text-muted">
          © {new Date().getFullYear()} Isha Finance
        </p>
      </div>
    </footer>
  )
}
