import { cn } from '@dkrasniy/ui/lib/utils'

function Shimmer({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="shimmer"
      className={cn(
        'animate-shimmer bg-[linear-gradient(90deg,var(--subtle-foreground)_35%,var(--foreground)_50%,var(--subtle-foreground)_65%)] bg-size-[250%_100%] bg-clip-text text-transparent',
        className,
      )}
      {...props}
    />
  )
}

export { Shimmer }
