import * as React from 'react'
import type { Popover as PopoverPrimitive } from '@base-ui/react/popover'
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import { ArrowLeft01Icon, ArrowRight01Icon, Tick02Icon } from '@hugeicons/core-free-icons'

import { cn } from '@dkrasniy/ui/lib/utils'
import { PanelPages } from '@dkrasniy/ui/components/panel-pages'
import { Popover, PopoverContent, PopoverTrigger } from '@dkrasniy/ui/components/popover'

const ROW =
  'text-13 flex h-8 w-full cursor-pointer items-center gap-2.5 rounded-[calc(var(--radius-md)-4px)] px-2.5 text-left outline-hidden select-none hover:bg-accent focus-visible:bg-accent [&_svg]:size-4 [&_svg]:shrink-0'

const PANEL = 'bg-popover shadow-overlay rounded-md border border-transparent p-1.5'

const ANCHOR = [
  '[[data-side=top]_&]:min-h-(--available-height)',
  '[[data-side=left][data-align=end]_&]:min-h-(--available-height)',
  '[[data-side=right][data-align=end]_&]:min-h-(--available-height)',
  '[[data-side=left]_&]:min-w-(--available-width) [[data-side=left]_&]:items-end',
  '[[data-side=top][data-align=end]_&]:min-w-(--available-width) [[data-side=top][data-align=end]_&]:items-end',
  '[[data-side=bottom][data-align=end]_&]:min-w-(--available-width) [[data-side=bottom][data-align=end]_&]:items-end',
].join(' ')

const COLLISIONS = { side: 'none', align: 'shift' } as const

type MorphMenuContextValue = {
  page: string
  go: (page: string) => void
  back: () => void
  close: () => void
}

const MorphMenuContext = React.createContext<MorphMenuContextValue | null>(null)
const PageSlotContext = React.createContext<string | null>(null)

function useMorphMenu() {
  const context = React.useContext(MorphMenuContext)
  if (!context) {
    throw new Error('useMorphMenu must be used within a MorphMenu.')
  }
  return context
}

function MorphMenu({
  root = 'root',
  page: pageProp,
  onPageChange,
  onOpenChange,
  onOpenChangeComplete,
  children,
  ...props
}: Omit<PopoverPrimitive.Root.Props, 'actionsRef' | 'children'> & {
  root?: string
  page?: string
  onPageChange?: (page: string) => void
  children: React.ReactNode
}) {
  const [ownPage, setOwnPage] = React.useState(root)
  const page = pageProp ?? ownPage
  const history = React.useRef<string[]>([])
  const actions = React.useRef<PopoverPrimitive.Root.Actions>(null)

  const show = React.useCallback(
    (next: string) => {
      setOwnPage(next)
      onPageChange?.(next)
    },
    [onPageChange],
  )

  const context = React.useMemo<MorphMenuContextValue>(
    () => ({
      page,
      go: (next) => {
        if (next === page) return
        history.current.push(page)
        show(next)
      },
      back: () => show(history.current.pop() ?? root),
      close: () => actions.current?.close(),
    }),
    [page, root, show],
  )

  const reset = () => {
    history.current = []
    if (page !== root) show(root)
  }

  return (
    <MorphMenuContext value={context}>
      <Popover
        actionsRef={actions}
        onOpenChange={(open, details) => {
          if (open) reset()
          else if (details.reason === 'escape-key' && page !== root) {
            details.cancel()
            context.back()
            return
          }
          onOpenChange?.(open, details)
        }}
        onOpenChangeComplete={(open) => {
          if (!open) reset()
          onOpenChangeComplete?.(open)
        }}
        {...props}
      >
        {children}
      </Popover>
    </MorphMenuContext>
  )
}

function MorphMenuTrigger(props: PopoverPrimitive.Trigger.Props) {
  return <PopoverTrigger data-slot="morph-menu-trigger" {...props} />
}

