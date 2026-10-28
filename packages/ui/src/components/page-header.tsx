import * as React from 'react'

import { cn } from '@dkrasniy/ui/lib/utils'

function PageHeader({ className, ...props }: React.ComponentProps<'header'>) {
  return (
    <header
      data-slot="page-header"
      className={cn('mb-7 flex items-start justify-between gap-4', className)}
      {...props}
    />
  )
}

function PageTitle({ className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      data-slot="page-title"
      className={cn('text-foreground text-2xl font-semibold text-balance', className)}
      {...props}
    />
  )
}

function PageDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="page-description"
      className={cn(
        'text-muted-foreground mt-2 max-w-[60ch] text-sm text-pretty wrap-break-word',
        className,
      )}
      {...props}
    />
  )
}

export { PageHeader, PageTitle, PageDescription }
