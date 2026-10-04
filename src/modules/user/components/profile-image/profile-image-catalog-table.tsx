import type { ProfileImage } from '@/modules/user/schemas/profile-image.schema'
import { AdminCatalogGrid } from '@/shared/admin/admin-catalog-grid'
import { AdminCatalogItem } from '@/shared/admin/admin-catalog-item'

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
    <AdminCatalogGrid>
      {profileImages.map((profileImage) => (
        <AdminCatalogItem
          key={profileImage.profileImageId}
          title={profileImage.name}
          subtitle="Imagen de perfil"
          image={{ src: profileImage.imageUrl, alt: profileImage.name }}
          editLabel={`Editar ${profileImage.name}`}
          deleteLabel={`Eliminar ${profileImage.name}`}
          onEdit={() => onEdit(profileImage)}
          onDelete={() => onDelete(profileImage)}
        />
      ))}
    </AdminCatalogGrid>
  )
}
