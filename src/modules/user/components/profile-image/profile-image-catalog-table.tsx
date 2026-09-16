// @/modules/user/components/profile-image-catalog-table.tsx

'use client'

import Image from 'next/image'

import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

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
    <div className="overflow-visible">
      <div className="hidden grid-cols-[64px_minmax(0,1fr)_48px] items-center gap-5 px-4 pb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted sm:grid">
        <span>Imagen</span>
        <span>Nombre</span>
        <span />
      </div>

      <div className="space-y-2">
        {profileImages.map((profileImage) => (
          <ProfileImageCatalogRow
            key={profileImage.profileImageId}
            profileImage={profileImage}
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
  onEdit,
  onDelete,
}: {
  profileImage: ProfileImage
  onEdit: (profileImage: ProfileImage) => void
  onDelete: (profileImage: ProfileImage) => void
}) {
  return (
    <div
      className={[
        'group grid gap-4 rounded-2xl border border-border bg-background p-3',
        'transition-all duration-200',
        'hover:border-primary/20 hover:shadow-sm',
        'sm:grid-cols-[64px_minmax(0,1fr)_48px] sm:items-center sm:gap-5',
        'sm:px-4',
      ].join(' ')}
    >
      <div className="flex items-center gap-3 sm:block">
        <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-border bg-surface">
          <Image
            src={profileImage.imageUrl}
            alt={profileImage.name}
            fill
            unoptimized
            sizes="56px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="min-w-0 sm:hidden">
          <p className="truncate text-sm font-semibold text-foreground">
            {profileImage.name}
          </p>

          <p className="mt-1 text-xs text-text-muted">Imagen de perfil</p>
        </div>
      </div>

      <div className="hidden min-w-0 sm:block">
        <p className="truncate text-sm font-semibold text-foreground">
          {profileImage.name}
        </p>

        <p className="mt-1 text-xs text-text-muted">Imagen de perfil</p>
      </div>

      <div className="absolute right-6 sm:static sm:flex sm:justify-end">
        <ProfileImageCatalogMenu
          profileImage={profileImage}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
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
      <summary
        className={[
          'flex h-9 w-9 cursor-pointer list-none items-center justify-center',
          'rounded-xl border border-transparent text-text-muted',
          'transition-all duration-200',
          'hover:border-primary/20 hover:bg-surface hover:text-foreground',
          '[&::-webkit-details-marker]:hidden',
        ].join(' ')}
      >
        <MoreHorizontal className="h-4 w-4" />
      </summary>

      <div
        className={[
          'absolute right-0 top-11 z-30 w-48 overflow-hidden',
          'rounded-2xl border border-border bg-background p-1.5',
          'text-foreground shadow-xl shadow-foreground/10',
        ].join(' ')}
      >
        <button
          type="button"
          onClick={() => onEdit(profileImage)}
          className={[
            'flex w-full cursor-pointer items-center gap-2.5 rounded-xl',
            'px-3 py-2.5 text-left text-sm text-text-muted',
            'transition-colors',
            'hover:bg-surface hover:text-foreground',
          ].join(' ')}
        >
          <Pencil className="h-4 w-4" />
          Editar nombre
        </button>

        <button
          type="button"
          onClick={() => onDelete(profileImage)}
          className={[
            'flex w-full cursor-pointer items-center gap-2.5 rounded-xl',
            'px-3 py-2.5 text-left text-sm',
            'text-primary transition-colors',
            'hover:bg-primary-soft',
          ].join(' ')}
        >
          <Trash2 className="h-4 w-4" />
          Eliminar
        </button>
      </div>
    </details>
  )
}
