import { HugeiconsIcon } from '@hugeicons/react'
import { Search01Icon } from '@hugeicons/core-free-icons'
import { Button } from '@dkrasniy/ui/components/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@dkrasniy/ui/components/input-group'
import { Kbd } from '@dkrasniy/ui/components/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@dkrasniy/ui/components/tooltip'
import type { Entry } from '../registry'

const SHORTCUTS = [
  { label: 'Search', keys: ['⌘', 'K'] },
  { label: 'Toggle sidebar', keys: ['⌘', 'B'] },
  { label: 'Command menu', keys: ['⇧', '⌘', 'P'] },
  { label: 'Close', keys: ['Esc'] },
] as const

function Keys() {
  return (
    <dl className="text-13 flex w-full max-w-60 flex-col gap-2.5">
      {SHORTCUTS.map(({ label, keys }) => (
        <div key={label} className="flex items-center justify-between gap-4">
          <dt>{label}</dt>
          <dd className="flex gap-0.5">
            {keys.map((key) => (
              <Kbd key={key}>{key}</Kbd>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function InInput() {
  return (
    <div className="w-full max-w-xs">
      <InputGroup>
        <InputGroupAddon>
          <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search projects" aria-label="Search projects" />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function InTooltip() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>
        Hover for keys
      </TooltipTrigger>
      <TooltipContent>
        Toggle sidebar
        <span className="flex gap-0.5">
          <Kbd className="bg-background/15 text-background">⌘</Kbd>
          <Kbd className="bg-background/15 text-background">B</Kbd>
        </span>
      </TooltipContent>
    </Tooltip>
  )
}

export const entry: Entry = {
  slug: 'kbd',
  title: 'Kbd',
  group: 'Inputs',
  order: 90,
  summary: 'A key on the keyboard, for showing shortcuts next to a label.',
  imports: "import { Kbd } from '@dkrasniy/ui/components/kbd'",
  guidance: [
    'Use one Kbd per key, side by side in a flex row with gap-0.5. In a tight spot like an input, one Kbd with ⌘K is fine.',
    'Write modifier keys as symbols: ⌘ ⌥ ⇧ ⌃. Spell out the rest, like Esc and Enter.',
    'Only show shortcuts that work. List them in one place too, like a Keyboard shortcuts page.',
    'On a dark surface like a tooltip, pass bg-background/15 text-background.',
  ],
  examples: [
    {
      title: 'Keys',
      Demo: Keys,
      code: `<div className="flex items-center justify-between gap-4">
  <span>Toggle sidebar</span>
  <span className="flex gap-0.5">
    <Kbd>⌘</Kbd>
    <Kbd>B</Kbd>
  </span>
</div>`,
    },
    {
      title: 'In an input',
      Demo: InInput,
      code: `<InputGroup>
  <InputGroupAddon>
    <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search projects" aria-label="Search projects" />
  <InputGroupAddon align="inline-end">
    <Kbd>⌘K</Kbd>
  </InputGroupAddon>
</InputGroup>`,
    },
    {
      title: 'In a tooltip',
      Demo: InTooltip,
      code: `<TooltipContent>
  Toggle sidebar
  <span className="flex gap-0.5">
    <Kbd className="bg-background/15 text-background">⌘</Kbd>
    <Kbd className="bg-background/15 text-background">B</Kbd>
  </span>
</TooltipContent>`,
    },
  ],
}
