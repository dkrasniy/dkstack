import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  LaptopIcon,
  SidebarRight01Icon,
  SmartPhone01Icon,
  Tablet01Icon,
} from '@hugeicons/core-free-icons'
import { PillButton, PillGroup } from '@dkrasniy/ui/components/pill-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@dkrasniy/ui/components/tooltip'
import type { Entry } from '../registry'

const WIDTHS = [
  { value: 'desktop', label: 'Desktop', icon: LaptopIcon },
  { value: 'tablet', label: 'Tablet', icon: Tablet01Icon },
  { value: 'phone', label: 'Phone', icon: SmartPhone01Icon },
]

const ITEMS = ['Header', 'Hero', 'Features', 'Footer']

function Widths() {
  const [width, setWidth] = useState('desktop')
  return (
    <PillGroup aria-label="Preview width">
      {WIDTHS.map((each) => (
        <Tooltip key={each.value}>
          <TooltipTrigger
            render={
              <PillButton
                aria-label={each.label}
                aria-pressed={width === each.value}
                onClick={() => setWidth(each.value)}
              />
            }
          >
            <HugeiconsIcon icon={each.icon} strokeWidth={2} />
          </TooltipTrigger>
          <TooltipContent>{each.label}</TooltipContent>
        </Tooltip>
      ))}
    </PillGroup>
  )
}

function Stepper() {
  const [index, setIndex] = useState(0)
  return (
    <div className="flex items-center gap-3">
      <span className="text-muted-foreground w-20 text-sm">{ITEMS[index]}</span>
      <PillGroup>
        <PillButton
          aria-label="Previous section"
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
        >
          <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} />
        </PillButton>
        <PillButton
          aria-label="Next section"
          disabled={index === ITEMS.length - 1}
          onClick={() => setIndex(index + 1)}
        >
          <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
        </PillButton>
      </PillGroup>
    </div>
  )
}

function Single() {
  const [open, setOpen] = useState(true)
  return (
    <PillGroup>
      <PillButton
        aria-label="Settings panel"
        aria-pressed={open}
        onClick={() => setOpen(!open)}
      >
        <HugeiconsIcon icon={SidebarRight01Icon} strokeWidth={2} />
      </PillButton>
    </PillGroup>
  )
}

export const entry: Entry = {
  slug: 'pill-group',
  title: 'Pill group',
  group: 'Inputs',
  order: 140,
  summary:
    'Small icon buttons in a white pill, for compact controls in a header or toolbar.',
  imports: `import { PillButton, PillGroup } from '@dkrasniy/ui/components/pill-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@dkrasniy/ui/components/tooltip'`,
  guidance: [
    'Use it for icon controls in a header, like a preview width switcher or previous and next.',
    'Set aria-pressed on a PillButton that toggles or picks, which gives it the grey background.',
    'Give every PillButton an aria-label and a Tooltip with the same words.',
    'PillButtons are sized for one icon, so use ToggleGroup or Segmented for text options.',
  ],
  examples: [
    {
      title: 'Pick one',
      Demo: Widths,
      code: `<PillGroup aria-label="Preview width">
  {WIDTHS.map((each) => (
    <Tooltip key={each.value}>
      <TooltipTrigger
        render={
          <PillButton
            aria-label={each.label}
            aria-pressed={width === each.value}
            onClick={() => setWidth(each.value)}
          />
        }
      >
        <HugeiconsIcon icon={each.icon} strokeWidth={2} />
      </TooltipTrigger>
      <TooltipContent>{each.label}</TooltipContent>
    </Tooltip>
  ))}
</PillGroup>`,
    },
    {
      title: 'Previous and next',
      description: 'Disable a button at the end of the list instead of hiding it.',
      Demo: Stepper,
      code: `<PillGroup>
  <PillButton aria-label="Previous section" disabled={index === 0} onClick={previous}>
    <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} />
  </PillButton>
  <PillButton aria-label="Next section" disabled={index === last} onClick={next}>
    <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
  </PillButton>
</PillGroup>`,
    },
    {
      title: 'One toggle',
      Demo: Single,
      code: `<PillGroup>
  <PillButton aria-label="Settings panel" aria-pressed={open} onClick={() => setOpen(!open)}>
    <HugeiconsIcon icon={SidebarRight01Icon} strokeWidth={2} />
  </PillButton>
</PillGroup>`,
    },
  ],
}
