// @/modules/main/notlogged/components/notlogged-main.tsx

import { NotLoggedHeader } from './notlogged-header';
import { NotLoggedHero } from './notlogged-hero';

export function NotLoggedMain() {
  return (
    <main className="relative h-screen overflow-hidden bg-neutral-950 text-white">
      {/* ===================
      BACKGROUND
      =================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-52 h-[36rem] w-[36rem] rounded-full bg-violet-600/20 blur-[140px]" />

        <div className="absolute right-[-12rem] top-[12%] h-[34rem] w-[34rem] rounded-full bg-cyan-500/15 blur-[140px]" />

        <div className="absolute bottom-[-16rem] left-[35%] h-[34rem] w-[34rem] rounded-full bg-fuchsia-600/10 blur-[150px]" />
      </div>

      {/* ===================
      GRID
      =================== */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
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