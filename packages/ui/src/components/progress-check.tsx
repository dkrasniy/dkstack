import { Dots } from '@dkrasniy/ui/components/dots'
import { cn } from '@dkrasniy/ui/lib/utils'

const MARKS = {
  check: ['M7.5 12.5L10.6 15.6L16.5 9.5'],
  cross: ['M8.5 8.5L15.5 15.5', 'M15.5 8.5L8.5 15.5'],
}

const FILL = {
  brand: 'bg-brand',
  success: 'bg-success',
  destructive: 'bg-destructive',
}

function ProgressCheck({
  done,
  mark = 'check',
  tone = 'brand',
  label,
  className,
}: {
  done: boolean
  mark?: 'check' | 'cross'
  tone?: 'brand' | 'success' | 'destructive'
  label?: string
  className?: string
}) {
  return (
    <span
      role="img"
      aria-label={done ? (label ?? 'Done') : 'Working'}
      data-slot="progress-check"
      data-done={done}
      className={cn(
        'group/check relative grid size-4 shrink-0 place-items-center',
        className,
      )}
    >
      <Dots className="transition-[opacity,scale,filter] duration-200 ease-out group-data-[done=true]/check:scale-60 group-data-[done=true]/check:opacity-0 group-data-[done=true]/check:blur-[1px]" />
      <span
        className={cn(
          'absolute inset-0 scale-50 rounded-full opacity-0 transition-[opacity,scale] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[done=true]/check:scale-100 group-data-[done=true]/check:opacity-100 group-data-[done=true]/check:duration-250 group-data-[done=true]/check:ease-[cubic-bezier(0.34,1.56,0.64,1)]',
          FILL[tone],
        )}
      >
        <svg viewBox="0 0 24 24" aria-hidden className="size-full">
          {MARKS[mark].map((d, index) => (
            <path
              key={d}
              d={d}
              pathLength={1}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transitionDelay: done ? `${40 + index * 60}ms` : undefined }}
              className="fill-none stroke-white transition-[stroke-dashoffset] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] [stroke-dasharray:1] [stroke-dashoffset:1] group-data-[done=true]/check:[stroke-dashoffset:0] group-data-[done=true]/check:duration-300"
            />
          ))}
        </svg>
      </span>
    </span>
  )
}

export { ProgressCheck }
