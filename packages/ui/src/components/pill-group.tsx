import * as React from 'react'
import { Button as ButtonPrimitive } from '@base-ui/react/button'

import { cn } from '@dkrasniy/ui/lib/utils'

function PillGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role="group"
      data-slot="pill-group"
      className={cn(
        'inline-flex items-center gap-0.5 rounded-pill bg-background p-0.75 shadow-btn',
        className,
      )}
      {...props}
    />
  )
}

function PillButton({ className, ...props }: ButtonPrimitive.Props) {
  return (
    <ButtonPrimitive
      data-slot="pill-button"
      className={cn(
        "grid h-7.5 w-8.5 place-items-center rounded-[calc(var(--radius-pill)-3px)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40 aria-pressed:bg-muted aria-pressed:text-foreground [&_svg:not([class*='size-'])]:size-4.5",
        className,
      )}
      {...props}
    />
  )
}

export { PillButton, PillGroup }
