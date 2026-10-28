import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  UnfoldMoreIcon,
} from '@hugeicons/core-free-icons'
import { cn } from '@dkrasniy/ui/lib/utils'

type SortDirection = 'ascending' | 'descending'

interface Sort<Key extends string> {
  key: Key
  direction: SortDirection
}

function SortHeader({
  label,
  sort,
  onToggle,
  className,
}: {
  label: string
  sort: SortDirection | null
  onToggle: () => void
  className?: string
}) {
  return (
    <span
      role="columnheader"
      aria-sort={sort ?? 'none'}
      className={cn('flex self-stretch', className)}
    >
      <button
        type="button"
        onClick={onToggle}
        data-sorted={sort ? '' : undefined}
        className="hover:text-foreground focus-visible:shadow-focus data-sorted:text-foreground flex w-full items-center gap-1 rounded-md py-2.5 font-medium outline-none"
      >
        {label}
        <HugeiconsIcon
          icon={
            sort === 'ascending'
              ? ArrowUp01Icon
              : sort === 'descending'
                ? ArrowDown01Icon
                : UnfoldMoreIcon
          }
          strokeWidth={2}
          className="size-3.5"
        />
      </button>
    </span>
  )
}

function nextSort<Key extends string>(
  current: Sort<Key> | null,
  key: Key,
): Sort<Key> | null {
  if (current?.key !== key) return { key, direction: 'ascending' }
  return current.direction === 'ascending' ? { key, direction: 'descending' } : null
}

export { SortHeader, nextSort, type Sort, type SortDirection }
