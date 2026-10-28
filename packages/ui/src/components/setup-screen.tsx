import { useEffect, useRef, useState, type ReactNode } from 'react'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'

import { useConfetti } from '@dkrasniy/ui/components/confetti'
import { Dots } from '@dkrasniy/ui/components/dots'
import { ProgressCheck } from '@dkrasniy/ui/components/progress-check'
import { Shimmer } from '@dkrasniy/ui/components/shimmer'
import { cn } from '@dkrasniy/ui/lib/utils'

interface SetupStep {
  label: string
  doneLabel: string
}

const STEP_MS = 1100
const CONFETTI_DELAY_MS = 180
const FADE_UP = 'animate-[fade-up_520ms_cubic-bezier(0.22,1,0.36,1)_both]'

function useStagedProgress(
  total: number,
  { stepMs = STEP_MS, ready = true }: { stepMs?: number; ready?: boolean } = {},
) {
  const [done, setDone] = useState(0)
  const limit = ready ? total : Math.max(0, total - 1)

  useEffect(() => {
    if (done >= limit) return
    const timer = setTimeout(() => setDone((count) => count + 1), stepMs)
    return () => clearTimeout(timer)
  }, [done, limit, stepMs])

  return Math.min(done, total)
}

function SetupScreen({
  icon,
  title,
  readyTitle,
  description = 'This only takes a moment.',
  readyDescription,
  steps,
  done,
  actions,
  className,
}: {
  icon: IconSvgElement
  title: string
  readyTitle: string
  description?: ReactNode
  readyDescription?: ReactNode
  steps: readonly SetupStep[]
  done: number
  actions?: ReactNode
  className?: string
}) {
  const [confetti, fire] = useConfetti()
  const celebrated = useRef(false)
  const finished = done >= steps.length

  useEffect(() => {
    if (!finished) {
      celebrated.current = false
      return
    }
    if (celebrated.current) return
    const timer = setTimeout(() => {
      celebrated.current = true
      fire()
    }, CONFETTI_DELAY_MS)
    return () => clearTimeout(timer)
  }, [finished, fire])

  return (
    <div
      data-slot="setup-screen"
      data-finished={finished || undefined}
      className={cn('grid min-h-full w-full place-items-center px-10 py-16', className)}
    >
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <div
          className={cn('relative grid size-14 place-items-center', FADE_UP)}
          style={{ animationDelay: '0ms' }}
        >
          {confetti}
          <span
            className={cn(
              'ease-smooth absolute inset-0 grid place-items-center rounded-2xl transition-colors duration-300',
              finished ? 'bg-success' : 'bg-muted',
            )}
          >
            <Dots
              className={cn(
                'absolute transition-[opacity,scale,filter] duration-200 ease-out',
                finished ? 'scale-75 opacity-0 blur-[2px]' : 'opacity-100',
              )}
            />
            <HugeiconsIcon
              icon={icon}
              strokeWidth={2}
              className={cn(
                'absolute size-6 text-white transition-[opacity,scale] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                finished ? 'scale-100 opacity-100 delay-75' : 'scale-50 opacity-0',
              )}
            />
          </span>
        </div>

        <h1
          aria-live="polite"
          className={cn('mt-6 text-xl font-semibold text-balance', FADE_UP)}
          style={{ animationDelay: '70ms' }}
        >
          {finished ? readyTitle : title}
        </h1>
        <p
          className={cn('text-muted-foreground mt-2 text-sm', FADE_UP)}
          style={{ animationDelay: '120ms' }}
        >
          {finished ? (readyDescription ?? description) : description}
        </p>

        <ul className="bg-card shadow-card mt-7 w-full rounded-lg p-1.5 text-left">
          {steps.map((step, index) => {
            const state = index < done ? 'done' : index === done ? 'running' : 'pending'
            const last = index === steps.length - 1
            return (
              <li
                key={step.label}
                className={cn('flex items-start gap-2.5 px-2.5 py-2 text-sm', FADE_UP)}
                style={{ animationDelay: `${190 + index * 80}ms` }}
              >
                <span className="flex flex-col items-center self-stretch">
                  {state === 'pending' ? (
                    <span className="bg-muted size-4 shrink-0 rounded-full" />
                  ) : (
                    <ProgressCheck
                      done={state === 'done'}
                      tone="success"
                      label={state === 'done' ? step.doneLabel : step.label}
                    />
                  )}
                  {last ? null : (
                    <span className="bg-muted mt-1 w-0.5 flex-1 overflow-hidden rounded-full">
                      <span
                        className={cn(
                          'bg-success block h-full origin-top transition-transform duration-500 ease-out',
                          index < done ? 'scale-y-100' : 'scale-y-0',
                        )}
                      />
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    'ease-smooth pb-1 transition-colors duration-300',
                    state === 'pending' && 'text-muted-foreground',
                  )}
                >
                  {state === 'running' ? (
                    <Shimmer>{step.label}</Shimmer>
                  ) : state === 'done' ? (
                    step.doneLabel
                  ) : (
                    step.label
                  )}
                </span>
              </li>
            )
          })}
        </ul>

        {actions ? (
          <div
            inert={!finished}
            className={cn(
              'ease-smooth mt-7 grid w-full gap-2 transition-[opacity,translate,filter] duration-400',
              finished
                ? 'translate-y-0 opacity-100 blur-[0px]'
                : 'pointer-events-none translate-y-2 opacity-0 blur-[2px]',
            )}
          >
            {actions}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export { SetupScreen, useStagedProgress }
export type { SetupStep }
