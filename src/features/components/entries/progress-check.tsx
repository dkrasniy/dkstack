import { useState } from 'react'
import { Button } from '@dkrasniy/ui/components/button'
import { ProgressCheck } from '@dkrasniy/ui/components/progress-check'
import type { Entry } from '../registry'

const VARIANTS = [
  { label: 'Brand', tone: 'brand', mark: 'check' },
  { label: 'Success', tone: 'success', mark: 'check' },
  { label: 'Failed', tone: 'destructive', mark: 'cross' },
] as const

function Toggle() {
  const [done, setDone] = useState(false)
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-8">
        {VARIANTS.map((variant) => (
          <div key={variant.label} className="flex flex-col items-center gap-2">
            <ProgressCheck
              done={done}
              tone={variant.tone}
              mark={variant.mark}
              label={variant.mark === 'cross' ? 'Failed' : 'Done'}
              className="size-6"
            />
            <span className="text-muted-foreground text-13">{variant.label}</span>
          </div>
        ))}
      </div>
      <Button variant="secondary" size="sm" onClick={() => setDone(!done)}>
        {done ? 'Start again' : 'Finish'}
      </Button>
    </div>
  )
}

const STEPS = [
  { label: 'Check links', state: 'done', detail: '48 links' },
  { label: 'Build pages', state: 'failed', detail: '2 errors' },
  { label: 'Deploy', state: 'working', detail: '' },
] as const

function List() {
  return (
    <ul className="flex w-full max-w-xs flex-col gap-2.5">
      {STEPS.map((step) => (
        <li key={step.label} className="flex items-center gap-2.5 text-sm">
          <ProgressCheck
            done={step.state !== 'working'}
            tone={step.state === 'failed' ? 'destructive' : 'success'}
            mark={step.state === 'failed' ? 'cross' : 'check'}
            label={step.state === 'failed' ? 'Failed' : 'Done'}
          />
          <span className="flex-1">{step.label}</span>
          <span
            className={
              step.state === 'failed'
                ? 'text-destructive text-xs'
                : 'text-subtle-foreground text-xs'
            }
          >
            {step.detail}
          </span>
        </li>
      ))}
    </ul>
  )
}

export const entry: Entry = {
  slug: 'progress-check',
  title: 'Progress check',
  group: 'Feedback',
  order: 50,
  summary:
    'Pulsing dots while a step runs, then a filled circle that pops in and draws a check or a cross when it ends.',
  imports: "import { ProgressCheck } from '@dkrasniy/ui/components/progress-check'",
  guidance: [
    'Use it to lead each line in a list of steps, so a step’s state changes in place and the row doesn’t move.',
    'Keep the same element mounted and flip done. Swapping in a new one skips the animation.',
    'For a failure, pass mark="cross" with tone="destructive" and a label like "Failed", which screen readers hear instead of "Done".',
    'It is 16px. Scale it with size-* when it leads larger text.',
  ],
  examples: [
    {
      title: 'Working to done',
      description:
        'Click Finish to watch each tone end. The cross draws its two strokes in turn.',
      Demo: Toggle,
      code: `<ProgressCheck done={step.done} />
<ProgressCheck done={step.done} tone="success" />
<ProgressCheck done={step.done} tone="destructive" mark="cross" label="Failed" />`,
    },
    {
      title: 'Step list',
      Demo: List,
      code: `<li className="flex items-center gap-2.5 text-sm">
  <ProgressCheck
    done={step.state !== 'working'}
    tone={step.state === 'failed' ? 'destructive' : 'success'}
    mark={step.state === 'failed' ? 'cross' : 'check'}
    label={step.state === 'failed' ? 'Failed' : 'Done'}
  />
  {step.label}
</li>`,
    },
  ],
}
