import type { CSSProperties } from 'react'
import { Radio as RadioPrimitive } from '@base-ui/react/radio'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'

import { cn } from '@dkrasniy/ui/lib/utils'

interface SegmentedOption {
  value: string
  label: string
}

function Segmented({
  className,
  value,
  options,
  ...props
}: Omit<RadioGroupPrimitive.Props, 'value' | 'children'> & {
  value: string
  options: readonly SegmentedOption[]
}) {
  const index = options.findIndex((option) => option.value === value)

  return (
    <RadioGroupPrimitive
      data-slot="segmented"
      value={value}
      style={{ '--count': options.length, '--index': index } as CSSProperties}
      className={cn(
        'relative isolate grid w-full auto-cols-fr grid-flow-col gap-0.75 rounded-pill bg-muted p-0.75',
        className,
      )}
      {...props}
    >
      {index === -1 ? null : (
        <span
          aria-hidden="true"
          className="ease-smooth absolute inset-y-0.75 left-0.75 -z-1 w-[calc((100%-0.375rem-(var(--count)-1)*0.1875rem)/var(--count))] translate-x-[calc(var(--index)*(100%+0.1875rem))] rounded-[calc(var(--radius-pill)-3px)] bg-background shadow-card transition-[translate] duration-250 motion-reduce:transition-none"
        />
      )}
      {options.map((option) => (
        <RadioPrimitive.Root
          key={option.value}
          value={option.value}
          className="ease-smooth relative flex h-7.5 cursor-pointer items-center justify-center rounded-[calc(var(--radius-pill)-3px)] px-3 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors duration-250 outline-none hover:text-foreground focus-visible:shadow-focus not-data-checked:hover:bg-foreground/5 disabled:pointer-events-none disabled:opacity-40 data-checked:text-foreground"
        >
          {option.label}
        </RadioPrimitive.Root>
      ))}
    </RadioGroupPrimitive>
  )
}

export { Segmented }
