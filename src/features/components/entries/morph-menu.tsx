import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  LanguageSkillIcon,
  Logout01Icon,
  Notification01Icon,
} from '@hugeicons/core-free-icons'
import { Avatar, AvatarFallback } from '@dkrasniy/ui/components/avatar'
import { Button } from '@dkrasniy/ui/components/button'
import {
  MorphMenu,
  MorphMenuContent,
  MorphMenuDivider,
  MorphMenuForward,
  MorphMenuItem,
  MorphMenuLabel,
  MorphMenuOption,
  MorphMenuPage,
  MorphMenuTrigger,
  useMorphMenu,
} from '@dkrasniy/ui/components/morph-menu'
import { Switch } from '@dkrasniy/ui/components/switch'
import type { Entry } from '../registry'

const LANGUAGES = ['English', 'Français', 'Deutsch', '日本語'] as const

const ALERTS = [
  { id: 'mentions', label: 'Mentions', text: 'When someone mentions you in a comment.' },
  { id: 'invites', label: 'Invites', text: 'When you are added to a project.' },
  { id: 'digest', label: 'Weekly digest', text: 'A summary of changes every Monday.' },
] as const

type Alert = (typeof ALERTS)[number]['id']

function Preferences() {
  const [language, setLanguage] = useState<string>('English')
  const [alerts, setAlerts] = useState<Record<Alert, boolean>>({
    mentions: true,
    invites: true,
    digest: false,
  })

  return (
    <MorphMenu>
      <MorphMenuTrigger render={<Button variant="outline" />}>
        Preferences
      </MorphMenuTrigger>
      <MorphMenuContent aria-label="Preferences">
        <MorphMenuPage name="root">
          <MorphMenuForward to="language" icon={LanguageSkillIcon} value={language}>
            Language
          </MorphMenuForward>
          <MorphMenuForward to="notifications" icon={Notification01Icon}>
            Notifications
          </MorphMenuForward>
          <MorphMenuDivider />
          <SignOut />
        </MorphMenuPage>
        <MorphMenuPage name="language" title="Language">
          <div role="group" aria-label="Language">
            {LANGUAGES.map((option) => (
              <MorphMenuOption
                key={option}
                selected={option === language}
                onClick={() => setLanguage(option)}
              >
                {option}
              </MorphMenuOption>
            ))}
          </div>
        </MorphMenuPage>
        <MorphMenuPage name="notifications" title="Notifications" className="w-80">
          {ALERTS.map(({ id, label, text }) => (
            <label
              key={id}
              className="hover:bg-accent flex cursor-pointer items-center gap-3 rounded-[calc(var(--radius-md)-4px)] px-2.5 py-2"
            >
              <span className="text-13 flex min-w-0 flex-1 flex-col">
                {label}
                <span className="text-muted-foreground text-xs">{text}</span>
              </span>
              <Switch
                checked={alerts[id]}
                onCheckedChange={(checked) =>
                  setAlerts((current) => ({ ...current, [id]: checked }))
                }
              />
            </label>
          ))}
        </MorphMenuPage>
      </MorphMenuContent>
    </MorphMenu>
  )
}

function SignOut() {
  const { close } = useMorphMenu()
  return (
    <MorphMenuItem onClick={close}>
      <HugeiconsIcon
        icon={Logout01Icon}
        strokeWidth={2}
        className="text-muted-foreground"
      />
      Sign out
    </MorphMenuItem>
  )
}

const PEOPLE = [
  { name: 'Jane Morgan', email: 'jane@example.com', initials: 'JM' },
  { name: 'Marco Rossi', email: 'marco@example.com', initials: 'MR' },
  { name: 'Priya Shah', email: 'priya@example.com', initials: 'PS' },
] as const

type Person = (typeof PEOPLE)[number]

const ROLES = ['Admin', 'Editor', 'Viewer'] as const

type Role = (typeof ROLES)[number]

function People() {
  const [person, setPerson] = useState<Person>(PEOPLE[0])
  const [roles, setRoles] = useState<Record<string, Role>>({
    'jane@example.com': 'Admin',
    'marco@example.com': 'Editor',
    'priya@example.com': 'Viewer',
  })

  return (
    <MorphMenu>
      <MorphMenuTrigger render={<Button variant="outline" />}>Members</MorphMenuTrigger>
      <MorphMenuContent aria-label="Members">
        <MorphMenuPage name="root" className="w-64">
          <MorphMenuLabel>3 members</MorphMenuLabel>
          {PEOPLE.map((each) => (
            <PersonRow
              key={each.email}
              person={each}
              role={roles[each.email]}
              onOpen={() => setPerson(each)}
            />
          ))}
        </MorphMenuPage>
        <MorphMenuPage name="person" title={person.name} className="w-72">
          <div className="flex items-center gap-3 px-2.5 py-2">
            <Avatar>
              <AvatarFallback>{person.initials}</AvatarFallback>
            </Avatar>
            <span className="text-13 flex min-w-0 flex-col">
              <span className="truncate font-medium">{person.name}</span>
              <span className="text-muted-foreground truncate">{person.email}</span>
            </span>
          </div>
          <MorphMenuDivider />
          <MorphMenuLabel>Role</MorphMenuLabel>
          <div role="group" aria-label="Role">
            {ROLES.map((role) => (
              <MorphMenuOption
                key={role}
                selected={roles[person.email] === role}
                onClick={() =>
                  setRoles((current) => ({ ...current, [person.email]: role }))
                }
              >
                {role}
              </MorphMenuOption>
            ))}
          </div>
        </MorphMenuPage>
      </MorphMenuContent>
    </MorphMenu>
  )
}

