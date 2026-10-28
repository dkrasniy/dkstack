import { HugeiconsIcon } from '@hugeicons/react'
import {
  Copy01Icon,
  File02Icon,
  FileImportIcon,
  Layout01Icon,
} from '@hugeicons/core-free-icons'
import { Choice } from '@dkrasniy/ui/components/choice'
import { FieldSeparator } from '@dkrasniy/ui/components/field'
import type { Entry } from '../registry'

function List() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2.5">
      <Choice
        icon={<HugeiconsIcon icon={File02Icon} strokeWidth={1.6} />}
        label="Start from scratch"
        description="Add pages and sections yourself."
      />
      <Choice
        icon={<HugeiconsIcon icon={Layout01Icon} strokeWidth={1.6} />}
        label="Use a template"
        description="Start from a layout and change what you need."
      />
      <Choice
        icon={<HugeiconsIcon icon={FileImportIcon} strokeWidth={1.6} />}
        label="Import files"
        description="Turn Markdown or HTML files into pages."
      />
    </div>
  )
}

function WithSeparator() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2.5">
      <Choice
        icon={<HugeiconsIcon icon={File02Icon} strokeWidth={1.6} />}
        label="Start with an empty project"
        description="Add pages and sections yourself."
      />
      <FieldSeparator>or</FieldSeparator>
      <Choice
        icon={<HugeiconsIcon icon={Copy01Icon} strokeWidth={1.6} />}
        label="Duplicate a project"
        description="Copy the pages of a project you already have."
      />
    </div>
  )
}

export const entry: Entry = {
  slug: 'choice',
  title: 'Choice',
  group: 'Inputs',
  order: 130,
  summary:
    'A tall row with an icon, a label and a line of description, for picking how to do something.',
  imports: `import { Choice } from '@dkrasniy/ui/components/choice'
import { FieldSeparator } from '@dkrasniy/ui/components/field'`,
  guidance: [
    'Use Choice for the first step of a flow, where people pick how to start and a click moves them to the next step.',
    'A Choice has no selected state, so for an option that stays picked use radio cards in a RadioGroup.',
    'Keep the description to one line that says what happens next.',
    'Pass the icon at strokeWidth 1.6 so it reads lighter than the label.',
  ],
  examples: [
    {
      title: 'Default',
      Demo: List,
      code: `<Choice
  icon={<HugeiconsIcon icon={File02Icon} strokeWidth={1.6} />}
  label="Start from scratch"
  description="Add pages and sections yourself."
  onClick={() => setStep('blank')}
/>
<Choice
  icon={<HugeiconsIcon icon={Layout01Icon} strokeWidth={1.6} />}
  label="Use a template"
  description="Start from a layout and change what you need."
  onClick={() => setStep('template')}
/>`,
    },
    {
      title: 'With a separator',
      description: 'An "or" between two rows when they are the only ways forward.',
      Demo: WithSeparator,
      code: `<Choice
  icon={<HugeiconsIcon icon={File02Icon} strokeWidth={1.6} />}
  label="Start with an empty project"
  description="Add pages and sections yourself."
/>
<FieldSeparator>or</FieldSeparator>
<Choice
  icon={<HugeiconsIcon icon={Copy01Icon} strokeWidth={1.6} />}
  label="Duplicate a project"
  description="Copy the pages of a project you already have."
/>`,
    },
  ],
}