function MorphMenuContent({
  className,
  children,
  side = 'bottom',
  align = 'start',
  sideOffset = 4,
  alignOffset = 0,
  collisionAvoidance = COLLISIONS,
  ...props
}: Omit<PopoverPrimitive.Popup.Props, 'className' | 'children'> &
  Pick<
    PopoverPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset' | 'collisionAvoidance'
  > & {
    className?: string
    children: React.ReactNode
  }) {
  const { page } = useMorphMenu()

  return (
    <PopoverContent
      data-slot="morph-menu-content"
      side={side}
      align={align}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      collisionAvoidance={collisionAvoidance}
      className="pointer-events-none max-h-(--available-height) w-auto gap-0 overflow-visible rounded-none bg-transparent p-0 shadow-none"
      {...props}
    >
      <PanelPages
        page={page}
        className={ANCHOR}
        panelClassName={cn(PANEL, className)}
        render={(shown) => <PageSlotContext value={shown}>{children}</PageSlotContext>}
      />
    </PopoverContent>
  )
}

function MorphMenuPage({
  name,
  title,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<'div'>, 'title'> & {
  name: string
  title?: string
}) {
  const slot = React.useContext(PageSlotContext)
  const { back } = useMorphMenu()
  if (slot !== name) return null

  return (
    <div data-slot="morph-menu-page" className={cn('w-60', className)} {...props}>
      {title === undefined ? null : (
        <>
          <button
            type="button"
            onClick={back}
            className={cn(ROW, 'text-muted-foreground')}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
            {title}
            <span className="sr-only">, back</span>
          </button>
          <MorphMenuDivider />
        </>
      )}
      {children}
    </div>
  )
}

function MorphMenuItem({
  className,
  render,
  ...props
}: useRender.ComponentProps<'button'>) {
  return useRender({
    defaultTagName: 'button',
    props: mergeProps<'button'>(
      render
        ? { className: cn(ROW, className) }
        : { type: 'button', className: cn(ROW, className) },
      props,
    ),
    render,
    state: {
      slot: 'morph-menu-item',
    },
  })
}

function MorphMenuForward({
  to,
  icon,
  value,
  className,
  children,
  onClick,
  ...props
}: Omit<React.ComponentProps<'button'>, 'value'> & {
  to: string
  icon?: IconSvgElement
  value?: React.ReactNode
}) {
  const { go } = useMorphMenu()

  return (
    <button
      type="button"
      data-slot="morph-menu-forward"
      className={cn(ROW, className)}
      onClick={(event) => {
        onClick?.(event)
        go(to)
      }}
      {...props}
    >
      {icon ? (
        <HugeiconsIcon icon={icon} strokeWidth={2} className="text-muted-foreground" />
      ) : null}
      {children}
      <span className="text-muted-foreground ml-auto">{value}</span>
      <HugeiconsIcon
        icon={ArrowRight01Icon}
        strokeWidth={2}
        className="text-muted-foreground"
      />
    </button>
  )
}

function MorphMenuOption({
  selected,
  icon,
  className,
  children,
  ...props
}: React.ComponentProps<'button'> & {
  selected: boolean
  icon?: IconSvgElement
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      data-slot="morph-menu-option"
      className={cn(ROW, className)}
      {...props}
    >
      {icon ? (
        <HugeiconsIcon icon={icon} strokeWidth={2} className="text-muted-foreground" />
      ) : null}
      {children}
      {selected ? (
        <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} className="ml-auto" />
      ) : null}
    </button>
  )
}

function MorphMenuDivider({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      aria-hidden="true"
      data-slot="morph-menu-divider"
      className={cn('bg-border/50 my-1.5 h-px', className)}
      {...props}
    />
  )
}

function MorphMenuLabel({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="morph-menu-label"
      className={cn(
        'text-muted-foreground px-2.5 pt-1.5 pb-1 text-xs font-medium',
        className,
      )}
      {...props}
    />
  )
}

export {
  MorphMenu,
  MorphMenuContent,
  MorphMenuDivider,
  MorphMenuForward,
  MorphMenuItem,
  MorphMenuLabel,
  MorphMenuOption,
  MorphMenuPage,
  MorphMenuTrigger,
  useMorphMenu,
}
