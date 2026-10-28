import { Link } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { CodeBlock } from '@dkrasniy/ui/components/code-block'
import { CopyButton } from '@dkrasniy/ui/components/copy-button'
import { Tray, TrayCard, TrayHeader, TrayTitle } from '@dkrasniy/ui/components/tray'
import { ComponentsShell } from './ComponentsShell'
import { entries, type Example } from './registry'

export function ComponentPage({ slug }: { slug: string }) {
  const index = entries.findIndex((each) => each.slug === slug)
  const entry = entries[index]
  if (!entry) return null
  const previous = entries[index - 1]
  const next = entries[index + 1]

  return (
    <ComponentsShell current={slug}>
      <p className="text-subtle-foreground text-13 font-medium">{entry.group}</p>
      <h1 className="mt-1 text-2xl font-semibold">{entry.title}</h1>
      <p className="text-muted-foreground mt-2 max-w-2xl text-sm text-pretty">
        {entry.summary}
      </p>

      <Tray className="mt-6">
        <TrayHeader>
          <TrayTitle>Import</TrayTitle>
          <CopyButton value={entry.imports} label="Copy import" />
        </TrayHeader>
        <TrayCard>
          <CodeBlock code={entry.imports} language="tsx" className="py-3" />
        </TrayCard>
      </Tray>

      {entry.guidance?.length ? (
        <ul className="text-muted-foreground mt-6 flex max-w-2xl list-disc flex-col gap-1.5 ps-5 text-sm text-pretty">
          {entry.guidance.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : null}

      <div className="mt-10 flex flex-col gap-8">
        {entry.examples.map((example) => (
          <ExampleCard key={example.title} example={example} />
        ))}
      </div>

      <nav aria-label="More components" className="mt-12 flex justify-between gap-4">
        {previous ? (
          <Link
            to="/components/$slug"
            params={{ slug: previous.slug }}
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm transition-colors duration-150"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} className="size-4" />
            {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to="/components/$slug"
            params={{ slug: next.slug }}
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm transition-colors duration-150"
          >
            {next.title}
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-4" />
          </Link>
        ) : null}
      </nav>
    </ComponentsShell>
  )
}

function ExampleCard({ example }: { example: Example }) {
  const { Demo } = example
  return (
    <section>
      <h2 className="text-base font-semibold">{example.title}</h2>
      {example.description ? (
        <p className="text-muted-foreground mt-1 max-w-2xl text-sm text-pretty">
          {example.description}
        </p>
      ) : null}
      <Tray className="mt-3">
        <TrayHeader>
          <TrayTitle>Preview</TrayTitle>
        </TrayHeader>
        <TrayCard className="flex min-h-40 flex-wrap items-center justify-center gap-3 p-8">
          <Demo />
        </TrayCard>
        <div className="flex items-center justify-between px-2.75 pt-2">
          <span className="text-muted-foreground text-sm font-medium">Code</span>
          <CopyButton value={example.code} label="Copy code" />
        </div>
        <div className="max-h-96 overflow-auto">
          <CodeBlock code={example.code} language="tsx" className="pt-1" />
        </div>
      </Tray>
    </section>
  )
}
