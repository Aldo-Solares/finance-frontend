'use client'

import { ImagePlus, Layers3 } from 'lucide-react'

import { deleteProfileImageAction } from '@/modules/user/actions/profile-image.actions'
import type { ProfileImage } from '@/modules/user/schemas/profile-image.schema'
import { AdminCatalogPage } from '@/shared/admin/admin-catalog-page'

import { ProfileImageCatalogCreateModal } from './profile-image-catalog-create-modal'
import { ProfileImageCatalogEditModal } from './profile-image-catalog-edit-modal'
import { ProfileImageCatalogTable } from './profile-image-catalog-table'

type ProfileImageCatalogPageProps = {
  profileImages: ProfileImage[]
}

export function ProfileImageCatalogPage({
  profileImages,
}: ProfileImageCatalogPageProps) {
  return (
    <AdminCatalogPage
      title="Catálogo de imágenes"
      description="Administra las imágenes disponibles para los perfiles de usuario."
      createLabel="Nueva imagen"
      items={profileImages}
      metrics={[{ icon: Layers3, label: 'Total', value: profileImages.length }]}
      emptyIcon={ImagePlus}
      emptyTitle="El catálogo está vacío"
      emptyDescription="Crea la primera imagen para comenzar a construir el catálogo de imágenes de perfil."
      deleteTitle="Eliminar imagen"
      getDeleteDescription={() =>
        '¿Seguro que deseas eliminar esta imagen del catálogo?'
      }
      onDelete={async (profileImage) => {
        await deleteProfileImageAction(profileImage.profileImageId)
      }}
      renderItems={({ onEdit, onDelete }) => (
        <ProfileImageCatalogTable
          profileImages={profileImages}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      renderCreateDialog={(onClose) => (
        <ProfileImageCatalogCreateModal onClose={onClose} />
      )}
      renderEditDialog={(profileImage, onClose) => (
        <ProfileImageCatalogEditModal
          key={profileImage.profileImageId}
          profileImage={profileImage}
          onClose={onClose}
        />
      )}
    />
  )
}
