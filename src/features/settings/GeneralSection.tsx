import { useId, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@dkrasniy/ui/components/button'
import { CopyButton } from '@dkrasniy/ui/components/copy-button'
import { Input } from '@dkrasniy/ui/components/input'
import { useToast } from '@dkrasniy/ui/components/toast'
import { TrayCard, TrayFooter, TrayRow } from '@dkrasniy/ui/components/tray'
import { DATE_TIME } from '@dkrasniy/ui/lib/format'
import { atLeast, MIN_PENDING_MS } from '@dkrasniy/ui/lib/timing'
import { describeError } from '@/app/errors'
import { renameProject, type Project } from './project'
import { Detail, Section } from './Section'

export function GeneralSection({
  project,
  onRenamed,
}: {
  project: Project
  onRenamed: (name: string) => void
}) {
  const toast = useToast()
  const errorId = useId()
  const [name, setName] = useState(project.name)
  const [error, setError] = useState<string>()
  const rename = useMutation({
    mutationFn: (next: string) => atLeast(MIN_PENDING_MS, renameProject(next)),
    onSuccess: (next) => {
      onRenamed(next)
      setName(next)
      toast.add({ type: 'success', title: `Renamed to ${next}` })
    },
  })
  const trimmed = name.trim()
  const dirty = trimmed !== project.name
  const failure = rename.error
    ? describeError(rename.error, { action: 'rename the project' })
    : null
  const message = error ?? (failure && `${failure.title} ${failure.detail}`.trim())

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        if (rename.isPending || !dirty) return
        if (!trimmed) return setError('Enter a name for the project.')
        rename.mutate(trimmed)
      }}
    >
      <Section title="General">
        <TrayCard>
          <TrayRow className="justify-start py-2">
            <label
              htmlFor="project-name"
              className="text-muted-foreground w-40 shrink-0 font-normal"
            >
              Name
            </label>
            <Input
              id="project-name"
              value={name}
              maxLength={100}
              className="max-w-sm"
              readOnly={rename.isPending}
              aria-invalid={Boolean(message)}
              aria-describedby={message ? errorId : undefined}
              onChange={(event) => {
                setName(event.target.value)
                setError(undefined)
                if (!rename.isPending) rename.reset()
              }}
            />
          </TrayRow>
          <dl>
            <Detail label="Project ID">
              <span className="font-mono text-13">{project.id}</span>
              <CopyButton
                value={project.id}
                label="Copy ID"
                failure="Couldn’t copy the ID"
              />
            </Detail>
            <Detail label="Workspace">{project.workspace}</Detail>
            <Detail label="Created">
              <span className="tabular-nums">
                {DATE_TIME.format(new Date(project.createdAt))}
              </span>
            </Detail>
          </dl>
        </TrayCard>
        <TrayFooter
          note={
            message ? (
              <span id={errorId} role="alert" className="text-destructive">
                {message}
              </span>
            ) : (
              'Everyone in the workspace sees this name.'
            )
          }
        >
          {dirty && !rename.isPending ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setName(project.name)
                setError(undefined)
                rename.reset()
              }}
            >
              Discard
            </Button>
          ) : null}
          <Button
            type="submit"
            size="sm"
            morph
            loading={rename.isPending}
            disabled={!dirty && !rename.isPending}
          >
            {rename.isPending ? 'Saving' : 'Save'}
          </Button>
        </TrayFooter>
      </Section>
    </form>
  )
}
