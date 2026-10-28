export interface Project {
  id: string
  name: string
  workspace: string
  createdAt: number
  publishedAt: number | undefined
  changes: number
  pages: number
}

export const PROJECT: Project = {
  id: 'prj_4f9c2a71',
  name: 'Field Notes',
  workspace: 'Design',
  createdAt: Date.parse('2026-03-14T16:20:00Z'),
  publishedAt: Date.parse('2026-10-20T18:05:00Z'),
  changes: 3,
  pages: 12,
}

function respond<T>(value: T, ms: number): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export const renameProject = (name: string) => respond(name, 120)
export const gatherContent = () => respond(undefined, 200)
export const buildPages = () => respond(undefined, 300)
export const deployProject = () => respond(undefined, 250)
export const archiveProject = () => respond(undefined, 150)

export function plural(count: number, one: string, many: string) {
  return `${count} ${count === 1 ? one : many}`
}
