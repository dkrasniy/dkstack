import { Switch as SwitchPrimitive } from '@base-ui/react/switch'

import { cn } from '@dkrasniy/ui/lib/utils'

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'ease-smooth inline-flex h-5 w-8 shrink-0 cursor-pointer items-center rounded-pill bg-input p-0.5 transition-colors duration-150 data-checked:bg-brand data-disabled:cursor-not-allowed data-disabled:opacity-40',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="ease-smooth size-4 rounded-[calc(var(--radius-pill)-2px)] bg-white shadow-card transition-transform duration-250 data-checked:translate-x-3" />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
