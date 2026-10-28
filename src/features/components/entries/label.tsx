import { Checkbox } from '@dkrasniy/ui/components/checkbox'
import { Input } from '@dkrasniy/ui/components/input'
import { Label } from '@dkrasniy/ui/components/label'
import { Switch } from '@dkrasniy/ui/components/switch'
import type { Entry } from '../registry'

function ForInput() {
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="label-email">Email</Label>
      <Input id="label-email" type="email" placeholder="name@example.com" />
    </div>
  )
}

function Wrapping() {
  return (
    <div className="flex flex-col gap-3">
      <Label>
        <Checkbox defaultChecked />
        Remember me
      </Label>
      <Label>
        <Switch />
        Email me about comments
      </Label>
      <Label className="opacity-50">
        <Checkbox disabled />
        Share with everyone
      </Label>
    </div>
  )
}

export const entry: Entry = {
  slug: 'label',
  title: 'Label',
  group: 'Inputs',
  order: 40,
  summary:
    'Medium-weight text that names a control. It lines up an icon or control beside it.',
  imports: `import { Label } from '@dkrasniy/ui/components/label'
import { Input } from '@dkrasniy/ui/components/input'
import { Checkbox } from '@dkrasniy/ui/components/checkbox'
import { Switch } from '@dkrasniy/ui/components/switch'`,
  guidance: [
    'In a form, use FieldLabel inside a Field, which dims with a disabled field and lines up with the description and error.',
    'Wrap a checkbox, radio or switch in Label so clicking the text toggles it without an id.',
    'A disabled control inside a Label leaves the text at full strength, so add opacity-50 to the Label too.',
  ],
  examples: [
    {
      title: 'For an input',
      Demo: ForInput,
      code: `<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="name@example.com" />`,
    },
    {
      title: 'Wrapping a control',
      Demo: Wrapping,
      code: `<Label>
  <Checkbox defaultChecked />
  Remember me
</Label>
<Label>
  <Switch />
  Email me about comments
</Label>
<Label className="opacity-50">
  <Checkbox disabled />
  Share with everyone
</Label>`,
    },
  ],
}
