import type { ReactNode } from 'react'

type DataTableViewportProps = {
  children: ReactNode
  ariaLabel: string
  minWidthClassName: string
}

export function DataTableViewport({
  children,
  ariaLabel,
  minWidthClassName,
}: DataTableViewportProps) {
  return (
    <div className="overflow-x-auto overscroll-x-contain">
      <table
        aria-label={ariaLabel}
        className={[
          'w-full border-separate border-spacing-0 text-sm',
          minWidthClassName,
        ].join(' ')}
      >
        {children}
      </table>
    </div>
  )
}

type DataTableHeaderCellProps = {
  children: ReactNode
  align?: 'left' | 'center' | 'right'
  className?: string
}

export function DataTableHeaderCell({
  children,
  align = 'left',
  className = '',
}: DataTableHeaderCellProps) {
  const alignment = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align]

  return (
    <th
      scope="col"
      className={[
        'sticky top-0 z-10 whitespace-nowrap border-b border-border bg-surface/95 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted backdrop-blur',
        alignment,
        className,
      ].join(' ')}
    >
      {children}
    </th>
  )
}
