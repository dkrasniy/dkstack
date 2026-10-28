import type { IconSvgElement } from '@hugeicons/react'
import {
  BookOpen01Icon,
  CircleIcon,
  ComputerIcon,
  GitMergeIcon,
  KeyboardIcon,
  Moon02Icon,
  SquareIcon,
  SquareRoundCornerIcon,
  SunMediumIcon,
} from '@hugeicons/core-free-icons'
import { Avatar, AvatarFallback } from '@dkrasniy/ui/components/avatar'
import { Badge } from '@dkrasniy/ui/components/badge'
import { Kbd } from '@dkrasniy/ui/components/kbd'
import {
  MorphMenu,
  MorphMenuContent,
  MorphMenuDivider,
  MorphMenuForward,
  MorphMenuLabel,
  MorphMenuOption,
  MorphMenuPage,
  MorphMenuTrigger,
} from '@dkrasniy/ui/components/morph-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@dkrasniy/ui/components/sidebar'
import { useAppearance, type Appearance, type Shape } from '@/state/appearance'

const USER = {
  name: 'Jane Morgan',
  email: 'jane@example.com',
  initials: 'JM',
  role: 'Admin',
}

const THEMES = [
  { value: 'light', label: 'Light', icon: SunMediumIcon },
  { value: 'dark', label: 'Dark', icon: Moon02Icon },
  { value: 'system', label: 'System', icon: ComputerIcon },
] as const satisfies readonly { value: Appearance; label: string; icon: IconSvgElement }[]

const SHORTCUTS = [
  { label: 'Toggle sidebar', keys: ['⌘', 'B'] },
  { label: 'Go back or close', keys: ['Esc'] },
] as const

const HELP_TOPICS = [
  {
    title: 'Components',
    text: 'Each one has a page with live examples, its import line and code to copy.',
  },
  {
    title: 'Foundations',
    text: 'Colors, type, radii, shadows and easings, shown in the current theme.',
  },
  {
    title: 'Examples',
    text: 'Team and Settings are full pages built from the library. Copy one to start a new page.',
  },
  {
    title: 'Motion',
    text: 'Animation is CSS only. Reduced motion turns it off.',
  },
] as const

