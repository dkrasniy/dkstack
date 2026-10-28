import { Fragment, useState, type ReactElement, type ReactNode } from 'react'
import { Link, useMatchRoute, useRouterState } from '@tanstack/react-router'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import {
  DashboardSquare01Icon,
  Home01Icon,
  PaintBoardIcon,
  Settings02Icon,
  SidebarLeftIcon,
  UserGroupIcon,
} from '@hugeicons/core-free-icons'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@dkrasniy/ui/components/breadcrumb'
import { Button } from '@dkrasniy/ui/components/button'
import { DrawerStack } from '@dkrasniy/ui/components/drawer'
import { Kbd } from '@dkrasniy/ui/components/kbd'
import {
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
  SidebarTrigger,
  useSidebar,
} from '@dkrasniy/ui/components/sidebar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@dkrasniy/ui/components/tooltip'
import { AccountMenu } from './account-menu'

const NAV = [
  { to: '/', label: 'Home', icon: Home01Icon, fuzzy: false },
  { to: '/components', label: 'Components', icon: DashboardSquare01Icon, fuzzy: true },
  { to: '/foundations', label: 'Foundations', icon: PaintBoardIcon, fuzzy: false },
] as const

const EXAMPLES = [
  { to: '/team', label: 'Team', icon: UserGroupIcon, fuzzy: false },
  { to: '/settings', label: 'Settings', icon: Settings02Icon, fuzzy: false },
] as const

type NavLink = (typeof NAV)[number] | (typeof EXAMPLES)[number]

const MENU = 'gap-1 transition-[gap] group-data-[collapsible=icon]:gap-2'
const RISE = 'animate-rise-in motion-reduce:animate-none'

export function AppLayout({ children }: { children: ReactNode }) {
  const [navOpen, setNavOpen] = useState(
    () => !document.cookie.includes('sidebar_state=false'),
  )

  return (
    <DrawerStack className="h-svh">
      <SidebarProvider open={navOpen} onOpenChange={setNavOpen} className="h-svh">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader>
            <NavToggle />
          </SidebarHeader>
          <SidebarContent className="md:-ml-2 md:pl-2">
            <SidebarMenuIndicator />
            <SidebarGroup>
              <SidebarMenu className={MENU}>
                <NavItems links={NAV} />
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel className="px-2">Examples</SidebarGroupLabel>
              <SidebarMenu className={MENU}>
                <NavItems links={EXAMPLES} />
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <AccountMenu />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="min-h-0 overflow-hidden">
          <header className="flex h-12 shrink-0 items-center gap-2 border-b pr-2 pl-4">
            <SidebarTrigger className="md:hidden" />
            <SectionBreadcrumb />
          </header>
          <div className="relative min-h-0 flex-1 overflow-auto">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </DrawerStack>
  )
}

function NavToggle() {
  const { toggleSidebar } = useSidebar()

  return (
    <div className="flex items-center justify-between">
      <div className="group/logo grid size-8 place-items-center">
        <span
          aria-hidden="true"
          className="bg-foreground text-background pointer-events-none col-start-1 row-start-1 grid size-5 place-items-center rounded-xs text-xs font-semibold group-data-[collapsible=icon]:group-focus-within/logo:invisible group-data-[collapsible=icon]:group-hover/logo:invisible"
        >
          d
        </span>
        <Link
          to="/"
          aria-label="Home"
          className="col-start-1 row-start-1 size-8 group-data-[collapsible=icon]:hidden"
        />
        <ToggleButton
          label="Expand navigation"
          side="right"
          className="col-start-1 row-start-1 hidden group-data-[collapsible=icon]:inline-flex"
          iconClassName="invisible group-focus-within/logo:visible group-hover/logo:visible"
          onClick={toggleSidebar}
        />
      </div>
      <ToggleButton
        label="Collapse navigation"
        side="bottom"
        className="group-data-[collapsible=icon]:hidden"
        onClick={toggleSidebar}
      />
    </div>
  )
}

function ToggleButton({
  label,
  side,
  className,
  iconClassName,
  onClick,
}: {
  label: string
  side: 'right' | 'bottom'
  className: string
  iconClassName?: string
  onClick: () => void
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        delay={500}
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={label}
            className={className}
            onClick={onClick}
          />
        }
      >
        <HugeiconsIcon icon={SidebarLeftIcon} strokeWidth={2} className={iconClassName} />
      </TooltipTrigger>
      <TooltipContent side={side}>
        {label}
        <span className="flex gap-0.5">
          <Kbd className="bg-background/15 text-background">⌘</Kbd>
          <Kbd className="bg-background/15 text-background">B</Kbd>
        </span>
      </TooltipContent>
    </Tooltip>
  )
}

function useIsCurrent() {
  const matchRoute = useMatchRoute()
  const pending = useRouterState({ select: (state) => state.status === 'pending' })
  return ({ to, fuzzy }: NavLink) => Boolean(matchRoute({ to, fuzzy, pending }))
}

function NavItems({ links }: { links: readonly NavLink[] }) {
  const isCurrent = useIsCurrent()

  return links.map((link) => (
    <NavItem
      key={link.to}
      label={link.label}
      icon={link.icon}
      isActive={isCurrent(link)}
      render={<Link to={link.to} />}
    />
  ))
}

function NavItem({
  label,
  icon,
  isActive,
  render,
}: {
  label: string
  icon: IconSvgElement
  isActive: boolean
  render: ReactElement
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        tooltip={label}
        render={render}
        className="[&_svg]:size-[17px] group-data-[collapsible=icon]:p-[7px]! group-data-[collapsible=icon]:[&_svg]:size-4.5"
      >
        <HugeiconsIcon icon={icon} strokeWidth={2} />
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function SectionBreadcrumb() {
  const isCurrent = useIsCurrent()
  const matchRoute = useMatchRoute()
  const section = NAV.find(isCurrent)
  const example = EXAMPLES.find(isCurrent)
  const onEntry = Boolean(matchRoute({ to: '/components/$slug' }))

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {section ? (
          <BreadcrumbItem key={section.label} className={RISE}>
            {onEntry ? (
              <BreadcrumbLink render={<Link to="/components" />}>
                {section.label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{section.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ) : null}
        {example ? (
          <>
            <BreadcrumbItem className={RISE}>Examples</BreadcrumbItem>
            <Fragment key={example.label}>
              <BreadcrumbSeparator className={RISE} />
              <BreadcrumbItem className={RISE}>
                <BreadcrumbPage>{example.label}</BreadcrumbPage>
              </BreadcrumbItem>
            </Fragment>
          </>
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
