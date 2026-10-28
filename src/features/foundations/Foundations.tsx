import { useState, type ReactNode } from 'react'
import { Button } from '@dkrasniy/ui/components/button'
import { Dots } from '@dkrasniy/ui/components/dots'
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@dkrasniy/ui/components/page-header'
import { Shimmer } from '@dkrasniy/ui/components/shimmer'
import { ToggleGroup, ToggleGroupItem } from '@dkrasniy/ui/components/toggle-group'
import { Tray, TrayCard, TrayHeader } from '@dkrasniy/ui/components/tray'
import { cn } from '@dkrasniy/ui/lib/utils'
import { isAppearance, useAppearance } from '@/state/appearance'

const COLORS = [
  {
    group: 'Greys',
    tokens: [
      { name: 'frame', className: 'bg-frame' },
      { name: 'background', className: 'bg-background' },
      { name: 'foreground', className: 'bg-foreground' },
      { name: 'muted', className: 'bg-muted' },
      { name: 'muted-foreground', className: 'bg-muted-foreground' },
      { name: 'subtle-foreground', className: 'bg-subtle-foreground' },
      { name: 'border', className: 'bg-border' },
    ],
  },
  {
    group: 'Brand and status',
    tokens: [
      { name: 'brand', className: 'bg-brand' },
      { name: 'primary', className: 'bg-primary' },
      { name: 'success', className: 'bg-success' },
      { name: 'warning', className: 'bg-warning' },
      { name: 'attention', className: 'bg-attention' },
      { name: 'destructive', className: 'bg-destructive' },
      { name: 'purple', className: 'bg-purple' },
    ],
  },
  {
    group: 'Surfaces',
    tokens: [
      { name: 'card', className: 'bg-card' },
      { name: 'popover', className: 'bg-popover' },
      { name: 'sidebar', className: 'bg-sidebar' },
      { name: 'sidebar-accent', className: 'bg-sidebar-accent' },
    ],
  },
] as const

const TYPE = [
  { className: 'text-xs', size: '12 / 16.8' },
  { className: 'text-13', size: '13 / 18' },
  { className: 'text-sm', size: '14 / 20' },
  { className: 'text-base', size: '16 / 24' },
  { className: 'text-lg', size: '18 / 24' },
  { className: 'text-xl', size: '20 / 28' },
  { className: 'text-2xl', size: '24 / 32' },
  { className: 'text-3xl', size: '30 / 36' },
  { className: 'text-4xl', size: '36 / 40' },
] as const

const RADII = [
  { className: 'rounded-xs', size: '6px' },
  { className: 'rounded-sm', size: '10px' },
  { className: 'rounded-md', size: '12px' },
  { className: 'rounded-lg', size: '16px' },
  { className: 'rounded-xl', size: '18px' },
  { className: 'rounded-2xl', size: '24px' },
] as const

const SHADOWS = [
  { className: 'shadow-card', text: 'Cards, trays and switches' },
  { className: 'shadow-btn', text: 'Buttons, and cards on hover' },
  { className: 'shadow-input', text: 'Inputs, selects and checkboxes' },
  { className: 'shadow-float', text: 'Slider thumbs and raised tiles' },
  { className: 'shadow-overlay', text: 'Popovers, menus, dialogs and toasts' },
] as const

const EASINGS = [
  {
    className: 'ease-smooth',
    value: 'cubic-bezier(0.22, 1, 0.36, 1)',
    text: 'The default. Starts fast and slows to a soft stop.',
  },
  {
    className: 'ease-settle',
    value: 'Spring, 1.5% overshoot',
    text: 'For something that moves to a new spot, like the sidebar indicator.',
  },
  {
    className: 'ease-bounce',
    value: 'Spring, 12% overshoot',
    text: 'For small things that pop, like an icon swap.',
  },
] as const

const ENTRANCES = [
  { className: 'animate-rise-in', text: '180ms. Fades in from 2px below.' },
  { className: 'animate-dissolve-in', text: '150ms. Fades in from 97% scale.' },
  { className: 'animate-pop-in', text: '200ms. Fades in from 4px below.' },
] as const

const THEMES = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
] as const

