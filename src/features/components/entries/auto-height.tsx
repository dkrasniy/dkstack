import { useState } from 'react'
import { Button } from '@dkrasniy/ui/components/button'
import { AutoHeight } from '@dkrasniy/ui/components/auto-height'
import { Field, FieldLabel } from '@dkrasniy/ui/components/field'
import { Input } from '@dkrasniy/ui/components/input'
import { Switch } from '@dkrasniy/ui/components/switch'
import type { Entry } from '../registry'

function Reveal() {
  const [scheduled, setScheduled] = useState(false)
  return (
    <div className="w-full max-w-sm">
      <label className="flex items-center justify-between text-sm font-medium">
        Publish later
        <Switch checked={scheduled} onCheckedChange={setScheduled} />
      </label>
      <AutoHeight open={scheduled}>
        <Field className="px-0.5 pt-4 pb-1">
          <FieldLabel htmlFor="demo-publish-at">Date and time</FieldLabel>
          <Input id="demo-publish-at" type="datetime-local" />
        </Field>
      </AutoHeight>
    </div>
  )
}

const LINKS = ['Home', 'Pricing', 'Help center', 'Careers', 'Contact']

function Grow() {
  const [count, setCount] = useState(2)
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="bg-muted rounded-md">
        <AutoHeight>
          <ul className="flex flex-col p-1">
            {LINKS.slice(0, count).map((link) => (
              <li key={link} className="px-3 py-2 text-sm">
                {link}
              </li>
            ))}
          </ul>
        </AutoHeight>
      </div>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={count === LINKS.length}
          onClick={() => setCount(count + 1)}
        >
          Add link
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={count === 1}
          onClick={() => setCount(count - 1)}
        >
          Remove link
        </Button>
      </div>
    </div>
  )
}

export const entry: Entry = {
  slug: 'auto-height',
  title: 'Auto height',
  group: 'Motion',
  order: 30,
  summary:
    'A wrapper that animates its height to fit its content, and collapses to nothing with a fade when it closes.',
  imports: "import { AutoHeight } from '@dkrasniy/ui/components/auto-height'",
  guidance: [
    'Wrap content that appears or changes size in place, like an extra field or a reply, so what sits below slides instead of jumping.',
    'Pass open={false} to collapse it. Closed content is inert, so it can’t be focused or clicked.',
    'It clips its content while it animates. Give the child a little padding so focus rings and shadows aren’t cut off.',
    'For a section someone opens and closes with a trigger, use Collapsible, which handles the button and its state.',
  ],
  examples: [
    {
      title: 'Reveal a field',
      Demo: Reveal,
      code: `<label className="flex items-center justify-between text-sm font-medium">
  Publish later
  <Switch checked={scheduled} onCheckedChange={setScheduled} />
</label>
<AutoHeight open={scheduled}>
  <Field className="px-0.5 pt-4 pb-1">
    <FieldLabel htmlFor="publish-at">Date and time</FieldLabel>
    <Input id="publish-at" type="datetime-local" />
  </Field>
</AutoHeight>`,
    },
    {
      title: 'Content that grows',
      description: 'With no open prop, it follows the content as rows come and go.',
      Demo: Grow,
      code: `<AutoHeight>
  <ul className="flex flex-col p-1">
    {links.map((link) => (
      <li key={link.id}>{link.label}</li>
    ))}
  </ul>
</AutoHeight>`,
    },
  ],
}
