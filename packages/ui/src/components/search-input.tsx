import * as React from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon, Search01Icon } from '@hugeicons/core-free-icons'

import { cn } from '@dkrasniy/ui/lib/utils'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@dkrasniy/ui/components/input-group'
import { Spinner } from '@dkrasniy/ui/components/spinner'

type SearchMarkState = 'search' | 'searching' | 'clear'

const LAYER =
  'ease-smooth grid scale-50 place-items-center opacity-0 blur-[2px] transition-[opacity,scale,filter] duration-180 [grid-area:1/1] motion-reduce:transition-none'

function SearchMark({
  mark,
  onClear,
  className,
}: {
  mark: SearchMarkState | null
  onClear: () => void
  className?: string
}) {
  const [last, setLast] = React.useState<SearchMarkState>(mark ?? 'search')
  if (mark !== null && mark !== last) setLast(mark)
  const current = mark ?? last

  return (
    <span
      data-slot="search-mark"
      data-shown={mark !== null || undefined}
      inert={mark === null}
      className={cn(
        'group/search-mark ease-smooth ms-auto flex w-0 shrink-0 justify-end transition-[width] duration-250 data-shown:w-5.5 motion-reduce:transition-none',
        className,
      )}
    >
      <span
        data-mark={current}
        className="group/mark ease-smooth text-subtle-foreground grid size-5 shrink-0 translate-x-2 place-items-center opacity-0 transition-[translate,opacity] duration-250 group-data-shown/search-mark:translate-x-0 group-data-shown/search-mark:opacity-100 motion-reduce:transition-none"
      >
        <span
          inert={current !== 'search'}
          className={cn(
            LAYER,
            'group-data-[mark=search]/mark:scale-100 group-data-[mark=search]/mark:opacity-100 group-data-[mark=search]/mark:blur-[0px]',
          )}
        >
          <HugeiconsIcon
            icon={Search01Icon}
            strokeWidth={2}
            aria-hidden="true"
            className="size-4"
          />
        </span>
        <span
          inert={current !== 'searching'}
          className={cn(
            LAYER,
            'group-data-[mark=searching]/mark:scale-100 group-data-[mark=searching]/mark:opacity-100 group-data-[mark=searching]/mark:blur-[0px]',
          )}
        >
          <Spinner aria-label="Searching" />
        </span>
        <span
          inert={current !== 'clear'}
          className={cn(
            LAYER,
            'group-data-[mark=clear]/mark:scale-100 group-data-[mark=clear]/mark:opacity-100 group-data-[mark=clear]/mark:blur-[0px]',
          )}
        >
          <button
            type="button"
            aria-label="Clear search"
            onMouseDown={(event) => event.preventDefault()}
            onClick={onClear}
            className="hover:text-foreground focus-visible:shadow-focus grid size-5 place-items-center rounded-pill outline-none"
          >
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-4" />
          </button>
        </span>
      </span>
    </span>
  )
}

function SearchInput({
  value,
  onValueChange,
  loading = false,
  className,
  onKeyDown,
  ...props
}: Omit<React.ComponentProps<'input'>, 'value' | 'defaultValue' | 'onChange'> & {
  value: string
  onValueChange: (value: string) => void
  loading?: boolean
}) {
  const group = React.useRef<HTMLDivElement>(null)
  const clear = () => {
    onValueChange('')
    group.current?.querySelector('input')?.focus()
  }

  return (
    <InputGroup ref={group} data-slot="search-input" className={className}>
      <InputGroupAddon>
        <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
      </InputGroupAddon>
      <InputGroupInput
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        onKeyDown={(event) => {
          onKeyDown?.(event)
          if (event.defaultPrevented || event.key !== 'Escape' || value === '') return
          event.preventDefault()
          event.stopPropagation()
          clear()
        }}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <SearchMark
          mark={loading ? 'searching' : value !== '' ? 'clear' : null}
          onClear={clear}
        />
      </InputGroupAddon>
    </InputGroup>
  )
}

export { SearchInput, SearchMark, type SearchMarkState }
