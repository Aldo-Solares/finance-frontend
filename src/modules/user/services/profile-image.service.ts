// @/modules/user/services/profile-image.service.ts

import { z } from 'zod'

import { fetchServer } from '@/core/api/api-server'
import { parseApiResponse } from '@/core/api/api-response'

import {
  ProfileImageSchema,
  type ProfileImage,
  type UpdateProfileImageRequest,
} from '@/modules/user/schemas/profile-image.schema'

// ===================
// PROFILE IMAGES
// ===================

export async function getProfileImages(): Promise<ProfileImage[]> {
  const response = await fetchServer('/profile-images', {
    method: 'GET',
  })

  return parseApiResponse(
    response,
    ProfileImageSchema.array(),
    'No fue posible obtener las imágenes de perfil',
  )
}

// ===================
// ALL PROFILE IMAGES
// ===================

export async function getAllProfileImages(): Promise<ProfileImage[]> {
  const response = await fetchServer('/profile-images/admin', {
    method: 'GET',
  })

  return parseApiResponse(
    response,
    ProfileImageSchema.array(),
    'No fue posible obtener las imágenes de perfil',
  )
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

  return parseApiResponse(
    response,
    ProfileImageSchema,
    'No fue posible crear la imagen de perfil',
  )
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

  return parseApiResponse(
    response,
    ProfileImageSchema,
    'No fue posible actualizar la imagen de perfil',
  )
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

  await parseApiResponse(
    response,
    z.null(),
    'No fue posible eliminar la imagen de perfil',
  )
}
