import { Field, FieldLabel } from '@dkrasniy/ui/components/field'
import { Input } from '@dkrasniy/ui/components/input'
import type { Entry } from '../registry'

function Default() {
  return (
    <div className="w-full max-w-xs">
      <Field>
        <FieldLabel htmlFor="input-name">Project name</FieldLabel>
        <Input id="input-name" placeholder="Atlas" />
      </Field>
    </div>
  )
}

function States() {
  return (
    <div className="grid w-full max-w-xl gap-6 sm:grid-cols-3">
      <Field>
        <FieldLabel htmlFor="input-value">With a value</FieldLabel>
        <Input id="input-value" defaultValue="Atlas" />
      </Field>
      <Field data-invalid>
        <FieldLabel htmlFor="input-invalid">Invalid</FieldLabel>
        <Input id="input-invalid" defaultValue="atlas@" aria-invalid />
      </Field>
      <Field data-disabled>
        <FieldLabel htmlFor="input-disabled">Disabled</FieldLabel>
        <Input id="input-disabled" placeholder="Atlas" disabled />
      </Field>
    </div>
  )
}

function Types() {
  return (
    <div className="grid w-full max-w-xl gap-6 sm:grid-cols-2">
      <Field>
        <FieldLabel htmlFor="input-email">Email</FieldLabel>
        <Input id="input-email" type="email" placeholder="name@example.com" />
      </Field>
      <Field>
        <FieldLabel htmlFor="input-file">Cover image</FieldLabel>
        <Input id="input-file" type="file" accept="image/*" />
      </Field>
    </div>
  )
}

export const entry: Entry = {
  slug: 'input',
  title: 'Input',
  group: 'Inputs',
  order: 10,
  summary: 'A single-line text field with a soft outline that turns blue on focus.',
  imports: `import { Input } from '@dkrasniy/ui/components/input'
import { Field, FieldLabel } from '@dkrasniy/ui/components/field'`,
  guidance: [
    'Put every input in a Field with a FieldLabel that points at it by htmlFor and id.',
    'Mark a bad value with aria-invalid on the input, which turns the outline red and tells screen readers.',
    'Inputs fill their container, so size one to its expected value with a max width on the wrapper.',
    'Use the placeholder for an example value, never for the label, because it disappears once someone types.',
  ],
  examples: [
    {
      title: 'Default',
      Demo: Default,
      code: `<Field>
  <FieldLabel htmlFor="name">Project name</FieldLabel>
  <Input id="name" placeholder="Atlas" />
</Field>`,
    },
    {
      title: 'States',
      Demo: States,
      code: `<Input defaultValue="Atlas" />
<Input defaultValue="atlas@" aria-invalid />
<Input placeholder="Atlas" disabled />`,
    },
    {
      title: 'Types',
      description: 'Any native type works. File inputs get a matching button.',
      Demo: Types,
      code: `<Input type="email" placeholder="name@example.com" />
<Input type="file" accept="image/*" />`,
    },
  ],
}
