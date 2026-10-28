import type { ReactNode } from 'react'
import { Button as ButtonPrimitive } from '@base-ui/react/button'

import { cn } from '@dkrasniy/ui/lib/utils'

function Choice({
  className,
  icon,
  label,
  description,
  ...props
}: Omit<ButtonPrimitive.Props, 'children'> & {
  icon: ReactNode
  label: string
  description: string
}) {
  return (
    <ButtonPrimitive
      data-slot="choice"
      className={cn(
        "ease-smooth flex min-h-15 w-full items-center gap-3.5 rounded-md bg-background px-4 py-3 text-left shadow-card transition-[box-shadow,scale] duration-150 hover:shadow-float dark:bg-muted active:scale-98 disabled:pointer-events-none disabled:opacity-40 [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-5",
        className,
      )}
      {...props}
    >
      {icon}
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm text-muted-foreground">{description}</span>
      </span>
    </ButtonPrimitive>
  )
}

export { Choice }
