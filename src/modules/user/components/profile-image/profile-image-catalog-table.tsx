// @/modules/user/components/profile-image-catalog-table.tsx

'use client'

import Image from 'next/image'
import { Check, MoreHorizontal, Pencil, Power } from 'lucide-react'
import { useActionState } from 'react'

import type { ActionState } from '@/core/utils/action-state'
import { updateProfileImageStatusAction } from '@/modules/user/actions/profile-image.actions'
import type { ProfileImage } from '@/modules/user/schemas/profile-image.schema'

type ProfileImageCatalogTableProps = {
  profileImages: ProfileImage[]
  onEdit: (profileImage: ProfileImage) => void
  onDelete: (profileImage: ProfileImage) => void
}

export function ProfileImageCatalogTable({
  profileImages,
  onEdit,
  onDelete,
}: ProfileImageCatalogTableProps) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white">
      <div className="hidden grid-cols-[80px_1fr_120px_56px] gap-4 border-b border-neutral-100 bg-neutral-50/70 px-6 py-3 text-xs font-medium text-neutral-400 sm:grid">
        <span>Imagen</span>
        <span>Nombre</span>
        <span>Estado</span>
        <span />
      </div>

      <div>
        {profileImages.map((profileImage, index) => (
          <ProfileImageCatalogRow
            key={profileImage.profileImageId}
            profileImage={profileImage}
            separated={index > 0}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}

function ProfileImageCatalogRow({
  profileImage,
  separated,
  onEdit,
  onDelete,
}: {
  profileImage: ProfileImage
  separated: boolean
  onEdit: (profileImage: ProfileImage) => void
  onDelete: (profileImage: ProfileImage) => void
}) {
  return (
    <div
      className={[
        'grid gap-4 px-5 py-4 transition-colors hover:bg-neutral-50/70 sm:grid-cols-[80px_1fr_120px_56px] sm:items-center sm:px-6',
        separated ? 'border-t border-neutral-100' : '',
      ].join(' ')}
    >
      <div>
        <Image
          src={profileImage.imageUrl}
          alt={profileImage.name}
          width={48}
          height={48}
          unoptimized
          className="h-12 w-12 rounded-xl object-cover"
        />
      </div>

      <div>
        <p className="text-xs text-neutral-400 sm:hidden">Nombre</p>

        <p className="mt-1 text-sm font-medium text-neutral-950 sm:mt-0">
          {profileImage.name}
        </p>
      </div>

      <div>
        <ProfileImageStatusForm profileImage={profileImage} />
      </div>

      <div className="flex justify-end">
        <ProfileImageCatalogMenu
          profileImage={profileImage}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}

function ProfileImageStatusForm({
  profileImage,
}: {
  profileImage: ProfileImage
}) {
  const initialState: ActionState<ProfileImage> = {
    success: false,
    message: null,
    data: null,
  }

  const [, action] = useActionState(
    updateProfileImageStatusAction,
    initialState,
  )

  return (
    <form action={action}>
      <input
        type="hidden"
        name="profileImageId"
        value={profileImage.profileImageId}
      />

      <input
        type="hidden"
        name="active"
        value={profileImage.active ? 'false' : 'true'}
      />

      <button
        type="submit"
        className={[
          'inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors',
          profileImage.active
            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200',
        ].join(' ')}
      >
        {profileImage.active ? (
          <Check className="h-3 w-3" />
        ) : (
          <Power className="h-3 w-3" />
        )}

        {profileImage.active ? 'Activa' : 'Inactiva'}
      </button>
    </form>
  )
}

function ProfileImageCatalogMenu({
  profileImage,
  onEdit,
  onDelete,
}: {
  profileImage: ProfileImage
  onEdit: (profileImage: ProfileImage) => void
  onDelete: (profileImage: ProfileImage) => void
}) {
  return (
    <details className="relative">
      <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-950">
        <MoreHorizontal className="h-4 w-4" />
      </summary>

      <div className="absolute right-0 top-11 z-20 w-44 overflow-hidden rounded-xl border border-neutral-200 bg-white p-1 shadow-xl">
        <button
          type="button"
          onClick={() => onEdit(profileImage)}
          className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100"
        >
          <Pencil className="h-4 w-4" />
          Editar nombre
        </button>

        <button
          type="button"
          onClick={() => onDelete(profileImage)}
          className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
        >
          Eliminar
        </button>
      </div>
    </details>
  )
}
