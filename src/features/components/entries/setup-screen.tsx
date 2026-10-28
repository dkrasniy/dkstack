import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { File01Icon, Folder01Icon, UserAdd01Icon } from '@hugeicons/core-free-icons'
import { Button } from '@dkrasniy/ui/components/button'
import { SetupScreen, useStagedProgress } from '@dkrasniy/ui/components/setup-screen'
import type { Entry } from '../registry'

const STEPS = [
  { label: 'Creating your project', doneLabel: 'Project created' },
  { label: 'Adding starter pages', doneLabel: 'Starter pages added' },
  { label: 'Getting the editor ready', doneLabel: 'Ready for your first page' },
]

function ProjectSetup() {
  const done = useStagedProgress(STEPS.length)
  return (
    <SetupScreen
      icon={Folder01Icon}
      title="Setting up Northwind"
      readyTitle="Northwind is ready"
      readyDescription="Add a page or invite people to work on it with you."
      steps={STEPS}
      done={done}
      className="min-h-0 px-0 py-4"
      actions={
        <>
          <Button>
            <HugeiconsIcon icon={File01Icon} strokeWidth={2} data-icon="inline-start" />
            Add your first page
          </Button>
          <Button variant="outline">
            <HugeiconsIcon
              icon={UserAdd01Icon}
              strokeWidth={2}
              data-icon="inline-start"
            />
            Invite people
          </Button>
        </>
      }
    />
  )
}

function Demo() {
  const [run, setRun] = useState(0)
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <ProjectSetup key={run} />
      <Button variant="ghost" size="sm" onClick={() => setRun((count) => count + 1)}>
        Replay
      </Button>
    </div>
  )
}

export const entry: Entry = {
  slug: 'setup-screen',
  title: 'Setup screen',
  group: 'Patterns',
  order: 20,
  summary:
    'A centered screen that walks through a big creation step by step, then celebrates and offers what to do next.',
  imports:
    "import { SetupScreen, useStagedProgress } from '@dkrasniy/ui/components/setup-screen'",
  guidance: [
    'Use it only for big multi-step creation, like creating a project or a workspace. Anything smaller gets a loading button.',
    'Pair it with the minimum delay. Hold the create request with atLeast(MIN_CREATE_MS, …) so the dialog doesn’t flash, then show this screen.',
    'useStagedProgress walks the steps on a timer, 1.1 seconds each, when the real work is already done or finishes faster than anyone could read. Pass ready: false to hold on the last step until it really finishes.',
    'Write each step twice: what is happening, like "Adding starter pages", and what is done, like "Starter pages added".',
    'The actions stay hidden and out of the tab order until the last step is done. Confetti fires once, 180ms after it.',
  ],
  examples: [
    {
      title: 'Creating a project',
      description: 'Each step takes 1.1 seconds. Replay to run it again.',
      Demo,
      code: `const STEPS = [
  { label: 'Creating your project', doneLabel: 'Project created' },
  { label: 'Adding starter pages', doneLabel: 'Starter pages added' },
  { label: 'Getting the editor ready', doneLabel: 'Ready for your first page' },
]

function ProjectSetup({ project }: { project: Project }) {
  const done = useStagedProgress(STEPS.length)
  return (
    <SetupScreen
      icon={Folder01Icon}
      title={\`Setting up \${project.name}\`}
      readyTitle={\`\${project.name} is ready\`}
      readyDescription="Add a page or invite people to work on it with you."
      steps={STEPS}
      done={done}
      actions={
        <>
          <Link
            to="/projects/$id/pages/new"
            params={{ id: project.id }}
            className={buttonVariants()}
          >
            Add your first page
          </Link>
          <Button variant="outline" onClick={openInvite}>
            Invite people
          </Button>
        </>
      }
    />
  )
}`,
    },
  ],
}
