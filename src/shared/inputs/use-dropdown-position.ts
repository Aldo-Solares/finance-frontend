'use client'

import { useLayoutEffect, useState, type RefObject } from 'react'

type DropdownPosition = {
  left: number
  width: number
  top?: number
  bottom?: number
  maxHeight: number
}

export function useDropdownPosition(
  open: boolean,
  triggerRef: RefObject<HTMLElement | null>,
  estimatedHeight: number,
) {
  const [position, setPosition] = useState<DropdownPosition | null>(null)

  useLayoutEffect(() => {
    if (!open) {
      return
    }

    const updatePosition = () => {
      const trigger = triggerRef.current
      if (!trigger) return

      const rect = trigger.getBoundingClientRect()
      const viewportWidth = document.documentElement.clientWidth || window.innerWidth
      const viewportHeight = window.innerHeight
      const edge = 8
      const gap = 8
      const spaceBelow = Math.max(0, viewportHeight - rect.bottom - gap - edge)
      const spaceAbove = Math.max(0, rect.top - gap - edge)
      const placeBelow =
        spaceBelow >= Math.min(estimatedHeight, 180) || spaceBelow >= spaceAbove
      const availableHeight = placeBelow ? spaceBelow : spaceAbove
      const width = Math.min(rect.width, viewportWidth - edge * 2)
      const left = Math.min(
        Math.max(edge, rect.left),
        viewportWidth - width - edge,
      )

      setPosition({
        left,
        width,
        top: placeBelow ? rect.bottom + gap : undefined,
        bottom: placeBelow ? undefined : viewportHeight - rect.top + gap,
        maxHeight: Math.min(estimatedHeight, availableHeight),
      })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [estimatedHeight, open, triggerRef])

  return position
}