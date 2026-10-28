import { useRef, useState } from 'react'
import { useDebouncedValue } from '@mantine/hooks'
import { HugeiconsIcon } from '@hugeicons/react'
import { Search01Icon, UserGroupIcon } from '@hugeicons/core-free-icons'
import { Avatar, AvatarFallback } from '@dkrasniy/ui/components/avatar'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@dkrasniy/ui/components/combobox'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@dkrasniy/ui/components/empty'
import { Field, FieldLabel } from '@dkrasniy/ui/components/field'
import { SearchMark } from '@dkrasniy/ui/components/search-input'
import { Skeleton } from '@dkrasniy/ui/components/skeleton'
import { cn } from '@dkrasniy/ui/lib/utils'
import type { Entry } from '../registry'

interface Option {
  id: string
  kind: 'person' | 'group'
  name: string
  email: string
  note: string
}

interface Section {
  label: string
  items: Option[]
}

const person = (name: string, note: string): Option => {
  const handle = name.toLowerCase().replace(' ', '.')
  return { id: handle, kind: 'person', name, email: `${handle}@example.com`, note }
}

const group = (name: string, size: number): Option => {
  const handle = name.toLowerCase()
  return {
    id: handle,
    kind: 'group',
    name,
    email: `${handle}@example.com`,
    note: `${size} people`,
  }
}

const DIRECTORY: Option[] = [
  person('Priya Raman', 'Design Lead'),
  person('Marcus Bell', 'Staff Engineer'),
  person('Sofia Alvarez', 'Product Designer'),
  person('Kenji Watanabe', 'Engineering Manager'),
  person('Amara Okafor', 'Frontend Engineer'),
  person('Mei Chen', 'Research Lead'),
  person('Noah Patel', 'Product Manager'),
  person('Elena Petrova', 'Brand Designer'),
  person('Samuel Brooks', 'Support Lead'),
  person('Grace Kim', 'Copywriter'),
  person('Mateo Rossi', 'Illustrator'),
  person('Jane Cooper', 'Recruiter'),
  group('Design', 14),
  group('Engineering', 42),
  group('Marketing', 11),
]

const MEMBERS = new Set(['priya.raman', 'design'])

const MIN_SEARCH_LENGTH = 2

const initials = (name: string) =>
  name
    .split(' ')
    .map((word) => word[0])
    .join('')

function OptionAvatar({ option, className }: { option: Option; className: string }) {
  if (option.kind === 'group') {
    return (
      <span
        className={cn(
          'bg-muted text-muted-foreground grid shrink-0 place-items-center rounded-full',
          className,
        )}
      >
        <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} className="size-[60%]" />
      </span>
    )
  }
  return (
    <Avatar className={cn('after:hidden', className)}>
      <AvatarFallback className="text-[0.625rem] font-medium">
        {initials(option.name)}
      </AvatarFallback>
    </Avatar>
  )
}

