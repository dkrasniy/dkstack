import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { Button } from '@dkrasniy/ui/components/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerStack,
  DrawerTitle,
  DrawerTrigger,
} from '@dkrasniy/ui/components/drawer'
import type { Entry } from '../registry'

const FRAME = 'h-[28rem] w-full max-w-lg flex-none rounded-lg shadow-card'

function Header({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b px-5 py-4">
      <div className="flex flex-col gap-0.5">
        <DrawerTitle>{title}</DrawerTitle>
        <DrawerDescription>{description}</DrawerDescription>
      </div>
      <DrawerClose render={<Button variant="ghost" size="icon-sm" aria-label="Close" />}>
        <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
      </DrawerClose>
    </div>
  )
}

const ACTIVITY = [
  'Jordan Lee published Pricing',
  'Sam Rivera edited Home',
  'Alex Kim added 3 pages',
]

function Basic() {
  return (
    <DrawerStack className={FRAME}>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold">Northwind</p>
          <Drawer>
            <DrawerTrigger render={<Button variant="outline" size="sm" />}>
              View activity
            </DrawerTrigger>
            <DrawerContent>
              <Header title="Activity" description="The last 7 days in Northwind." />
              <ul className="flex flex-col px-5 py-2">
                {ACTIVITY.map((line) => (
                  <li key={line} className="border-b py-3 last:border-b-0">
                    {line}
                  </li>
                ))}
              </ul>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="bg-muted h-28 rounded-md" />
        <div className="grid flex-1 grid-cols-2 gap-4">
          <div className="bg-muted rounded-md" />
          <div className="bg-muted rounded-md" />
        </div>
      </div>
    </DrawerStack>
  )
}

const PROJECTS = [
  { name: 'Northwind', pages: 12, owner: 'Jordan Lee', edited: '2 hours ago' },
  { name: 'Brand refresh', pages: 8, owner: 'Sam Rivera', edited: 'Yesterday' },
  { name: 'Help center', pages: 31, owner: 'Alex Kim', edited: 'Last week' },
] as const

type Project = (typeof PROJECTS)[number]

function Inspector() {
  const [open, setOpen] = useState(false)
  const [project, setProject] = useState<Project>(PROJECTS[0])
  return (
    <DrawerStack className={FRAME}>
      <div className="flex flex-col gap-0.5 p-3">
        <p className="px-2.5 pt-1 pb-2 text-sm font-semibold">Projects</p>
        {PROJECTS.map((each) => (
          <button
            key={each.name}
            type="button"
            onClick={() => {
              setProject(each)
              setOpen(true)
            }}
            className="hover:bg-muted flex items-center justify-between rounded-sm px-2.5 py-2.5 text-left text-sm transition-colors duration-150"
          >
            {each.name}
            <span className="text-muted-foreground text-13">{each.pages} pages</span>
          </button>
        ))}
      </div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <Header title={project.name} description={`${project.pages} pages`} />
          <dl className="flex flex-col px-5 py-2">
            <div className="flex justify-between border-b py-3">
              <dt className="text-muted-foreground">Owner</dt>
              <dd className="font-medium">{project.owner}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-muted-foreground">Last edited</dt>
              <dd className="font-medium">{project.edited}</dd>
            </div>
          </dl>
        </DrawerContent>
      </Drawer>
    </DrawerStack>
  )
}

export const entry: Entry = {
  slug: 'drawer',
  title: 'Drawer',
  group: 'Overlays',
  order: 40,
  summary:
    'A sheet that rises from the bottom while the page behind it scales back and rounds its corners. Swipe it down to close.',
  imports: `import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerStack,
  DrawerTitle,
  DrawerTrigger,
} from '@dkrasniy/ui/components/drawer'`,
  guidance: [
    'Wrap the app, or the region the drawer covers, in one DrawerStack. The drawer opens inside it and scales that content back.',
    'Use a drawer to inspect one item from a list without leaving it. Keep the item in its own state so the content stays put while the drawer closes.',
    'DrawerContent has no padding or header. Add a header with DrawerTitle and a DrawerClose button yourself.',
  ],
  examples: [
    {
      title: 'Basic',
      description:
        'The demo has its own DrawerStack, so the drawer opens inside the frame instead of the window.',
      Demo: Basic,
      code: `<DrawerStack className="h-svh">
  <App />
</DrawerStack>

<Drawer>
  <DrawerTrigger render={<Button variant="outline" size="sm" />}>
    View activity
  </DrawerTrigger>
  <DrawerContent>
    <div className="flex items-start justify-between border-b px-5 py-4">
      <div className="flex flex-col gap-0.5">
        <DrawerTitle>Activity</DrawerTitle>
        <DrawerDescription>The last 7 days in Northwind.</DrawerDescription>
      </div>
      <DrawerClose render={<Button variant="ghost" size="icon-sm" aria-label="Close" />}>
        <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
      </DrawerClose>
    </div>
    <ActivityList />
  </DrawerContent>
</Drawer>`,
    },
    {
      title: 'Inspector',
      description: 'Rows open the drawer on the project they show.',
      Demo: Inspector,
      code: `const [open, setOpen] = useState(false)
const [project, setProject] = useState<Project>()

{projects.map((each) => (
  <button
    key={each.id}
    onClick={() => {
      setProject(each)
      setOpen(true)
    }}
  >
    {each.name}
  </button>
))}

<Drawer open={open} onOpenChange={setOpen}>
  <DrawerContent>
    {project ? <ProjectDetails project={project} /> : null}
  </DrawerContent>
</Drawer>`,
    },
  ],
}
