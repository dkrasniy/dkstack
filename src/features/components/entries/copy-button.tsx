import { CopyButton } from '@dkrasniy/ui/components/copy-button'
import type { Entry } from '../registry'

const LINK = 'https://example.com/projects/atlas'

function CopyLink() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-muted-foreground text-sm">{LINK}</span>
      <CopyButton value={LINK} />
    </div>
  )
}

function CopyKey() {
  return (
    <div className="flex items-center gap-1.5">
      <code className="bg-muted rounded-xs px-1.5 py-0.5 font-mono text-xs">
        key_4f9a2c81e7
      </code>
      <CopyButton
        value="key_4f9a2c81e7"
        label="Copy key"
        failure="Couldn’t copy the key"
      />
    </div>
  )
}

export const entry: Entry = {
  slug: 'copy-button',
  title: 'Copy button',
  group: 'Actions',
  order: 40,
  summary:
    'A small icon button that copies a value. The icon turns into a check for a moment, and a failed copy shows a toast.',
  imports: "import { CopyButton } from '@dkrasniy/ui/components/copy-button'",
  guidance: [
    'Pass label and failure when the value is not a link, so the tooltip and the error toast name what was copied.',
    'Render it inside a ToastProvider, which it needs to report a failed copy.',
  ],
  examples: [
    {
      title: 'Link',
      Demo: CopyLink,
      code: `<span className="text-muted-foreground text-sm">{project.url}</span>
<CopyButton value={project.url} />`,
    },
    {
      title: 'Other values',
      description: 'The tooltip and the failure toast say what was copied.',
      Demo: CopyKey,
      code: `<code>{key.preview}</code>
<CopyButton value={key.secret} label="Copy key" failure="Couldn’t copy the key" />`,
    },
  ],
}
