import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Calendar03Icon,
  GridViewIcon,
  ListViewIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from '@hugeicons/core-free-icons'
import { ToggleGroup, ToggleGroupItem } from '@dkrasniy/ui/components/toggle-group'
import type { Entry } from '../registry'

function Single() {
  return (
    <ToggleGroup aria-label="Alignment" defaultValue={['left']}>
      <ToggleGroupItem value="left" aria-label="Align left">
        <HugeiconsIcon icon={TextAlignLeftIcon} strokeWidth={2} />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <HugeiconsIcon icon={TextAlignCenterIcon} strokeWidth={2} />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <HugeiconsIcon icon={TextAlignRightIcon} strokeWidth={2} />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

function Multiple() {
  return (
    <ToggleGroup multiple aria-label="Text style" defaultValue={['bold']}>
      <ToggleGroupItem value="bold" aria-label="Bold">
        <HugeiconsIcon icon={TextBoldIcon} strokeWidth={2} />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <HugeiconsIcon icon={TextItalicIcon} strokeWidth={2} />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <HugeiconsIcon icon={TextUnderlineIcon} strokeWidth={2} />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

function AlwaysOne() {
  const [view, setView] = useState('list')
  return (
    <ToggleGroup
      variant="outline"
      aria-label="View"
      value={[view]}
      onValueChange={([next]) => {
        if (next) setView(next)
      }}
    >
      <ToggleGroupItem value="list">
        <HugeiconsIcon icon={ListViewIcon} strokeWidth={2} data-icon="inline-start" />
        List
      </ToggleGroupItem>
      <ToggleGroupItem value="grid">
        <HugeiconsIcon icon={GridViewIcon} strokeWidth={2} data-icon="inline-start" />
        Grid
      </ToggleGroupItem>
      <ToggleGroupItem value="calendar">
        <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} data-icon="inline-start" />
        Calendar
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export const entry: Entry = {
  slug: 'toggle-group',
  title: 'Toggle group',
  group: 'Actions',
  order: 30,
  summary:
    'A row of toggles where one or several stay pressed. Arrow keys move between them.',
  imports:
    "import { ToggleGroup, ToggleGroupItem } from '@dkrasniy/ui/components/toggle-group'",
  guidance: [
    'Use it for a few options that change something in place, like text alignment or list layout, and RadioGroup or Segmented for a value in a form.',
    'The value is always an array, even when only one item can be pressed, and multiple lets several stay pressed.',
    'Pressing the pressed item again empties the value, so ignore an empty array in onValueChange when one item must stay on.',
    'Set variant and size on the group, and every item picks them up.',
  ],
  examples: [
    {
      title: 'One at a time',
      Demo: Single,
      code: `<ToggleGroup aria-label="Alignment" defaultValue={['left']}>
  <ToggleGroupItem value="left" aria-label="Align left">
    <HugeiconsIcon icon={TextAlignLeftIcon} strokeWidth={2} />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center">
    <HugeiconsIcon icon={TextAlignCenterIcon} strokeWidth={2} />
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">
    <HugeiconsIcon icon={TextAlignRightIcon} strokeWidth={2} />
  </ToggleGroupItem>
</ToggleGroup>`,
    },
    {
      title: 'Several at once',
      Demo: Multiple,
      code: `<ToggleGroup multiple aria-label="Text style" value={styles} onValueChange={setStyles}>
  <ToggleGroupItem value="bold" aria-label="Bold">
    <HugeiconsIcon icon={TextBoldIcon} strokeWidth={2} />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic">
    <HugeiconsIcon icon={TextItalicIcon} strokeWidth={2} />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Underline">
    <HugeiconsIcon icon={TextUnderlineIcon} strokeWidth={2} />
  </ToggleGroupItem>
</ToggleGroup>`,
    },
    {
      title: 'Always one pressed',
      description: 'Pressing the current view again leaves it pressed.',
      Demo: AlwaysOne,
      code: `const [view, setView] = useState('list')

<ToggleGroup
  variant="outline"
  aria-label="View"
  value={[view]}
  onValueChange={([next]) => {
    if (next) setView(next)
  }}
>
  <ToggleGroupItem value="list">
    <HugeiconsIcon icon={ListViewIcon} strokeWidth={2} data-icon="inline-start" />
    List
  </ToggleGroupItem>
  <ToggleGroupItem value="grid">
    <HugeiconsIcon icon={GridViewIcon} strokeWidth={2} data-icon="inline-start" />
    Grid
  </ToggleGroupItem>
  <ToggleGroupItem value="calendar">
    <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} data-icon="inline-start" />
    Calendar
  </ToggleGroupItem>
</ToggleGroup>`,
    },
  ],
}
