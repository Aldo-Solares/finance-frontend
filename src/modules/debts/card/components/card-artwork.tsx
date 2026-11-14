// @/modules/debts/card/components/card-artwork.tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'

type CardArtworkProps = {
  bank: string
  cardName: string
  imagePath?: string | null
  className?: string
}

export function CardArtwork({
  bank,
  cardName,
  imagePath,
  className = '',
}: CardArtworkProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const network = getNetwork(cardName)

  return (
    <div
      role="img"
      aria-label={`Imagen de ${bank} ${cardName}`}
      className={`relative aspect-[1.58] w-24 shrink-0 overflow-hidden rounded-lg border border-black/10 shadow-sm sm:w-[6.5rem] ${className}`}
    >
      {imagePath && !imageFailed ? (
        <Image
          src={imagePath}
          alt=""
          fill
          sizes="104px"
          unoptimized
          onError={() => setImageFailed(true)}
          className="object-cover"
        />
      ) : (
        <FallbackArtwork bank={bank} network={network} />
      )}
    </div>
  )
}

function FallbackArtwork({ bank, network }: { bank: string; network: string }) {
  const bankName = bank.toLowerCase()
  const palette = bankName.includes('nu')
    ? 'from-[#44217d] to-[#a94ad0]'
    : bankName.includes('hsbc')
      ? 'from-[#f4f1f0] to-[#c9c4c1] text-[#302c2d]'
      : bankName.includes('banamex') || bankName.includes('citibanamex')
        ? 'from-[#123d7a] to-[#267cb3]'
        : 'from-[#29232b] to-[#b86f89]'

  return (
    <div className={`relative flex h-full w-full flex-col justify-between bg-gradient-to-br ${palette} p-2 text-white`}>
      <span className="max-w-full truncate text-[7px] font-semibold uppercase tracking-[0.12em] opacity-90">
        {bank}
      </span>
      <div className="flex items-end justify-between">
        <span className="h-3 w-4 rounded-[3px] border border-current/30 bg-white/25" />
        <span className="text-[8px] font-bold italic tracking-wide">
          {network}
        </span>
      </div>
      <span className="pointer-events-none absolute -right-3 -top-4 h-12 w-12 rounded-full border border-white/20" />
    </div>
  )
}

function getNetwork(cardName: string) {
  const name = cardName.toLowerCase()
  if (name.includes('mastercard')) return 'Mastercard'
  if (name.includes('visa')) return 'Visa'
  if (name.includes('amex') || name.includes('american express')) return 'Amex'
  return 'CARD'
}
