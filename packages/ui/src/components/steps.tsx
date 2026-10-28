import { useState, type ComponentProps, type ReactNode } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'

import { Button } from '@dkrasniy/ui/components/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@dkrasniy/ui/components/collapsible'
import { Progress, ProgressLabel, ProgressValue } from '@dkrasniy/ui/components/progress'
import { ProgressCheck } from '@dkrasniy/ui/components/progress-check'
import { Shimmer } from '@dkrasniy/ui/components/shimmer'
import { cn } from '@dkrasniy/ui/lib/utils'

type StepState = 'waiting' | 'active' | 'done' | 'failed'

type StepsStatus = 'idle' | 'running' | 'done' | 'failed'

interface StepItem {
  label: string
  state: StepState
  count?: string
}

function StepList({ className, ...props }: ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="step-list"
      className={cn('grid gap-x-6 gap-y-2.5', className)}
      {...props}
    />
  )
}

function Step({
  state,
  count,
  className,
  children,
  ...props
}: ComponentProps<'li'> & { state: StepState; count?: ReactNode }) {
  return (
    <li
      data-slot="step"
      data-state={state}
      aria-current={state === 'active' ? 'step' : undefined}
      className={cn(
        'flex items-center gap-2.5 text-sm',
        state === 'waiting' && 'text-muted-foreground',
        className,
      )}
      {...props}
    >
      {state === 'waiting' ? (
        <span
          aria-hidden
          className="border-foreground/20 size-4 shrink-0 rounded-full border-[1.5px]"
        />
      ) : (
        <ProgressCheck
          done={state !== 'active'}
          tone={state === 'failed' ? 'destructive' : 'success'}
          mark={state === 'failed' ? 'cross' : 'check'}
          label={state === 'failed' ? 'Failed' : 'Done'}
        />
      )}
      <span className="min-w-0 flex-1 truncate">
        {state === 'active' ? <Shimmer>{children}</Shimmer> : children}
      </span>
      {count ? (
        <span
          className={cn(
            'text-xs tabular-nums',
            state === 'failed' ? 'text-destructive' : 'text-subtle-foreground',
          )}
        >
          {count}
        </span>
      ) : null}
    </li>
  )
}

function percent(steps: readonly StepItem[]) {
  return Math.round(
    (steps.filter((step) => step.state === 'done').length / steps.length) * 100,
  )
}

function StepsPanel({
  status,
  icon,
  title,
  detail,
  steps,
  note,
  collapsed = status === 'done',
  action,
  onDismiss,
  className,
  children,
}: {
  status: StepsStatus
  icon?: ReactNode
  title: ReactNode
  detail?: ReactNode
  steps?: readonly StepItem[] | undefined
  note?: string | undefined
  collapsed?: boolean
  action?: ReactNode
  onDismiss?: (() => void) | undefined
  className?: string
  children?: ReactNode
}) {
  const [toggled, setToggled] = useState<boolean>()
  const [seen, setSeen] = useState({ status, collapsed })
  if (seen.status !== status || seen.collapsed !== collapsed) {
    setSeen({ status, collapsed })
    setToggled(undefined)
  }
  const listed = steps?.length ? steps : undefined
  const expandable = Boolean(listed ?? children)
  const open = expandable && (toggled ?? !collapsed)

  return (
    <Collapsible
      data-slot="steps-panel"
      open={open}
      onOpenChange={setToggled}
      disabled={!expandable}
      className={cn('@container [--steps-pad:16px]', className)}
    >
      <div className="flex items-center gap-3 px-(--steps-pad) py-3">
        <CollapsibleTrigger className="group flex min-w-0 flex-1 items-center gap-3 text-start">
          <span className="grid size-4 shrink-0 place-items-center">
            {status === 'idle' ? (
              icon
            ) : (
              <ProgressCheck
                done={status !== 'running'}
                tone={status === 'failed' ? 'destructive' : 'success'}
                mark={status === 'failed' ? 'cross' : 'check'}
                label={status === 'failed' ? 'Failed' : 'Done'}
              />
            )}
          </span>
          <span aria-live="polite" className="min-w-0 flex-1">
            <span
              className={cn(
                'block text-sm font-medium',
                status === 'failed' && 'text-destructive',
              )}
            >
              {title}
            </span>
            {detail ? (
              <span className="text-muted-foreground block text-13 tabular-nums">
                {detail}
              </span>
            ) : null}
          </span>
          {expandable ? (
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              strokeWidth={2}
              className="text-subtle-foreground group-hover:text-foreground ease-smooth size-4 shrink-0 transition-[color,rotate] duration-200 group-data-panel-open:rotate-180"
            />
          ) : null}
        </CollapsibleTrigger>
        {action}
        {onDismiss ? (
          <Button variant="ghost" size="xs" onClick={onDismiss}>
            Dismiss
          </Button>
        ) : null}
      </div>
      <CollapsibleContent className="ease-smooth h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0">
        {expandable ? (
          <div className="flex flex-col gap-4 ps-[calc(var(--steps-pad)+28px)] pe-(--steps-pad) pt-1 pb-4">
            {listed ? (
              <>
                <Progress
                  value={percent(listed)}
                  aria-label={note ? undefined : 'Progress'}
                  className="gap-2"
                >
                  {note ? (
                    <ProgressLabel className="text-muted-foreground text-xs font-normal">
                      {note}
                    </ProgressLabel>
                  ) : null}
                  <ProgressValue className="text-xs" />
                </Progress>
                <StepList className="@2xl:auto-cols-fr @2xl:grid-flow-col">
                  {listed.map((step) => (
                    <Step key={step.label} state={step.state} count={step.count}>
                      {step.label}
                    </Step>
                  ))}
                </StepList>
              </>
            ) : null}
            {children}
          </div>
        ) : null}
      </CollapsibleContent>
    </Collapsible>
  )
}

export { Step, StepList, StepsPanel }
export type { StepItem, StepState, StepsStatus }
