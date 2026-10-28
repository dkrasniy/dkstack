import * as React from 'react'

import { cn } from '@dkrasniy/ui/lib/utils'

function EmptyScreen({
  title,
  description,
  actions,
  art,
  children,
  className,
}: {
  title: string
  description: string
  actions?: React.ReactNode
  art?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-slot="empty-screen"
      className={cn(
        'absolute inset-0 grid min-h-[30rem] items-center gap-8 overflow-hidden px-10 md:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]',
        className,
      )}
    >
      {actions ? <div className="absolute top-6 right-10 z-10">{actions}</div> : null}
      <div className="relative z-10">
        <h1 className="text-2xl font-semibold text-balance">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-pretty text-muted-foreground">
          {description}
        </p>
        {children ? <div className="mt-7">{children}</div> : null}
      </div>
      {art ? (
        <div
          aria-hidden
          className="pointer-events-none hidden h-full items-center justify-center md:flex"
        >
          {art}
        </div>
      ) : null}
    </div>
  )
}

function IsometricStage({ className, children }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'relative [transform:rotateX(55deg)_rotateZ(-45deg)] transform-3d',
        className,
      )}
    >
      <div className="absolute -inset-72 -translate-z-1 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:2rem_2rem] text-foreground/8 [mask-image:radial-gradient(closest-side,black_35%,transparent)]" />
      {children}
    </div>
  )
}

function IsometricSlab({
  lift,
  className,
  children,
}: {
  lift: number
  className?: string
  children?: React.ReactNode
}) {
  return (
    <>
      <div className={cn('absolute rounded-md bg-foreground/4 blur-sm', className)} />
      <div
        className={cn(
          'absolute rounded-md bg-card shadow-[0_0_0_1px_var(--border)]',
          className,
        )}
        style={{ translate: `0 0 ${lift}px` }}
      >
        {children}
      </div>
    </>
  )
}

function IsometricBar({ className }: { className?: string }) {
  return <span className={cn('block rounded-full bg-foreground/10', className)} />
}

export { EmptyScreen, IsometricBar, IsometricSlab, IsometricStage }
