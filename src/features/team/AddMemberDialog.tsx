import { useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDebouncedValue } from '@mantine/hooks'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import { AlertCircleIcon, Search01Icon, Tick02Icon } from '@hugeicons/core-free-icons'
import { Button } from '@dkrasniy/ui/components/button'
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@dkrasniy/ui/components/dialog'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@dkrasniy/ui/components/empty'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@dkrasniy/ui/components/field'
import { SearchMark } from '@dkrasniy/ui/components/search-input'
import { Segmented } from '@dkrasniy/ui/components/segmented'
import { Skeleton } from '@dkrasniy/ui/components/skeleton'
import { useToast } from '@dkrasniy/ui/components/toast'
import {
  type DirectoryEntry,
  type Member,
  type MemberKind,
  type Role,
  MIN_SEARCH_LENGTH,
  directorySearchQuery,
} from '@/api/team'
import { describeError } from '@/app/errors'
import { MemberAvatar } from './MemberIdentity'
import {
  CAPABILITIES,
  DEFAULT_ROLE,
  KINDS,
  ROLES,
  failureLine,
  groupSize,
  isMember,
  plural,
} from './members'
import { addedTitle, useAddMembers } from './useMemberMutations'

export function AddMemberDialog({
  members,
  open,
  onOpenChange,
}: {
  members: readonly Member[]
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const toast = useToast()
  const add = useAddMembers()
  const added = useRef<Member[]>([])

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next || !add.isPending) onOpenChange(next)
      }}
      onOpenChangeComplete={(isOpen) => {
        if (isOpen || added.current.length === 0) return
        toast.add({ type: 'success', title: addedTitle(added.current) })
        added.current = []
      }}
    >
      <DialogContent>
        <AddMemberForm
          members={members}
          add={add}
          onAdded={(list) => {
            added.current = [...added.current, ...list]
          }}
          onDone={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

interface Option {
  entry: DirectoryEntry
  note: string
  disabled: boolean
}

interface Section {
  label: string
  items: Option[]
}

const INPUT_ID = 'add-member-search'
const ERROR_ID = `${INPUT_ID}-error`
const SECTIONS: MemberKind[] = ['person', 'group']

const nameOf = (option: Option) => option.entry.name

function AddMemberForm({
  members,
  add,
  onAdded,
  onDone,
}: {
  members: readonly Member[]
  add: ReturnType<typeof useAddMembers>
  onAdded: (added: Member[]) => void
  onDone: () => void
}) {
  const [query, setQuery] = useState('')
  const [picked, setPicked] = useState<Option[]>([])
  const [role, setRole] = useState<Role>(DEFAULT_ROLE)
  const [error, setError] = useState<string>()
  const [needle] = useDebouncedValue(query.trim(), 250)
  const search = useQuery(directorySearchQuery(needle))
  const anchor = useComboboxAnchor()
  const [focused, setFocused] = useState(false)
  const [open, setOpen] = useState(false)
  const input = useRef<HTMLInputElement>(null)
  const typed = query.trim()
  const shown = open && typed !== ''

  const searching = needle.length >= MIN_SEARCH_LENGTH
  const results = searching ? (search.data ?? []) : []
  const option = (entry: DirectoryEntry): Option => {
    const taken = isMember(members, entry)
    return {
      entry,
      disabled: taken,
      note: taken
        ? 'Already a member'
        : entry.kind === 'person'
          ? entry.title
          : groupSize(entry.size),
    }
  }
  const sections: Section[] = SECTIONS.map((kind) => ({
    label: KINDS[kind].heading,
    items: results.filter((entry) => entry.kind === kind).map(option),
  })).filter((section) => section.items.length > 0)
  const searchFailure = search.isError ? describeError(search.error) : null
  const pending = search.isFetching || needle !== typed
  const loading = typed.length >= MIN_SEARCH_LENGTH && pending

  function submit() {
    if (add.isPending) return
    if (picked.length === 0) {
      setError('Search for people or groups and pick at least one.')
      return
    }
    setError(undefined)
    add.mutate(
      { entries: picked.map((each) => each.entry), role },
      {
        onSuccess: ({ added, failed }) => {
          onAdded(added)
          if (failed.length === 0) {
            onDone()
            return
          }
          setPicked((current) =>
            current.filter((each) => failed.some((fail) => fail.id === each.entry.id)),
          )
          setError(
            plural(failed.length, {
              one: "Couldn't add 1 member. They're still in the field.",
              other: "Couldn't add # members. They're still in the field.",
            }),
          )
        },
        onError: (reason) => setError(failureLine(reason, 'add members')),
      },
    )
  }

  return (
    <form
      noValidate
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
    >
      <DialogHeader>
        <DialogTitle>Add members</DialogTitle>
        <DialogDescription>
          Search for people and groups by name or email.
        </DialogDescription>
      </DialogHeader>
      <FieldGroup className="gap-5">
        <Field data-invalid={Boolean(error) || undefined}>
          <FieldLabel htmlFor={INPUT_ID}>People and groups</FieldLabel>
          <Combobox<Option, true>
            multiple
            open={shown}
            onOpenChange={setOpen}
            items={sections}
            filter={null}
            value={picked}
            inputValue={query}
            itemToStringLabel={nameOf}
            isItemEqualToValue={(a, b) => a.entry.id === b.entry.id}
            onInputValueChange={(value) => {
              setQuery(value)
              setError(undefined)
            }}
            onValueChange={(options) => {
              setPicked(options)
              setQuery('')
              setError(undefined)
            }}
          >
            <ComboboxChips ref={anchor}>
              <ComboboxValue>
                {(values: Option[]) =>
                  values.map((each) => (
                    <ComboboxChip key={each.entry.id} aria-label={nameOf(each)}>
                      <MemberAvatar entry={each.entry} size="chip" />
                      <span className="max-w-40 truncate">{nameOf(each)}</span>
                    </ComboboxChip>
                  ))
                }
              </ComboboxValue>
              <ComboboxChipsInput
                ref={input}
                id={INPUT_ID}
                autoFocus
                placeholder={
                  picked.length === 0 ? 'Jane Cooper or jane@example.com' : 'Add more'
                }
                aria-invalid={Boolean(error)}
                aria-describedby={error ? ERROR_ID : undefined}
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
                ) : (
                  <CalmEmpty
                    icon={searchFailure ? AlertCircleIcon : Search01Icon}
                    title={
                      typed.length < MIN_SEARCH_LENGTH
                        ? 'Find people and groups'
                        : searchFailure
                          ? searchFailure.title
                          : `No people or groups match “${typed}”`
                    }
                    description={
                      typed.length < MIN_SEARCH_LENGTH
                        ? 'Search by name or email.'
                        : searchFailure
                          ? searchFailure.detail
                          : 'Try a different name or email.'
                    }
                  />
                )}
              </ComboboxEmpty>
              <ComboboxList className="max-h-[min(--spacing(96),var(--available-height))]">
                {(section: Section) => (
                  <ComboboxGroup key={section.label} items={section.items}>
                    <ComboboxLabel>{section.label}</ComboboxLabel>
                    <ComboboxCollection>
                      {(each: Option) => (
                        <ComboboxItem
                          key={each.entry.id}
                          value={each}
                          disabled={each.disabled}
                        >
                          <OptionRow option={each} />
                        </ComboboxItem>
                      )}
                    </ComboboxCollection>
                  </ComboboxGroup>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <FieldError id={ERROR_ID}>{error}</FieldError>
        </Field>
        <RolePicker value={role} onChange={setRole} />
      </FieldGroup>
      <DialogFooter>
        <DialogClose
          disabled={add.isPending}
          render={<Button type="button" variant="link" />}
        >
          Cancel
        </DialogClose>
        <Button type="submit" variant="primary" morph loading={add.isPending}>
          {picked.length === 0
            ? 'Add members'
            : plural(
                picked.length,
                add.isPending
                  ? { one: 'Adding member', other: 'Adding # members' }
                  : { one: 'Add member', other: 'Add # members' },
              )}
        </Button>
      </DialogFooter>
    </form>
  )
}

function CalmEmpty({
  icon,
  title,
  description,
}: {
  icon: IconSvgElement
  title: string
  description: string
}) {
  return (
    <Empty className="gap-1 px-6 py-14">
      <EmptyHeader className="gap-1">
        <EmptyMedia className="text-subtle-foreground mb-3">
          <HugeiconsIcon icon={icon} strokeWidth={1.5} className="size-6" />
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

function OptionRow({ option }: { option: Option }) {
  return (
    <>
      <MemberAvatar entry={option.entry} size="row" />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium">{option.entry.name}</span>
        <span className="text-muted-foreground block truncate text-xs">
          {option.entry.email}
        </span>
      </span>
      <span className="text-subtle-foreground max-w-40 shrink-0 truncate text-xs">
        {option.note}
      </span>
    </>
  )
}

function RolePicker({
  value,
  onChange,
}: {
  value: Role
  onChange: (role: Role) => void
}) {
  return (
    <FieldSet className="gap-3">
      <FieldLegend variant="label">Role</FieldLegend>
      <Segmented
        value={value}
        options={ROLES}
        onValueChange={(next) => {
          const picked = ROLES.find((each) => each.value === next)
          if (picked) onChange(picked.value)
        }}
      />
      <ul className="mt-2 flex flex-col gap-2 px-1 text-sm">
        {CAPABILITIES.map(({ label, roles }) => {
          const included = roles.includes(value)
          return (
            <li
              key={label}
              data-included={included || undefined}
              className="group/capability text-subtle-foreground data-included:text-foreground flex items-center gap-2.5 transition-colors duration-200"
            >
              <CapabilityMark />
              <span className="sr-only">
                {included ? 'Included: ' : 'Not included: '}
              </span>
              {label}
            </li>
          )
        })}
      </ul>
    </FieldSet>
  )
}

function CapabilityMark() {
  return (
    <span
      aria-hidden="true"
      className="bg-muted group-data-included/capability:bg-success grid size-4 shrink-0 place-items-center rounded-full text-white transition-colors duration-200 motion-reduce:transition-none"
    >
      <HugeiconsIcon
        icon={Tick02Icon}
        strokeWidth={3}
        className="ease-smooth size-3 scale-50 opacity-0 transition-[opacity,scale] duration-200 group-data-included/capability:scale-100 group-data-included/capability:opacity-100 motion-reduce:transition-none"
      />
    </span>
  )
}
