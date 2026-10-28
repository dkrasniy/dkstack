import { ProgressCheck } from '@dkrasniy/ui/components/progress-check'
import { Shimmer } from '@dkrasniy/ui/components/shimmer'
import { cn } from '@dkrasniy/ui/lib/utils'
import type { Entry } from '../registry'

function Label() {
  return <Shimmer className="text-sm font-medium">Thinking</Shimmer>
}

const STEPS = [
  { label: 'Gather content', state: 'done' },
  { label: 'Build pages', state: 'active' },
  { label: 'Deploy', state: 'waiting' },
] as const

function Steps() {
  return (
    <ol className="flex w-full max-w-xs flex-col gap-2.5">
      {STEPS.map((step) => (
        <li
          key={step.label}
          className={cn(
            'flex items-center gap-2.5 text-sm',
            step.state === 'waiting' && 'text-muted-foreground',
          )}
        >
          {step.state === 'waiting' ? (
            <span
              aria-hidden
              className="border-foreground/20 size-4 shrink-0 rounded-full border-[1.5px]"
            />
          ) : (
            <ProgressCheck done={step.state === 'done'} tone="success" />
          )}
          {step.state === 'active' ? <Shimmer>{step.label}</Shimmer> : step.label}
        </li>
      ))}
    </ol>
  )
}

export const entry: Entry = {
  slug: 'shimmer',
  title: 'Shimmer',
  group: 'Feedback',
  order: 30,
  summary:
    'Text with a band of light sweeping across it, for the one step that is running right now.',
  imports: "import { Shimmer } from '@dkrasniy/ui/components/shimmer'",
  guidance: [
    'Shimmer the label of the step in progress, and only that one. Done and waiting steps stay still.',
    'It paints the text with a gradient, so a text color on it has no effect. Set the size and weight with className.',
  ],
  examples: [
    {
      title: 'Label',
      Demo: Label,
      code: `<Shimmer className="text-sm font-medium">Thinking</Shimmer>`,
    },
    {
      title: 'Current step',
      Demo: Steps,
      code: `<li className="flex items-center gap-2.5 text-sm">
  <ProgressCheck done={step.state === 'done'} tone="success" />
  {step.state === 'active' ? <Shimmer>{step.label}</Shimmer> : step.label}
</li>`,
    },
  ],
}
