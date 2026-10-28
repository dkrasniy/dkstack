import { useState } from 'react'
import { Button } from '@dkrasniy/ui/components/button'
import {
  CHEVRON,
  MENU_CLOSE,
  MorphIcon,
  PLAY_PAUSE,
  PLUS_CLOSE,
  SEND_STOP,
  type MorphShape,
} from '@dkrasniy/ui/components/morph-icon'
import type { Entry } from '../registry'

const PAIRS: readonly {
  name: string
  label: string
  pair: readonly [MorphShape, MorphShape]
}[] = [
  { name: 'MENU_CLOSE', label: 'Menu', pair: [MENU_CLOSE.menu, MENU_CLOSE.close] },
  { name: 'PLUS_CLOSE', label: 'Add', pair: [PLUS_CLOSE.plus, PLUS_CLOSE.close] },
  { name: 'PLAY_PAUSE', label: 'Play', pair: [PLAY_PAUSE.play, PLAY_PAUSE.pause] },
  { name: 'CHEVRON', label: 'Expand', pair: [CHEVRON.down, CHEVRON.up] },
  { name: 'SEND_STOP', label: 'Send', pair: [SEND_STOP.send, SEND_STOP.stop] },
]

function Pairs() {
  const [on, setOn] = useState<Record<string, boolean>>({})
  return PAIRS.map(({ name, label, pair }) => (
    <div key={name} className="flex w-24 flex-col items-center gap-2">
      <Button
        variant="secondary"
        size="icon"
        aria-label={label}
        aria-pressed={on[name] ?? false}
        onClick={() => setOn((state) => ({ ...state, [name]: !state[name] }))}
      >
        <MorphIcon shape={on[name] ? pair[1] : pair[0]} />
      </Button>
      <span className="text-subtle-foreground font-mono text-xs">{name}</span>
    </div>
  ))
}

function Send() {
  const [busy, setBusy] = useState(false)
  return (
    <Button
      variant="dark"
      size="icon"
      aria-label={busy ? 'Stop' : 'Send'}
      onClick={() => setBusy(!busy)}
    >
      <MorphIcon shape={busy ? SEND_STOP.stop : SEND_STOP.send} />
    </Button>
  )
}

export const entry: Entry = {
  slug: 'morph-icon',
  title: 'Morph icon',
  group: 'Motion',
  order: 20,
  summary:
    'An icon that reshapes into its other state. The paths morph and rotate with a small bounce on the way there and settle on the way back.',
  imports: `import {
  CHEVRON,
  MENU_CLOSE,
  MorphIcon,
  PLAY_PAUSE,
  PLUS_CLOSE,
  SEND_STOP,
} from '@dkrasniy/ui/components/morph-icon'`,
  guidance: [
    'Use it on a button that toggles between two states, like a menu that opens and closes. Pass the shape for the current state.',
    'Each pair, like MENU_CLOSE, holds two shapes. The first is the resting one, and it animates back more calmly than it left.',
    'The icon is hidden from screen readers. Change the button’s aria-label with the state, or set aria-pressed.',
    'It draws with currentColor at 18px. Set size-* and a text color on it like any icon.',
  ],
  examples: [
    {
      title: 'Pairs',
      description: 'Click each button to toggle it.',
      Demo: Pairs,
      code: `<Button
  variant="secondary"
  size="icon"
  aria-label="Menu"
  aria-pressed={open}
  onClick={() => setOpen(!open)}
>
  <MorphIcon shape={open ? MENU_CLOSE.close : MENU_CLOSE.menu} />
</Button>`,
    },
    {
      title: 'Send and stop',
      description: 'For a prompt that can be stopped while it runs.',
      Demo: Send,
      code: `<Button
  variant="dark"
  size="icon"
  aria-label={busy ? 'Stop' : 'Send'}
  onClick={busy ? stop : send}
>
  <MorphIcon shape={busy ? SEND_STOP.stop : SEND_STOP.send} />
</Button>`,
    },
  ],
}
