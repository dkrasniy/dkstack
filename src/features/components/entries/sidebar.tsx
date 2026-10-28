import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Folder01Icon,
  Home01Icon,
  InboxIcon,
  Settings02Icon,
  UserGroupIcon,
} from '@hugeicons/core-free-icons'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuIndicator,
  SidebarMenuItem,
} from '@dkrasniy/ui/components/sidebar'
import type { Entry } from '../registry'

const MAIN = [
  { label: 'Home', icon: Home01Icon },
  { label: 'Projects', icon: Folder01Icon },
  { label: 'Inbox', icon: InboxIcon },
] as const

const WORKSPACE = [
  { label: 'Team', icon: UserGroupIcon },
  { label: 'Settings', icon: Settings02Icon },
] as const

function Navigation() {
  const [active, setActive] = useState<string>('Home')

  const items = (list: typeof MAIN | typeof WORKSPACE) =>
    list.map(({ label, icon }) => (
      <SidebarMenuItem key={label}>
        <SidebarMenuButton isActive={active === label} onClick={() => setActive(label)}>
          <HugeiconsIcon icon={icon} strokeWidth={2} />
          <span>{label}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ))

  return (
    <div className="bg-sidebar shadow-card h-80 w-56 overflow-hidden rounded-lg">
      <Sidebar collapsible="none" className="w-full">
        <SidebarContent>
          <SidebarMenuIndicator />
          <SidebarGroup>
            <SidebarMenu className="gap-1">{items(MAIN)}</SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel className="px-2">Workspace</SidebarGroupLabel>
            <SidebarMenu className="gap-1">{items(WORKSPACE)}</SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  )
}

export const entry: Entry = {
  slug: 'sidebar',
  title: 'Sidebar',
  group: 'Navigation',
  order: 10,
  summary:
    'The app’s side navigation. It collapses to icons with ⌘B, remembers that in a cookie, and a bar slides to the current page.',
  imports: `import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuIndicator,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from '@dkrasniy/ui/components/sidebar'`,
  guidance: [
    'SidebarProvider wraps the whole shell and holds the open state. Pass open and onOpenChange to restore it from the sidebar_state cookie.',
    'Use Sidebar variant="inset" collapsible="icon" next to SidebarInset, which holds the page on a raised card.',
    'Inside the sidebar: SidebarHeader for the logo and collapse button, SidebarContent for groups of SidebarMenu, SidebarFooter for the account menu.',
    'Mark the current page with isActive on SidebarMenuButton, and give each button a tooltip so it has a label when the sidebar is collapsed.',
    'Put one SidebarMenuIndicator in SidebarContent. It finds the active button, slides to it with ease-settle and follows it when the sidebar collapses.',
    'useSidebar() gives you state, isMobile and toggleSidebar, for things like placing a popover beside the collapsed sidebar.',
  ],
  examples: [
    {
      title: 'Indicator',
      description:
        'Pick a page. The bar slides across groups and lands without a transition the first time.',
      Demo: Navigation,
      code: `<SidebarProvider open={open} onOpenChange={setOpen}>
  <Sidebar variant="inset" collapsible="icon">
    <SidebarHeader>
      <NavToggle />
    </SidebarHeader>
    <SidebarContent className="md:-ml-2 md:pl-2">
      <SidebarMenuIndicator />
      <SidebarGroup>
        <SidebarMenu className="gap-1 transition-[gap] group-data-[collapsible=icon]:gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={isCurrent('/')}
              tooltip="Home"
              render={<Link to="/" />}
            >
              <HugeiconsIcon icon={Home01Icon} strokeWidth={2} />
              <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarMenu className="gap-1 transition-[gap] group-data-[collapsible=icon]:gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={isCurrent('/team')}
              tooltip="Team"
              render={<Link to="/team" />}
            >
              <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />
              <span>Team</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <AccountMenu />
    </SidebarFooter>
  </Sidebar>
  <SidebarInset>{children}</SidebarInset>
</SidebarProvider>`,
    },
  ],
}
