import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon, Delete02Icon, Settings02Icon } from '@hugeicons/core-free-icons'
import { Button, ButtonArrow } from '@dkrasniy/ui/components/button'
import type { Entry } from '../registry'

const VARIANTS = [
  'primary',
  'secondary',
  'outline',
  'ghost',
  'dark',
  'destructive',
  'success',
  'link',
] as const

function Variants() {
  return VARIANTS.map((variant) => (
    <Button key={variant} variant={variant}>
      {variant.charAt(0).toUpperCase() + variant.slice(1)}
    </Button>
  ))
}

function Sizes() {
  return (['xs', 'sm', 'default', 'lg'] as const).map((size) => (
    <Button key={size} size={size}>
      {size}
    </Button>
  ))
}

function Icons() {
  return (
    <>
      <Button>
        <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
        New project
      </Button>
      <Button variant="outline">
        Open projects
        <ButtonArrow />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Settings">
        <HugeiconsIcon icon={Settings02Icon} strokeWidth={2} />
      </Button>
      <Button variant="destructive" size="icon-sm" aria-label="Delete">
        <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
      </Button>
    </>
  )
}

function Loading() {
  const [loading, setLoading] = useState(false)
  return (
    <Button
      loading={loading}
      onClick={() => {
        setLoading(true)
        setTimeout(() => setLoading(false), 1500)
      }}
    >
      Save changes
    </Button>
  )
}

const STEPS = [
  { label: 'Create project', loading: false },
  { label: 'Creating project', loading: true },
  { label: 'Project created', loading: false },
] as const

function Morph() {
  const [step, setStep] = useState(0)
  const current = STEPS[step] ?? STEPS[0]
  return (
    <Button
      morph
      loading={current.loading}
      onClick={() => {
        if (step !== 0) return
        setStep(1)
        setTimeout(() => setStep(2), 1600)
        setTimeout(() => setStep(0), 3000)
      }}
    >
      {current.label}
    </Button>
  )
}

export const entry: Entry = {
  slug: 'button',
  title: 'Button',
  group: 'Actions',
  summary:
    'Pill buttons in eight variants. They press down to 98%, keep their size while loading, and can morph between labels.',
  imports: "import { Button, ButtonArrow } from '@dkrasniy/ui/components/button'",
  guidance: [
    'Use one primary button per view. Everything else is outline, secondary or ghost.',
    'Pass loading on any button that starts a request. The label hides and a spinner takes its place, so the button keeps its width.',
    'Add morph when the label changes with the state, like "Create project" to "Creating project". Shared letters slide into place and the width animates.',
    'ButtonArrow goes on buttons that take you somewhere. The chevron opens into an arrow on hover.',
  ],
  examples: [
    {
      title: 'Variants',
      Demo: Variants,
      code: `<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="dark">Dark</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="success">Success</Button>
<Button variant="link">Link</Button>`,
    },
    {
      title: 'Sizes',
      Demo: Sizes,
      code: `<Button size="xs">xs</Button>
<Button size="sm">sm</Button>
<Button>default</Button>
<Button size="lg">lg</Button>
<Button size="xl" shape="square">Full width</Button>`,
    },
    {
      title: 'With icons',
      Demo: Icons,
      code: `<Button>
  <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
  New project
</Button>
<Button variant="outline">
  Open projects
  <ButtonArrow />
</Button>
<Button variant="ghost" size="icon" aria-label="Settings">
  <HugeiconsIcon icon={Settings02Icon} strokeWidth={2} />
</Button>`,
    },
    {
      title: 'Loading',
      description:
        'The spinner replaces the label in place, so nothing around the button moves.',
      Demo: Loading,
      code: `<Button loading={save.isPending} onClick={() => save.mutate()}>
  Save changes
</Button>`,
    },
    {
      title: 'Morph',
      description:
        'For a label that changes while something runs. The spinner slides in from where the label started.',
      Demo: Morph,
      code: `<Button morph loading={create.isPending} onClick={() => create.mutate()}>
  {create.isPending ? 'Creating project' : 'Create project'}
</Button>`,
    },
  ],
}