function CalmEmpty({ title, description }: { title: string; description: string }) {
  return (
    <Empty className="gap-1 px-6 py-14">
      <EmptyHeader className="gap-1">
        <EmptyMedia className="text-subtle-foreground mb-3">
          <HugeiconsIcon icon={Search01Icon} strokeWidth={1.5} className="size-6" />
        </EmptyMedia>
        <EmptyTitle className="text-sm font-medium">{title}</EmptyTitle>
        <EmptyDescription className="text-sm text-pretty">{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

function SearchingRows() {
  return (
    <div role="status" aria-label="Searching" className="flex w-full flex-col p-1">
      {[0, 1, 2, 3, 4].map((row) => (
        <div key={row} className="flex items-center gap-2.5 px-2.5 py-1.5">
          <Skeleton className="size-7 shrink-0 rounded-full" />
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className="h-3.5 w-36" />
            <Skeleton className="h-3 w-52" />
          </div>
        </div>
      ))}
    </div>
  )
}

function PeoplePicker() {
  const [query, setQuery] = useState('')
  const [picked, setPicked] = useState<Option[]>([])
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const anchor = useComboboxAnchor()
  const input = useRef<HTMLInputElement>(null)
  const typed = query.trim()
  const [needle] = useDebouncedValue(typed, 250)
  const [settled] = useDebouncedValue(needle, 450)
  const loading = typed.length >= MIN_SEARCH_LENGTH && typed !== settled

  const lower = settled.toLowerCase()
  const results =
    needle === settled && settled.length >= MIN_SEARCH_LENGTH
      ? DIRECTORY.filter((each) =>
          [each.name, each.email].some((value) => value.toLowerCase().includes(lower)),
        )
      : []
  const sections: Section[] = [
    { label: 'People', items: results.filter((each) => each.kind === 'person') },
    { label: 'Groups', items: results.filter((each) => each.kind === 'group') },
  ].filter((section) => section.items.length > 0)

  return (
    <div className="w-full max-w-md">
      <Field>
        <FieldLabel htmlFor="people-picker">People and groups</FieldLabel>
        <Combobox<Option, true>
          multiple
          open={open && typed !== ''}
          onOpenChange={setOpen}
          items={sections}
          filter={null}
          value={picked}
          inputValue={query}
          itemToStringLabel={(each) => each.name}
          isItemEqualToValue={(a, b) => a.id === b.id}
          onInputValueChange={setQuery}
          onValueChange={(next) => {
            setPicked(next)
            setQuery('')
          }}
        >
          <ComboboxChips ref={anchor}>
            <ComboboxValue>
              {(values: Option[]) =>
                values.map((each) => (
                  <ComboboxChip key={each.id} aria-label={each.name}>
                    <OptionAvatar option={each} className="size-5" />
                    <span className="max-w-40 truncate">{each.name}</span>
                  </ComboboxChip>
                ))
              }
            </ComboboxValue>
            <ComboboxChipsInput
              ref={input}
              id="people-picker"
              placeholder={
                picked.length === 0 ? 'Jane Cooper or jane@example.com' : 'Add more'
              }
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            <SearchMark
              mark={
                query !== ''
                  ? loading
                    ? 'searching'
                    : 'clear'
                  : focused
                    ? 'search'
                    : null
              }
              onClear={() => {
                setQuery('')
                input.current?.focus()
              }}
            />
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty className="py-0">
              {loading ? (
                <SearchingRows />
              ) : typed.length < MIN_SEARCH_LENGTH ? (
                <CalmEmpty
                  title="Find people and groups"
                  description="Search by name or email."
                />
              ) : (
                <CalmEmpty
                  title={`No people or groups match “${typed}”`}
                  description="Try a different name or email."
                />
              )}
            </ComboboxEmpty>
            <ComboboxList className="max-h-[min(--spacing(96),var(--available-height))]">
              {(section: Section) => (
                <ComboboxGroup key={section.label} items={section.items}>
                  <ComboboxLabel>{section.label}</ComboboxLabel>
                  <ComboboxCollection>
                    {(each: Option) => {
                      const member = MEMBERS.has(each.id)
                      return (
                        <ComboboxItem key={each.id} value={each} disabled={member}>
                          <OptionAvatar option={each} className="size-7" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium">
                              {each.name}
                            </span>
                            <span className="text-muted-foreground block truncate text-xs">
                              {each.email}
                            </span>
                          </span>
                          <span className="text-subtle-foreground max-w-40 shrink-0 truncate text-xs">
                            {member ? 'Already a member' : each.note}
                          </span>
                        </ComboboxItem>
                      )
                    }}
                  </ComboboxCollection>
                </ComboboxGroup>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    </div>
  )
}

export const entry: Entry = {
  slug: 'people-picker',
  title: 'People picker',
  group: 'Patterns',
  summary:
    'A combobox for picking several people and groups from a directory search. Picks become chips, and the popup stays calm while a search is on its way.',
  imports: `import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxValue,
} from '@dkrasniy/ui/components/combobox'
import { SearchMark } from '@dkrasniy/ui/components/search-input'
import { Skeleton } from '@dkrasniy/ui/components/skeleton'`,
  guidance: [
    'Each pick becomes a chip with an avatar and its own remove button, so a long list stays readable.',
    'Search after 250ms without typing, and only from two characters. Until then the popup says what to search for.',
    'While a search runs, skeleton rows take the shape of the results and the trailing mark turns into a spinner.',
    'Show people who are already members, disabled, with "Already a member". A missing name makes people think the search is broken.',
    'Split results into People and Groups when both can match.',
    'Try "an", "design" or "zz" to see results, a group and the no-match state. The Team example puts this in a dialog with a role picker.',
  ],
  examples: [
    {
      title: 'People picker',
      description: 'Searches a short inline list with a fake delay.',
      Demo: PeoplePicker,
      code: `const [query, setQuery] = useState('')
const [picked, setPicked] = useState<Option[]>([])
const [needle] = useDebouncedValue(query.trim(), 250)
const search = useQuery(directorySearchQuery(needle))
const loading = query.trim().length >= 2 && (search.isFetching || needle !== query.trim())

<Combobox<Option, true>
  multiple
  items={sections}
  filter={null}
  value={picked}
  inputValue={query}
  onInputValueChange={setQuery}
  onValueChange={(next) => {
    setPicked(next)
    setQuery('')
  }}
>
  <ComboboxChips ref={anchor}>
    <ComboboxValue>
      {(values: Option[]) =>
        values.map((each) => (
          <ComboboxChip key={each.id} aria-label={each.name}>
            <OptionAvatar option={each} className="size-5" />
            <span className="max-w-40 truncate">{each.name}</span>
          </ComboboxChip>
        ))
      }
    </ComboboxValue>
    <ComboboxChipsInput ref={input} placeholder="Jane Cooper or jane@example.com" />
    <SearchMark
      mark={query !== '' ? (loading ? 'searching' : 'clear') : focused ? 'search' : null}
      onClear={() => {
        setQuery('')
        input.current?.focus()
      }}
    />
  </ComboboxChips>
  <ComboboxContent anchor={anchor}>
    <ComboboxEmpty className="py-0">
      {loading ? <SearchingRows /> : <CalmEmpty title="Find people and groups" />}
    </ComboboxEmpty>
    <ComboboxList>{renderSection}</ComboboxList>
  </ComboboxContent>
</Combobox>`,
    },
  ],
}
