import type { CSSProperties } from 'react'

import { cn } from '@dkrasniy/ui/lib/utils'

interface MorphShape {
  paths: readonly string[]
  rotate?: number
  resting?: boolean
}

const ARRIVE = '450ms var(--ease-bounce)'
const RETURN = '350ms var(--ease-settle)'
const COLLAPSE = '200ms var(--ease-smooth)'

function isPoint(d: string) {
  const numbers = d.match(/-?\d*\.?\d+/g)?.map(Number) ?? []
  return numbers.every((value, index) => value === numbers[index % 2])
}

const SEND_STOP = {
  send: {
    resting: true,
    paths: [
      'M12 5C11.92 5 11.82 5.02 11.73 5.05C10.94 5.3 9.73 6.5 8.62 7.76C7.51 9.02 6.5 10.33 6.14 10.81C6.05 10.93 6 11 6 11C6 11 6 11 6 11C6 11 6 11 6 11C6 11 6 11 6 11M12 5C12.08 5 12.18 5.02 12.27 5.05C13.06 5.3 14.27 6.5 15.38 7.76C16.49 9.02 17.5 10.33 17.86 10.81C17.95 10.93 18 11 18 11C18 11 18 11 18 11C18 11 18 11 18 11C18 11 18 11 18 11',
      'M12 5.5C12 10 12 14.5 12 19',
    ],
  },
  stop: {
    paths: [
      'M12 3.73C11.77 3.73 11.54 3.75 11.32 3.79C10.09 4.01 9.08 5.02 7.05 7.05C5.02 9.08 4.01 10.09 3.79 11.32C3.71 11.77 3.71 12.23 3.79 12.68C4.01 13.91 5.02 14.92 7.05 16.95C9.08 18.98 10.09 19.99 11.32 20.21C11.54 20.25 11.77 20.27 12 20.27M12 3.73C12.23 3.73 12.46 3.75 12.68 3.79C13.91 4.01 14.92 5.02 16.95 7.05C18.98 9.08 19.99 10.09 20.21 11.32C20.29 11.77 20.29 12.23 20.21 12.68C19.99 13.91 18.98 14.92 16.95 16.95C14.92 18.98 13.91 19.99 12.68 20.21C12.46 20.25 12.23 20.27 12 20.27',
      'M12 20.27C12 20.27 12 20.27 12 20.27',
    ],
    rotate: 45,
  },
} satisfies Record<string, MorphShape>

const MENU_CLOSE = {
  menu: { paths: ['M5 7L19 7', 'M5 12L19 12', 'M5 17L19 17'], resting: true },
  close: { paths: ['M6 6L18 18', 'M12 12L12 12', 'M6 18L18 6'] },
} satisfies Record<string, MorphShape>

const PLUS_CLOSE = {
  plus: { paths: ['M12 5L12 19', 'M5 12L19 12'], resting: true },
  close: { paths: ['M12 5L12 19', 'M5 12L19 12'], rotate: 45 },
} satisfies Record<string, MorphShape>

const PLAY_PAUSE = {
  play: { paths: ['M8 6L8 18L18 12', 'M8 6L18 12'], resting: true },
  pause: { paths: ['M9 6L9 18L9 18', 'M15 6L15 18'] },
} satisfies Record<string, MorphShape>

const CHEVRON = {
  down: { paths: ['M6 9L12 15L18 9'], resting: true },
  up: { paths: ['M6 9L12 15L18 9'], rotate: 180 },
} satisfies Record<string, MorphShape>

function MorphIcon({ shape, className }: { shape: MorphShape; className?: string }) {
  const timing = shape.resting ? RETURN : ARRIVE
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      data-slot="morph-icon"
      className={cn('size-4.5', className)}
      style={{ rotate: `${shape.rotate ?? 0}deg`, transition: `rotate ${timing}` }}
    >
      {shape.paths.map((d, index) => {
        const style: CSSProperties & { d: string } = {
          d: `path("${d}")`,
          transition: `d ${isPoint(d) ? COLLAPSE : timing}`,
        }
        return <path key={index} d={d} style={style} />
      })}
    </svg>
  )
}

export {
  CHEVRON,
  MENU_CLOSE,
  MorphIcon,
  PLAY_PAUSE,
  PLUS_CLOSE,
  SEND_STOP,
  type MorphShape,
}
