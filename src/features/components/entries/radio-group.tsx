import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from '@dkrasniy/ui/components/field'
import { Label } from '@dkrasniy/ui/components/label'
import { RadioGroup, RadioGroupItem } from '@dkrasniy/ui/components/radio-group'
import type { Entry } from '../registry'

const VISIBILITY = [
  { value: 'private', label: 'Private', description: 'Only you can see it.' },
  {
    value: 'workspace',
    label: 'Workspace',
    description: 'Everyone in the workspace can see it.',
  },
  {
    value: 'public',
    label: 'Public',
    description: 'Ask an owner to turn on public links.',
    disabled: true,
  },
]

const BILLING = [
  { value: 'monthly', label: 'Monthly', description: '$12 per person each month.' },
  { value: 'yearly', label: 'Yearly', description: '$120 per person each year.' },
]

function Default() {
  return (
    <FieldSet>
      <FieldLegend variant="label">Density</FieldLegend>
      <RadioGroup defaultValue="comfortable">
        <Label>
          <RadioGroupItem value="compact" />
          Compact
        </Label>
        <Label>
          <RadioGroupItem value="comfortable" />
          Comfortable
        </Label>
      </RadioGroup>
    </FieldSet>
  )
}

function Described() {
  return (
    <div className="w-full max-w-sm">
      <FieldSet>
        <FieldLegend variant="label">Who can see this project</FieldLegend>
        <RadioGroup defaultValue="workspace">
          {VISIBILITY.map((option) => (
            <Field
              key={option.value}
              orientation="horizontal"
              data-disabled={option.disabled}
            >
              <RadioGroupItem
                id={`radio-${option.value}`}
                value={option.value}
                disabled={option.disabled}
              />
              <FieldContent>
                <FieldLabel htmlFor={`radio-${option.value}`}>{option.label}</FieldLabel>
                <FieldDescription>{option.description}</FieldDescription>
              </FieldContent>
            </Field>
          ))}
        </RadioGroup>
      </FieldSet>
    </div>
  )
}

function Cards() {
  return (
    <div className="w-full max-w-sm">
      <FieldSet>
        <FieldLegend variant="label">Billing</FieldLegend>
        <RadioGroup defaultValue="yearly">
          {BILLING.map((option) => (
            <FieldLabel key={option.value}>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>{option.label}</FieldTitle>
                  <FieldDescription>{option.description}</FieldDescription>
                </FieldContent>
                <RadioGroupItem value={option.value} />
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
      </FieldSet>
    </div>
  )
}

export const entry: Entry = {
  slug: 'radio-group',
  title: 'Radio group',
  group: 'Inputs',
  order: 90,
  summary:
    'A set of round options where exactly one is chosen. Arrow keys move the choice.',
  imports: `import { RadioGroup, RadioGroupItem } from '@dkrasniy/ui/components/radio-group'
import { Label } from '@dkrasniy/ui/components/label'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from '@dkrasniy/ui/components/field'`,
  guidance: [
    'Use radios for two to five options people should compare side by side, Select for a longer list, and Segmented for a compact one.',
    'Name the group with a FieldLegend variant="label" inside a FieldSet.',
    'Wrap each item in a Label, or pair it with a FieldLabel by id, so clicking the text picks it.',
    'For options that need a sentence each, wrap a horizontal Field in a FieldLabel to make a card that is clickable all over and turns grey when picked.',
  ],
  examples: [
    {
      title: 'Default',
      Demo: Default,
      code: `<FieldSet>
  <FieldLegend variant="label">Density</FieldLegend>
  <RadioGroup defaultValue="comfortable">
    <Label>
      <RadioGroupItem value="compact" />
      Compact
    </Label>
    <Label>
      <RadioGroupItem value="comfortable" />
      Comfortable
    </Label>
  </RadioGroup>
</FieldSet>`,
    },
    {
      title: 'With descriptions',
      description: 'Say why an option is disabled in its description.',
      Demo: Described,
      code: `<RadioGroup defaultValue="workspace">
  <Field orientation="horizontal">
    <RadioGroupItem id="workspace" value="workspace" />
    <FieldContent>
      <FieldLabel htmlFor="workspace">Workspace</FieldLabel>
      <FieldDescription>Everyone in the workspace can see it.</FieldDescription>
    </FieldContent>
  </Field>
  <Field orientation="horizontal" data-disabled>
    <RadioGroupItem id="public" value="public" disabled />
    <FieldContent>
      <FieldLabel htmlFor="public">Public</FieldLabel>
      <FieldDescription>Ask an owner to turn on public links.</FieldDescription>
    </FieldContent>
  </Field>
</RadioGroup>`,
    },
    {
      title: 'Cards',
      Demo: Cards,
      code: `<RadioGroup defaultValue="yearly">
  <FieldLabel>
    <Field orientation="horizontal">
      <FieldContent>
        <FieldTitle>Monthly</FieldTitle>
        <FieldDescription>$12 per person each month.</FieldDescription>
      </FieldContent>
      <RadioGroupItem value="monthly" />
    </Field>
  </FieldLabel>
  <FieldLabel>
    <Field orientation="horizontal">
      <FieldContent>
        <FieldTitle>Yearly</FieldTitle>
        <FieldDescription>$120 per person each year.</FieldDescription>
      </FieldContent>
      <RadioGroupItem value="yearly" />
    </Field>
  </FieldLabel>
</RadioGroup>`,
    },
  ],
}
