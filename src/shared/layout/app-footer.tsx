// @/shared/layout/app-footer.tsx

import { PawPrint } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className="shrink-0">
      <div className="flex w-full flex-col gap-3 border-t border-neutral-200/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
        {/* ===================
        BRAND
        =================== */}

        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-neutral-950 text-white">
            <PawPrint className="h-3 w-3" />
          </div>

          <p className="text-xs font-medium text-neutral-500">
            Isha
          </p>

          <span className="text-neutral-300">
            ·
          </span>

          <p className="text-xs text-neutral-400">
            Tus finanzas, más claras.
          </p>
        </div>

        {/* ===================
        META
        =================== */}

        <p className="text-[11px] text-neutral-400">
          © {new Date().getFullYear()} Isha Finance
        </p>
      </div>
    </footer>
  );
}