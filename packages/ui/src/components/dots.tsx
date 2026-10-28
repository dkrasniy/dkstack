import { cn } from '@dkrasniy/ui/lib/utils'

const DELAYS = ['0ms', '150ms', '450ms', '300ms']

function Dots({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      data-slot="dots"
      className={cn(
        'inline-grid shrink-0 grid-cols-[repeat(2,4px)] gap-[3px]',
        className,
      )}
    >
      {DELAYS.map((delay) => (
        <i
          key={delay}
          className="animate-dots size-1 rounded-[1px] bg-subtle-foreground"
          style={{ animationDelay: delay }}
        />
      ))}
    </span>
  )
}

export { Dots }
