import { AvatarStack } from '@dkrasniy/ui/components/avatar-stack'
import type { Entry } from '../registry'

const PEOPLE = [
  { name: 'Priya Raman' },
  { name: 'Marcus Bell' },
  { name: 'Sofia Alvarez' },
  { name: 'Kenji Watanabe' },
  { name: 'Amara Okafor' },
  { name: 'Liam Walsh' },
  { name: 'Hannah Schmidt' },
  { name: 'Diego Ferreira' },
]

function Stack() {
  return <AvatarStack people={PEOPLE} />
}

function Sizes() {
  return (
    <div className="flex flex-col items-center gap-5">
      <AvatarStack people={PEOPLE} max={4} size="sm" />
      <AvatarStack people={PEOPLE} max={4} size="default" />
      <AvatarStack people={PEOPLE} max={4} size="lg" />
    </div>
  )
}

function Total() {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="font-medium">Engineering</span>
      <AvatarStack people={PEOPLE.slice(0, 3)} total={42} size="default" />
    </div>
  )
}

export const entry: Entry = {
  slug: 'avatar-stack',
  title: 'Avatar stack',
  group: 'Surfaces',
  summary:
    'Overlapping avatars with a +N bubble for the rest. Hovering lifts one avatar and nudges its neighbors less the further away they are.',
  imports: "import { AvatarStack } from '@dkrasniy/ui/components/avatar-stack'",
  guidance: [
    'Keep max between three and five. The stack says who is involved, not everyone who is.',
    'Pass total when you only have the first few people, and the bubble counts the rest.',
    'Each avatar shows the name on hover, and a screen reader hears the count. Pass label to say something more specific, like "12 people in Design".',
    'People without a photo get their initials.',
  ],
  examples: [
    {
      title: 'Stack',
      description: 'Move the pointer across the avatars.',
      Demo: Stack,
      code: `<AvatarStack
  people={[
    { name: 'Priya Raman', src: '/avatars/priya.jpg' },
    { name: 'Marcus Bell' },
    { name: 'Sofia Alvarez' },
  ]}
/>`,
    },
    {
      title: 'Sizes',
      Demo: Sizes,
      code: `<AvatarStack people={people} max={4} size="sm" />
<AvatarStack people={people} max={4} size="default" />
<AvatarStack people={people} max={4} size="lg" />`,
    },
    {
      title: 'Count from a total',
      description:
        'When the list is paged, pass the first few people and the full count.',
      Demo: Total,
      code: `<AvatarStack people={group.preview} total={group.size} size="default" />`,
    },
  ],
}
