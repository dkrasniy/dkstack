import { Skeleton } from '@dkrasniy/ui/components/skeleton'

export function SkeletonLoader() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="animate-in fade-in-0 mx-auto max-w-5xl px-10 pt-6 pb-36 duration-300"
    >
      <Skeleton className="h-8 w-48" />
      <Skeleton className="mt-3 h-4 w-72" />
      <div className="bg-card shadow-card mt-8 overflow-hidden rounded-lg">
        {[0, 1, 2, 3].map((row) => (
          <div
            key={row}
            className="border-border flex items-center gap-3 px-4.5 py-3 not-first:border-t"
          >
            <Skeleton className="size-9 rounded-xs" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3.5 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
