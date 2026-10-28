import { cn } from '@dkrasniy/ui/lib/utils'

const SPINNER = 'animate-spin rounded-full border-current/25 border-t-current'

function Spinner({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn(SPINNER, 'inline-block size-4 shrink-0 border-2', className)}
      {...props}
    />
  )
}

export { Spinner, SPINNER }
