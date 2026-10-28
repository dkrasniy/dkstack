import { Button } from '@dkrasniy/ui/components/button'
import { Separator } from '@dkrasniy/ui/components/separator'
import type { Entry } from '../registry'

function Horizontal() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 text-sm">
      <div>
        <p className="font-medium">Northwind</p>
        <p className="text-muted-foreground">12 pages · 3 members</p>
      </div>
      <Separator />
      <div className="text-muted-foreground flex justify-between">
        Last published
        <span className="text-foreground">Today at 10:20</span>
      </div>
    </div>
  )
}

function Vertical() {
  return (
    <div className="flex h-8 items-center gap-1">
      <Button variant="ghost" size="sm">
        Edit
      </Button>
      <Button variant="ghost" size="sm">
        Preview
      </Button>
      <Separator orientation="vertical" className="mx-1 my-1.5" />
      <Button variant="ghost" size="sm">
        Share
      </Button>
    </div>
  )
}

export const entry: Entry = {
  slug: 'separator',
  title: 'Separator',
  group: 'Surfaces',
  order: 70,
  summary: 'A one pixel line in the border color, across or down.',
  imports: "import { Separator } from '@dkrasniy/ui/components/separator'",
  guidance: [
    'Reach for spacing first. Add a line only when two groups sit close and would read as one.',
    'A vertical separator stretches to the height of its row, so give the row a height and trim the line with vertical margin.',
  ],
  examples: [
    {
      title: 'Horizontal',
      Demo: Horizontal,
      code: `<div className="flex flex-col gap-4">
  <ProjectSummary />
  <Separator />
  <PublishStatus />
</div>`,
    },
    {
      title: 'Vertical',
      Demo: Vertical,
      code: `<div className="flex h-8 items-center gap-1">
  <Button variant="ghost" size="sm">Edit</Button>
  <Button variant="ghost" size="sm">Preview</Button>
  <Separator orientation="vertical" className="mx-1 my-1.5" />
  <Button variant="ghost" size="sm">Share</Button>
</div>`,
    },
  ],
}
