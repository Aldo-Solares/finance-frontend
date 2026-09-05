// @/modules/user/services/profile-image.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { createApiResponseSchema } from '@/core/schemas/api-response.schema'

import {
  ProfileImageSchema,
  type ProfileImage,
  type UpdateProfileImageRequest,
  type UpdateProfileImageStatusRequest,
} from '@/modules/user/schemas/profile-image.schema'

// ===================
// PROFILE IMAGES
// ===================

export async function getProfileImages(): Promise<ProfileImage[]> {
  const response = await fetchServer('/profile-images', {
    method: 'GET',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(ProfileImageSchema.array()).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible obtener las imágenes de perfil',
    )
  }

  if (result.data === null) {
    throw new Error('La respuesta de imágenes de perfil no contiene datos')
  }

  return result.data
}

// ===================
// ALL PROFILE IMAGES
// ===================

export async function getAllProfileImages(): Promise<ProfileImage[]> {
  const response = await fetchServer('/profile-images/admin', {
    method: 'GET',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(ProfileImageSchema.array()).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible obtener las imágenes de perfil',
    )
  }

  if (result.data === null) {
    throw new Error('La respuesta de imágenes de perfil no contiene datos')
  }

  return result.data
}

// ===================
// CREATE PROFILE IMAGE
// ===================

export async function createProfileImage(
  name: string,
  file: File,
): Promise<ProfileImage> {
  const formData = new FormData()

  formData.append('name', name)
  formData.append('file', file)

  const response = await fetchServer('/profile-images', {
    method: 'POST',
    body: formData,
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(ProfileImageSchema).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible crear la imagen de perfil',
    )
  }

  if (result.data === null) {
    throw new Error(
      'La respuesta de creación de imagen de perfil no contiene datos',
    )
  }

  return result.data
}

// ===================
// UPDATE PROFILE IMAGE
// ===================

export async function updateProfileImage(
  profileImageId: number,
  request: UpdateProfileImageRequest,
): Promise<ProfileImage> {
  const response = await fetchServer(`/profile-images/${profileImageId}`, {
    method: 'PATCH',
    body: JSON.stringify(request),
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(ProfileImageSchema).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible actualizar la imagen de perfil',
    )
  }

  if (result.data === null) {
    throw new Error('La respuesta de actualización no contiene datos')
  }

  return result.data
}

// ===================
// UPDATE PROFILE IMAGE STATUS
// ===================

export async function updateProfileImageStatus(
  profileImageId: number,
  request: UpdateProfileImageStatusRequest,
): Promise<ProfileImage> {
  const response = await fetchServer(
    `/profile-images/${profileImageId}/active`,
    {
      method: 'PATCH',
      body: JSON.stringify(request),
    },
  )

  const json: unknown = await response.json()

  const result = createApiResponseSchema(ProfileImageSchema).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ??
        'No fue posible actualizar el estado de la imagen de perfil',
    )
  }

  if (result.data === null) {
    throw new Error('La respuesta de actualización no contiene datos')
  }

  return result.data
}

// ===================
// DELETE PROFILE IMAGE
// ===================

export async function deleteProfileImage(
  profileImageId: number,
): Promise<void> {
  const response = await fetchServer(`/profile-images/${profileImageId}`, {
    method: 'DELETE',
  })

  const json: unknown = await response.json()

  const result = createApiResponseSchema(z.null()).parse(json)

  if (!result.success) {
    throw new Error(
      result.message ?? 'No fue posible eliminar la imagen de perfil',
    )
  }
}
