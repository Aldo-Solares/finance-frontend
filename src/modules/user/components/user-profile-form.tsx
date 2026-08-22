// @/modules/user/components/user-profile-form.tsx

'use client';

import {
  useActionState,
  useEffect,
} from 'react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import {
  Check,
  LoaderCircle,
  Mail,
  UserRound,
} from 'lucide-react';

import type { ActionState } from '@/core/utils/action-state';
import { updateCurrentUserAction } from '@/modules/user/actions/user.actions';
import type {
  UpdateUserResponse,
  User,
} from '@/modules/user/schemas/user.schema';

type UserProfileFormProps = {
  user: User;
};

const initialState: ActionState<UpdateUserResponse> = {
  success: false,
  message: null,
  data: null,
};

export function UserProfileForm({
  user,
}: UserProfileFormProps) {
  const router = useRouter();

  const [state, formAction] = useActionState(
    updateCurrentUserAction,
    initialState,
  );

  useEffect(() => {
    if (!state.success) {
      return;
    }

    router.refresh();
  }, [state.success, router]);

  return (
    <form action={formAction}>
      <div className="space-y-5 p-6">
        {/* ===================
        NAME
        =================== */}

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-xs font-medium text-neutral-500"
          >
            Nombre
          </label>

          <div className="relative">
            <UserRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

            <input
              id="name"
              name="name"
              type="text"
              defaultValue={user.name}
              autoComplete="given-name"
              className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-10 pr-4 text-sm text-neutral-950 outline-none transition-colors focus:border-neutral-400 focus:bg-white"
            />
          </div>
        </div>

        {/* ===================
        LAST NAMES
        =================== */}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="lastName"
              className="mb-2 block text-xs font-medium text-neutral-500"
            >
              Primer apellido
            </label>

            <input
              id="lastName"
              name="lastName"
              type="text"
              defaultValue={user.lastName ?? ''}
              autoComplete="family-name"
              className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-950 outline-none transition-colors focus:border-neutral-400 focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="secondLastName"
              className="mb-2 block text-xs font-medium text-neutral-500"
            >
              Segundo apellido
            </label>

            <input
              id="secondLastName"
              name="secondLastName"
              type="text"
              defaultValue={
                user.secondLastName ?? ''
              }
              className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-950 outline-none transition-colors focus:border-neutral-400 focus:bg-white"
            />
          </div>
        </div>

        {/* ===================
        EMAIL
        =================== */}

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-medium text-neutral-500"
          >
            Correo electrónico
          </label>

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

            <input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email}
              autoComplete="email"
              className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-10 pr-4 text-sm text-neutral-950 outline-none transition-colors focus:border-neutral-400 focus:bg-white"
            />
          </div>

          <p className="mt-2 text-xs leading-5 text-neutral-400">
            Si cambias tu correo electrónico tendrás que
            verificar la nueva dirección.
          </p>
        </div>

        {/* ===================
        RESPONSE
        =================== */}

        {state.message && (
          <div
            className={[
              'flex items-center gap-2 rounded-xl border px-4 py-3 text-sm',
              state.success
                ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                : 'border-red-100 bg-red-50 text-red-600',
            ].join(' ')}
          >
            {state.success && (
              <Check className="h-4 w-4 shrink-0" />
            )}

            {state.message}
          </div>
        )}
      </div>

      {/* ===================
      ACTIONS
      =================== */}

      <div className="flex justify-end border-t border-neutral-100 bg-neutral-50/60 px-6 py-4">
        <ProfileSaveButton />
      </div>
    </form>
  );
}

// ===================
// SAVE
// ===================

function ProfileSaveButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex min-w-40 cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      )}

      {pending
        ? 'Guardando...'
        : 'Guardar cambios'}
    </button>
  );
}