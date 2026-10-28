import { useState } from 'react'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@dkrasniy/ui/components/field'
import { Label } from '@dkrasniy/ui/components/label'
import { Switch } from '@dkrasniy/ui/components/switch'
import type { Entry } from '../registry'

function WithLabel() {
  const [on, setOn] = useState(true)
  return (
    <Label>
      <Switch checked={on} onCheckedChange={setOn} />
      Notifications
    </Label>
  )
}

function Settings() {
  return (
    <div className="w-full max-w-sm">
      <FieldGroup className="gap-5">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="switch-summary">Weekly summary</FieldLabel>
            <FieldDescription>A recap of changes every Monday.</FieldDescription>
          </FieldContent>
          <Switch id="switch-summary" defaultChecked />
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="switch-sounds">Sounds</FieldLabel>
            <FieldDescription>Play a sound when a message arrives.</FieldDescription>
          </FieldContent>
          <Switch id="switch-sounds" />
        </Field>
        <Field orientation="horizontal" data-disabled>
          <FieldContent>
            <FieldLabel htmlFor="switch-sso">Require single sign-on</FieldLabel>
            <FieldDescription>Only an owner can change this.</FieldDescription>
          </FieldContent>
          <Switch id="switch-sso" disabled />
        </Field>
      </FieldGroup>
    </div>
  )
}

export const entry: Entry = {
  slug: 'switch',
  title: 'Switch',
  group: 'Inputs',
  order: 100,
  summary: 'An on and off control. The thumb slides across and the track fills blue.',
  imports: `import { Switch } from '@dkrasniy/ui/components/switch'
import { Label } from '@dkrasniy/ui/components/label'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@dkrasniy/ui/components/field'`,
  guidance: [
    'Use a switch for a setting that applies the moment it flips, and a Checkbox when the change waits for a Save button.',
    'Keep the label the same in both states, since the switch already shows whether it is on.',
    'In a list of settings, put FieldContent first and the Switch last in a horizontal Field, so the switches line up on the right.',
    'When a setting is locked, set data-disabled on the Field and say in the description who can change it.',
  ],
  examples: [
    {
      title: 'With a label',
      Demo: WithLabel,
      code: `const [on, setOn] = useState(true)

<Label>
  <Switch checked={on} onCheckedChange={setOn} />
  Notifications
</Label>`,
    },
    {
      title: 'Settings list',
      Demo: Settings,
      code: `<FieldGroup className="gap-5">
  <Field orientation="horizontal">
    <FieldContent>
      <FieldLabel htmlFor="summary">Weekly summary</FieldLabel>
      <FieldDescription>A recap of changes every Monday.</FieldDescription>
    </FieldContent>
    <Switch id="summary" defaultChecked />
  </Field>
  <Field orientation="horizontal" data-disabled>
    <FieldContent>
      <FieldLabel htmlFor="sso">Require single sign-on</FieldLabel>
      <FieldDescription>Only an owner can change this.</FieldDescription>
    </FieldContent>
    <Switch id="sso" disabled />
  </Field>
</FieldGroup>`,
    },
  ],
}
