import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dkrasniy/ui/components/tabs'
import type { Entry } from '../registry'

const PEOPLE = [
  { name: 'Sam Lee', status: 'active' },
  { name: 'Ana Ruiz', status: 'active' },
  { name: 'Kai Chen', status: 'invited' },
  { name: 'Mia Novak', status: 'active' },
  { name: 'Leo Park', status: 'invited' },
]

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'invited', label: 'Invited' },
]

function count(filter: string) {
  return filter === 'all'
    ? PEOPLE.length
    : PEOPLE.filter((person) => person.status === filter).length
}

function Panels() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-muted-foreground text-sm">
        Twelve pages, last edited yesterday.
      </TabsContent>
      <TabsContent value="activity" className="text-muted-foreground text-sm">
        Ana published the pricing page.
      </TabsContent>
      <TabsContent value="settings" className="text-muted-foreground text-sm">
        Name, members and visibility.
      </TabsContent>
    </Tabs>
  )
}

function Counts() {
  const [filter, setFilter] = useState('all')
  const shown =
    filter === 'all' ? PEOPLE : PEOPLE.filter((person) => person.status === filter)
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Tabs value={filter} onValueChange={(value: string) => setFilter(value)}>
        <TabsList>
          {FILTERS.map((each) => (
            <TabsTrigger key={each.value} value={each.value}>
              {each.label}
              <span className="text-subtle-foreground ms-1.5 tabular-nums">
                {count(each.value)}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <ul className="flex flex-col gap-1.5 text-sm">
        {shown.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export const entry: Entry = {
  slug: 'tabs',
  title: 'Tabs',
  group: 'Navigation',
  order: 10,
  summary: 'A grey track of tabs. A white pill slides and resizes to the selected one.',
  imports:
    "import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dkrasniy/ui/components/tabs'",
  guidance: [
    'Use tabs to switch between views of the same thing, like panels of a project or filters on a list, and Segmented to pick a form value.',
    'Without TabsContent, tabs work as a filter: keep the value in state and filter the list yourself.',
    'Put a count in a span with text-subtle-foreground and tabular-nums, so the digits keep their width as it changes.',
    'Keep to two to five short labels, because the track does not scroll or wrap.',
  ],
  examples: [
    {
      title: 'With panels',
      Demo: Panels,
      code: `<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <ProjectOverview />
  </TabsContent>
  <TabsContent value="activity">
    <ProjectActivity />
  </TabsContent>
  <TabsContent value="settings">
    <ProjectSettings />
  </TabsContent>
</Tabs>`,
    },
    {
      title: 'With counts',
      description: 'A filter on a list, with no panels.',
      Demo: Counts,
      code: `<Tabs value={filter} onValueChange={(value: string) => setFilter(value)}>
  <TabsList>
    {FILTERS.map((each) => (
      <TabsTrigger key={each.value} value={each.value}>
        {each.label}
        <span className="text-subtle-foreground ms-1.5 tabular-nums">
          {count(each.value)}
        </span>
      </TabsTrigger>
    ))}
  </TabsList>
</Tabs>`,
    },
  ],
}
