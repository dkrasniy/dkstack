import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon } from '@hugeicons/core-free-icons'
import { Button } from '@dkrasniy/ui/components/button'
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@dkrasniy/ui/components/page-header'
import type { Entry } from '../registry'

function WithAction() {
  return (
    <div className="w-full">
      <PageHeader className="mb-0">
        <div className="min-w-0">
          <PageTitle>Projects</PageTitle>
          <PageDescription>12 projects, 3 with unpublished changes</PageDescription>
        </div>
        <Button>
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
          New project
        </Button>
      </PageHeader>
    </div>
  )
}

function TitleOnly() {
  return (
    <div className="w-full">
      <PageHeader className="mb-0">
        <div className="min-w-0">
          <PageTitle>Members</PageTitle>
          <PageDescription>
            People in this workspace can open every project. Owners can also invite people
            and change roles.
          </PageDescription>
        </div>
      </PageHeader>
    </div>
  )
}

export const entry: Entry = {
  slug: 'page-header',
  title: 'Page header',
  group: 'Navigation',
  order: 40,
  summary:
    'The title row at the top of a page, with an optional description and actions on the right.',
  imports: `import { PageDescription, PageHeader, PageTitle } from '@dkrasniy/ui/components/page-header'
import { Button } from '@dkrasniy/ui/components/button'`,
  guidance: [
    'Put the title and description in one div with min-w-0 and the actions after it, so a long title wraps instead of pushing the buttons off.',
    'Use the description for a count or one-line summary that changes with the data, like "12 projects".',
    'PageTitle renders the page’s h1, so use one per page.',
    'The header has a 28 pixel bottom margin, so pass a smaller mb class when a toolbar sits right below it.',
  ],
  examples: [
    {
      title: 'With an action',
      Demo: WithAction,
      code: `<PageHeader>
  <div className="min-w-0">
    <PageTitle>Projects</PageTitle>
    <PageDescription>{projects.length} projects</PageDescription>
  </div>
  <Button>
    <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
    New project
  </Button>
</PageHeader>`,
    },
    {
      title: 'Title and description',
      description: 'The description wraps at about 60 characters.',
      Demo: TitleOnly,
      code: `<PageHeader>
  <div className="min-w-0">
    <PageTitle>Members</PageTitle>
    <PageDescription>
      People in this workspace can open every project. Owners can also invite people and
      change roles.
    </PageDescription>
  </div>
</PageHeader>`,
    },
  ],
}
