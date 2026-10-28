import * as React from 'react'

import { cn } from '@dkrasniy/ui/lib/utils'

function Tray({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      data-slot="tray"
      className={cn(
        'inset-ring-border rounded-xl bg-muted px-(--tray-pad) pb-(--tray-pad) inset-ring [--tray-pad:5px]',
        className,
      )}
      {...props}
    />
  )
}

function TrayHeader({ className, ...props }: React.ComponentProps<'header'>) {
  return (
    <header
      data-slot="tray-header"
      className={cn('flex h-9.5 items-center justify-between gap-2 px-2.75', className)}
      {...props}
    />
  )
}

function TrayTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="tray-title"
      className={cn('text-sm font-medium text-muted-foreground', className)}
      {...props}
    />
  )
}

function TrayCard({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="tray-card"
      className={cn(
        'rounded-[calc(var(--radius-xl)-var(--tray-pad))] bg-card shadow-card',
        className,
      )}
      {...props}
    />
  )
}

function TrayRow({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="tray-row"
      className={cn(
        'flex min-h-12.5 items-center justify-between gap-3 border-b px-3.5 text-sm font-medium last:border-b-0',
        className,
      )}
      {...props}
    />
  )
}

function TrayFooter({
  note,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<'footer'>, 'children'> & {
  note?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <footer
      data-slot="tray-footer"
      className={cn(
        '-mb-(--tray-pad) flex min-h-12 items-center justify-between gap-3 px-3.5 py-2 text-13 text-muted-foreground',
        className,
      )}
      {...props}
    >
      <span className="min-w-0 text-pretty">{note}</span>
      {children ? (
        <div className="flex shrink-0 items-center gap-2">{children}</div>
      ) : null}
    </footer>
  )
}

export { Tray, TrayCard, TrayFooter, TrayHeader, TrayRow, TrayTitle }
