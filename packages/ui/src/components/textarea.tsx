import * as React from 'react'

import { cn } from '@dkrasniy/ui/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'ease-smooth flex field-sizing-content min-h-16 w-full resize-none rounded-sm bg-background shadow-input px-3 py-2 text-sm text-foreground outline-none transition-shadow duration-150 placeholder:text-subtle-foreground focus-visible:shadow-focus disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:shadow-invalid',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
