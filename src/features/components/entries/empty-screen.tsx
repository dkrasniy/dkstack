import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon } from '@hugeicons/core-free-icons'
import { Button } from '@dkrasniy/ui/components/button'
import {
  EmptyScreen,
  IsometricBar,
  IsometricSlab,
  IsometricStage,
} from '@dkrasniy/ui/components/empty-screen'
import type { Entry } from '../registry'

const FRAME = 'relative h-[32rem] w-full overflow-hidden rounded-lg bg-background'

const SHEETS = [
  { lift: 24, className: 'top-0 left-0' },
  { lift: 64, className: 'top-14 left-12' },
  { lift: 104, className: 'top-28 left-24' },
]

function PageSheets() {
  return (
    <IsometricStage className="h-[25rem] w-[19rem]">
      {SHEETS.map((sheet) => (
        <IsometricSlab
          key={sheet.lift}
          lift={sheet.lift}
          className={`${sheet.className} flex h-68 w-52 flex-col gap-2.5 p-3`}
        >
          <span className="flex items-center gap-2">
            <IsometricBar className="h-2 w-9" />
            <span className="flex-1" />
            <IsometricBar className="h-1 w-5" />
            <IsometricBar className="h-1 w-5" />
            <IsometricBar className="h-1 w-5" />
          </span>
          <span className="bg-muted flex h-24 flex-col items-center justify-center gap-1.5 rounded-sm">
            <IsometricBar className="bg-foreground/15 h-2.5 w-3/5" />
            <IsometricBar className="bg-foreground/15 h-2.5 w-2/5" />
            <span className="bg-brand mt-1 h-3.5 w-12 rounded-full" />
          </span>
          <IsometricBar className="h-1.5 w-full" />
          <IsometricBar className="h-1.5 w-5/6" />
          <IsometricBar className="h-1.5 w-2/3" />
          <span className="mt-auto grid grid-cols-2 gap-2">
            <span className="bg-muted h-12 rounded-sm" />
            <span className="bg-muted h-12 rounded-sm" />
          </span>
        </IsometricSlab>
      ))}
    </IsometricStage>
  )
}

function Pages() {
  return (
    <div className={FRAME}>
      <EmptyScreen
        title="No pages yet"
        description="Pages are what people see when they visit the project. Start with a blank page or pick a template."
        actions={<Button variant="ghost">Import</Button>}
        art={<PageSheets />}
      >
        <Button>
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
          New page
        </Button>
      </EmptyScreen>
    </div>
  )
}

const STARTERS = [
  'A hero with a headline and a button',
  'A grid of feature cards',
  'A footer with links',
]

function Sections() {
  return (
    <IsometricStage className="h-[26rem] w-[21rem]">
      <IsometricSlab
        lift={40}
        className="inset-x-0 top-0 flex h-11 items-center gap-3 px-4"
      >
        <IsometricBar className="h-2.5 w-12" />
        <span className="flex-1" />
        <IsometricBar className="h-1.5 w-8" />
        <IsometricBar className="h-1.5 w-8" />
        <IsometricBar className="h-1.5 w-8" />
        <span className="bg-brand h-4 w-9 rounded-full" />
      </IsometricSlab>
      <IsometricSlab
        lift={72}
        className="inset-x-0 top-15 flex h-40 flex-col items-center justify-center gap-2.5"
      >
        <IsometricBar className="bg-foreground/15 h-4 w-3/5" />
        <IsometricBar className="bg-foreground/15 h-4 w-2/5" />
        <span className="bg-brand mt-2 h-6 w-20 rounded-full" />
      </IsometricSlab>
      <IsometricSlab lift={104} className="inset-x-0 bottom-0 h-48 p-3.5">
        <IsometricBar className="bg-foreground/15 h-3 w-2/5" />
        <div className="mt-3.5 grid h-32 grid-cols-3 gap-2">
          {[0, 1, 2].map((card) => (
            <div key={card} className="bg-muted flex flex-col gap-1.5 rounded-sm p-2.5">
              <IsometricBar className="h-1.5 w-1/2" />
              <IsometricBar className="bg-foreground/15 h-2 w-4/5" />
              <IsometricBar className="bg-foreground/15 h-2 w-3/5" />
            </div>
          ))}
        </div>
      </IsometricSlab>
    </IsometricStage>
  )
}

