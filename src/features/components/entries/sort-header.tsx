import { useState } from 'react'
import { SortHeader, nextSort, type Sort } from '@dkrasniy/ui/components/sort-header'
import type { Entry } from '../registry'

const HEADERS = [
  { key: 'name', label: 'Name' },
  { key: 'owner', label: 'Owner' },
  { key: 'edited', label: 'Edited' },
] as const

type Key = (typeof HEADERS)[number]['key']

function Row() {
  const [sort, setSort] = useState<Sort<Key> | null>({
    key: 'name',
    direction: 'ascending',
  })
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-3">
      <div role="table" aria-label="Projects" className="w-full">
        <div
          role="row"
          className="bg-muted text-muted-foreground text-13 grid grid-cols-3 gap-3 rounded-md px-3.5"
        >
          {HEADERS.map((header) => (
            <SortHeader
              key={header.key}
              label={header.label}
              sort={sort?.key === header.key ? sort.direction : null}
              onToggle={() => setSort(nextSort(sort, header.key))}
            />
          ))}
        </div>
      </div>
      <p className="text-muted-foreground text-13" aria-live="polite">
        {sort ? `Sorted by ${sort.key}, ${sort.direction}` : 'Not sorted'}
      </p>
    </div>
  )
}

export const entry: Entry = {
  slug: 'sort-header',
  title: 'Sort header',
  group: 'Surfaces',
  order: 0,
  summary:
    'A column header that sorts its table. Each click moves it from ascending to descending to unsorted, and the arrow shows which.',
  imports:
    "import { SortHeader, nextSort, type Sort } from '@dkrasniy/ui/components/sort-header'",
  guidance: [
    'Keep one Sort in state for the whole table and pass each header its direction, or null when another column is sorted.',
    'nextSort gives the state after a click: a new column starts ascending, and a third click clears the sort.',
    'Table uses it for every sortable column, so reach for Table first. Use SortHeader on its own only for a layout that Table does not draw. It renders role="columnheader" with aria-sort, so put it in a role="row" inside a role="table".',
  ],
  examples: [
    {
      title: 'Header row',
      description:
        'Click a header to cycle it through ascending, descending and unsorted.',
      Demo: Row,
      code: `const [sort, setSort] = useState<Sort<'name' | 'owner' | 'edited'> | null>(null)

<div role="row" className="bg-muted text-muted-foreground text-13 grid grid-cols-3 gap-3 px-3.5">
  {HEADERS.map((header) => (
    <SortHeader
      key={header.key}
      label={header.label}
      sort={sort?.key === header.key ? sort.direction : null}
      onToggle={() => setSort(nextSort(sort, header.key))}
    />
  ))}
</div>`,
    },
  ],
}
