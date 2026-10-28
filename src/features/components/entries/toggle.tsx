import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { StarIcon, TextBoldIcon, TextItalicIcon } from '@hugeicons/core-free-icons'
import { Toggle } from '@dkrasniy/ui/components/toggle'
import type { Entry } from '../registry'

function Variants() {
  return (
    <>
      <Toggle aria-label="Bold" defaultPressed>
        <HugeiconsIcon icon={TextBoldIcon} strokeWidth={2} />
      </Toggle>
      <Toggle aria-label="Italic">
        <HugeiconsIcon icon={TextItalicIcon} strokeWidth={2} />
      </Toggle>
      <Toggle variant="outline" aria-label="Bold" defaultPressed>
        <HugeiconsIcon icon={TextBoldIcon} strokeWidth={2} />
      </Toggle>
      <Toggle variant="outline" aria-label="Italic">
        <HugeiconsIcon icon={TextItalicIcon} strokeWidth={2} />
      </Toggle>
    </>
  )
}

function Sizes() {
  return (['sm', 'default', 'lg'] as const).map((size) => (
    <Toggle key={size} size={size} variant="outline">
      {size}
    </Toggle>
  ))
}

function WithLabel() {
  const [starred, setStarred] = useState(false)
  return (
    <Toggle variant="outline" pressed={starred} onPressedChange={setStarred}>
      <HugeiconsIcon icon={StarIcon} strokeWidth={2} data-icon="inline-start" />
      Star
    </Toggle>
  )
}

export const entry: Entry = {
  slug: 'toggle',
  title: 'Toggle',
  group: 'Actions',
  order: 20,
  summary: 'A button that stays pressed. Pressed toggles take the muted background.',
  imports: "import { Toggle } from '@dkrasniy/ui/components/toggle'",
  guidance: [
    'Use a toggle for a state that applies right away, like bold text or a star, and a Switch or Checkbox for a setting in a form.',
    'Keep the label the same in both states, since screen readers already announce pressed from aria-pressed.',
    'For a row of related toggles, use ToggleGroup so arrow keys move between them.',
  ],
  examples: [
    {
      title: 'Variants',
      description: 'The default toggle is bare until pressed. Outline keeps a surface.',
      Demo: Variants,
      code: `<Toggle aria-label="Bold">
  <HugeiconsIcon icon={TextBoldIcon} strokeWidth={2} />
</Toggle>
<Toggle variant="outline" aria-label="Bold">
  <HugeiconsIcon icon={TextBoldIcon} strokeWidth={2} />
</Toggle>`,
    },
    {
      title: 'Sizes',
      Demo: Sizes,
      code: `<Toggle variant="outline" size="sm">sm</Toggle>
<Toggle variant="outline">default</Toggle>
<Toggle variant="outline" size="lg">lg</Toggle>`,
    },
    {
      title: 'With a label',
      Demo: WithLabel,
      code: `const [starred, setStarred] = useState(false)

<Toggle variant="outline" pressed={starred} onPressedChange={setStarred}>
  <HugeiconsIcon icon={StarIcon} strokeWidth={2} data-icon="inline-start" />
  Star
</Toggle>`,
    },
  ],
}