function Components() {
  return (
    <div className={FRAME}>
      <EmptyScreen
        title="No components yet"
        description="Components are the sections a page is built from. Start from one of these, or describe your own."
        art={<Sections />}
      >
        <div className="flex flex-col items-start gap-2">
          {STARTERS.map((starter) => (
            <Button key={starter} variant="outline" size="sm">
              {starter}
            </Button>
          ))}
        </div>
      </EmptyScreen>
    </div>
  )
}

export const entry: Entry = {
  slug: 'empty-screen',
  title: 'Empty screen',
  group: 'Surfaces',
  order: 60,
  summary:
    'A whole page with nothing on it yet. The copy sits on the left and an isometric drawing of what will be there floats on the right.',
  imports: `import {
  EmptyScreen,
  IsometricBar,
  IsometricSlab,
  IsometricStage,
} from '@dkrasniy/ui/components/empty-screen'`,
  guidance: [
    'Use it for the first visit to a page that is empty, like a new project with no pages. For an empty list inside a page, use Empty.',
    'It fills its nearest positioned parent with absolute inset-0, so render it in a relative container that has a height.',
    'Build the art from IsometricSlab layers inside an IsometricStage. A higher lift floats a slab closer, and IsometricBar stands in for text.',
    'The art hides below the md breakpoint, so the title, description and actions need to make sense alone.',
  ],
  examples: [
    {
      title: 'With an action',
      description:
        'The actions prop sits in the top right corner, apart from the main button.',
      Demo: Pages,
      code: `<div className="relative h-full">
  <EmptyScreen
    title="No pages yet"
    description="Pages are what people see when they visit the project. Start with a blank page or pick a template."
    actions={<Button variant="ghost">Import</Button>}
    art={<PageSheets />}
  >
    <Button onClick={onCreate}>
      <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
      New page
    </Button>
  </EmptyScreen>
</div>`,
    },
    {
      title: 'With starting points',
      Demo: Components,
      code: `<EmptyScreen
  title="No components yet"
  description="Components are the sections a page is built from. Start from one of these, or describe your own."
  art={<Sections />}
>
  <div className="flex flex-col items-start gap-2">
    {starters.map((starter) => (
      <Button key={starter} variant="outline" size="sm" onClick={() => start(starter)}>
        {starter}
      </Button>
    ))}
  </div>
</EmptyScreen>`,
    },
    {
      title: 'Art',
      description:
        'Each slab is a card lifted off a grid. Stack three at different lifts.',
      Demo: ArtOnly,
      code: `const SHEETS = [
  { lift: 24, className: 'top-0 left-0' },
  { lift: 64, className: 'top-14 left-12' },
  { lift: 104, className: 'top-28 left-24' },
]

function PageSheets() {
  return (
    <IsometricStage className="h-[25rem] w-[19rem]">
      {SHEETS.map((sheet) => (
        <IsometricSlab
          key={sheet.lift}
          lift={sheet.lift}
          className={\`\${sheet.className} flex h-68 w-52 flex-col gap-2.5 p-3\`}
        >
          <span className="flex items-center gap-2">
            <IsometricBar className="h-2 w-9" />
            <span className="flex-1" />
            <IsometricBar className="h-1 w-5" />
            <IsometricBar className="h-1 w-5" />
          </span>
          <span className="bg-muted flex h-24 flex-col items-center justify-center gap-1.5 rounded-sm">
            <IsometricBar className="bg-foreground/15 h-2.5 w-3/5" />
            <span className="bg-brand mt-1 h-3.5 w-12 rounded-full" />
          </span>
          <IsometricBar className="h-1.5 w-full" />
          <IsometricBar className="h-1.5 w-2/3" />
        </IsometricSlab>
      ))}
    </IsometricStage>
  )
}`,
    },
  ],
}

function ArtOnly() {
  return (
    <div className="grid h-96 w-full place-items-center overflow-hidden">
      <PageSheets />
    </div>
  )
}
