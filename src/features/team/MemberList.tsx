import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon, Delete02Icon, MoreHorizontalIcon } from '@hugeicons/core-free-icons'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@dkrasniy/ui/components/alert-dialog'
import { Button } from '@dkrasniy/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@dkrasniy/ui/components/dropdown-menu'
import { SearchInput } from '@dkrasniy/ui/components/search-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dkrasniy/ui/components/select'
import { Tabs, TabsList, TabsTrigger } from '@dkrasniy/ui/components/tabs'
import { useToast } from '@dkrasniy/ui/components/toast'
import { Table, type TableColumn } from '@dkrasniy/ui/components/table'
import { Tray, TrayCard } from '@dkrasniy/ui/components/tray'
import { type Member, type MemberKind, type Role, SELF_ID } from '@/api/team'
import { AddMemberDialog } from './AddMemberDialog'
import { MemberIdentity } from './MemberIdentity'
import { ROLES, failureLine, removalCopy, roleRank } from './members'
import { useRemoveMember, useSetRole } from './useMemberMutations'

type Filter = 'all' | MemberKind

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'person', label: 'People' },
  { value: 'group', label: 'Groups' },
]

const isFilter = (value: unknown): value is Filter =>
  FILTERS.some((filter) => filter.value === value)

const collator = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true })

const byName = (a: Member, b: Member) => collator.compare(a.name, b.name)

const byRole = (a: Member, b: Member) => roleRank(a.role) - roleRank(b.role)

const isSelf = (member: Member) => member.id === SELF_ID

const selfThenRoleThenName = (a: Member, b: Member) =>
  Number(isSelf(b)) - Number(isSelf(a)) || byRole(a, b) || byName(a, b)

export function MemberList({ members }: { members: readonly Member[] }) {
  const setRole = useSetRole()
  const remove = useRemoveMember()
  const toast = useToast()
  const [adding, setAdding] = useState(false)
  const [removing, setRemoving] = useState<Member | null>(null)
  const [confirming, setConfirming] = useState(false)
  const [removed, setRemoved] = useState(false)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const needle = query.trim().toLowerCase()

  const count = (type: Filter) =>
    type === 'all'
      ? members.length
      : members.filter((member) => member.kind === type).length

  const matches = members.filter((member) => {
    if (filter !== 'all' && member.kind !== filter) return false
    if (!needle) return true
    return [member.name, member.email].some((value) =>
      value.toLowerCase().includes(needle),
    )
  })

  const columns: TableColumn<Member>[] = [
    {
      key: 'name',
      header: 'Name',
      sortBy: byName,
      cell: (member) => <MemberIdentity entry={member} self={isSelf(member)} />,
    },
    {
      key: 'role',
      header: 'Role',
      width: '10rem',
      sortBy: byRole,
      className: 'px-0',
      headerClassName: 'px-0 ps-2',
      cell: (member) => (
        <RoleSelect
          member={member}
          self={isSelf(member)}
          onRoleChange={(role) => setRole.mutate({ member, role })}
        />
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '3.5rem',
      hideHeader: true,
      className: 'flex justify-end ps-0 last:pe-3',
      cell: (member) =>
        isSelf(member) ? null : (
          <MemberActions
            member={member}
            onRemove={() => {
              remove.reset()
              setRemoving(member)
              setRemoved(false)
              setConfirming(true)
            }}
          />
        ),
    },
  ]

  const removeFailure = remove.error
    ? failureLine(remove.error, 'remove this member')
    : null
  const empty =
    needle !== ''
      ? `No members match “${query.trim()}”.`
      : filter === 'person'
        ? 'No people on this team yet.'
        : 'No groups on this team yet.'

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {members.length > 0 ? (
          <>
            <Tabs
              value={filter}
              onValueChange={(value: unknown) => {
                if (isFilter(value)) setFilter(value)
              }}
            >
              <TabsList>
                {FILTERS.map((each) => (
                  <TabsTrigger key={each.value} value={each.value}>
                    {each.label}
                    <span className="text-subtle-foreground ms-1.5 tabular-nums">
                      {count(each.value)}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <SearchInput
              value={query}
              onValueChange={setQuery}
              placeholder="Search by name or email"
              aria-label="Search by name or email"
              className="max-w-72 min-w-48 flex-1"
            />
          </>
        ) : null}
        <Button variant="primary" className="ms-auto" onClick={() => setAdding(true)}>
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
          Add members
        </Button>
      </div>

      {members.length === 0 ? (
        <Tray className="pt-(--tray-pad)">
          <TrayCard className="text-muted-foreground px-4 py-10 text-center text-sm">
            No one is on this team yet. Add people by name or email, or add a group.
          </TrayCard>
        </Tray>
      ) : (
        <Table
          label="Members"
          columns={columns}
          rows={matches}
          rowKey={(member) => member.id}
          defaultOrder={selfThenRoleThenName}
          empty={empty}
        />
      )}

      <AddMemberDialog members={members} open={adding} onOpenChange={setAdding} />

      <AlertDialog
        open={confirming}
        onOpenChange={(open) => {
          if (!open && !remove.isPending) setConfirming(false)
        }}
        onOpenChangeComplete={(open) => {
          if (open || !removed || !removing) return
          toast.add({ type: 'success', title: `Removed ${removing.name}` })
          setRemoved(false)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {removing?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              {removing ? removalCopy(removing) : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {removing ? (
            <div className="bg-muted inset-ring-border rounded-lg px-3.5 py-3 text-sm inset-ring">
              <MemberIdentity entry={removing} />
            </div>
          ) : null}
          {removeFailure ? (
            <p role="alert" className="text-destructive text-sm">
              {removeFailure}
            </p>
          ) : null}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={remove.isPending}>Keep member</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              morph
              loading={remove.isPending}
              onClick={() => {
                if (!removing) return
                remove.mutate(removing, {
                  onSuccess: () => {
                    setRemoved(true)
                    setConfirming(false)
                  },
                })
              }}
            >
              {remove.isPending ? 'Removing member' : 'Remove member'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

function RoleSelect({
  member,
  self,
  onRoleChange,
}: {
  member: Member
  self: boolean
  onRoleChange: (role: Role) => void
}) {
  return (
    <Select<Role>
      items={ROLES}
      value={member.role}
      disabled={self}
      onValueChange={(role) => {
        if (role) onRoleChange(role)
      }}
    >
      <SelectTrigger
        size="sm"
        className="w-36"
        aria-label={`Role for ${member.name}`}
        title={self ? "You can't change your own role" : undefined}
      >
        <SelectValue placeholder="No role" />
      </SelectTrigger>
      <SelectContent align="end" className="w-auto">
        {ROLES.map(({ value, label, description }) => (
          <SelectItem key={value} value={value}>
            {label}
            <span className="text-subtle-foreground truncate">{description}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function MemberActions({ member, onRemove }: { member: Member; onRemove: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon-sm"
            aria-label={`Actions for ${member.name}`}
          />
        }
      >
        <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto">
        <DropdownMenuItem variant="destructive" onClick={onRemove}>
          <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
          Remove from team
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
