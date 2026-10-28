import { useState } from 'react'
import { FieldDescription, FieldLegend, FieldSet } from '@dkrasniy/ui/components/field'
import { Segmented } from '@dkrasniy/ui/components/segmented'
import type { Entry } from '../registry'

const BILLING = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
]

const ROLES = [
  { value: 'viewer', label: 'Viewer', description: 'Can open and comment on pages.' },
  { value: 'editor', label: 'Editor', description: 'Can also edit and publish pages.' },
  {
    value: 'admin',
    label: 'Admin',
    description: 'Can also invite people and change roles.',
  },
]

function Default() {
  const [billing, setBilling] = useState('monthly')
  return (
    <div className="w-full max-w-60">
      <Segmented
        aria-label="Billing"
        value={billing}
        options={BILLING}
        onValueChange={(next: string) => setBilling(next)}
      />
    </div>
  )
}

function WithLegend() {
  const [role, setRole] = useState('editor')
  return (
    <div className="w-full max-w-xs">
      <FieldSet className="gap-3">
        <FieldLegend variant="label">Role</FieldLegend>
        <Segmented
          value={role}
          options={ROLES}
          onValueChange={(next: string) => setRole(next)}
        />
        <FieldDescription>
          {ROLES.find((each) => each.value === role)?.description}
        </FieldDescription>
      </FieldSet>
    </div>
  )
}

export const entry: Entry = {
  slug: 'segmented',
  title: 'Segmented',
  group: 'Inputs',
  order: 120,
  summary:
    'Two to four options in a grey track. A white pill slides to the one that is picked.',
  imports: `import { Segmented } from '@dkrasniy/ui/components/segmented'
import { FieldDescription, FieldLegend, FieldSet } from '@dkrasniy/ui/components/field'`,
  guidance: [
    'Use it to pick a form value from two to four options, and Tabs to switch between panels of content.',
    'One option is always picked and value is required, so keep it in state.',
    'Segments share the width equally, so keep labels to one or two short words.',
    'Name it with aria-label or a FieldLegend in a FieldSet, and use a FieldDescription below to say what the picked option means.',
  ],
  examples: [
    {
      title: 'Default',
      Demo: Default,
      code: `const [billing, setBilling] = useState('monthly')

<Segmented
  aria-label="Billing"
  value={billing}
  options={[
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ]}
  onValueChange={(next: string) => setBilling(next)}
/>`,
    },
    {
      title: 'With a legend',
      description: 'The description changes with the role.',
      Demo: WithLegend,
      code: `<FieldSet className="gap-3">
  <FieldLegend variant="label">Role</FieldLegend>
  <Segmented
    value={role}
    options={ROLES}
    onValueChange={(next: string) => setRole(next)}
  />
  <FieldDescription>
    {ROLES.find((each) => each.value === role)?.description}
  </FieldDescription>
</FieldSet>`,
    },
  ],
}
