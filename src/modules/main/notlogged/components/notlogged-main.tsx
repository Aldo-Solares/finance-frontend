// @/modules/main/notlogged/components/notlogged-main.tsx

import { NotLoggedHeader } from './notlogged-header';
import { NotLoggedHero } from './notlogged-hero';

export function NotLoggedMain() {
  return (
    <main className="relative flex h-screen flex-col overflow-hidden bg-neutral-50 text-neutral-950">
      {/* ===================
      BACKGROUND
      =================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-300/10 blur-[120px]" />

        <div className="absolute -right-32 top-24 h-96 w-96 rounded-full bg-cyan-300/10 blur-[130px]" />
      </div>

      {/* ===================
      CONTENT
      =================== */}

      <div className="relative z-10 flex h-full flex-col">
        <NotLoggedHeader />
        <NotLoggedHero />
      </div>
    </main>
  );
}