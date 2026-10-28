import { useState } from 'react'
import { Button } from '@dkrasniy/ui/components/button'
import { Field, FieldLabel } from '@dkrasniy/ui/components/field'
import { Input } from '@dkrasniy/ui/components/input'
import { SortHeader, nextSort, type Sort } from '@dkrasniy/ui/components/sort-header'
import { Switch } from '@dkrasniy/ui/components/switch'
import {
  Tray,
  TrayCard,
  TrayFooter,
  TrayHeader,
  TrayRow,
  TrayTitle,
} from '@dkrasniy/ui/components/tray'
import { cn } from '@dkrasniy/ui/lib/utils'
import type { Entry } from '../registry'

function Section() {
  const [name, setName] = useState('Northwind')
  const dirty = name.trim() !== 'Northwind'
  return (
    <Tray className="w-full max-w-lg pt-(--tray-pad)">
      <TrayCard className="p-5">
        <Field>
          <FieldLabel htmlFor="demo-tray-name">Project name</FieldLabel>
          <Input
            id="demo-tray-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Field>
      </TrayCard>
      <TrayFooter note="Only owners can rename it.">
        <Button size="sm" disabled={!dirty}>
          Save
        </Button>
      </TrayFooter>
    </Tray>
  )
}

const NOTIFICATIONS = [
  { label: 'Comments on my pages', on: true },
  { label: 'Mentions', on: true },
  { label: 'Weekly summary', on: false },
]

function List() {
  return (
    <Tray className="w-full max-w-lg">
      <TrayHeader>
        <TrayTitle>Email notifications</TrayTitle>
      </TrayHeader>
      <TrayCard>
        {NOTIFICATIONS.map((row) => (
          <TrayRow key={row.label}>
            {row.label}
            <Switch defaultChecked={row.on} aria-label={row.label} />
          </TrayRow>
        ))}
      </TrayCard>
    </Tray>
  )
}

const COLUMNS = 'grid grid-cols-[minmax(0,1fr)_5rem_7rem] items-center gap-3 px-3.5'

const PROJECTS = [
  { name: 'Northwind', pages: 12, edited: 'Today', days: 0 },
  { name: 'Help center', pages: 31, edited: 'Last week', days: 6 },
  { name: 'Brand refresh', pages: 8, edited: 'Yesterday', days: 1 },
  { name: 'Careers', pages: 4, edited: 'March 4', days: 40 },
]

const HEADERS = [
  { key: 'name', label: 'Name' },
  { key: 'pages', label: 'Pages' },
  { key: 'days', label: 'Edited' },
] as const

type Key = (typeof HEADERS)[number]['key']

function Table() {
  const [sort, setSort] = useState<Sort<Key> | null>(null)
  const rows = sort
    ? [...PROJECTS].sort((a, b) => {
        const order =
          sort.key === 'name' ? a.name.localeCompare(b.name) : a[sort.key] - b[sort.key]
        return sort.direction === 'ascending' ? order : -order
      })
    : PROJECTS
  return (
    <Tray role="table" aria-label="Projects" className="w-full max-w-lg text-sm">
      <div
        role="row"
        className={cn(COLUMNS, 'bg-muted text-muted-foreground text-13 rounded-t-xl')}
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
      <TrayCard role="rowgroup" className="divide-y">
        {rows.map((project) => (
          <div key={project.name} role="row" className={cn(COLUMNS, 'min-h-12.5')}>
            <span role="cell" className="truncate font-medium">
              {project.name}
            </span>
            <span role="cell" className="text-muted-foreground tabular-nums">
              {project.pages}
            </span>
            <span role="cell" className="text-muted-foreground">
              {project.edited}
            </span>
          </div>
        ))}
      </TrayCard>
    </Tray>
  )
}

export const entry: Entry = {
  slug: 'tray',
  title: 'Tray',
  group: 'Surfaces',
  order: -1,
  summary:
    'The default way to group content: a soft grey tray holding a white card, with a label or column headers above the card and a note below it. The card’s radius is the tray’s minus the 5px between them, so the corners stay concentric.',
  imports: `import {
  Tray,
  TrayCard,
  TrayFooter,
  TrayHeader,
  TrayRow,
  TrayTitle,
} from '@dkrasniy/ui/components/tray'`,
  guidance: [
    'Put each group on a settings, detail or list page in its own tray. Use Card only for a single item in a grid.',
    'Labels, notes and column headers sit on the grey tray, so the white card holds only the content.',
    'Without a TrayHeader, add pt-(--tray-pad) to the Tray so the card has the same gap on every side.',
    'TrayFooter takes a note on the left and actions on the right, and cancels the tray’s bottom padding itself.',
    'TrayRow is 50px tall with the label on the left and the control on the right. Rows divide themselves, and the last has no border.',
    'For a table, give the header row and each data row the same grid columns and px-3.5, so they line up across the card edge.',
  ],
  examples: [
    {
      title: 'Settings section',
      description: 'Save turns on once the name changes.',
      Demo: Section,
      code: `<Tray className="pt-(--tray-pad)">
  <TrayCard className="p-5">
    <Field>
      <FieldLabel htmlFor="project-name">Project name</FieldLabel>
      <Input id="project-name" value={name} onChange={(e) => setName(e.target.value)} />
    </Field>
  </TrayCard>
  <TrayFooter note="Only owners can rename it.">
    <Button size="sm" disabled={!dirty} onClick={save}>
      Save
    </Button>
  </TrayFooter>
</Tray>`,
    },
    {
      title: 'Settings list',
      Demo: List,
      code: `<Tray>
  <TrayHeader>
    <TrayTitle>Email notifications</TrayTitle>
  </TrayHeader>
  <TrayCard>
    <TrayRow>
      Comments on my pages
      <Switch
        checked={comments}
        onCheckedChange={setComments}
        aria-label="Comments on my pages"
      />
    </TrayRow>
    <TrayRow>
      Weekly summary
      <Switch checked={summary} onCheckedChange={setSummary} aria-label="Weekly summary" />
    </TrayRow>
  </TrayCard>
</Tray>`,
    },
    {
      title: 'Table',
      description: 'Column headers sit in the tray’s top area. Click one to sort.',
      Demo: Table,
      code: `const COLUMNS = 'grid grid-cols-[minmax(0,1fr)_5rem_7rem] items-center gap-3 px-3.5'

<Tray role="table" aria-label="Projects" className="text-sm">
  <div
    role="row"
    className={cn(COLUMNS, 'bg-muted text-muted-foreground text-13 rounded-t-xl')}
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
  <TrayCard role="rowgroup" className="divide-y">
    {projects.map((project) => (
      <div key={project.id} role="row" className={cn(COLUMNS, 'min-h-12.5')}>
        <span role="cell" className="truncate font-medium">{project.name}</span>
        <span role="cell" className="text-muted-foreground">{project.pageCount}</span>
        <span role="cell" className="text-muted-foreground">{edited(project)}</span>
      </div>
    ))}
  </TrayCard>
</Tray>`,
    },
  ],
}
