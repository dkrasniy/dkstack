import { CodeBlock } from '@dkrasniy/ui/components/code-block'
import { CopyButton } from '@dkrasniy/ui/components/copy-button'
import { Tray, TrayCard, TrayHeader, TrayTitle } from '@dkrasniy/ui/components/tray'
import type { Entry } from '../registry'

const TSX = `export function Greeting({ name }: { name: string }) {
  return <p className="text-sm">Hello, {name}</p>
}`

const JSON_SAMPLE = `{
  "name": "Northwind",
  "pages": 12,
  "public": true
}`

const CSS = `.card {
  border-radius: 16px;
  box-shadow: var(--shadow-card);
}`

function InTray() {
  return (
    <Tray className="w-full max-w-xl">
      <TrayHeader>
        <TrayTitle>Greeting.tsx</TrayTitle>
        <CopyButton value={TSX} label="Copy code" />
      </TrayHeader>
      <TrayCard>
        <CodeBlock code={TSX} language="tsx" />
      </TrayCard>
    </Tray>
  )
}

function Languages() {
  return (
    <div className="grid w-full max-w-xl gap-3 sm:grid-cols-2">
      <div className="bg-muted rounded-md">
        <CodeBlock code={JSON_SAMPLE} language="json" />
      </div>
      <div className="bg-muted rounded-md">
        <CodeBlock code={CSS} language="css" />
      </div>
    </div>
  )
}

export const entry: Entry = {
  slug: 'code-block',
  title: 'Code block',
  group: 'Surfaces',
  order: 90,
  summary:
    'Highlighted code with line numbers, in light and dark themes. It shows plain text at once and colors it when the highlighter loads.',
  imports: "import { CodeBlock } from '@dkrasniy/ui/components/code-block'",
  guidance: [
    'It highlights tsx, css and json. The highlighter loads on first use and is shared by every block on the page.',
    'It has no background or border, so put it in a TrayCard or a muted box. Long lines scroll sideways.',
    'Pair it with CopyButton in a TrayHeader when people will paste the code somewhere.',
  ],
  examples: [
    {
      title: 'In a tray',
      Demo: InTray,
      code: `<Tray>
  <TrayHeader>
    <TrayTitle>Greeting.tsx</TrayTitle>
    <CopyButton value={code} label="Copy code" />
  </TrayHeader>
  <TrayCard>
    <CodeBlock code={code} language="tsx" />
  </TrayCard>
</Tray>`,
    },
    {
      title: 'JSON and CSS',
      Demo: Languages,
      code: `<CodeBlock code={JSON.stringify(project, null, 2)} language="json" />
<CodeBlock code={styles} language="css" />`,
    },
  ],
}