export function Foundations() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-10 pb-16 md:px-10">
      <PageHeader className="mb-10 flex-wrap">
        <div className="min-w-0">
          <PageTitle>Foundations</PageTitle>
          <PageDescription>
            The tokens every component is built from, shown in the current theme.
          </PageDescription>
        </div>
        <ThemeToggle />
      </PageHeader>

      <div className="flex flex-col gap-12">
        <Section title="Color" description="Use the token, never a raw value.">
          <div className="flex flex-col gap-4">
            {COLORS.map(({ group, tokens }) => (
              <Tray key={group}>
                <TrayHeader>
                  <h3 className="text-muted-foreground text-sm font-medium">{group}</h3>
                </TrayHeader>
                <TrayCard>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-5 p-4 sm:grid-cols-4">
                    {tokens.map(({ name, className }) => (
                      <li key={name} className="flex min-w-0 flex-col gap-2">
                        <span className={cn('shadow-card h-12 rounded-sm', className)} />
                        <span className="flex min-w-0 flex-col">
                          <span className="text-13 truncate font-medium">{name}</span>
                          <code className="text-muted-foreground truncate font-mono text-xs">
                            {className}
                          </code>
                        </span>
                      </li>
                    ))}
                  </ul>
                </TrayCard>
              </Tray>
            ))}
          </div>
        </Section>

        <Section
          title="Type"
          description="Inter, sized in px with line height after the slash. Tracking tightens as the size grows."
        >
          <Tray className="pt-(--tray-pad)">
            <TrayCard>
              {TYPE.map(({ className, size }) => (
                <div
                  key={className}
                  className="flex items-center gap-4 border-b px-4 py-3 last:border-b-0"
                >
                  <div className="w-24 shrink-0">
                    <code className="text-13 block font-mono">{className}</code>
                    <span className="text-muted-foreground text-xs tabular-nums">
                      {size}
                    </span>
                  </div>
                  <p className={cn('min-w-0 truncate font-medium', className)}>
                    Every part of the interface
                  </p>
                </div>
              ))}
            </TrayCard>
          </Tray>
        </Section>

        <Section
          title="Radius"
          description="A card inside a tray takes the tray's radius minus the padding between them."
        >
          <Tray className="pt-(--tray-pad)">
            <TrayCard>
              <ul className="grid grid-cols-3 gap-x-4 gap-y-5 p-5 sm:grid-cols-6">
                {RADII.map(({ className, size }) => (
                  <li key={className} className="flex flex-col items-start gap-2">
                    <span
                      className={cn(
                        'bg-muted inset-ring-border size-14 inset-ring',
                        className,
                      )}
                    />
                    <span className="flex flex-col">
                      <code className="text-13 font-mono">{className}</code>
                      <span className="text-muted-foreground text-xs">{size}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </TrayCard>
          </Tray>
        </Section>

        <Section
          title="Shadow"
          description="Dark mode swaps most shadows for a thin ring."
        >
          <Tray className="pt-(--tray-pad)">
            <TrayCard>
              <ul className="grid grid-cols-2 gap-x-5 gap-y-6 p-5 sm:grid-cols-5">
                {SHADOWS.map(({ className, text }) => (
                  <li key={className} className="flex flex-col gap-3">
                    <span className={cn('bg-card h-16 rounded-md', className)} />
                    <span className="flex flex-col">
                      <code className="text-13 font-mono">{className}</code>
                      <span className="text-muted-foreground text-xs text-pretty">
                        {text}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </TrayCard>
          </Tray>
        </Section>

        <Section
          title="Easing"
          description="Press play to compare them over the same 500ms."
        >
          <Tray className="pt-(--tray-pad)">
            <TrayCard>
              {EASINGS.map((easing) => (
                <Easing key={easing.className} {...easing} />
              ))}
            </TrayCard>
          </Tray>
        </Section>

        <Section
          title="Animation"
          description="Keyframes for entrances and loading. Reduced motion turns them off."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {ENTRANCES.map((entrance) => (
              <Entrance key={entrance.className} {...entrance} />
            ))}
            <Keyframe
              name="animate-shimmer"
              text="1.8s loop. A light sweeps across text."
            >
              <Shimmer className="text-sm font-medium">Loading results</Shimmer>
            </Keyframe>
            <Keyframe name="animate-dots" text="1.2s loop. Four dots pulse in turn.">
              <Dots />
            </Keyframe>
          </div>
        </Section>
      </div>
    </div>
  )
}

function ThemeToggle() {
  const appearance = useAppearance((store) => store.appearance)
  const setAppearance = useAppearance((store) => store.setAppearance)

  return (
    <ToggleGroup
      aria-label="Theme"
      variant="outline"
      size="sm"
      spacing={0}
      value={[appearance]}
      onValueChange={([next]) => {
        if (isAppearance(next)) setAppearance(next)
      }}
    >
      {THEMES.map(({ value, label }) => (
        <ToggleGroupItem key={value} value={value}>
          {label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section>
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="text-muted-foreground mt-1 mb-4 max-w-2xl text-sm text-pretty">
        {description}
      </p>
      {children}
    </section>
  )
}

function Easing({
  className,
  value,
  text,
}: {
  className: string
  value: string
  text: string
}) {
  const [moved, setMoved] = useState(false)

  return (
    <div className="flex flex-col gap-4 border-b px-4 py-4 last:border-b-0 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-col sm:w-64 sm:shrink-0">
        <code className="text-13 font-mono font-medium">{className}</code>
        <span className="text-muted-foreground font-mono text-xs">{value}</span>
        <span className="text-muted-foreground mt-1 text-xs text-pretty">{text}</span>
      </div>
      <div className="flex flex-1 items-center gap-3">
        <div className="bg-muted h-8 min-w-0 flex-1 rounded-full p-1">
          <div
            data-moved={moved || undefined}
            className={cn(
              'w-[calc(100%-1.5rem)] transition-[translate] duration-500 data-moved:translate-x-full motion-reduce:transition-none',
              className,
            )}
          >
            <span className="bg-card shadow-btn block size-6 rounded-full" />
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          aria-label={`Play ${className}`}
          onClick={() => setMoved((current) => !current)}
        >
          Play
        </Button>
      </div>
    </div>
  )
}

function Entrance({ className, text }: { className: string; text: string }) {
  const [run, setRun] = useState(0)

  return (
    <Keyframe
      name={className}
      text={text}
      action={
        <Button
          variant="ghost"
          size="xs"
          aria-label={`Replay ${className}`}
          onClick={() => setRun((current) => current + 1)}
        >
          Replay
        </Button>
      }
    >
      <span
        key={run}
        className={cn(
          'bg-card shadow-card text-13 rounded-sm px-3 py-1.5 font-medium',
          className,
        )}
      >
        Changes saved
      </span>
    </Keyframe>
  )
}

function Keyframe({
  name,
  text,
  action,
  children,
}: {
  name: string
  text: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <Tray>
      <TrayHeader>
        <h3 className="text-muted-foreground font-mono text-xs font-medium">{name}</h3>
        {action}
      </TrayHeader>
      <TrayCard className="flex h-28 items-center justify-center">{children}</TrayCard>
      <p className="text-muted-foreground px-2.75 pt-2 pb-1 text-xs">{text}</p>
    </Tray>
  )
}
