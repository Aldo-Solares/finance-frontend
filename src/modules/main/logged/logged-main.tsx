// @/modules/main/logged/components/logged-main.tsx

import type { User } from '@/modules/user/schemas/user.schema';

import { LoggedHero } from './logged-hero';
import { LoggedNavigation } from './logged-navigation';

type LoggedMainProps = {
  user: User;
};

export function LoggedMain({
  user,
}: LoggedMainProps) {
  return (
    <section className="flex w-full flex-col gap-8">
      <LoggedHero user={user} />

      <LoggedNavigation />
    </section>
  );
}