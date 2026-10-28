import { Field, FieldLabel } from '@dkrasniy/ui/components/field'
import { Textarea } from '@dkrasniy/ui/components/textarea'
import type { Entry } from '../registry'

function Default() {
  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="textarea-description">Description</FieldLabel>
        <Textarea
          id="textarea-description"
          placeholder="Pages and assets for the spring launch"
        />
      </Field>
    </div>
  )
}

function Grows() {
  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="textarea-notes">Notes</FieldLabel>
        <Textarea
          id="textarea-notes"
          className="max-h-40"
          defaultValue={
            'Kickoff on Monday.\n\nAgenda:\n- Goals for the quarter\n- Who owns each page\n- Review dates\n- Open questions'
          }
        />
      </Field>
    </div>
  )
}

function States() {
  return (
    <div className="grid w-full max-w-xl gap-6 sm:grid-cols-2">
      <Field data-invalid>
        <FieldLabel htmlFor="textarea-invalid">Invalid</FieldLabel>
        <Textarea id="textarea-invalid" defaultValue="Too short" aria-invalid />
      </Field>
      <Field data-disabled>
        <FieldLabel htmlFor="textarea-disabled">Disabled</FieldLabel>
        <Textarea id="textarea-disabled" placeholder="Add a note" disabled />
      </Field>
    </div>
  )
}

export const entry: Entry = {
  slug: 'textarea',
  title: 'Textarea',
  group: 'Inputs',
  order: 20,
  summary:
    'A multi-line text field that grows with what you type. It matches Input in outline, focus and invalid states.',
  imports: `import { Textarea } from '@dkrasniy/ui/components/textarea'
import { Field, FieldLabel } from '@dkrasniy/ui/components/field'`,
  guidance: [
    'It sizes to its content with no resize handle, so add a max-h class where it should stop growing and scroll.',
    'Set a min-h class to start it taller than two lines, since rows has no effect while it sizes to its content.',
    'Mark a bad value with aria-invalid, the same as Input.',
  ],
  examples: [
    {
      title: 'Default',
      Demo: Default,
      code: `<Field>
  <FieldLabel htmlFor="description">Description</FieldLabel>
  <Textarea id="description" placeholder="Pages and assets for the spring launch" />
</Field>`,
    },
    {
      title: 'Grows with the text',
      description:
        'With max-h-40 it grows to 160 pixels, then scrolls. Add a line to see it.',
      Demo: Grows,
      code: `<Textarea className="max-h-40" />`,
    },
    {
      title: 'States',
      Demo: States,
      code: `<Textarea defaultValue="Too short" aria-invalid />
<Textarea placeholder="Add a note" disabled />`,
    },
  ],
}
