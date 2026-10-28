import { useState } from 'react'
import { Button } from '@dkrasniy/ui/components/button'
import { atLeast, MIN_PENDING_MS } from '@dkrasniy/ui/lib/timing'
import type { Entry } from '../registry'

function save() {
  return new Promise<void>((resolve) => setTimeout(resolve, 80))
}

function SaveButton({ minimum }: { minimum: boolean }) {
  const [saving, setSaving] = useState(false)
  return (
    <div className="flex flex-col items-center gap-2.5">
      <Button
        morph
        variant="outline"
        loading={saving}
        onClick={() => {
          setSaving(true)
          void (minimum ? atLeast(MIN_PENDING_MS, save()) : save()).then(() =>
            setSaving(false),
          )
        }}
      >
        {saving ? 'Saving' : 'Save changes'}
      </Button>
      <span className="text-muted-foreground text-xs">
        {minimum ? 'With atLeast' : 'Without'}
      </span>
    </div>
  )
}

function Compare() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-10">
      <SaveButton minimum={false} />
      <SaveButton minimum />
    </div>
  )
}

export const entry: Entry = {
  slug: 'minimum-duration',
  title: 'Minimum duration',
  group: 'Patterns',
  order: 30,
  summary:
    'When work finishes too fast to read, hold the result until a minimum time passes, so people see the state change and trust that something happened.',
  imports:
    "import { atLeast, MIN_CREATE_MS, MIN_PENDING_MS } from '@dkrasniy/ui/lib/timing'",
  guidance: [
    'A spinner that shows for 80ms reads as a glitch, or as nothing having happened. Wrap fast actions in atLeast so the pending state stays long enough to read.',
    'atLeast(ms, promise) settles the way the promise does, once both the work and the minimum are done. A failure waits too, so an error never flashes past either.',
    'It adds nothing when the work is slow. The minimum only matters when the work beats it.',
    'Use MIN_PENDING_MS, 600ms, for saves and other button actions. Use MIN_CREATE_MS, 1.1 seconds, before a setup screen or another big creation.',
    'Use it for actions someone started. Never hold back data someone is waiting to read.',
  ],
  examples: [
    {
      title: 'The same save, with and without',
      description:
        'Both saves finish in 80ms. Without a minimum, the spinner flickers. With atLeast, "Saving" stays for 600ms.',
      Demo: Compare,
      code: `const rename = useMutation({
  mutationFn: (name: string) => atLeast(MIN_PENDING_MS, renameProject(id, name)),
})

<Button morph loading={rename.isPending} onClick={() => rename.mutate(name)}>
  {rename.isPending ? 'Saving' : 'Save changes'}
</Button>

const create = useMutation({
  mutationFn: (input: ProjectInput) => atLeast(MIN_CREATE_MS, createProject(input)),
  onSuccess: (project) => navigate({ to: '/projects/$id/setup', params: { id: project.id } }),
})`,
    },
  ],
}
