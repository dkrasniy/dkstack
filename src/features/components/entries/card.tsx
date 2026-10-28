import { Badge } from '@dkrasniy/ui/components/badge'
import { Button } from '@dkrasniy/ui/components/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@dkrasniy/ui/components/card'
import type { Entry } from '../registry'

function Project() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Northwind</CardTitle>
        <CardDescription>northwind.app</CardDescription>
        <CardAction>
          <Badge variant="attention">Draft</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        12 pages · Edited 2 hours ago
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm">
          Preview
        </Button>
        <Button size="sm">Open</Button>
      </CardFooter>
    </Card>
  )
}

const STATS = [
  { label: 'Pages', value: '128' },
  { label: 'Visitors this week', value: '4,210' },
  { label: 'Open drafts', value: '6' },
]

function Small() {
  return (
    <div className="grid w-full max-w-xl gap-3 sm:grid-cols-3">
      {STATS.map((stat) => (
        <Card key={stat.label} size="sm">
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle className="text-2xl tabular-nums">{stat.value}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

function Bordered() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="border-b">
        <CardTitle>Members</CardTitle>
        <CardDescription>People who can edit this project.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <span>Jordan Lee</span>
        <span>Sam Rivera</span>
        <span>Alex Kim</span>
      </CardContent>
      <CardFooter className="border-t">
        <Button variant="secondary" size="sm">
          Invite people
        </Button>
      </CardFooter>
    </Card>
  )
}

export const entry: Entry = {
  slug: 'card',
  title: 'Card',
  group: 'Surfaces',
  order: 10,
  summary:
    'A white surface with a soft shadow and superellipse corners. Its parts share one spacing value, so the header, content and footer line up.',
  imports: `import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@dkrasniy/ui/components/card'`,
  guidance: [
    'Use a card for one thing someone can open or act on, like a project in a grid. For a group of settings, use a tray.',
    'CardAction sits in the header’s top right, for a badge or a menu button.',
    'size="sm" tightens the spacing from 20px to 16px, for stat tiles and dense grids.',
    'Add border-b to CardHeader or border-t to CardFooter and the card adds matching space on the other side of the line.',
  ],
  examples: [
    {
      title: 'Header, content and footer',
      Demo: Project,
      code: `<Card>
  <CardHeader>
    <CardTitle>{project.name}</CardTitle>
    <CardDescription>{project.domain}</CardDescription>
    <CardAction>
      <Badge variant="attention">Draft</Badge>
    </CardAction>
  </CardHeader>
  <CardContent className="text-muted-foreground">
    {project.pageCount} pages · Edited {edited}
  </CardContent>
  <CardFooter className="gap-2">
    <Button variant="outline" size="sm">
      Preview
    </Button>
    <Button size="sm">Open</Button>
  </CardFooter>
</Card>`,
    },
    {
      title: 'Small',
      Demo: Small,
      code: `<Card size="sm">
  <CardHeader>
    <CardDescription>Visitors this week</CardDescription>
    <CardTitle className="text-2xl tabular-nums">4,210</CardTitle>
  </CardHeader>
</Card>`,
    },
    {
      title: 'Dividers',
      Demo: Bordered,
      code: `<Card>
  <CardHeader className="border-b">
    <CardTitle>Members</CardTitle>
    <CardDescription>People who can edit this project.</CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col gap-2">
    {members.map((member) => (
      <span key={member.id}>{member.name}</span>
    ))}
  </CardContent>
  <CardFooter className="border-t">
    <Button variant="secondary" size="sm">
      Invite people
    </Button>
  </CardFooter>
</Card>`,
    },
  ],
}
