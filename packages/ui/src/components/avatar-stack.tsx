import * as React from 'react'

import { cn } from '@dkrasniy/ui/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@dkrasniy/ui/components/avatar'

interface AvatarStackPerson {
  name: string
  src?: string | undefined
}

type AvatarStackSize = 'sm' | 'default' | 'lg'

const LIFT = -4
const FALLOFF = 0.45
const SCALE = 1.05
const EASE_IN = 'cubic-bezier(0.22, 1, 0.36, 1)'
const EASE_OUT = 'cubic-bezier(0.34, 3.85, 0.64, 1)'

const ITEM =
  'relative -ms-2 origin-center translate-y-(--shift) scale-(--lift-scale) rounded-full transition-[translate,scale] duration-320 ease-(--lift-ease) motion-reduce:translate-none motion-reduce:scale-none motion-reduce:transition-none'

const BUBBLE: Record<AvatarStackSize, string> = {
  sm: 'h-6 min-w-6 text-[0.625rem]',
  default: 'h-8 min-w-8 text-xs',
  lg: 'h-10 min-w-10 text-sm',
}

const INITIALS: Record<AvatarStackSize, string> = {
  sm: 'text-[0.625rem]',
  default: 'text-xs',
  lg: 'text-sm',
}

function lifted(index: number, active: number | null): React.CSSProperties {
  if (active === null) {
    return {
      '--lift-ease': EASE_OUT,
      '--shift': '0px',
      '--lift-scale': 1,
    } as React.CSSProperties
  }
  const shift = LIFT * FALLOFF ** Math.abs(index - active)
  return {
    '--lift-ease': EASE_IN,
    '--shift': `${shift.toFixed(3)}px`,
    '--lift-scale': index === active ? SCALE : 1,
  } as React.CSSProperties
}

function initialsOf(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  const first = words[0]?.[0] ?? ''
  const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? '') : ''
  return `${first}${last}`.toUpperCase()
}

function AvatarStack({
  people,
  total = people.length,
  max = 5,
  size = 'sm',
  label,
  className,
}: {
  people: readonly AvatarStackPerson[]
  total?: number
  max?: number
  size?: AvatarStackSize
  label?: string
  className?: string
}) {
  const [active, setActive] = React.useState<number | null>(null)
  const shown = people.slice(0, max)
  const extra = total - shown.length

  return (
    <div
      data-slot="avatar-stack"
      className={cn('flex items-center ps-2', className)}
      onMouseLeave={() => setActive(null)}
    >
      {shown.map((person, index) => (
        <span
          key={`${person.name}-${index}`}
          title={person.name}
          style={lifted(index, active)}
          onMouseEnter={() => setActive(index)}
          className={ITEM}
        >
          <Avatar size={size} className="ring-card ring-2">
            {person.src ? <AvatarImage src={person.src} alt="" /> : null}
            <AvatarFallback className={cn('font-medium', INITIALS[size])}>
              {initialsOf(person.name)}
            </AvatarFallback>
          </Avatar>
        </span>
      ))}
      {extra > 0 ? (
        <span
          aria-hidden="true"
          style={lifted(shown.length, active)}
          onMouseEnter={() => setActive(shown.length)}
          className={cn(
            ITEM,
            'bg-muted text-muted-foreground ring-card grid place-items-center px-1.5 font-medium tabular-nums ring-2',
            BUBBLE[size],
          )}
        >
          +{extra}
        </span>
      ) : null}
      <span className="sr-only">
        {label ?? `${total.toLocaleString()} ${total === 1 ? 'person' : 'people'}`}
      </span>
    </div>
  )
}

export { AvatarStack, type AvatarStackPerson, type AvatarStackSize }
