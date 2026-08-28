// @/modules/user/components/settings-page.tsx

import {
  LockKeyhole,
  Settings,
  UserRound,
} from 'lucide-react';

import type { User } from '@/modules/user/schemas/user.schema';
import { PageHeader } from '@/shared/page/page-header';

import { UserAccountCard } from './user-account-card';
import { UserPasswordForm } from './user-password-form';
import { UserProfileForm } from './user-profile-form';

type SettingsPageProps = {
  user: User;
};

export function SettingsPage({
  user,
}: SettingsPageProps) {
  return (
    <section className="w-full space-y-8">
      <PageHeader
        eyebrow="Cuenta"
        title="Configuración"
        description="Administra tu información personal, seguridad y preferencias de cuenta."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        {/* ===================
        MAIN
        =================== */}

        <div className="space-y-6">
          {/* ===================
          PROFILE
          =================== */}

          <section className="overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white">
            <div className="flex items-center gap-3 border-b border-neutral-100 px-6 py-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 text-white">
                <UserRound className="h-4 w-4" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-neutral-950">
                  Información personal
                </h2>

                <p className="mt-0.5 text-xs text-neutral-400">
                  Datos utilizados para identificar tu cuenta.
                </p>
              </div>
            </div>

            <UserProfileForm user={user} />
          </section>

          {/* ===================
          SECURITY
          =================== */}

          <section className="overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white">
            <div className="flex items-center gap-3 border-b border-neutral-100 px-6 py-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
                <LockKeyhole className="h-4 w-4" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-neutral-950">
                  Seguridad
                </h2>

                <p className="mt-0.5 text-xs text-neutral-400">
                  Mantén segura tu cuenta y tus credenciales.
                </p>
              </div>
            </div>

            <UserPasswordForm />
          </section>
        </div>

        {/* ===================
        ACCOUNT
        =================== */}

        <aside className="space-y-6">
          <div className="flex items-center gap-2 px-1">
            <Settings className="h-4 w-4 text-neutral-400" />

            <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
              Cuenta
            </p>
          </div>

          <UserAccountCard user={user} />
        </aside>
      </div>
    </section>
  );
}