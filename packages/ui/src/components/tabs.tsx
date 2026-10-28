import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'

import { cn } from '@dkrasniy/ui/lib/utils'

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-3', className)}
      {...props}
    />
  )
}

function TabsList({ className, children, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'relative isolate inline-flex w-fit items-center gap-0.75 rounded-pill bg-muted p-0.75',
        className,
      )}
      {...props}
    >
      {children}
      <TabsPrimitive.Indicator className="ease-smooth absolute top-0 left-0 -z-1 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) translate-y-(--active-tab-top) rounded-[calc(var(--radius-pill)-3px)] bg-background shadow-card transition-[translate,width] duration-250" />
    </TabsPrimitive.List>
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        'ease-smooth h-7 cursor-pointer rounded-[calc(var(--radius-pill)-3px)] px-3 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors duration-250 hover:text-foreground not-data-active:hover:bg-foreground/5 disabled:pointer-events-none disabled:opacity-40 data-active:text-foreground',
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn('outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
