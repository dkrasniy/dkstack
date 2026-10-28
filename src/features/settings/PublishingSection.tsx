import { useState, type ComponentProps } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { CloudUploadIcon } from '@hugeicons/core-free-icons'
import { Badge } from '@dkrasniy/ui/components/badge'
import { ConfirmButton } from '@dkrasniy/ui/components/confirm-button'
import { StepsPanel, type StepItem } from '@dkrasniy/ui/components/steps'
import { TrayCard } from '@dkrasniy/ui/components/tray'
import { DATE_TIME } from '@dkrasniy/ui/lib/format'
import { atLeast } from '@dkrasniy/ui/lib/timing'
import { cn } from '@dkrasniy/ui/lib/utils'
import { describeError } from '@/app/errors'
import { buildPages, deployProject, gatherContent, plural, type Project } from './project'
import { Detail, Section } from './Section'

const STEP_MS = 1200

const STEPS = [
  { label: 'Gather content', doing: 'Gathering content.', work: gatherContent },
  { label: 'Build pages', doing: 'Building pages.', work: buildPages },
  { label: 'Deploy', doing: 'Deploying.', work: deployProject },
]

type Run =
  | { status: 'idle' }
  | { status: 'running'; step: number }
  | { status: 'done' }
  | { status: 'failed'; step: number; error: unknown }

type Summary = Pick<
  ComponentProps<typeof StepsPanel>,
  'status' | 'icon' | 'title' | 'detail' | 'steps' | 'note'
>

export function PublishingSection({
  project,
  onPublished,
}: {
  project: Project
  onPublished: () => void
}) {
  const [run, setRun] = useState<Run>({ status: 'idle' })
  const live = project.publishedAt !== undefined

  async function publish() {
    for (const [index, step] of STEPS.entries()) {
      setRun({ status: 'running', step: index })
      try {
        await atLeast(STEP_MS, step.work())
      } catch (error) {
        setRun({ status: 'failed', step: index, error })
        return
      }
    }
    onPublished()
    setRun({ status: 'done' })
  }

  return (
    <Section title="Publishing">
      <TrayCard>
        <dl>
          <Detail label="Status">
            <Badge>
              <span
                className={cn(
                  'size-1.5 rounded-full',
                  run.status === 'running'
                    ? 'bg-warning animate-pulse'
                    : live
                      ? 'bg-success'
                      : 'bg-subtle-foreground',
                )}
              />
              {run.status === 'running' ? 'Publishing' : live ? 'Live' : 'Not live'}
            </Badge>
          </Detail>
          <Detail label="Last published">
            <span className="tabular-nums">
              {project.publishedAt
                ? DATE_TIME.format(new Date(project.publishedAt))
                : 'Never'}
            </span>
          </Detail>
          <Detail label="Unpublished changes">
            <span className="tabular-nums">{project.changes}</span>
          </Detail>
        </dl>
      </TrayCard>
      <StepsPanel
        {...summarize(run, project)}
        className="-mb-(--tray-pad) [--steps-pad:14px]"
        action={
          <ConfirmButton
            size="sm"
            label="Publish"
            confirmLabel="Confirm and publish"
            pendingLabel="Publishing"
            armedVariant="success"
            announcement="Select again to publish the project."
            loading={run.status === 'running'}
            disabled={project.changes === 0 && run.status !== 'running'}
            focusableWhenDisabled
            onConfirm={() => void publish()}
          />
        }
        onDismiss={
          run.status === 'done' || run.status === 'failed'
            ? () => setRun({ status: 'idle' })
            : undefined
        }
      />
    </Section>
  )
}

function stepsAt(active: number, failed = false): StepItem[] {
  return STEPS.map(({ label }, index) => ({
    label,
    state:
      index < active ? 'done' : index > active ? 'waiting' : failed ? 'failed' : 'active',
  }))
}

function summarize(run: Run, project: Project): Summary {
  switch (run.status) {
    case 'running':
      return {
        status: 'running',
        title: 'Publishing…',
        detail: STEPS[run.step]?.doing,
        steps: stepsAt(run.step),
        note: 'Keep this page open until it finishes.',
      }
    case 'done':
      return {
        status: 'done',
        title: 'Published',
        detail: `${plural(project.pages, 'page', 'pages')} published.`,
        steps: stepsAt(STEPS.length),
        note: 'The live version is up to date.',
      }
    case 'failed':
      return {
        status: 'failed',
        title: describeError(run.error, { action: 'publish the project' }).title,
        detail: 'No changes were made to the live version.',
        steps: stepsAt(run.step, true),
        note: 'Publishing stopped before it finished.',
      }
    case 'idle':
      return {
        status: 'idle',
        icon: (
          <HugeiconsIcon
            icon={CloudUploadIcon}
            strokeWidth={2}
            className="text-subtle-foreground size-4"
          />
        ),
        title: project.changes > 0 ? 'Ready to publish' : 'Up to date',
        detail: 'Publishing builds every page and makes it live.',
      }
  }
}
