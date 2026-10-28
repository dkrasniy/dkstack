import { Field, FieldLabel } from '@dkrasniy/ui/components/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@dkrasniy/ui/components/select'
import type { Entry } from '../registry'

const ROLES = [
  { value: 'owner', label: 'Owner' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
]

const SORTS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'name', label: 'Name' },
]

const AMERICAS = [
  { value: 'new-york', label: 'New York' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'los-angeles', label: 'Los Angeles' },
]

const EUROPE = [
  { value: 'london', label: 'London' },
  { value: 'berlin', label: 'Berlin' },
  { value: 'paris', label: 'Paris' },
]

const PLANS = [
  { value: 'free', label: 'Free' },
  { value: 'team', label: 'Team' },
  { value: 'enterprise', label: 'Enterprise' },
]

function Default() {
  return (
    <div className="w-full max-w-xs">
      <Field>
        <FieldLabel htmlFor="select-role">Role</FieldLabel>
        <Select items={ROLES} defaultValue="editor">
          <SelectTrigger id="select-role">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ROLES.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </div>
  )
}

function Sizes() {
  return (
    <>
      <Select items={SORTS}>
        <SelectTrigger aria-label="Sort by" className="w-40">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {SORTS.map((sort) => (
            <SelectItem key={sort.value} value={sort.value}>
              {sort.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select items={SORTS}>
        <SelectTrigger aria-label="Sort by" size="sm" className="w-40">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {SORTS.map((sort) => (
            <SelectItem key={sort.value} value={sort.value}>
              {sort.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}

function Groups() {
  return (
    <div className="w-full max-w-xs">
      <Field>
        <FieldLabel htmlFor="select-zone">Time zone</FieldLabel>
        <Select items={[...AMERICAS, ...EUROPE]} defaultValue="london">
          <SelectTrigger id="select-zone">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Americas</SelectLabel>
              {AMERICAS.map((zone) => (
                <SelectItem key={zone.value} value={zone.value}>
                  {zone.label}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Europe</SelectLabel>
              {EUROPE.map((zone) => (
                <SelectItem key={zone.value} value={zone.value}>
                  {zone.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </div>
  )
}

function Disabled() {
  return (
    <div className="grid w-full max-w-xl gap-6 sm:grid-cols-2">
      <Field data-disabled>
        <FieldLabel htmlFor="select-disabled">Role</FieldLabel>
        <Select items={ROLES} defaultValue="viewer" disabled>
          <SelectTrigger id="select-disabled">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ROLES.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel htmlFor="select-plan">Plan</FieldLabel>
        <Select items={PLANS} defaultValue="team">
          <SelectTrigger id="select-plan">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PLANS.map((plan) => (
              <SelectItem
                key={plan.value}
                value={plan.value}
                disabled={plan.value === 'enterprise'}
              >
                {plan.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </div>
  )
}

export const entry: Entry = {
  slug: 'select',
  title: 'Select',
  group: 'Inputs',
  order: 60,
  summary:
    'A button that opens a list of options below it. The chosen option gets a check.',
  imports: `import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@dkrasniy/ui/components/select'
import { Field, FieldLabel } from '@dkrasniy/ui/components/field'`,
  guidance: [
    'Pass items to Select as value and label pairs, or SelectValue shows the raw value, like "editor" instead of "Editor".',
    'Use Select for a short, fixed list, and Combobox when people need to type to find an option.',
    'Point the FieldLabel at the SelectTrigger by htmlFor and id, or give the trigger an aria-label when there is no visible label.',
    'Outside a Field, set a width class on the trigger so it keeps its width as the value changes.',
  ],
  examples: [
    {
      title: 'Default',
      Demo: Default,
      code: `const ROLES = [
  { value: 'owner', label: 'Owner' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
]

<Field>
  <FieldLabel htmlFor="role">Role</FieldLabel>
  <Select items={ROLES} defaultValue="editor">
    <SelectTrigger id="role">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {ROLES.map((role) => (
        <SelectItem key={role.value} value={role.value}>
          {role.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</Field>`,
    },
    {
      title: 'Sizes',
      description: 'Both show a placeholder until something is picked.',
      Demo: Sizes,
      code: `<SelectTrigger aria-label="Sort by" className="w-40">
  <SelectValue placeholder="Sort by" />
</SelectTrigger>

<SelectTrigger aria-label="Sort by" size="sm" className="w-40">
  <SelectValue placeholder="Sort by" />
</SelectTrigger>`,
    },
    {
      title: 'Groups',
      Demo: Groups,
      code: `<SelectContent>
  <SelectGroup>
    <SelectLabel>Americas</SelectLabel>
    <SelectItem value="new-york">New York</SelectItem>
    <SelectItem value="chicago">Chicago</SelectItem>
  </SelectGroup>
  <SelectSeparator />
  <SelectGroup>
    <SelectLabel>Europe</SelectLabel>
    <SelectItem value="london">London</SelectItem>
    <SelectItem value="berlin">Berlin</SelectItem>
  </SelectGroup>
</SelectContent>`,
    },
    {
      title: 'Disabled',
      description: 'Disable the whole select, or one option in it.',
      Demo: Disabled,
      code: `<Field data-disabled>
  <FieldLabel htmlFor="role">Role</FieldLabel>
  <Select items={ROLES} defaultValue="viewer" disabled>
    <SelectTrigger id="role">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {ROLES.map((role) => (
        <SelectItem key={role.value} value={role.value}>
          {role.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</Field>

<SelectContent>
  <SelectItem value="free">Free</SelectItem>
  <SelectItem value="team">Team</SelectItem>
  <SelectItem value="enterprise" disabled>
    Enterprise
  </SelectItem>
</SelectContent>`,
    },
  ],
}
