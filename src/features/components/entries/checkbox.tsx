import { Checkbox } from '@dkrasniy/ui/components/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@dkrasniy/ui/components/field'
import { Label } from '@dkrasniy/ui/components/label'
import type { Entry } from '../registry'

function WithLabel() {
  return (
    <div className="flex flex-col gap-3">
      <Label>
        <Checkbox defaultChecked />
        Remember me
      </Label>
      <Label>
        <Checkbox />
        Keep me signed in on this device
      </Label>
    </div>
  )
}

function Described() {
  return (
    <div className="w-full max-w-sm">
      <Field orientation="horizontal">
        <Checkbox id="checkbox-public" />
        <FieldContent>
          <FieldLabel htmlFor="checkbox-public">Anyone with the link can view</FieldLabel>
          <FieldDescription>
            People outside the workspace can open the page.
          </FieldDescription>
        </FieldContent>
      </Field>
    </div>
  )
}

function Group() {
  return (
    <div className="w-full max-w-sm">
      <FieldSet>
        <FieldLegend variant="label">Email me about</FieldLegend>
        <FieldGroup className="gap-3">
          <Field orientation="horizontal">
            <Checkbox id="checkbox-comments" defaultChecked />
            <FieldLabel htmlFor="checkbox-comments">Comments</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="checkbox-mentions" defaultChecked />
            <FieldLabel htmlFor="checkbox-mentions">Mentions</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="checkbox-invites" />
            <FieldLabel htmlFor="checkbox-invites">Invites to a project</FieldLabel>
          </Field>
          <Field orientation="horizontal" data-disabled>
            <Checkbox id="checkbox-security" defaultChecked disabled />
            <FieldLabel htmlFor="checkbox-security">Security alerts</FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}

export const entry: Entry = {
  slug: 'checkbox',
  title: 'Checkbox',
  group: 'Inputs',
  order: 80,
  summary: 'A small square that fills blue with a check when on.',
  imports: `import { Checkbox } from '@dkrasniy/ui/components/checkbox'
import { Label } from '@dkrasniy/ui/components/label'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@dkrasniy/ui/components/field'`,
  guidance: [
    'Use a checkbox for a choice that applies when the form is saved, and a Switch for one that applies the moment it changes.',
    'Wrap it in a Label, or put it in a horizontal Field, so clicking the text toggles it too.',
    'Name a list of checkboxes with a FieldLegend variant="label" in a FieldSet.',
    'When a checkbox is disabled, set data-disabled on its Field too, so the label dims with the box.',
  ],
  examples: [
    {
      title: 'With a label',
      Demo: WithLabel,
      code: `<Label>
  <Checkbox defaultChecked />
  Remember me
</Label>`,
    },
    {
      title: 'With a description',
      Demo: Described,
      code: `<Field orientation="horizontal">
  <Checkbox id="public" />
  <FieldContent>
    <FieldLabel htmlFor="public">Anyone with the link can view</FieldLabel>
    <FieldDescription>People outside the workspace can open the page.</FieldDescription>
  </FieldContent>
</Field>`,
    },
    {
      title: 'Group',
      description: 'The last option is on and locked.',
      Demo: Group,
      code: `<FieldSet>
  <FieldLegend variant="label">Email me about</FieldLegend>
  <FieldGroup className="gap-3">
    <Field orientation="horizontal">
      <Checkbox id="comments" defaultChecked />
      <FieldLabel htmlFor="comments">Comments</FieldLabel>
    </Field>
    <Field orientation="horizontal">
      <Checkbox id="mentions" />
      <FieldLabel htmlFor="mentions">Mentions</FieldLabel>
    </Field>
    <Field orientation="horizontal" data-disabled>
      <Checkbox id="security" defaultChecked disabled />
      <FieldLabel htmlFor="security">Security alerts</FieldLabel>
    </Field>
  </FieldGroup>
</FieldSet>`,
    },
  ],
}
