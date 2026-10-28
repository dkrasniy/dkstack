import type { ComponentType } from 'react'

export const GROUPS = [
  'Actions',
  'Inputs',
  'Overlays',
  'Surfaces',
  'Navigation',
  'Feedback',
  'Motion',
  'Patterns',
] as const

export type Group = (typeof GROUPS)[number]

export interface Example {
  title: string
  description?: string
  code: string
  Demo: ComponentType
}

export interface Entry {
  slug: string
  title: string
  group: Group
  order?: number
  summary: string
  imports: string
  guidance?: string[]
  examples: Example[]
}

const modules = import.meta.glob<{ entry: Entry }>('./entries/*.tsx', { eager: true })

export const entries: Entry[] = Object.values(modules)
  .map((module) => module.entry)
  .sort(
    (a, b) =>
      GROUPS.indexOf(a.group) - GROUPS.indexOf(b.group) ||
      (a.order ?? 0) - (b.order ?? 0) ||
      a.title.localeCompare(b.title),
  )

export function findEntry(slug: string): Entry | undefined {
  return entries.find((entry) => entry.slug === slug)
}

export function entriesIn(group: Group): Entry[] {
  return entries.filter((entry) => entry.group === group)
}
