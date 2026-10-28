import type { DirectoryEntry, Member, MemberKind, Role } from '@/api/team'
import { describeError } from '@/app/errors'

export interface RoleOption {
  value: Role
  label: string
  description: string
}

export interface Capability {
  label: string
  roles: readonly Role[]
}

export const ROLES: RoleOption[] = [
  { value: 'owner', label: 'Owner', description: 'Full control, including billing' },
  { value: 'admin', label: 'Admin', description: 'Manages members and settings' },
  { value: 'member', label: 'Member', description: 'Edits and comments' },
  { value: 'viewer', label: 'Viewer', description: "Views, can't edit" },
]

export const DEFAULT_ROLE: Role = 'member'

export const CAPABILITIES: Capability[] = [
  { label: 'View projects and files', roles: ['owner', 'admin', 'member', 'viewer'] },
  { label: 'Edit and comment', roles: ['owner', 'admin', 'member'] },
  { label: 'Add and remove members', roles: ['owner', 'admin'] },
  { label: 'Manage billing and delete the team', roles: ['owner'] },
]

export const KINDS: Record<MemberKind, { heading: string; noun: string }> = {
  person: { heading: 'People', noun: 'person' },
  group: { heading: 'Groups', noun: 'group' },
}

const PLURAL = new Intl.PluralRules()

export const plural = (n: number, forms: { one: string; other: string }) =>
  (PLURAL.select(n) === 'one' ? forms.one : forms.other).replaceAll(
    '#',
    n.toLocaleString(),
  )

export const roleRank = (role: Role) => {
  const index = ROLES.findIndex((option) => option.value === role)
  return index === -1 ? ROLES.length : index
}

export function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  const first = words[0]?.[0] ?? ''
  const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? '') : ''
  return `${first}${last}`.toUpperCase()
}

export const groupSize = (size: number) =>
  plural(size, { one: '# person', other: '# people' })

export function removalCopy(member: Member) {
  return member.kind === 'person'
    ? "They lose access to this team's projects and files."
    : 'Its members lose the role this group gives them. Roles they hold on their own or through another group stay.'
}

export const isMember = (members: readonly Member[], entry: DirectoryEntry) =>
  members.some((member) => member.id === entry.id)

export function failureLine(error: unknown, action: string) {
  const { title, detail } = describeError(error, { action })
  return [/[.!?]$/.test(title) ? title : `${title}.`, detail].filter(Boolean).join(' ')
}
