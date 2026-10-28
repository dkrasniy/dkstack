import { useState } from 'react'
import { Button } from '@dkrasniy/ui/components/button'
import { Skeleton } from '@dkrasniy/ui/components/skeleton'
import { Tray, TrayCard, TrayRow } from '@dkrasniy/ui/components/tray'
import type { Entry } from '../registry'

function CardShape() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Skeleton className="h-36 rounded-lg" />
      <Skeleton className="h-3.5 w-2/3" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  )
}

function ListShape() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      ))}
    </div>
  )
}

const DETAILS = [
  { label: 'Owner', value: 'Jordan Lee', width: 'w-24' },
  { label: 'Created', value: 'March 4, 2026', width: 'w-28' },
]

function InPlace() {
  const [loading, setLoading] = useState(true)
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4">
      <Tray className="w-full pt-(--tray-pad)">
        <TrayCard>
          <dl>
            {DETAILS.map((row) => (
              <TrayRow key={row.label} className="justify-start">
                <dt className="text-muted-foreground w-28 shrink-0 font-normal">
                  {row.label}
                </dt>
                <dd>
                  {loading ? <Skeleton className={`h-3.5 ${row.width}`} /> : row.value}
                </dd>
              </TrayRow>
            ))}
          </dl>
        </TrayCard>
      </Tray>
      <Button variant="secondary" size="sm" onClick={() => setLoading(!loading)}>
        {loading ? 'Show content' : 'Show loading'}
      </Button>
    </div>
  )
}

export const entry: Entry = {
  slug: 'skeleton',
  title: 'Skeleton',
  group: 'Surfaces',
  order: 80,
  summary: 'A pulsing grey block that holds the place of content while it loads.',
  imports: "import { Skeleton } from '@dkrasniy/ui/components/skeleton'",
  guidance: [
    'Give each skeleton the size of the thing it stands in for, so nothing moves when the content arrives.',
    'Keep the real labels, borders and containers, and swap only the values that are loading.',
    'Size text lines to the line height of the text, like h-3.5 for text-sm, and vary their widths.',
  ],
  examples: [
    {
      title: 'Shapes',
      Demo: CardShape,
      code: `<div className="flex flex-col gap-3">
  <Skeleton className="h-36 rounded-lg" />
  <Skeleton className="h-3.5 w-2/3" />
  <Skeleton className="h-3 w-1/2" />
</div>`,
    },
    {
      title: 'List',
      Demo: ListShape,
      code: `<div className="flex items-center gap-3">
  <Skeleton className="size-8 rounded-full" />
  <div className="flex flex-1 flex-col gap-2">
    <Skeleton className="h-3.5 w-32" />
    <Skeleton className="h-3 w-48" />
  </div>
</div>`,
    },
    {
      title: 'In place',
      description: 'Only the values load. The rows and labels are there from the start.',
      Demo: InPlace,
      code: `<TrayRow className="justify-start">
  <dt className="text-muted-foreground w-28 shrink-0 font-normal">Owner</dt>
  <dd>{project.isPending ? <Skeleton className="h-3.5 w-24" /> : project.data.owner}</dd>
</TrayRow>`,
    },
  ],
}
