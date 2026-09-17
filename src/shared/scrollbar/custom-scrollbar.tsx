// @/shared/scrollbar/custom-scrollbar.tsx

'use client'

import { useEffect, useRef, useState } from 'react'

const ARROW_SPACE = 18
const MIN_THUMB_HEIGHT = 56

type ScrollbarState = {
  height: number
  top: number
}

export function CustomScrollbar() {
  const [scrollbar, setScrollbar] = useState<ScrollbarState>({
    height: 0,
    top: ARROW_SPACE,
  })

  const draggingRef = useRef(false)
  const dragStartYRef = useRef(0)
  const dragStartScrollYRef = useRef(0)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const update = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }

      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null

        const viewportHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight

        if (documentHeight <= viewportHeight) {
          setScrollbar({
            height: 0,
            top: ARROW_SPACE,
          })

          return
        }

        const trackHeight = viewportHeight - ARROW_SPACE * 2

        const thumbHeight = Math.max(
          MIN_THUMB_HEIGHT,
          (viewportHeight / documentHeight) * trackHeight,
        )

        const maxThumbTop = Math.max(0, trackHeight - thumbHeight)

        const maxScroll = documentHeight - viewportHeight

        const progress =
          maxScroll > 0
            ? Math.min(1, Math.max(0, window.scrollY / maxScroll))
            : 0

        const top = ARROW_SPACE + progress * maxThumbTop

        setScrollbar({
          height: thumbHeight,
          top,
        })
      })
    }

    update()

    window.addEventListener('scroll', update, {
      passive: true,
    })

    window.addEventListener('resize', update)

    const mutationObserver = new MutationObserver(() => {
      update()
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    })

    const resizeObserver = new ResizeObserver(() => {
      update()
    })

    resizeObserver.observe(document.documentElement)
    resizeObserver.observe(document.body)

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }

      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)

      mutationObserver.disconnect()
      resizeObserver.disconnect()
    }
  }, [])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault()

    draggingRef.current = true
    dragStartYRef.current = event.clientY
    dragStartScrollYRef.current = window.scrollY

    event.currentTarget.setPointerCapture(event.pointerId)

    document.body.style.userSelect = 'none'
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return

    const viewportHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    if (documentHeight <= viewportHeight) return

    const trackHeight = viewportHeight - ARROW_SPACE * 2

    const thumbHeight = Math.max(
      MIN_THUMB_HEIGHT,
      (viewportHeight / documentHeight) * trackHeight,
    )

    const maxThumbTop = trackHeight - thumbHeight

    const maxScroll = documentHeight - viewportHeight

    if (maxThumbTop <= 0) return

    const deltaY = event.clientY - dragStartYRef.current

    const scrollDelta = (deltaY / maxThumbTop) * maxScroll

    const nextScrollY = Math.max(
      0,
      Math.min(maxScroll, dragStartScrollYRef.current + scrollDelta),
    )

    window.scrollTo(0, nextScrollY)
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    document.body.style.userSelect = ''
  }

  if (scrollbar.height === 0) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 right-0 z-[9999] w-5"
    >
      {/* Punta superior */}
      <div
        className={[
          'absolute right-[4px] top-1',
          'h-0 w-0',
          'border-l-[5px] border-r-[5px] border-b-[7px]',
          'border-l-transparent border-r-transparent',
          'custom-scrollbar-arrow-top',
        ].join(' ')}
      />

      {/* Thumb */}
      <div
        role="scrollbar"
        tabIndex={0}
        className={[
          'pointer-events-auto absolute right-[3px]',
          'w-2.5 rounded-full',
          'cursor-grab shadow-sm',
          'custom-scrollbar-thumb',
        ].join(' ')}
        style={{
          top: `${scrollbar.top}px`,
          height: `${scrollbar.height}px`,
          touchAction: 'none',
          willChange: 'top, height',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />

      {/* Punta inferior */}
      <div
        className={[
          'absolute bottom-1 right-[4px]',
          'h-0 w-0',
          'border-l-[5px] border-r-[5px] border-t-[7px]',
          'border-l-transparent border-r-transparent',
          'custom-scrollbar-arrow-bottom',
        ].join(' ')}
      />
    </div>
  )
}
