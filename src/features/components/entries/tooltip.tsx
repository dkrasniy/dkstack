import { HugeiconsIcon } from '@hugeicons/react'
import {
  Copy01Icon,
  Redo03Icon,
  Search01Icon,
  SidebarLeftIcon,
  Undo03Icon,
} from '@hugeicons/core-free-icons'
import { Button } from '@dkrasniy/ui/components/button'
import { Kbd } from '@dkrasniy/ui/components/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@dkrasniy/ui/components/tooltip'
import type { Entry } from '../registry'

const KEY = 'bg-background/15 text-background'

function Labels() {
  return (
    <>
      <Tooltip>
        <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Undo" />}>
          <HugeiconsIcon icon={Undo03Icon} strokeWidth={2} />
        </TooltipTrigger>
        <TooltipContent>Undo</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Redo" />}>
          <HugeiconsIcon icon={Redo03Icon} strokeWidth={2} />
        </TooltipTrigger>
        <TooltipContent>Redo</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger
          render={<Button variant="ghost" size="icon" aria-label="Duplicate" />}
        >
          <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
        </TooltipTrigger>
        <TooltipContent side="bottom">Duplicate</TooltipContent>
      </Tooltip>
    </>
  )
}

function Keys() {
  return (
    <>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          <HugeiconsIcon icon={Search01Icon} strokeWidth={2} data-icon="inline-start" />
          Search
        </TooltipTrigger>
        <TooltipContent>
          Search projects
          <span className="flex gap-0.5">
            <Kbd className={KEY}>⌘</Kbd>
            <Kbd className={KEY}>K</Kbd>
          </span>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Undo" />}>
          <HugeiconsIcon icon={Undo03Icon} strokeWidth={2} />
        </TooltipTrigger>
        <TooltipContent>
          Undo
          <span className="flex gap-0.5">
            <Kbd className={KEY}>⌘</Kbd>
            <Kbd className={KEY}>Z</Kbd>
          </span>
        </TooltipContent>
      </Tooltip>
    </>
  )
}

function Delayed() {
  return (
    <Tooltip>
      <TooltipTrigger
        delay={500}
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Collapse navigation" />
        }
      >
        <HugeiconsIcon icon={SidebarLeftIcon} strokeWidth={2} />
      </TooltipTrigger>
      <TooltipContent side="right">
        Collapse navigation
        <span className="flex gap-0.5">
          <Kbd className={KEY}>⌘</Kbd>
          <Kbd className={KEY}>B</Kbd>
        </span>
      </TooltipContent>
    </Tooltip>
  )
}

export const entry: Entry = {
  slug: 'tooltip',
  title: 'Tooltip',
  group: 'Overlays',
  order: 80,
  summary:
    'A short label for a control. It scales in from 90% with a little spring, and fades out in 50ms.',
  imports:
    "import { Tooltip, TooltipContent, TooltipTrigger } from '@dkrasniy/ui/components/tooltip'",
  guidance: [
    'Give every icon-only button a tooltip with the same words as its aria-label.',
    'Keep it to a few words. If there is a shortcut, put it after the label as Kbd keys.',
    'Kbd inside a tooltip takes bg-background/15 text-background, so the keys read on the dark fill. The tooltip trims its right padding to fit them.',
    'Tooltips open at once by default, because TooltipProvider has delay 0. Add delay={500} to buttons people pass over on the way to something else.',
    'Pass the trigger through render so the tooltip attaches to your Button.',
  ],
  examples: [
    {
      title: 'Labels',
      description:
        'Move from one button to the next. The second tooltip swaps in without animating again.',
      Demo: Labels,
      code: `<Tooltip>
  <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Undo" />}>
    <HugeiconsIcon icon={Undo03Icon} strokeWidth={2} />
  </TooltipTrigger>
  <TooltipContent>Undo</TooltipContent>
</Tooltip>`,
    },
    {
      title: 'With keys',
      Demo: Keys,
      code: `<Tooltip>
  <TooltipTrigger render={<Button variant="outline" />}>Search</TooltipTrigger>
  <TooltipContent>
    Search projects
    <span className="flex gap-0.5">
      <Kbd className="bg-background/15 text-background">⌘</Kbd>
      <Kbd className="bg-background/15 text-background">K</Kbd>
    </span>
  </TooltipContent>
</Tooltip>`,
    },
    {
      title: 'Delay',
      description:
        'The sidebar toggle waits 500ms, so the tooltip stays out of the way when you reach past it.',
      Demo: Delayed,
      code: `<Tooltip>
  <TooltipTrigger
    delay={500}
    render={<Button variant="ghost" size="icon-sm" aria-label="Collapse navigation" />}
  >
    <HugeiconsIcon icon={SidebarLeftIcon} strokeWidth={2} />
  </TooltipTrigger>
  <TooltipContent side="right">
    Collapse navigation
    <span className="flex gap-0.5">
      <Kbd className="bg-background/15 text-background">⌘</Kbd>
      <Kbd className="bg-background/15 text-background">B</Kbd>
    </span>
  </TooltipContent>
</Tooltip>`,
    },
  ],
}