export function AccountMenu() {
  const { state } = useSidebar()
  const collapsed = state === 'collapsed'

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <MorphMenu>
          <MorphMenuTrigger
            title={`${USER.name}\n${USER.email}`}
            render={
              <SidebarMenuButton className="data-popup-open:bg-sidebar-accent h-auto px-1.5 py-1.5 group-data-[collapsible=icon]:p-0!" />
            }
          >
            <Avatar>
              <AvatarFallback>{USER.initials}</AvatarFallback>
            </Avatar>
            <span className="flex min-w-0 flex-1 flex-col text-xs leading-4 font-normal transition-opacity group-data-[collapsible=icon]:opacity-0">
              <span className="text-sidebar-foreground truncate font-medium">
                {USER.name}
              </span>
              <span className="text-muted-foreground truncate">{USER.email}</span>
            </span>
          </MorphMenuTrigger>
          <MorphMenuContent
            aria-label="Account"
            side={collapsed ? 'right' : 'top'}
            align={collapsed ? 'end' : 'start'}
            sideOffset={collapsed ? 12 : 4}
            alignOffset={collapsed ? 8 : 0}
          >
            <AccountPage />
            <DisplayPage />
            <MorphMenuPage name="help" title="Help" className="w-80">
              <div className="text-13 flex max-h-112 flex-col gap-3 overflow-y-auto overscroll-contain px-2.5 pt-1.5 pb-2.5 text-pretty">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">About this starter</p>
                  <p className="text-muted-foreground">
                    A component library and a Vite app that shows every part of it. Start
                    a new app from here and keep the same look.
                  </p>
                </div>
                <dl className="flex flex-col gap-2">
                  {HELP_TOPICS.map(({ title, text }) => (
                    <div key={title}>
                      <dt className="font-medium">{title}</dt>
                      <dd className="text-muted-foreground">{text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </MorphMenuPage>
            <MorphMenuPage name="shortcuts" title="Keyboard shortcuts">
              <dl className="text-13 flex flex-col pb-1">
                {SHORTCUTS.map(({ label, keys }) => (
                  <div
                    key={label}
                    className="flex h-8 items-center justify-between px-2.5"
                  >
                    <dt>{label}</dt>
                    <dd className="flex gap-0.5">
                      {keys.map((key) => (
                        <Kbd key={key}>{key}</Kbd>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </MorphMenuPage>
            <MorphMenuPage name="releases" title="Release notes">
              <div className="text-13 flex flex-col gap-1 px-2.5 pt-1.5 pb-2.5 text-pretty">
                <p className="font-medium">v0.1</p>
                <p className="text-muted-foreground">
                  The first release: the component library, a page for each component and
                  two example pages.
                </p>
              </div>
            </MorphMenuPage>
          </MorphMenuContent>
        </MorphMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function AccountPage() {
  const appearance = useAppearance((store) => store.appearance)
  const theme = THEMES.find(({ value }) => value === appearance) ?? THEMES[0]

  return (
    <MorphMenuPage name="root">
      <div className="flex flex-col items-center px-3 pt-4 pb-3 text-center">
        <Avatar size="lg" className="mb-2">
          <AvatarFallback>{USER.initials}</AvatarFallback>
        </Avatar>
        <span className="w-full text-xs font-medium text-balance wrap-anywhere">
          {USER.name}
        </span>
        <span className="text-muted-foreground w-full text-xs wrap-anywhere">
          {USER.email}
        </span>
        <Badge className="mt-2">{USER.role}</Badge>
      </div>
      <MorphMenuDivider />
      <MorphMenuForward to="display" icon={theme.icon} value={theme.label}>
        Display
      </MorphMenuForward>
      <MorphMenuForward to="help" icon={BookOpen01Icon}>
        Help
      </MorphMenuForward>
      <MorphMenuForward to="shortcuts" icon={KeyboardIcon}>
        Keyboard shortcuts
      </MorphMenuForward>
      <MorphMenuForward to="releases" icon={GitMergeIcon} value="v0.1">
        Release notes
      </MorphMenuForward>
    </MorphMenuPage>
  )
}

function DisplayPage() {
  const appearance = useAppearance((store) => store.appearance)
  const setAppearance = useAppearance((store) => store.setAppearance)
  const shape = useAppearance((store) => store.shape)
  const setShape = useAppearance((store) => store.setShape)

  return (
    <MorphMenuPage name="display" title="Display">
      <div role="group" aria-labelledby="display-theme">
        <MorphMenuLabel id="display-theme">Theme</MorphMenuLabel>
        {THEMES.map(({ value, label, icon }) => (
          <MorphMenuOption
            key={value}
            icon={icon}
            selected={appearance === value}
            onClick={() => setAppearance(value)}
          >
            {label}
          </MorphMenuOption>
        ))}
      </div>
      <MorphMenuDivider />
      <div role="group" aria-labelledby="display-shape">
        <MorphMenuLabel id="display-shape">Corners</MorphMenuLabel>
        {SHAPES.map(({ value, label, icon }) => (
          <MorphMenuOption
            key={value}
            icon={icon}
            selected={shape === value}
            onClick={() => setShape(value)}
          >
            {label}
          </MorphMenuOption>
        ))}
      </div>
    </MorphMenuPage>
  )
}

const SHAPES = [
  { value: 'round', label: 'Round', icon: CircleIcon },
  { value: 'soft', label: 'Soft', icon: SquareRoundCornerIcon },
  { value: 'sharp', label: 'Sharp', icon: SquareIcon },
] as const satisfies readonly { value: Shape; label: string; icon: IconSvgElement }[]
