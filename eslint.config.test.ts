import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { ESLint } from 'eslint'
import { beforeAll, describe, expect, it } from 'vitest'

// A broken lint config still exits 0, so each rule is asserted against a file that breaks
// it. Probes go on disk because the TypeScript project service only sees real paths, and
// import-x skips an import it cannot resolve, so every probe imports a file that exists.

const ROOT = import.meta.dirname
const eslint = new ESLint({ cwd: ROOT })

beforeAll(async () => {
  await eslint.lintFiles([join(ROOT, 'src/main.tsx')])
}, 60_000)

async function rulesBrokenBy(path: string, code: string): Promise<string[]> {
  const absolute = join(ROOT, path)
  const createdDir = mkdirSync(dirname(absolute), { recursive: true })
  writeFileSync(absolute, code)
  try {
    return rulesIn(await eslint.lintFiles([absolute]), path)
  } finally {
    rmSync(createdDir ?? absolute, { recursive: true, force: true })
  }
}

async function rulesInRepoFile(path: string): Promise<string[]> {
  return rulesIn(await eslint.lintFiles([join(ROOT, path)]), path)
}

function rulesIn(results: ESLint.LintResult[], path: string): string[] {
  const messages = results[0]?.messages ?? []
  const fatal = messages.find((message) => message.fatal)
  if (fatal) {
    throw new Error(`eslint could not parse ${path}: ${fatal.message}`)
  }
  return messages
    .map((message) => message.ruleId)
    .filter((ruleId): ruleId is string => ruleId !== null)
}

const RESTRICTED_PATHS = 'import-x/no-restricted-paths'

describe('the ui package', () => {
  it('rejects @/ imports from the app', async () => {
    const broken = await rulesBrokenBy(
      'packages/ui/src/probe.ts',
      "import { config } from '@/config'\nexport const c = config\n",
    )
    expect(broken).toContain(RESTRICTED_PATHS)
  })

  it('rejects a relative path into the app', async () => {
    const broken = await rulesBrokenBy(
      'packages/ui/src/probe.ts',
      "import { config } from '../../../src/config'\nexport const c = config\n",
    )
    expect(broken).toContain(RESTRICTED_PATHS)
  })

  it('rejects a data layer', async () => {
    const broken = await rulesBrokenBy(
      'packages/ui/src/probe.ts',
      "import { useQuery } from '@tanstack/react-query'\nexport const q = useQuery\n",
    )
    expect(broken).toContain('no-restricted-imports')
  })

  it('rejects a router', async () => {
    const broken = await rulesBrokenBy(
      'packages/ui/src/probe.ts',
      "import { Link } from '@tanstack/react-router'\nexport const l = Link\n",
    )
    expect(broken).toContain('no-restricted-imports')
  })

  it('rejects a dependency its package.json does not declare', async () => {
    const broken = await rulesBrokenBy(
      'packages/ui/src/probe.ts',
      "import { create } from 'zustand'\nexport const c = create\n",
    )
    expect(broken).toContain('import-x/no-extraneous-dependencies')
  })
})

describe('features', () => {
  it('rejects another feature through @/', async () => {
    const broken = await rulesBrokenBy(
      'src/features/home/probe.ts',
      "import { entries } from '@/features/components/registry'\nexport const e = entries\n",
    )
    expect(broken).toContain(RESTRICTED_PATHS)
  })

  it('rejects another feature through a relative path', async () => {
    const broken = await rulesBrokenBy(
      'src/features/home/probe.ts',
      "import { entries } from '../components/registry'\nexport const e = entries\n",
    )
    expect(broken).toContain(RESTRICTED_PATHS)
  })

  it('allows a file in the same feature', async () => {
    const broken = await rulesBrokenBy(
      'src/features/components/probe.ts',
      "import { entries } from './registry'\nexport const e = entries\n",
    )
    expect(broken).not.toContain(RESTRICTED_PATHS)
  })

  it('rejects a route', async () => {
    const broken = await rulesBrokenBy(
      'src/features/home/probe.ts',
      "import { Route } from '@/routes/__root'\nexport const r = Route\n",
    )
    expect(broken).toContain(RESTRICTED_PATHS)
  })

  it('rejects src/app other than errors', async () => {
    const broken = await rulesBrokenBy(
      'src/features/home/probe.ts',
      "import { queryClient } from '@/app/query'\nexport const q = queryClient\n",
    )
    expect(broken).toContain(RESTRICTED_PATHS)
  })

  it('allows @/app/errors', async () => {
    const broken = await rulesBrokenBy(
      'src/features/home/probe.ts',
      "import { describeError } from '@/app/errors'\nexport const d = describeError\n",
    )
    expect(broken).not.toContain(RESTRICTED_PATHS)
  })
})

describe('stores', () => {
  it('reject a feature', async () => {
    const broken = await rulesBrokenBy(
      'src/state/probe.ts',
      "import { entries } from '@/features/components/registry'\nexport const e = entries\n",
    )
    expect(broken).toContain(RESTRICTED_PATHS)
  })

  it('can be read by a feature', async () => {
    const broken = await rulesBrokenBy(
      'src/features/home/probe.ts',
      "import { useAppearance } from '@/state/appearance'\nexport const s = useAppearance\n",
    )
    expect(broken).not.toContain(RESTRICTED_PATHS)
  })
})

describe('app rules', () => {
  it('rejects reading env outside config.ts', async () => {
    const broken = await rulesBrokenBy(
      'src/features/home/probe.ts',
      'export const base = import.meta.env.VITE_API_BASE\n',
    )
    expect(broken).toContain('no-restricted-syntax')
  })

  it('allows config.ts to read env', async () => {
    expect(await rulesInRepoFile('src/config.ts')).not.toContain('no-restricted-syntax')
  })

  it('rejects a cache key written as an array literal', async () => {
    const broken = await rulesBrokenBy(
      'src/features/home/probe.ts',
      "export const q = { queryKey: ['team', 'members'] }\n",
    )
    expect(broken).toContain('no-restricted-syntax')
  })

  it('allows a cache key from the keys factory', async () => {
    const broken = await rulesBrokenBy(
      'src/features/home/probe.ts',
      "import { keys } from '@/api/keys'\nexport const q = { queryKey: keys.team.members() }\n",
    )
    expect(broken).not.toContain('no-restricted-syntax')
  })

  it('rejects error.message in JSX', async () => {
    const broken = await rulesBrokenBy(
      'src/features/home/jsxProbe.tsx',
      'export const E = ({ error }: { error: Error }) => <p>{error.message}</p>\n',
    )
    expect(broken).toContain('no-restricted-syntax')
  })

  it('rejects lucide', async () => {
    const broken = await rulesBrokenBy(
      'src/features/home/probe.ts',
      "import { Plus } from 'lucide-react'\nexport const p = Plus\n",
    )
    expect(broken).toContain('no-restricted-imports')
  })

  it('rejects a JavaScript animation library in the app', async () => {
    const broken = await rulesBrokenBy(
      'src/features/home/probe.ts',
      "import { motion } from 'motion/react'\nexport const m = motion\n",
    )
    expect(broken).toContain('no-restricted-imports')
  })

  it('rejects a JavaScript animation library in the ui package', async () => {
    const broken = await rulesBrokenBy(
      'packages/ui/src/probe.ts',
      "import { motion } from 'framer-motion'\nexport const m = motion\n",
    )
    expect(broken).toContain('no-restricted-imports')
  })
})
