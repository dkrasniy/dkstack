import { Link } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { Tray, TrayCard, TrayHeader, TrayTitle } from '@dkrasniy/ui/components/tray'
import { ComponentsShell } from './ComponentsShell'
import { GROUPS, entriesIn } from './registry'

export function ComponentIndex() {
  return (
    <ComponentsShell>
      <h1 className="text-2xl font-semibold">Components</h1>
      <p className="text-muted-foreground mt-2 max-w-xl text-sm text-pretty">
        Every component in @dkrasniy/ui, with the line that imports it and code you can
        copy.
      </p>
      <div className="mt-8 flex flex-col gap-5">
        {GROUPS.map((group) => {
          const list = entriesIn(group)
          if (list.length === 0) return null
          return (
            <Tray key={group}>
              <TrayHeader>
                <TrayTitle>{group}</TrayTitle>
              </TrayHeader>
              <TrayCard className="divide-border grid divide-y">
                {list.map((entry) => (
                  <Link
                    key={entry.slug}
                    to="/components/$slug"
                    params={{ slug: entry.slug }}
                    className="group/row hover:bg-foreground/[0.025] ease-smooth flex items-center gap-4 px-4 py-3 transition-colors duration-150 first:rounded-t-[inherit] last:rounded-b-[inherit]"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">{entry.title}</span>
                      <span className="text-muted-foreground block truncate text-13">
                        {entry.summary}
                      </span>
                    </span>
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="text-subtle-foreground group-hover/row:text-foreground ease-smooth size-4 shrink-0 transition-[color,translate] duration-150 group-hover/row:translate-x-0.5"
                    />
                  </Link>
                ))}
              </TrayCard>
            </Tray>
          )
        })}
      </div>
    </ComponentsShell>
  )
}
