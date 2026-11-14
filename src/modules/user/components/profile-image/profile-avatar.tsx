// @/modules/user/components/profile-image/profile-avatar.tsx

'use client'

import Image from 'next/image'
import { useState } from 'react'

import type { ProfileImage } from '@/modules/user/schemas/profile-image.schema'
import type { UserSettings } from '@/modules/user/schemas/user-settings.schema'

import { PROFILE_IMAGE_BACKGROUND_CLASSES } from '@/modules/user/constants/profile-image.constants'

type ProfileAvatarProps = {
  profileImage: ProfileImage | null
  background: UserSettings['profileImageBackground']
  size: 'sm' | 'md' | 'lg' | 'fill'
  shape?: 'circle' | 'rounded'
  fallback?: string
}

const sizeClasses = {
  sm: 'h-14 w-14',
  md: 'h-20 w-20',
  lg: 'h-28 w-28',
  fill: 'h-full w-full',
} as const

const imageSizes = {
  sm: '56px',
  md: '80px',
  lg: '112px',
  fill: '(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw',
} as const

const shapeClasses = {
  circle: 'rounded-full',
  rounded: 'rounded-2xl',
} as const

export function ProfileAvatar({
  profileImage,
  background,
  size,
  shape = 'circle',
  fallback,
}: ProfileAvatarProps) {
  const backgroundClass = PROFILE_IMAGE_BACKGROUND_CLASSES[background]
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = profileImage !== null && !imageFailed

  return (
    <div
      className={[
        'relative shrink-0 overflow-hidden',
        sizeClasses[size],
        shapeClasses[shape],
        showImage ? backgroundClass : 'border border-border bg-surface',
      ].join(' ')}
    >
      {showImage && profileImage ? (
        <Image
          src={profileImage.imagePath}
          alt={profileImage.name}
          fill
          unoptimized
          sizes={imageSizes[size]}
          className="object-contain"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-text-muted">
          {fallback ?? '?'}
        </span>
      )}
    </div>
  )
}
