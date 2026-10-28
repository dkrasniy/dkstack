import { useState } from 'react'
import { useDebouncedValue } from '@mantine/hooks'
import { SearchInput, SearchMark } from '@dkrasniy/ui/components/search-input'
import { Segmented } from '@dkrasniy/ui/components/segmented'
import type { Entry } from '../registry'

function Basic() {
  const [query, setQuery] = useState('')
  const [settled] = useDebouncedValue(query, 700)

  return (
    <div className="w-full max-w-sm">
      <SearchInput
        value={query}
        onValueChange={setQuery}
        loading={query.trim() !== '' && settled !== query}
        placeholder="Search projects"
        aria-label="Search projects"
      />
    </div>
  )
}

const MARKS = [
  { value: 'search', label: 'Search' },
  { value: 'searching', label: 'Searching' },
  { value: 'clear', label: 'Clear' },
  { value: 'none', label: 'Hidden' },
] as const

type MarkValue = (typeof MARKS)[number]['value']

function Marks() {
  const [mark, setMark] = useState<MarkValue>('search')

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="bg-background shadow-input text-subtle-foreground flex h-9 items-center rounded-sm ps-3 pe-2 text-sm">
        <span className="truncate">Jane Cooper or jane@example.com</span>
        <SearchMark
          mark={mark === 'none' ? null : mark}
          onClear={() => setMark('none')}
        />
      </div>
      <Segmented
        value={mark}
        options={MARKS}
        aria-label="Mark"
        onValueChange={(next) => {
          const picked = MARKS.find((each) => each.value === next)
          if (picked) setMark(picked.value)
        }}
      />
    </div>
  )
}

export const entry: Entry = {
  slug: 'search-input',
  title: 'Search input',
  group: 'Inputs',
  summary:
    'A search field with a trailing mark that turns into a spinner while results load and a clear button once there is text.',
  imports:
    "import { SearchInput, SearchMark } from '@dkrasniy/ui/components/search-input'",
  guidance: [
    'Pass loading while results are on their way. The clear button gives way to a spinner and comes back when the search settles.',
    'Escape clears the text first. Only an Escape in an empty field reaches the dialog or popover around it.',
    'Clearing puts focus back in the field, so people can type again straight away.',
    'Give the field an aria-label when there is no visible label. The placeholder goes away as soon as someone types.',
    'SearchMark is the trailing mark on its own, for a field that is not an InputGroup, like a combobox with chips. It takes no room until it has something to show.',
  ],
  examples: [
    {
      title: 'Search input',
      description:
        'Type to see the spinner while a fake search runs, then the clear button.',
      Demo: Basic,
      code: `const [query, setQuery] = useState('')
const [needle] = useDebouncedValue(query.trim(), 250)
const results = useQuery(projectSearchQuery(needle))

<SearchInput
  value={query}
  onValueChange={setQuery}
  loading={results.isFetching}
  placeholder="Search projects"
  aria-label="Search projects"
/>`,
    },
    {
      title: 'Search mark',
      description:
        'The room for the mark opens as it slides in, and the icons cross-fade when the state changes.',
      Demo: Marks,
      code: `<ComboboxChips ref={anchor}>
  <ComboboxValue>{renderChips}</ComboboxValue>
  <ComboboxChipsInput
    ref={input}
    onFocus={() => setFocused(true)}
    onBlur={() => setFocused(false)}
  />
  <SearchMark
    mark={query !== '' ? (pending ? 'searching' : 'clear') : focused ? 'search' : null}
    onClear={() => {
      setQuery('')
      input.current?.focus()
    }}
  />
</ComboboxChips>`,
    },
  ],
}
