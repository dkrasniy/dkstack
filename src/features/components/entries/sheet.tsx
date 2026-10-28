import { Button } from '@dkrasniy/ui/components/button'
import { Field, FieldLabel } from '@dkrasniy/ui/components/field'
import { Input } from '@dkrasniy/ui/components/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@dkrasniy/ui/components/sheet'
import { Textarea } from '@dkrasniy/ui/components/textarea'
import type { Entry } from '../registry'

function Edit() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Edit details</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Page details</SheetTitle>
          <SheetDescription>Shown in search results and link previews.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-6">
          <Field>
            <FieldLabel htmlFor="demo-sheet-title">Title</FieldLabel>
            <Input id="demo-sheet-title" defaultValue="Pricing" />
          </Field>
          <Field>
            <FieldLabel htmlFor="demo-sheet-description">Description</FieldLabel>
            <Textarea
              id="demo-sheet-description"
              defaultValue="Plans for teams of every size."
            />
          </Field>
        </div>
        <SheetFooter>
          <SheetClose render={<Button />}>Save</SheetClose>
          <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

const SIDES = ['top', 'right', 'bottom', 'left'] as const

function Sides() {
  return SIDES.map((side) => (
    <Sheet key={side}>
      <SheetTrigger render={<Button variant="secondary" />}>
        {side.charAt(0).toUpperCase() + side.slice(1)}
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Opens from the {side}.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ))
}

export const entry: Entry = {
  slug: 'sheet',
  title: 'Sheet',
  group: 'Overlays',
  order: 30,
  summary:
    'A panel that slides in from an edge of the screen over a blurred page. It fills the height and is up to 24rem wide.',
  imports: `import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@dkrasniy/ui/components/sheet'`,
  guidance: [
    'Use a sheet to edit the details of something while the page behind it stays in view. For a single question, use a dialog.',
    'SheetHeader and SheetFooter carry their own p-6. Give the body px-6 so it lines up with them.',
    'SheetFooter pushes itself to the bottom with mt-auto and stacks its buttons. Put the main action first.',
  ],
  examples: [
    {
      title: 'Edit form',
      Demo: Edit,
      code: `<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>Edit details</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Page details</SheetTitle>
      <SheetDescription>Shown in search results and link previews.</SheetDescription>
    </SheetHeader>
    <div className="flex flex-col gap-4 px-6">
      <Field>
        <FieldLabel htmlFor="page-title">Title</FieldLabel>
        <Input id="page-title" defaultValue={page.title} />
      </Field>
      <Field>
        <FieldLabel htmlFor="page-description">Description</FieldLabel>
        <Textarea id="page-description" defaultValue={page.description} />
      </Field>
    </div>
    <SheetFooter>
      <SheetClose render={<Button />}>Save</SheetClose>
      <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
    },
    {
      title: 'Sides',
      description: 'Top and bottom sheets span the width and grow to fit their content.',
      Demo: Sides,
      code: `<Sheet>
  <SheetTrigger render={<Button variant="secondary" />}>Filters</SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Filters</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
    },
  ],
}
