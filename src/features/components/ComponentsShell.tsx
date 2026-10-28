import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { cn } from '@dkrasniy/ui/lib/utils'
import { GROUPS, entriesIn } from './registry'

export function ComponentsShell({
  current,
  children,
}: {
  current?: string
  children: ReactNode
}) {
  return (
    <div className="mx-auto flex max-w-6xl gap-10 px-6 pb-24 md:px-10">
      <nav
        aria-label="Components"
        className="sticky top-0 hidden max-h-svh w-48 shrink-0 flex-col gap-5 overflow-y-auto py-10 lg:flex"
      >
        {GROUPS.map((group) => {
          const list = entriesIn(group)
          if (list.length === 0) return null
          return (
            <div key={group} className="flex flex-col gap-0.5">
              <p className="text-subtle-foreground px-2.5 pb-1 text-xs font-medium">
                {group}
              </p>
              {list.map((entry) => (
                <Link
                  key={entry.slug}
                  to="/components/$slug"
                  params={{ slug: entry.slug }}
                  aria-current={entry.slug === current ? 'page' : undefined}
                  className={cn(
                    'text-13 text-muted-foreground hover:text-foreground hover:bg-foreground/5 ease-smooth rounded-[calc(var(--radius-md)-4px)] px-2.5 py-1.5 transition-colors duration-150',
                    'aria-[current=page]:bg-foreground/5 aria-[current=page]:text-foreground aria-[current=page]:font-medium',
                  )}
                >
                  {entry.title}
                </Link>
              ))}
            </div>
          )
        })}
      </nav>
      <div className="min-w-0 flex-1 py-10">{children}</div>
    </div>
  )
}
