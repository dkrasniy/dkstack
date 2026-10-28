import { useState } from 'react'
import { Button } from '@dkrasniy/ui/components/button'
import { useConfetti } from '@dkrasniy/ui/components/confetti'
import type { Entry } from '../registry'

function Burst() {
  const [confetti, celebrate] = useConfetti()
  return (
    <span className="relative grid">
      {confetti}
      <Button onClick={celebrate}>Finish setup</Button>
    </span>
  )
}

function AfterCreate() {
  const [confetti, celebrate] = useConfetti()
  const [state, setState] = useState<'idle' | 'creating' | 'created'>('idle')
  return (
    <span className="relative grid">
      {confetti}
      <Button
        morph
        loading={state === 'creating'}
        variant={state === 'created' ? 'success' : 'primary'}
        onClick={() => {
          if (state === 'creating') return
          if (state === 'created') return setState('idle')
          setState('creating')
          setTimeout(() => {
            setState('created')
            celebrate()
          }, 1400)
        }}
      >
        {state === 'idle'
          ? 'Create project'
          : state === 'creating'
            ? 'Creating project'
            : 'Project created'}
      </Button>
    </span>
  )
}

export const entry: Entry = {
  slug: 'confetti',
  title: 'Confetti',
  group: 'Motion',
  order: 50,
  summary:
    'A burst of paper confetti that flies up from the center of its parent and falls away in under two seconds.',
  imports: "import { useConfetti } from '@dkrasniy/ui/components/confetti'",
  guidance: [
    'Save it for rare, finished moments after a big multi-step action, like creating a project. Never fire it for routine saves.',
    'Fire it when the work has succeeded, not when someone clicks the button.',
    'useConfetti returns the element and a function that fires it. Render the element inside a relatively positioned parent, and the pieces start from its center.',
    'With reduced motion on, nothing is shown.',
  ],
  examples: [
    {
      title: 'Burst',
      Demo: Burst,
      code: `const [confetti, celebrate] = useConfetti()

<span className="relative grid">
  {confetti}
  <Button onClick={celebrate}>Finish setup</Button>
</span>`,
    },
    {
      title: 'After the work finishes',
      description: 'The burst waits until the project exists.',
      Demo: AfterCreate,
      code: `const [confetti, celebrate] = useConfetti()
const create = useMutation({ mutationFn: createProject, onSuccess: celebrate })

<span className="relative grid">
  {confetti}
  <Button morph loading={create.isPending} onClick={() => create.mutate(draft)}>
    {create.isSuccess
      ? 'Project created'
      : create.isPending
        ? 'Creating project'
        : 'Create project'}
  </Button>
</span>`,
    },
  ],
}
