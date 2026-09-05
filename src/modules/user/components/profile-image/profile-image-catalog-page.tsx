// @/modules/user/components/profile-image-catalog-page.tsx

'use client'

import { useState } from 'react'
import { ImagePlus } from 'lucide-react'

import type { ProfileImage } from '@/modules/user/schemas/profile-image.schema'
import { PageHeader } from '@/shared/page/page-header'
import { ProfileImageCatalogCreateModal } from './profile-image-catalog-create-modal'
import { ProfileImageCatalogEditModal } from './profile-image-catalog-edit-modal'
import { ProfileImageCatalogTable } from './profile-image-catalog-table'
import { ProfileImageCatalogDeleteModal } from './profile-image-catalog-delete-modal'

type ProfileImageCatalogPageProps = {
  profileImages: ProfileImage[]
}

export function ProfileImageCatalogPage({
  profileImages,
}: ProfileImageCatalogPageProps) {
  const [formOpen, setFormOpen] = useState(false)
  const [editingProfileImage, setEditingProfileImage] =
    useState<ProfileImage | null>(null)
  const [deleteProfileImage, setDeleteProfileImage] =
    useState<ProfileImage | null>(null)

  const handleCreate = () => {
    setFormOpen(true)
  }

  const handleEdit = (profileImage: ProfileImage) => {
    setEditingProfileImage(profileImage)
  }

  return (
    <>
      <section className="w-full space-y-8">
        <PageHeader
          eyebrow="Administración"
          title="Catálogo de imágenes"
          description="Administra las imágenes disponibles para los perfiles de usuario."
          action={
            <button
              type="button"
              onClick={handleCreate}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              <ImagePlus className="h-4 w-4" />
              Nueva imagen
            </button>
          }
        />

        {profileImages.length === 0 ? (
          <ProfileImageCatalogEmptyState onCreate={handleCreate} />
        ) : (
          <ProfileImageCatalogTable
            profileImages={profileImages}
            onEdit={handleEdit}
            onDelete={setDeleteProfileImage}
          />
        )}
      </section>

      {formOpen && (
        <ProfileImageCatalogCreateModal onClose={() => setFormOpen(false)} />
      )}

      {editingProfileImage && (
        <ProfileImageCatalogEditModal
          profileImage={editingProfileImage}
          onClose={() => setEditingProfileImage(null)}
        />
      )}

      {deleteProfileImage && (
        <ProfileImageCatalogDeleteModal
          profileImage={deleteProfileImage}
          onClose={() => setDeleteProfileImage(null)}
        />
      )}
    </>
  )
}

function ProfileImageCatalogEmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-[2rem] border border-dashed border-neutral-200 bg-white px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
        <ImagePlus className="h-5 w-5" />
      </div>

      <h2 className="mt-5 font-semibold text-neutral-950">
        No hay imágenes en el catálogo
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">
        Agrega imágenes para que los usuarios puedan seleccionarlas como imagen
        de perfil.
      </p>

      <button
        type="button"
        onClick={onCreate}
        className="mt-5 flex cursor-pointer items-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
      >
        <ImagePlus className="h-4 w-4" />
        Nueva imagen
      </button>
    </div>
  )
}
