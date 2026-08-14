// @/modules/main/notlogged/components/notlogged-main.tsx


import { NotLoggedHeader } from './notlogged-header';
import { NotLoggedHero } from './notlogged-hero';

export function NotLoggedMain() {
    return (
        <main className="min-h-screen bg-zinc-50 text-zinc-950">
            <NotLoggedHeader />
            <NotLoggedHero />
        </main>
    );
}