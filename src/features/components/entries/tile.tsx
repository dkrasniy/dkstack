import { useState } from 'react'
import {
  Tile,
  TileAction,
  TileCheck,
  TileDescription,
  TileFooter,
  TileMedia,
  TileTitle,
} from '@dkrasniy/ui/components/tile'
import { Badge } from '@dkrasniy/ui/components/badge'
import { useToast } from '@dkrasniy/ui/components/toast'
import { cn } from '@dkrasniy/ui/lib/utils'
import type { Entry } from '../registry'

const COVERS = [
  {
    id: 'dunes',
    name: 'Dunes',
    size: '2400 × 1600',
    fill: 'from-amber-200 to-orange-400',
  },
  { id: 'harbor', name: 'Harbor', size: '3000 × 2000', fill: 'from-sky-200 to-blue-500' },
  {
    id: 'meadow',
    name: 'Meadow',
    size: '1920 × 1280',
    fill: 'from-lime-200 to-emerald-500',
  },
  {
    id: 'dusk',
    name: 'Dusk',
    size: '2400 × 1600',
    fill: 'from-violet-300 to-fuchsia-500',
  },
  {
    id: 'glacier',
    name: 'Glacier',
    size: '4000 × 2667',
    fill: 'from-cyan-100 to-teal-400',
  },
  { id: 'ember', name: 'Ember', size: '2048 × 1365', fill: 'from-rose-300 to-red-500' },
]

function Plain() {
  return (
    <Tile className="w-60">
      <TileMedia className="h-36">
        <div className="size-full bg-linear-to-br from-sky-200 to-blue-500" />
      </TileMedia>
      <TileFooter>
        <TileTitle>Northwind</TileTitle>
        <TileDescription>Edited 2 hours ago</TileDescription>
      </TileFooter>
    </Tile>
  )
}

function Clickable() {
  const toast = useToast()
  return (
    <Tile className="w-60">
      <TileMedia className="h-36">
        <div className="size-full bg-linear-to-br from-violet-300 to-fuchsia-500" />
      </TileMedia>
      <TileFooter>
        <TileTitle>
          <span className="truncate">Spring launch</span>
          <Badge variant="success">Live</Badge>
        </TileTitle>
        <TileDescription>12 pages</TileDescription>
      </TileFooter>
      <TileAction
        aria-label="Open Spring launch"
        onClick={() => toast.add({ title: 'Opened Spring launch' })}
      />
    </Tile>
  )
}

function Selectable() {
  const [selected, setSelected] = useState<string>()
  return (
    <ul className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3">
      {COVERS.map((cover) => (
        <li key={cover.id} className="min-w-0">
          <Tile selected={cover.id === selected}>
            <TileMedia className="h-auto">
              <div className={cn('aspect-5/4 bg-linear-to-br', cover.fill)} />
            </TileMedia>
            <TileFooter>
              <TileTitle>
                <span className="truncate">{cover.name}</span>
              </TileTitle>
              <TileDescription className="tabular-nums">{cover.size}</TileDescription>
            </TileFooter>
            <TileAction
              aria-label={cover.name}
              aria-pressed={cover.id === selected}
              onClick={() =>
                setSelected((current) => (current === cover.id ? undefined : cover.id))
              }
            />
            <TileCheck />
          </Tile>
        </li>
      ))}
    </ul>
  )
}

export const entry: Entry = {
  slug: 'tile',
  title: 'Tile',
  group: 'Surfaces',
  order: 15,
  summary:
    'A card with media on top and a title underneath, for things people recognize by sight: projects, images, templates. It floats on hover when the whole tile is clickable, and can be selected.',
  imports: `import {
  Tile,
  TileAction,
  TileCheck,
  TileDescription,
  TileFooter,
  TileMedia,
  TileTitle,
} from '@dkrasniy/ui/components/tile'`,
  guidance: [
    'Use tiles when the picture helps people find the thing. For a list of names and dates, use rows instead.',
    'Make the whole tile clickable with TileAction, an invisible button over the tile. Give it an aria-label, since it has no text of its own.',
    'For picking from a grid, pass selected on every tile, even when false. That turns on the brand ring, and TileCheck reads it to fill the corner badge.',
    'Pair selected with aria-pressed on TileAction so screen readers hear the state.',
    'The badge shows on hover and keyboard focus, and always on touch screens, where there is no hover.',
  ],
  examples: [
    {
      title: 'Tile',
      Demo: Plain,
      code: `<Tile className="w-60">
  <TileMedia className="h-36">
    <img src={project.cover} alt="" className="size-full object-cover" />
  </TileMedia>
  <TileFooter>
    <TileTitle>{project.name}</TileTitle>
    <TileDescription>Edited {timeAgo(project.editedAt)}</TileDescription>
  </TileFooter>
</Tile>`,
    },
    {
      title: 'Clickable',
      description: 'The tile floats on hover and presses down slightly when clicked.',
      Demo: Clickable,
      code: `<Tile className="w-60">
  <TileMedia className="h-36">
    <img src={project.cover} alt="" className="size-full object-cover" />
  </TileMedia>
  <TileFooter>
    <TileTitle>
      <span className="truncate">{project.name}</span>
      <Badge variant="success">Live</Badge>
    </TileTitle>
    <TileDescription>{plural(project.pages, 'page', 'pages')}</TileDescription>
  </TileFooter>
  <TileAction
    aria-label={\`Open \${project.name}\`}
    onClick={() => navigate({ to: '/projects/$id', params: { id: project.id } })}
  />
</Tile>`,
    },
    {
      title: 'Selectable grid',
      description:
        'Pick a cover. The check badge cross-fades between empty and checked, and the ring fades in around the tile.',
      Demo: Selectable,
      code: `<ul className="grid grid-cols-3 gap-4">
  {images.map((image) => (
    <li key={image.id} className="min-w-0">
      <Tile selected={image.id === selectedId}>
        <TileMedia className="h-auto">
          <img src={image.url} alt="" className="aspect-5/4 object-cover" />
        </TileMedia>
        <TileFooter>
          <TileTitle>
            <span className="truncate">{image.name}</span>
          </TileTitle>
          <TileDescription className="tabular-nums">
            {image.width} × {image.height}
          </TileDescription>
        </TileFooter>
        <TileAction
          aria-label={image.name}
          aria-pressed={image.id === selectedId}
          onClick={() => onSelect(image.id)}
        />
        <TileCheck />
      </Tile>
    </li>
  ))}
</ul>`,
    },
  ],
}
