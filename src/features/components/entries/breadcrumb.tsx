import { Fragment, useState, type MouseEvent } from 'react'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@dkrasniy/ui/components/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@dkrasniy/ui/components/dropdown-menu'
import { Tabs, TabsList, TabsTrigger } from '@dkrasniy/ui/components/tabs'
import type { Entry } from '../registry'

const SECTIONS = [
  { value: 'overview', label: 'Overview' },
  { value: 'pages', label: 'Pages' },
  { value: 'settings', label: 'Settings' },
]

const stay = (event: MouseEvent) => event.preventDefault()

function Default() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={stay}>
            Projects
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={stay}>
            Atlas
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function Animated() {
  const [current, setCurrent] = useState('pages')
  const section =
    current === 'overview' ? undefined : SECTIONS.find((each) => each.value === current)
  return (
    <div className="flex flex-col items-center gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            {section ? (
              <BreadcrumbLink href="#" onClick={stay}>
                Atlas
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>Atlas</BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {section ? (
            <Fragment key={section.value}>
              <BreadcrumbSeparator className="animate-rise-in motion-reduce:animate-none" />
              <BreadcrumbItem className="animate-rise-in motion-reduce:animate-none">
                <BreadcrumbPage>{section.label}</BreadcrumbPage>
              </BreadcrumbItem>
            </Fragment>
          ) : null}
        </BreadcrumbList>
      </Breadcrumb>
      <Tabs value={current} onValueChange={(value: string) => setCurrent(value)}>
        <TabsList aria-label="Section">
          {SECTIONS.map((each) => (
            <TabsTrigger key={each.value} value={each.value}>
              {each.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}

function Collapsed() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={stay}>
            Atlas
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Show hidden pages"
              className="hover:text-foreground rounded-full transition-colors"
            >
              <BreadcrumbEllipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Docs</DropdownMenuItem>
              <DropdownMenuItem>Guides</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={stay}>
            Setup
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Install</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export const entry: Entry = {
  slug: 'breadcrumb',
  title: 'Breadcrumb',
  group: 'Navigation',
  order: 20,
  summary:
    'The path to the current page, with links back up. A new last crumb rises into place.',
  imports: `import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@dkrasniy/ui/components/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@dkrasniy/ui/components/dropdown-menu'`,
  guidance: [
    'Use a breadcrumb in the header of a nested page, with the current page as a BreadcrumbPage at the end, not a link.',
    'Pass your router link through render on BreadcrumbLink, so it keeps the crumb styles and navigates without a reload.',
    'When the last crumb follows the route, wrap it and its separator in a Fragment keyed by the route and give both animate-rise-in, so each new crumb rises in.',
    'For a long path, put BreadcrumbEllipsis in a DropdownMenuTrigger with an aria-label, and list the hidden levels in the menu.',
  ],
  examples: [
    {
      title: 'Default',
      Demo: Default,
      code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink render={<Link to="/projects" />}>Projects</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink render={<Link to="/projects/$projectId" params={{ projectId }} />}>
        {project.name}
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Settings</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    },
    {
      title: 'Last crumb follows the route',
      description: 'Switch sections and the new crumb rises in.',
      Demo: Animated,
      code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink render={<Link to="/projects/$projectId" params={{ projectId }} />}>
        {project.name}
      </BreadcrumbLink>
    </BreadcrumbItem>
    {section ? (
      <Fragment key={section.label}>
        <BreadcrumbSeparator className="animate-rise-in motion-reduce:animate-none" />
        <BreadcrumbItem className="animate-rise-in motion-reduce:animate-none">
          <BreadcrumbPage>{section.label}</BreadcrumbPage>
        </BreadcrumbItem>
      </Fragment>
    ) : null}
  </BreadcrumbList>
</Breadcrumb>`,
    },
    {
      title: 'Collapsed',
      Demo: Collapsed,
      code: `<BreadcrumbItem>
  <DropdownMenu>
    <DropdownMenuTrigger aria-label="Show hidden pages">
      <BreadcrumbEllipsis />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem render={<Link to="/docs" />}>Docs</DropdownMenuItem>
      <DropdownMenuItem render={<Link to="/docs/guides" />}>Guides</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</BreadcrumbItem>`,
    },
  ],
}
