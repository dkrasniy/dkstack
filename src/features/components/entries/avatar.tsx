import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '@dkrasniy/ui/components/avatar'
import type { Entry } from '../registry'

const PHOTO = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#9b78f2"/><stop offset="1" stop-color="#f08bbd"/></linearGradient></defs><rect width="40" height="40" fill="url(#g)"/><circle cx="20" cy="16" r="7" fill="#fff" fill-opacity=".85"/><path d="M6 40c2-9 8-13 14-13s12 4 14 13z" fill="#fff" fill-opacity=".85"/></svg>',
)}`

function Sizes() {
  return (['sm', 'default', 'lg'] as const).map((size) => (
    <Avatar key={size} size={size}>
      <AvatarFallback>JL</AvatarFallback>
    </Avatar>
  ))
}

function WithImage() {
  return (
    <>
      <Avatar size="lg">
        <AvatarImage src={PHOTO} alt="" />
        <AvatarFallback>SR</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="" alt="" />
        <AvatarFallback>AK</AvatarFallback>
      </Avatar>
    </>
  )
}

function Status() {
  return (
    <>
      <Avatar>
        <AvatarFallback>JL</AvatarFallback>
        <AvatarBadge className="bg-success" />
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src={PHOTO} alt="" />
        <AvatarFallback>SR</AvatarFallback>
        <AvatarBadge className="bg-success" />
      </Avatar>
    </>
  )
}

const PEOPLE = ['JL', 'SR', 'AK']

function Group() {
  return (
    <>
      <AvatarGroup>
        {PEOPLE.map((initials) => (
          <Avatar key={initials}>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        ))}
        <AvatarGroupCount>+4</AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup>
        {PEOPLE.map((initials) => (
          <Avatar key={initials} size="sm">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        ))}
        <AvatarGroupCount className="text-xs">+4</AvatarGroupCount>
      </AvatarGroup>
    </>
  )
}

export const entry: Entry = {
  slug: 'avatar',
  title: 'Avatar',
  group: 'Surfaces',
  order: 40,
  summary:
    'A round photo of a person, with their initials while it loads or if it fails. Avatars overlap in a group with a ring that cuts them apart.',
  imports: `import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '@dkrasniy/ui/components/avatar'`,
  guidance: [
    'Always pass AvatarFallback with two initials. It shows until the image loads and stays if the image fails.',
    'Give AvatarImage an empty alt when the person’s name sits next to it, so screen readers don’t read it twice.',
    'Show three or four faces in a group and put the rest in AvatarGroupCount. It matches the size of the avatars in the group.',
    'AvatarBadge sits on the bottom right with a ring in the page color. Set its color with a bg class.',
  ],
  examples: [
    {
      title: 'Sizes',
      Demo: Sizes,
      code: `<Avatar size="sm">
  <AvatarFallback>JL</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback>JL</AvatarFallback>
</Avatar>
<Avatar size="lg">
  <AvatarFallback>JL</AvatarFallback>
</Avatar>`,
    },
    {
      title: 'Image and fallback',
      description: 'The second person has no photo, so their initials stay.',
      Demo: WithImage,
      code: `<Avatar size="lg">
  <AvatarImage src={person.photoUrl} alt="" />
  <AvatarFallback>{initials(person.name)}</AvatarFallback>
</Avatar>`,
    },
    {
      title: 'Status',
      Demo: Status,
      code: `<Avatar>
  <AvatarFallback>JL</AvatarFallback>
  <AvatarBadge className="bg-success" />
</Avatar>`,
    },
    {
      title: 'Group',
      Demo: Group,
      code: `<AvatarGroup>
  {people.slice(0, 3).map((person) => (
    <Avatar key={person.id}>
      <AvatarImage src={person.photoUrl} alt={person.name} />
      <AvatarFallback>{initials(person.name)}</AvatarFallback>
    </Avatar>
  ))}
  <AvatarGroupCount>+{people.length - 3}</AvatarGroupCount>
</AvatarGroup>`,
    },
  ],
}
