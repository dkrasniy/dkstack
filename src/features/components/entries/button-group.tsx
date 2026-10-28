import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowDown01Icon, Redo03Icon, Undo03Icon } from '@hugeicons/core-free-icons'
import { Button } from '@dkrasniy/ui/components/button'
import { ButtonGroup } from '@dkrasniy/ui/components/button-group'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@dkrasniy/ui/components/dropdown-menu'
import type { Entry } from '../registry'

function Outline() {
  return (
    <>
      <ButtonGroup>
        <Button variant="outline" size="icon-sm" aria-label="Undo">
          <HugeiconsIcon icon={Undo03Icon} strokeWidth={2} />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Redo">
          <HugeiconsIcon icon={Redo03Icon} strokeWidth={2} />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm">
          Day
        </Button>
        <Button variant="outline" size="sm">
          Week
        </Button>
        <Button variant="outline" size="sm">
          Month
        </Button>
      </ButtonGroup>
    </>
  )
}

function Split() {
  return (
    <ButtonGroup>
      <Button variant="outline">Export</Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" size="icon" aria-label="Export options" />}
        >
          <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Export as CSV</DropdownMenuItem>
          <DropdownMenuItem>Export as PDF</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}

export const entry: Entry = {
  slug: 'button-group',
  title: 'Button group',
  group: 'Actions',
  order: 10,
  summary:
    'Joins related buttons into one pill. Outline buttons share a single outline with a hairline between them.',
  imports: `import { ButtonGroup } from '@dkrasniy/ui/components/button-group'
import { Button } from '@dkrasniy/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@dkrasniy/ui/components/dropdown-menu'`,
  guidance: [
    'Group buttons that act on the same thing, like undo and redo or a set of date ranges.',
    'Use outline buttons inside, since the group draws one shared outline and drops theirs.',
    'Render a DropdownMenuTrigger as an outline Button at the end to make a split button.',
  ],
  examples: [
    {
      title: 'Outline',
      Demo: Outline,
      code: `<ButtonGroup>
  <Button variant="outline" size="icon-sm" aria-label="Undo">
    <HugeiconsIcon icon={Undo03Icon} strokeWidth={2} />
  </Button>
  <Button variant="outline" size="icon-sm" aria-label="Redo">
    <HugeiconsIcon icon={Redo03Icon} strokeWidth={2} />
  </Button>
</ButtonGroup>

<ButtonGroup>
  <Button variant="outline" size="sm">Day</Button>
  <Button variant="outline" size="sm">Week</Button>
  <Button variant="outline" size="sm">Month</Button>
</ButtonGroup>`,
    },
    {
      title: 'Split button',
      description:
        'The main action on the left, and a menu of related ones on the right.',
      Demo: Split,
      code: `<ButtonGroup>
  <Button variant="outline">Export</Button>
  <DropdownMenu>
    <DropdownMenuTrigger
      render={<Button variant="outline" size="icon" aria-label="Export options" />}
    >
      <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Export as CSV</DropdownMenuItem>
      <DropdownMenuItem>Export as PDF</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</ButtonGroup>`,
    },
  ],
}
