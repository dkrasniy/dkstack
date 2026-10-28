import { useState } from 'react'
import { Button } from '@dkrasniy/ui/components/button'
import { MorphText } from '@dkrasniy/ui/components/morph-text'
import type { Entry } from '../registry'

const LABELS = ['Publish', 'Published', 'Publish changes']

function Cycle() {
  const [index, setIndex] = useState(0)
  return (
    <Button className="min-w-40" onClick={() => setIndex((index + 1) % LABELS.length)}>
      <MorphText text={LABELS[index] ?? ''} />
    </Button>
  )
}

function Toggles() {
  const [following, setFollowing] = useState(false)
  const [copied, setCopied] = useState(false)
  return (
    <>
      <Button
        variant={following ? 'secondary' : 'primary'}
        aria-pressed={following}
        onClick={() => setFollowing(!following)}
      >
        <MorphText text={following ? 'Following' : 'Follow'} />
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        }}
      >
        <MorphText text={copied ? 'Copied' : 'Copy link'} />
      </Button>
    </>
  )
}

export const entry: Entry = {
  slug: 'morph-text',
  title: 'Morph text',
  group: 'Motion',
  order: 10,
  summary:
    'Text that changes by the letters it shares. Shared letters slide to their new places, and the rest blur in or out.',
  imports: "import { MorphText } from '@dkrasniy/ui/components/morph-text'",
  guidance: [
    'Use it for a label that changes with state and keeps most of its letters, like "Follow" to "Following". Unrelated words just crossfade.',
    'Give the parent a min-width when the labels differ a lot in length, so the layout around it doesn’t jump.',
    'Screen readers get the new text as plain text. With reduced motion on, it swaps without moving.',
    'For a button that loads while its label changes, use Button with morph instead.',
  ],
  examples: [
    {
      title: 'Cycling labels',
      description:
        'Click to step through. "Publish" stays put while letters come and go around it.',
      Demo: Cycle,
      code: `<Button className="min-w-40" onClick={next}>
  <MorphText text={label} />
</Button>`,
    },
    {
      title: 'Toggles',
      Demo: Toggles,
      code: `<Button
  variant={following ? 'secondary' : 'primary'}
  aria-pressed={following}
  onClick={() => setFollowing(!following)}
>
  <MorphText text={following ? 'Following' : 'Follow'} />
</Button>
<Button variant="outline" onClick={copy}>
  <MorphText text={copied ? 'Copied' : 'Copy link'} />
</Button>`,
    },
  ],
}