function PersonRow({
  person,
  role,
  onOpen,
}: {
  person: Person
  role: Role | undefined
  onOpen: () => void
}) {
  const { go } = useMorphMenu()
  return (
    <MorphMenuItem
      onClick={() => {
        onOpen()
        go('person')
      }}
    >
      <Avatar size="sm">
        <AvatarFallback>{person.initials}</AvatarFallback>
      </Avatar>
      <span className="truncate">{person.name}</span>
      <span className="text-muted-foreground ml-auto">{role}</span>
    </MorphMenuItem>
  )
}

export const entry: Entry = {
  slug: 'morph-menu',
  title: 'Morph menu',
  group: 'Navigation',
  order: 20,
  summary:
    'A popover with pages. The panel morphs to the size of each page, and a subpage gets a back row.',
  imports: `import {
  MorphMenu,
  MorphMenuContent,
  MorphMenuDivider,
  MorphMenuForward,
  MorphMenuItem,
  MorphMenuLabel,
  MorphMenuOption,
  MorphMenuPage,
  MorphMenuTrigger,
  useMorphMenu,
} from '@dkrasniy/ui/components/morph-menu'`,
  guidance: [
    'Use it for a menu with a few levels, like an account menu. For a flat list of actions, use a dropdown menu.',
    'Give each page a name. The menu opens on the page named root, or on the one you pass to root.',
    'A page with a title is a subpage: it gets a back row with that title. Escape on a subpage goes back instead of closing.',
    'Pages are w-60. Set another width with className, like w-80, and the panel morphs to it.',
    'MorphMenuForward opens a page, MorphMenuOption is a choice with a tick, and MorphMenuItem is a plain row that can render a link.',
    'Inside a page, useMorphMenu() gives you go, back and close for rows you build yourself.',
    'Pass side and align to MorphMenuContent. The edge next to the trigger stays put while the panel resizes.',
  ],
  examples: [
    {
      title: 'Pages',
      description:
        'A root page, a picker and a wider page. The value on a forward row shows the current choice.',
      Demo: Preferences,
      code: `<MorphMenu>
  <MorphMenuTrigger render={<Button variant="outline" />}>Preferences</MorphMenuTrigger>
  <MorphMenuContent aria-label="Preferences">
    <MorphMenuPage name="root">
      <MorphMenuForward to="language" icon={LanguageSkillIcon} value={language}>
        Language
      </MorphMenuForward>
      <MorphMenuForward to="notifications" icon={Notification01Icon}>
        Notifications
      </MorphMenuForward>
      <MorphMenuDivider />
      <SignOut />
    </MorphMenuPage>
    <MorphMenuPage name="language" title="Language">
      {LANGUAGES.map((option) => (
        <MorphMenuOption
          key={option}
          selected={option === language}
          onClick={() => setLanguage(option)}
        >
          {option}
        </MorphMenuOption>
      ))}
    </MorphMenuPage>
    <MorphMenuPage name="notifications" title="Notifications" className="w-80">
      <AlertSwitches />
    </MorphMenuPage>
  </MorphMenuContent>
</MorphMenu>

function SignOut() {
  const { close } = useMorphMenu()
  return <MorphMenuItem onClick={close}>Sign out</MorphMenuItem>
}`,
    },
    {
      title: 'Rows you build',
      description:
        'Each member row calls go from useMorphMenu. The subpage title comes from state, so one page serves every member.',
      Demo: People,
      code: `<MorphMenuPage name="root" className="w-64">
  <MorphMenuLabel>3 members</MorphMenuLabel>
  {people.map((each) => (
    <PersonRow key={each.email} person={each} onOpen={() => setPerson(each)} />
  ))}
</MorphMenuPage>
<MorphMenuPage name="person" title={person.name} className="w-72">
  {ROLES.map((role) => (
    <MorphMenuOption
      key={role}
      selected={roles[person.email] === role}
      onClick={() => setRole(person, role)}
    >
      {role}
    </MorphMenuOption>
  ))}
</MorphMenuPage>

function PersonRow({ person, onOpen }: { person: Person; onOpen: () => void }) {
  const { go } = useMorphMenu()
  return (
    <MorphMenuItem
      onClick={() => {
        onOpen()
        go('person')
      }}
    >
      <Avatar size="sm">
        <AvatarFallback>{person.initials}</AvatarFallback>
      </Avatar>
      {person.name}
    </MorphMenuItem>
  )
}`,
    },
  ],
}
