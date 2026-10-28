import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon, File02Icon, Search01Icon } from '@hugeicons/core-free-icons'
import { Button } from '@dkrasniy/ui/components/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@dkrasniy/ui/components/empty'
import type { Entry } from '../registry'

function FirstRun() {
  return (
    <Empty className="bg-muted">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={File02Icon} strokeWidth={2} />
        </EmptyMedia>
        <EmptyTitle>No pages yet</EmptyTitle>
        <EmptyDescription>Create a page, or start from a template.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
          New page
        </Button>
      </EmptyContent>
    </Empty>
  )
}

function NoResults() {
  return (
    <Empty className="py-12">
      <EmptyHeader>
        <EmptyMedia>
          <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
        </EmptyMedia>
        <EmptyTitle>No results for “pricng”</EmptyTitle>
        <EmptyDescription>Check the spelling, or try a shorter search.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Clear search
        </Button>
      </EmptyContent>
    </Empty>
  )
}

export const entry: Entry = {
  slug: 'empty',
  title: 'Empty',
  group: 'Surfaces',
  order: 50,
  summary:
    'What a list or a section shows when it has nothing in it: an icon, a title, a line of help and an action, centered.',
  imports: `import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@dkrasniy/ui/components/empty'`,
  guidance: [
    'Say what is missing in the title and how to add it in the description, like "No pages yet" and "Create a page, or start from a template."',
    'Give it the one action that fills it. For no search results, offer to clear the search.',
    'variant="icon" puts the icon on a grey tile, for a first run. The default is a plain grey icon, for a filter or search that came up empty.',
    'It has py-20 for a full section. Pass a smaller padding when it sits inside a card or a popover.',
  ],
  examples: [
    {
      title: 'First run',
      Demo: FirstRun,
      code: `<Empty className="bg-muted">
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <HugeiconsIcon icon={File02Icon} strokeWidth={2} />
    </EmptyMedia>
    <EmptyTitle>No pages yet</EmptyTitle>
    <EmptyDescription>Create a page, or start from a template.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button size="sm" onClick={onCreate}>
      <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
      New page
    </Button>
  </EmptyContent>
</Empty>`,
    },
    {
      title: 'No results',
      Demo: NoResults,
      code: `<Empty className="py-12">
  <EmptyHeader>
    <EmptyMedia>
      <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
    </EmptyMedia>
    <EmptyTitle>No results for “{query}”</EmptyTitle>
    <EmptyDescription>Check the spelling, or try a shorter search.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button variant="outline" size="sm" onClick={() => setQuery('')}>
      Clear search
    </Button>
  </EmptyContent>
</Empty>`,
    },
  ],
}
