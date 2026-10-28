import { Link } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { CopyButton } from '@dkrasniy/ui/components/copy-button'
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@dkrasniy/ui/components/page-header'
import {
  Tray,
  TrayCard,
  TrayHeader,
  TrayRow,
  TrayTitle,
} from '@dkrasniy/ui/components/tray'

const LINKS = [
  {
    to: '/components',
    title: 'Components',
    text: 'Every component with live examples and code to copy.',
    path: 'packages/ui/src/components',
  },
  {
    to: '/foundations',
    title: 'Foundations',
    text: 'Colors, type, radii, shadows and easings.',
    path: 'packages/ui/src/styles',
  },
  {
    to: '/team',
    title: 'Team',
    text: 'An example page: a member list with roles, sorting and an add dialog.',
    path: 'src/features/team',
  },
  {
    to: '/settings',
    title: 'Settings',
    text: 'An example page: project settings with rename, publish and archive.',
    path: 'src/features/settings',
  },
] as const

const COMMANDS = [
  { command: 'npm run dev', text: 'Run the app on port 5173.' },
  { command: 'npm run verify', text: 'Typecheck, lint, check formatting and test.' },
  {
    command: 'npx shadcn@latest add <name>',
    text: 'Add a primitive. Run it from packages/ui.',
  },
] as const

export function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-10 pb-16 md:px-10">
      <PageHeader className="mb-8">
        <div className="min-w-0">
          <PageTitle>dkstack</PageTitle>
          <PageDescription>
            A React app starter built on @dkrasniy/ui, with a docs page for every
            component and two example pages.
          </PageDescription>
        </div>
      </PageHeader>

      <ul className="grid gap-5 sm:grid-cols-2">
        {LINKS.map((link) => (
          <li key={link.to} className="min-w-0">
            <Link
              to={link.to}
              className="group/card ease-smooth focus-visible:ring-ring/50 block h-full rounded-xl transition-[scale] duration-150 outline-none focus-visible:ring-3 active:scale-99 motion-reduce:scale-100!"
            >
              <Tray className="flex h-full flex-col pt-(--tray-pad) pb-0">
                <TrayCard className="ease-smooth group-hover/card:shadow-btn flex flex-1 flex-col gap-6 p-5 transition-shadow duration-150">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="truncate text-xl font-semibold tracking-tight">
                      {link.title}
                    </h2>
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="text-muted-foreground group-hover/card:text-foreground ease-smooth size-5 shrink-0 transition-[color,translate] duration-150 group-hover/card:translate-x-0.5 motion-reduce:translate-x-0!"
                    />
                  </div>
                  <p className="text-muted-foreground mt-auto text-sm text-pretty">
                    {link.text}
                  </p>
                </TrayCard>
                <div className="text-muted-foreground flex h-10 items-center px-3.5 font-mono text-xs">
                  {link.path}
                </div>
              </Tray>
            </Link>
          </li>
        ))}
      </ul>

      <Tray className="mt-10">
        <TrayHeader>
          <TrayTitle>Start</TrayTitle>
        </TrayHeader>
        <TrayCard>
          {COMMANDS.map(({ command, text }) => (
            <TrayRow key={command}>
              <div className="flex min-w-0 flex-col gap-0.5 py-2.5">
                <code className="text-13 truncate font-mono">{command}</code>
                <span className="text-muted-foreground text-13 font-normal">{text}</span>
              </div>
              <CopyButton value={command} label="Copy command" />
            </TrayRow>
          ))}
        </TrayCard>
      </Tray>
    </div>
  )
}
