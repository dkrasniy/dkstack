import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { SidebarRightIcon } from '@hugeicons/core-free-icons'
import { Button } from '@dkrasniy/ui/components/button'
import { Dots } from '@dkrasniy/ui/components/dots'
import type { Entry } from '../registry'

function WithLabel() {
  return (
    <span className="text-muted-foreground flex items-center gap-2 text-sm">
      <Dots />
      Working on it
    </span>
  )
}

function InPlaceOfIcon() {
  const [busy, setBusy] = useState(true)
  return (
    <Button variant="ghost" size="sm" onClick={() => setBusy(!busy)}>
      <span className="grid size-4 place-items-center">
        {busy ? <Dots /> : <HugeiconsIcon icon={SidebarRightIcon} strokeWidth={2} />}
      </span>
      Assistant
    </Button>
  )
}

export const entry: Entry = {
  slug: 'dots',
  title: 'Dots',
  group: 'Feedback',
  order: 20,
  summary:
    'Four small squares that pulse in turn, for something working in the background. Quieter than a spinner.',
  imports: "import { Dots } from '@dkrasniy/ui/components/dots'",
  guidance: [
    'Use dots when something runs on its own, like an assistant replying or a step in progress. For a page waiting on data, use Spinner or Skeleton.',
    'They fit a 16px box, so they can stand in for an icon and nothing around them shifts.',
    'They are hidden from screen readers. Pair them with text that says what is happening.',
  ],
  examples: [
    {
      title: 'With a label',
      Demo: WithLabel,
      code: `<span className="text-muted-foreground flex items-center gap-2 text-sm">
  <Dots />
  Working on it
</span>`,
    },
    {
      title: 'In place of an icon',
      description: 'Click to toggle. The button keeps its size either way.',
      Demo: InPlaceOfIcon,
      code: `<Button variant="ghost" size="sm" onClick={toggle}>
  <span className="grid size-4 place-items-center">
    {busy ? <Dots /> : <HugeiconsIcon icon={SidebarRightIcon} strokeWidth={2} />}
  </span>
  Assistant
</Button>`,
    },
  ],
}
