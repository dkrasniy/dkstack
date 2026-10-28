import { HugeiconsIcon } from '@hugeicons/react'
import { Clock01Icon, Tick02Icon } from '@hugeicons/core-free-icons'
import { Badge } from '@dkrasniy/ui/components/badge'
import type { Entry } from '../registry'

function Variants() {
  return (
    <>
      <Badge>Draft</Badge>
      <Badge variant="strong">New</Badge>
      <Badge variant="outline">Template</Badge>
      <Badge variant="success">Live</Badge>
      <Badge variant="attention">Unpublished changes</Badge>
      <Badge variant="destructive">Failed</Badge>
    </>
  )
}

function Icons() {
  return (
    <>
      <Badge variant="success">
        <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} data-icon="inline-start" />
        Published
      </Badge>
      <Badge>
        <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} data-icon="inline-start" />
        Scheduled
      </Badge>
    </>
  )
}

const PAGES = [
  { title: 'Home', status: <Badge variant="success">Live</Badge> },
  { title: 'Pricing', status: <Badge variant="attention">Unpublished changes</Badge> },
  { title: 'Careers', status: <Badge>Draft</Badge> },
]

function InList() {
  return (
    <ul className="w-full max-w-sm divide-y">
      {PAGES.map((page) => (
        <li key={page.title} className="flex items-center justify-between py-3 text-sm">
          {page.title}
          {page.status}
        </li>
      ))}
    </ul>
  )
}

export const entry: Entry = {
  slug: 'badge',
  title: 'Badge',
  group: 'Surfaces',
  order: 30,
  summary: 'A small label for a status or a category, in six variants.',
  imports: "import { Badge } from '@dkrasniy/ui/components/badge'",
  guidance: [
    'Use badges for state that someone scans for in a list, like Live or Draft. Keep the label to one or two words.',
    'Match the variant to the meaning: success for live, attention for something waiting on you, destructive for a failure. Default is for neutral states.',
    'Mark an icon with data-icon="inline-start" so the badge trims its padding on that side.',
  ],
  examples: [
    {
      title: 'Variants',
      Demo: Variants,
      code: `<Badge>Draft</Badge>
<Badge variant="strong">New</Badge>
<Badge variant="outline">Template</Badge>
<Badge variant="success">Live</Badge>
<Badge variant="attention">Unpublished changes</Badge>
<Badge variant="destructive">Failed</Badge>`,
    },
    {
      title: 'With an icon',
      Demo: Icons,
      code: `<Badge variant="success">
  <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} data-icon="inline-start" />
  Published
</Badge>`,
    },
    {
      title: 'In a list',
      Demo: InList,
      code: `<li className="flex items-center justify-between py-3">
  {page.title}
  {page.live ? <Badge variant="success">Live</Badge> : <Badge>Draft</Badge>}
</li>`,
    },
  ],
}
