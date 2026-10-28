import { queryOptions } from '@tanstack/react-query'
import { ApiError } from '@/api/errors'
import { keys } from '@/api/keys'

export type Role = 'owner' | 'admin' | 'member' | 'viewer'

export interface Person {
  kind: 'person'
  id: string
  name: string
  email: string
  title: string
}

export interface Group {
  kind: 'group'
  id: string
  name: string
  email: string
  size: number
}

export type DirectoryEntry = Person | Group

export type MemberKind = DirectoryEntry['kind']

export type Member = DirectoryEntry & { role: Role }

export interface AddResult {
  added: Member[]
  failed: DirectoryEntry[]
}

export const MIN_SEARCH_LENGTH = 2

export const SELF_ID = 'p-jordan-lee'

const person = (name: string, title: string): Person => {
  const handle = name.toLowerCase().replace(/[^a-z]+/g, '.')
  return {
    kind: 'person',
    id: `p-${handle.replaceAll('.', '-')}`,
    name,
    email: `${handle}@example.com`,
    title,
  }
}

const group = (name: string, handle: string, size: number): Group => ({
  kind: 'group',
  id: `g-${handle}`,
  name,
  email: `${handle}@example.com`,
  size,
})

const DIRECTORY: DirectoryEntry[] = [
  person('Jordan Lee', 'Head of Product'),
  person('Priya Raman', 'Design Lead'),
  person('Marcus Bell', 'Staff Engineer'),
  person('Sofia Alvarez', 'Product Designer'),
  person('Kenji Watanabe', 'Engineering Manager'),
  person('Amara Okafor', 'Frontend Engineer'),
  person('Liam Walsh', 'Backend Engineer'),
  person('Hannah Schmidt', 'Content Strategist'),
  person('Diego Ferreira', 'Data Analyst'),
  person('Mei Chen', 'Research Lead'),
  person('Noah Patel', 'Product Manager'),
  person('Elena Petrova', 'Brand Designer'),
  person('Samuel Brooks', 'Support Lead'),
  person('Aisha Rahman', 'Security Engineer'),
  person('Lucas Martin', 'iOS Engineer'),
  person('Grace Kim', 'Copywriter'),
  person('Omar Haddad', 'Platform Engineer'),
  person('Isabel Costa', 'Marketing Manager'),
  person('Ethan Novak', 'QA Engineer'),
  person('Chloe Dubois', 'Motion Designer'),
  person('Ravi Iyer', 'Machine Learning Engineer'),
  person('Zoe Thompson', 'Operations Lead'),
  person('Mateo Rossi', 'Illustrator'),
  person('Nadia Kowalski', 'Program Manager'),
  person('Theo Andersen', 'Developer Advocate'),
  person('Jane Cooper', 'Recruiter'),
  group('Design', 'design', 14),
  group('Engineering', 'engineering', 42),
  group('Product', 'product', 9),
  group('Marketing', 'marketing', 11),
  group('Support', 'support', 7),
  group('Leadership', 'leadership', 5),
]

const entry = (id: string) => DIRECTORY.find((each) => each.id === id)

const seed: [string, Role][] = [
  [SELF_ID, 'owner'],
  ['p-priya-raman', 'admin'],
  ['p-marcus-bell', 'member'],
  ['p-sofia-alvarez', 'member'],
  ['p-hannah-schmidt', 'viewer'],
  ['g-design', 'member'],
  ['g-leadership', 'admin'],
]

let members: Member[] = seed.flatMap(([id, role]) => {
  const found = entry(id)
  return found ? [{ ...found, role }] : []
})

const wait = (min: number, max: number) =>
  new Promise((resolve) => setTimeout(resolve, min + Math.random() * (max - min)))

const copy = (list: Member[]) => list.map((member) => ({ ...member }))

function notFound(): never {
  throw new ApiError(404, 'not_found')
}

export async function listMembers(): Promise<Member[]> {
  await wait(300, 600)
  return copy(members)
}

export async function searchDirectory(query: string): Promise<DirectoryEntry[]> {
  const needle = query.trim().toLowerCase()
  if (needle.length < MIN_SEARCH_LENGTH) return []
  await wait(250, 650)
  return DIRECTORY.filter((each) =>
    [each.name, each.email].some((value) => value.toLowerCase().includes(needle)),
  ).map((each) => ({ ...each }))
}

export async function addMembers(ids: string[], role: Role): Promise<AddResult> {
  await wait(400, 700)
  const added: Member[] = []
  const failed: DirectoryEntry[] = []
  for (const id of ids) {
    const found = entry(id)
    if (!found) continue
    if (members.some((member) => member.id === id)) {
      failed.push({ ...found })
      continue
    }
    added.push({ ...found, role })
  }
  members = [...members, ...added]
  return { added: copy(added), failed }
}

export async function setRole(id: string, role: Role): Promise<Member> {
  await wait(200, 500)
  const current = members.find((member) => member.id === id) ?? notFound()
  const updated = { ...current, role }
  members = members.map((member) => (member.id === id ? updated : member))
  return { ...updated }
}

export async function removeMember(id: string): Promise<void> {
  await wait(400, 700)
  if (!members.some((member) => member.id === id)) notFound()
  members = members.filter((member) => member.id !== id)
}

export const teamMembersQuery = () =>
  queryOptions({
    queryKey: keys.team.members(),
    queryFn: listMembers,
  })

export const directorySearchQuery = (query: string) =>
  queryOptions({
    queryKey: keys.directory.search(query),
    queryFn: () => searchDirectory(query),
    enabled: query.length >= MIN_SEARCH_LENGTH,
    staleTime: 60_000,
  })
