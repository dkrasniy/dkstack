import { useEffect, useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { CloudUploadIcon } from '@hugeicons/core-free-icons'
import { Button } from '@dkrasniy/ui/components/button'
import { Step, StepList, StepsPanel, type StepItem } from '@dkrasniy/ui/components/steps'
import type { Entry } from '../registry'

function States() {
  return (
    <div className="grid w-full max-w-lg gap-x-10 gap-y-6 sm:grid-cols-2">
      <StepList>
        <Step state="done">Gather content</Step>
        <Step state="active">Build pages</Step>
        <Step state="waiting">Deploy</Step>
      </StepList>
      <StepList>
        <Step state="done">Gather content</Step>
        <Step state="failed" count="2 errors">
          Build pages
        </Step>
        <Step state="waiting" count="Skipped">
          Deploy
        </Step>
      </StepList>
    </div>
  )
}

const STEP_MS = 1200

const STEPS = [
  { label: 'Gather content', doing: 'Gathering content.' },
  { label: 'Build pages', doing: 'Building pages.' },
  { label: 'Deploy', doing: 'Deploying.' },
]

function stepsAt(active: number): StepItem[] {
  return STEPS.map(({ label }, index) => ({
    label,
    state: index < active ? 'done' : index === active ? 'active' : 'waiting',
  }))
}

function PublishRun() {
  const [step, setStep] = useState(0)
  const [dismissed, setDismissed] = useState(false)
  const finished = step >= STEPS.length

  useEffect(() => {
    if (finished) return
    const timer = setTimeout(() => setStep((count) => count + 1), STEP_MS)
    return () => clearTimeout(timer)
  }, [step, finished])

  if (dismissed) {
    return (
      <StepsPanel
        status="idle"
        icon={
          <HugeiconsIcon
            icon={CloudUploadIcon}
            strokeWidth={2}
            className="text-subtle-foreground size-4"
          />
        }
        title="Live"
        detail="12 of 12 pages are live."
      />
    )
  }

  return (
    <StepsPanel
      status={finished ? 'done' : 'running'}
      title={finished ? 'Published' : 'Publishing…'}
      detail={finished ? '12 pages published.' : STEPS[step]?.doing}
      steps={stepsAt(step)}
      note={
        finished
          ? 'The live version is up to date.'
          : 'You can leave this page while it publishes.'
      }
      onDismiss={finished ? () => setDismissed(true) : undefined}
    />
  )
}

function Panel() {
  const [run, setRun] = useState(0)
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="bg-muted inset-ring-border w-full rounded-xl inset-ring">
        <PublishRun key={run} />
      </div>
      <Button variant="outline" size="sm" onClick={() => setRun((count) => count + 1)}>
        Replay
      </Button>
    </div>
  )
}

export const entry: Entry = {
  slug: 'steps',
  title: 'Steps',
  group: 'Feedback',
  order: 60,
  summary:
    'Progress through a known sequence. Each step waits, runs with spinning dots and a shimmering label, then pops a check or a cross. StepsPanel wraps a list in a summary row that expands to show it.',
  imports:
    "import { Step, StepList, StepsPanel, type StepItem } from '@dkrasniy/ui/components/steps'",
  guidance: [
    'Use steps when the work has named stages someone would want to follow, like publishing. For a single request, a loading button is enough.',
    'Name each step with a noun phrase, like "Build pages", and keep the running sentence for the panel detail, like "Building pages."',
    'Mark the failed step and skip the rest with count="Skipped", so it is clear where it stopped.',
    'StepsPanel opens while it runs and collapses when status turns done. Pass collapsed to choose yourself.',
    'Pass onDismiss once the run is over, so the panel can go back to its idle summary.',
    'The progress bar moves only when a whole step finishes. Pace fast steps with atLeast so each one is readable.',
  ],
  examples: [
    {
      title: 'Step states',
      description:
        'Waiting, running, done and failed, with an optional count on the right.',
      Demo: States,
      code: `<StepList>
  <Step state="done">Gather content</Step>
  <Step state="failed" count="2 errors">
    Build pages
  </Step>
  <Step state="waiting" count="Skipped">
    Deploy
  </Step>
</StepList>`,
    },
    {
      title: 'Panel',
      description:
        'A fake publish. The panel opens while it runs, then collapses to its summary.',
      Demo: Panel,
      code: `const STEPS = ['Gather content', 'Build pages', 'Deploy']

<StepsPanel
  status={run.done ? 'done' : 'running'}
  title={run.done ? 'Published' : 'Publishing…'}
  detail={run.done ? \`\${plural(pages, 'page', 'pages')} published.\` : run.detail}
  steps={STEPS.map((label, index) => ({
    label,
    state: index < run.step ? 'done' : index === run.step ? 'active' : 'waiting',
  }))}
  note="You can leave this page while it publishes."
  onDismiss={run.done ? run.reset : undefined}
/>`,
    },
  ],
}
