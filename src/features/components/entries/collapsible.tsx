import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@dkrasniy/ui/components/collapsible'
import { Field, FieldLabel } from '@dkrasniy/ui/components/field'
import { Input } from '@dkrasniy/ui/components/input'
import { ProgressCheck } from '@dkrasniy/ui/components/progress-check'
import type { Entry } from '../registry'

const PANEL =
  'ease-smooth h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0'

const STEPS = ['Gather content', 'Build pages', 'Deploy']

function Status() {
  return (
    <Collapsible className="bg-card shadow-card w-full max-w-md rounded-lg">
      <CollapsibleTrigger className="group flex w-full items-center gap-3 px-4 py-3 text-start">
        <ProgressCheck done tone="success" />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium">Published</span>
          <span className="text-muted-foreground block text-13">
            3 steps in 42 seconds
          </span>
        </span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          strokeWidth={2}
          className="text-subtle-foreground group-hover:text-foreground ease-smooth size-4 shrink-0 transition-[color,rotate] duration-200 group-data-panel-open:rotate-180"
        />
      </CollapsibleTrigger>
      <CollapsibleContent className={PANEL}>
        <ol className="flex flex-col gap-2.5 ps-11 pe-4 pt-1 pb-4">
          {STEPS.map((step) => (
            <li key={step} className="flex items-center gap-2.5 text-sm">
              <ProgressCheck done tone="success" />
              {step}
            </li>
          ))}
        </ol>
      </CollapsibleContent>
    </Collapsible>
  )
}

function Advanced() {
  return (
    <Collapsible className="w-full max-w-sm">
      <CollapsibleTrigger className="group text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-medium transition-colors duration-150">
        Advanced settings
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          strokeWidth={2}
          className="ease-smooth size-4 transition-[rotate] duration-200 group-data-panel-open:rotate-180"
        />
      </CollapsibleTrigger>
      <CollapsibleContent className={PANEL}>
        <div className="flex flex-col gap-4 px-0.5 pt-4 pb-1">
          <Field>
            <FieldLabel htmlFor="demo-slug">URL slug</FieldLabel>
            <Input id="demo-slug" defaultValue="pricing" />
          </Field>
          <Field>
            <FieldLabel htmlFor="demo-canonical">Canonical URL</FieldLabel>
            <Input id="demo-canonical" placeholder="https://example.com/pricing" />
          </Field>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export const entry: Entry = {
  slug: 'collapsible',
  title: 'Collapsible',
  group: 'Motion',
  order: 40,
  summary:
    'A trigger that shows and hides a section below it. The section animates its height with a CSS transition, and the chevron turns with it.',
  imports: `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@dkrasniy/ui/components/collapsible'`,
  guidance: [
    'Use it for details someone might want but doesn’t need, like the steps behind a status or settings most people leave alone.',
    'The parts are unstyled. Give CollapsibleContent the height transition classes from the examples, or it opens and closes without animating.',
    'Add group to the trigger and group-data-panel-open:rotate-180 to its chevron, so the chevron follows the open state.',
    'Put padding on a child of CollapsibleContent, not on the content itself, so it collapses all the way to zero.',
  ],
  examples: [
    {
      title: 'Status with details',
      description: 'Click the row to show the steps.',
      Demo: Status,
      code: `<Collapsible>
  <CollapsibleTrigger className="group flex w-full items-center gap-3 px-4 py-3 text-start">
    <ProgressCheck done tone="success" />
    <span className="min-w-0 flex-1">
      <span className="block text-sm font-medium">Published</span>
      <span className="text-muted-foreground block text-13">3 steps in 42 seconds</span>
    </span>
    <HugeiconsIcon
      icon={ArrowDown01Icon}
      strokeWidth={2}
      className="text-subtle-foreground ease-smooth size-4 transition-[rotate] duration-200 group-data-panel-open:rotate-180"
    />
  </CollapsibleTrigger>
  <CollapsibleContent className="ease-smooth h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0">
    <ol className="flex flex-col gap-2.5 ps-11 pe-4 pt-1 pb-4">
      {steps.map((step) => (
        <li key={step.id}>{step.label}</li>
      ))}
    </ol>
  </CollapsibleContent>
</Collapsible>`,
    },
    {
      title: 'Advanced settings',
      Demo: Advanced,
      code: `<Collapsible>
  <CollapsibleTrigger className="group text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-medium">
    Advanced settings
    <HugeiconsIcon
      icon={ArrowDown01Icon}
      strokeWidth={2}
      className="ease-smooth size-4 transition-[rotate] duration-200 group-data-panel-open:rotate-180"
    />
  </CollapsibleTrigger>
  <CollapsibleContent className="ease-smooth h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0">
    <div className="flex flex-col gap-4 px-0.5 pt-4 pb-1">
      <AdvancedFields />
    </div>
  </CollapsibleContent>
</Collapsible>`,
    },
  ],
}
