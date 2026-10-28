import * as React from 'react'
import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer'

import { cn } from '@dkrasniy/ui/lib/utils'

const StackContext = React.createContext<HTMLElement | null | undefined>(undefined)

function DrawerStack({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<'div'>, 'ref'>) {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null)

  return (
    <DrawerPrimitive.Provider>
      <div
        ref={setContainer}
        data-slot="drawer-stack"
        className={cn(
          'relative isolate flex min-h-0 flex-1 flex-col overflow-hidden',
          className,
        )}
        {...props}
      >
        <DrawerPrimitive.IndentBackground className="absolute inset-0 bg-neutral-300 dark:bg-black" />
        <DrawerPrimitive.Indent
          data-slot="drawer-indent"
          className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-background transition-[scale,border-radius] duration-360 ease-smooth [transform-origin:50%_0] data-active:pointer-events-none data-active:rounded-xl data-active:[scale:calc(0.965+0.035*var(--drawer-swipe-progress,0))]"
        >
          <StackContext value={container}>{children}</StackContext>
        </DrawerPrimitive.Indent>
      </div>
    </DrawerPrimitive.Provider>
  )
}

function Drawer(props: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger(props: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerClose(props: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerContent({ className, children, ...props }: DrawerPrimitive.Popup.Props) {
  const container = React.use(StackContext)

  return (
    <DrawerPrimitive.Portal container={container}>
      <DrawerPrimitive.Backdrop className="pointer-events-none absolute inset-0 z-10 bg-black opacity-[calc(var(--dim)*(1-var(--drawer-swipe-progress,0)))] transition-opacity duration-360 ease-smooth [--dim:0.07] data-ending-style:opacity-0 data-ending-style:duration-290 data-starting-style:opacity-0 data-swiping:duration-0 dark:[--dim:0.5]" />
      <DrawerPrimitive.Viewport className="pointer-events-none absolute inset-0 z-10 flex items-end">
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          className={cn(
            'pointer-events-auto flex h-[calc(100%-0.875rem)] w-full animate-sheet-up flex-col overflow-hidden rounded-t-xl bg-background text-sm text-foreground shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_-8px_28px_rgb(0_0_0/0.08)] outline-none [transform:translateY(var(--drawer-swipe-movement-y,0))] transition-transform duration-300 ease-smooth data-ending-style:animate-sheet-down data-swiping:transition-none data-swiping:select-none dark:shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.07)]',
            className,
          )}
          {...props}
        >
          <DrawerPrimitive.Content className="flex min-h-0 flex-1 flex-col">
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPrimitive.Portal>
  )
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn('text-sm font-semibold text-foreground', className)}
      {...props}
    />
  )
}

function DrawerDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerStack,
  DrawerTitle,
  DrawerTrigger,
}
