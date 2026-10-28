import * as React from 'react'

import { cn } from '@dkrasniy/ui/lib/utils'

function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        'inline-grid h-5 min-w-5 place-items-center rounded-xs bg-muted px-1.5 font-sans text-xs font-medium text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

export { Kbd }
