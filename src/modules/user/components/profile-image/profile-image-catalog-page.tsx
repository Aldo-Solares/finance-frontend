// @/modules/user/components/profile-image-catalog-page.tsx

'use client'

import { useState } from 'react'

import { ImagePlus, Layers3, Plus, Sparkles } from 'lucide-react'

import type { ProfileImage } from '@/modules/user/schemas/profile-image.schema'

import { PageHeader } from '@/shared/page/page-header'

import { ProfileImageCatalogCreateModal } from './profile-image-catalog-create-modal'
import { ProfileImageCatalogDeleteModal } from './profile-image-catalog-delete-modal'
import { ProfileImageCatalogEditModal } from './profile-image-catalog-edit-modal'
import { ProfileImageCatalogTable } from './profile-image-catalog-table'

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

  const activeImages = profileImages.filter(
    (profileImage) => profileImage.active,
  ).length

  const inactiveImages = profileImages.length - activeImages

  return (
    <>
      <section className="w-full space-y-8">
        <PageHeader
          eyebrow="Administración"
          title="Catálogo de imágenes"
          description="Administra las imágenes disponibles para los perfiles de usuario."
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <CatalogMetric
            icon={Layers3}
            label="Total"
            value={profileImages.length}
          />

          <CatalogMetric icon={Sparkles} label="Activas" value={activeImages} />

          <CatalogMetric
            icon={ImagePlus}
            label="Inactivas"
            value={inactiveImages}
          />
        </div>

        <div className="overflow-visible rounded-[2rem] border border-border bg-background">
          <div className="flex flex-col gap-5 border-b border-border px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Imágenes disponibles
              </h2>

              <p className="mt-1 text-sm text-text-muted">
                Gestiona las imágenes que forman parte del catálogo.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCreate}
              className={[
                'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2',
                'rounded-xl bg-primary px-4 py-2.5',
                'text-sm font-semibold text-primary-foreground',
                'transition-all duration-200',
                'hover:bg-primary-hover hover:shadow-md',
              ].join(' ')}
            >
              <Plus className="h-4 w-4" />
              Nueva imagen
            </button>
          </div>

          <div className="p-4 sm:p-6">
            {profileImages.length === 0 ? (
              <ProfileImageCatalogEmptyState onCreate={handleCreate} />
            ) : (
              <ProfileImageCatalogTable
                profileImages={profileImages}
                onEdit={handleEdit}
                onDelete={setDeleteProfileImage}
              />
            )}
          </div>
        </div>
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

type CatalogMetricProps = {
  icon: typeof Layers3
  label: string
  value: number
}

function CatalogMetric({ icon: Icon, label, value }: CatalogMetricProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-background px-5 py-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface text-text-muted">
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
          {label}
        </p>

        <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
          {value}
        </p>
      </div>
    </div>
  )
}

function ProfileImageCatalogEmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/40 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-text-muted shadow-sm">
        <ImagePlus className="h-6 w-6" />
      </div>

      <h2 className="mt-5 text-base font-semibold text-foreground">
        El catálogo está vacío
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-text-muted">
        Crea la primera imagen para comenzar a construir el catálogo de imágenes
        de perfil.
      </p>

      <button
        type="button"
        onClick={onCreate}
        className={[
          'mt-6 inline-flex cursor-pointer items-center gap-2',
          'rounded-xl bg-foreground px-4 py-2.5',
          'text-sm font-semibold text-background',
          'transition-all duration-200',
          'hover:opacity-85',
        ].join(' ')}
      >
        <Plus className="h-4 w-4" />
        Crear imagen
      </button>
    </div>
  )
}
