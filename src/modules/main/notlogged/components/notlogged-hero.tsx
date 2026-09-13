/* @/modules/main/notlogged/components/notlogged-hero.tsx */

import { NotLoggedHeroInfo } from '@/modules/main/notlogged/components/NotLoggedHeroInfo'
import { NotLoggedHeroVisual } from '@/modules/main/notlogged/components/NotLoggedHeroVisual'

export function NotLoggedHero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute right-[5%] top-[5%] h-[36rem] w-[36rem] rounded-full bg-primary-soft/60 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-48 -left-48 h-[32rem] w-[32rem] rounded-full bg-surface blur-3xl" />

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-8 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-12">
        <NotLoggedHeroInfo />
        <NotLoggedHeroVisual />
      </div>
    </section>
  )
}
