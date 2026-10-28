import { Checkbox } from '@dkrasniy/ui/components/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@dkrasniy/ui/components/field'
import { Input } from '@dkrasniy/ui/components/input'
import { Switch } from '@dkrasniy/ui/components/switch'
import type { Entry } from '../registry'

function Described() {
  return (
    <div className="w-full max-w-xs">
      <Field>
        <FieldLabel htmlFor="field-name">Project name</FieldLabel>
        <Input id="field-name" placeholder="Atlas" />
        <FieldDescription>Shown in the sidebar and in links.</FieldDescription>
      </Field>
    </div>
  )
}

function Invalid() {
  return (
    <div className="w-full max-w-xs">
      <Field data-invalid>
        <FieldLabel htmlFor="field-email">Email</FieldLabel>
        <Input
          id="field-email"
          type="email"
          defaultValue="sam@example"
          aria-invalid
          aria-describedby="field-email-error"
        />
        <FieldError id="field-email-error">
          Enter an email with a domain, like sam@example.com.
        </FieldError>
      </Field>
    </div>
  )
}

function Disabled() {
  return (
    <div className="w-full max-w-xs">
      <Field data-disabled>
        <FieldLabel htmlFor="field-workspace">Workspace</FieldLabel>
        <Input id="field-workspace" defaultValue="Design team" disabled />
        <FieldDescription>Only an owner can rename the workspace.</FieldDescription>
      </Field>
    </div>
  )
}

function Horizontal() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Field orientation="horizontal">
        <Checkbox id="field-mentions" defaultChecked />
        <FieldContent>
          <FieldLabel htmlFor="field-mentions">Mentions</FieldLabel>
          <FieldDescription>When someone mentions you in a comment.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="field-summary">Weekly summary</FieldLabel>
          <FieldDescription>A recap of changes every Monday.</FieldDescription>
        </FieldContent>
        <Switch id="field-summary" />
      </Field>
    </div>
  )
}

function Fieldset() {
  return (
    <div className="w-full max-w-sm">
      <FieldSet>
        <FieldLegend>Profile</FieldLegend>
        <FieldDescription>Other people in the workspace see this.</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-full-name">Full name</FieldLabel>
            <Input id="field-full-name" placeholder="Sam Lee" />
          </Field>
          <Field>
            <FieldLabel htmlFor="field-title">Title</FieldLabel>
            <Input id="field-title" placeholder="Designer" />
          </Field>
          <FieldSeparator />
          <Field orientation="horizontal">
            <Checkbox id="field-show-email" />
            <FieldLabel htmlFor="field-show-email">
              Show my email on my profile
            </FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}

export const entry: Entry = {
  slug: 'field',
  title: 'Field',
  group: 'Inputs',
  order: 50,
  summary:
    'Lays out a control with its label, description and error, and carries the invalid and disabled states to all of them.',
  imports: `import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@dkrasniy/ui/components/field'
import { Input } from '@dkrasniy/ui/components/input'
import { Checkbox } from '@dkrasniy/ui/components/checkbox'
import { Switch } from '@dkrasniy/ui/components/switch'`,
  guidance: [
    'Set data-invalid on the Field to turn the label red, and aria-invalid on the control to outline it in red and tell screen readers.',
    'Set data-disabled on the Field as well as disabled on the control, so the label dims with it.',
    'FieldError takes children or an errors array from a form library, drops repeated messages, and lists several as bullets.',
    'For a checkbox or switch with text beside it, use orientation="horizontal" and wrap the label and description in FieldContent.',
    'Group related fields in a FieldSet with a FieldLegend, using variant="label" when the set is a single control like a radio group.',
  ],
  examples: [
    {
      title: 'Label and description',
      Demo: Described,
      code: `<Field>
  <FieldLabel htmlFor="name">Project name</FieldLabel>
  <Input id="name" placeholder="Atlas" />
  <FieldDescription>Shown in the sidebar and in links.</FieldDescription>
</Field>`,
    },
    {
      title: 'Invalid',
      description: 'The label and the message turn red. The description stays grey.',
      Demo: Invalid,
      code: `<Field data-invalid={Boolean(error)}>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input
    id="email"
    type="email"
    aria-invalid={Boolean(error)}
    aria-describedby="email-error"
  />
  <FieldError id="email-error">{error}</FieldError>
</Field>`,
    },
    {
      title: 'Disabled',
      Demo: Disabled,
      code: `<Field data-disabled>
  <FieldLabel htmlFor="workspace">Workspace</FieldLabel>
  <Input id="workspace" defaultValue="Design team" disabled />
  <FieldDescription>Only an owner can rename the workspace.</FieldDescription>
</Field>`,
    },
    {
      title: 'Horizontal',
      description: 'Put the control first for a checkbox, and last for a switch.',
      Demo: Horizontal,
      code: `<Field orientation="horizontal">
  <Checkbox id="mentions" />
  <FieldContent>
    <FieldLabel htmlFor="mentions">Mentions</FieldLabel>
    <FieldDescription>When someone mentions you in a comment.</FieldDescription>
  </FieldContent>
</Field>

<Field orientation="horizontal">
  <FieldContent>
    <FieldLabel htmlFor="summary">Weekly summary</FieldLabel>
    <FieldDescription>A recap of changes every Monday.</FieldDescription>
  </FieldContent>
  <Switch id="summary" />
</Field>`,
    },
    {
      title: 'Fieldset',
      Demo: Fieldset,
      code: `<FieldSet>
  <FieldLegend>Profile</FieldLegend>
  <FieldDescription>Other people in the workspace see this.</FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="full-name">Full name</FieldLabel>
      <Input id="full-name" />
    </Field>
    <Field>
      <FieldLabel htmlFor="title">Title</FieldLabel>
      <Input id="title" />
    </Field>
    <FieldSeparator />
    <Field orientation="horizontal">
      <Checkbox id="show-email" />
      <FieldLabel htmlFor="show-email">Show my email on my profile</FieldLabel>
    </Field>
  </FieldGroup>
</FieldSet>`,
    },
  ],
}
