import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Copy01Icon,
  Delete02Icon,
  FolderTransferIcon,
  Link01Icon,
  MoreHorizontalIcon,
  PencilEdit02Icon,
} from '@hugeicons/core-free-icons'
import { Button } from '@dkrasniy/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@dkrasniy/ui/components/dropdown-menu'
import type { Entry } from '../registry'

function Actions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Page
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Page</DropdownMenuLabel>
          <DropdownMenuItem>
            <HugeiconsIcon icon={PencilEdit02Icon} strokeWidth={2} />
            Rename
            <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
            Duplicate
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HugeiconsIcon icon={Link01Icon} strokeWidth={2} />
            Copy link
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
          Delete page
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ViewOptions() {
  const [sort, setSort] = useState('updated')
  const [showArchived, setShowArchived] = useState(false)
  const [showDrafts, setShowDrafts] = useState(true)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        View
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          value={sort}
          onValueChange={(value: string) => setSort(value)}
        >
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuRadioItem value="updated">Last updated</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="created">Date created</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Show</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={showDrafts} onCheckedChange={setShowDrafts}>
            Drafts
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showArchived}
            onCheckedChange={setShowArchived}
          >
            Archived
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function RowMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" aria-label="More actions" />}
      >
        <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>Rename</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <HugeiconsIcon icon={FolderTransferIcon} strokeWidth={2} />
            Move to
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Design</DropdownMenuItem>
            <DropdownMenuItem>Marketing</DropdownMenuItem>
            <DropdownMenuItem>Engineering</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const entry: Entry = {
  slug: 'dropdown-menu',
  title: 'Dropdown menu',
  group: 'Navigation',
  order: 30,
  summary:
    'A list of actions that opens from a button. It scales in from the trigger and supports groups, shortcuts, checkboxes and submenus.',
  imports: `import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@dkrasniy/ui/components/dropdown-menu'
import { Button } from '@dkrasniy/ui/components/button'`,
  guidance: [
    'Use a dropdown for actions on one thing, like a page or a row, and Select to pick a form value.',
    'Render the trigger as a Button through render on DropdownMenuTrigger, so it keeps its styles and gets the open state.',
    'Put each DropdownMenuLabel inside a DropdownMenuGroup or DropdownMenuRadioGroup, which it labels for screen readers.',
    'Put destructive items last, after a separator, with variant="destructive".',
    'DropdownMenuShortcut only shows the keys, so bind them yourself.',
    'Checkbox and radio items keep the menu open when clicked, so people can change several at once.',
  ],
  examples: [
    {
      title: 'Groups and shortcuts',
      Demo: Actions,
      code: `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>Page</DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuGroup>
      <DropdownMenuLabel>Page</DropdownMenuLabel>
      <DropdownMenuItem>
        <HugeiconsIcon icon={PencilEdit02Icon} strokeWidth={2} />
        Rename
        <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
        Duplicate
        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
      Delete page
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
    {
      title: 'Radio and checkbox items',
      Demo: ViewOptions,
      code: `<DropdownMenuContent className="w-56">
  <DropdownMenuRadioGroup value={sort} onValueChange={(value: string) => setSort(value)}>
    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
    <DropdownMenuRadioItem value="updated">Last updated</DropdownMenuRadioItem>
    <DropdownMenuRadioItem value="created">Date created</DropdownMenuRadioItem>
    <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
  </DropdownMenuRadioGroup>
  <DropdownMenuSeparator />
  <DropdownMenuGroup>
    <DropdownMenuLabel>Show</DropdownMenuLabel>
    <DropdownMenuCheckboxItem checked={showDrafts} onCheckedChange={setShowDrafts}>
      Drafts
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked={showArchived} onCheckedChange={setShowArchived}>
      Archived
    </DropdownMenuCheckboxItem>
  </DropdownMenuGroup>
</DropdownMenuContent>`,
    },
    {
      title: 'Row actions and a submenu',
      description:
        'An icon trigger at the end of a row, with the menu aligned to its right edge.',
      Demo: RowMenu,
      code: `<DropdownMenu>
  <DropdownMenuTrigger
    render={<Button variant="ghost" size="icon" aria-label="More actions" />}
  >
    <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-48">
    <DropdownMenuItem>Rename</DropdownMenuItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <HugeiconsIcon icon={FolderTransferIcon} strokeWidth={2} />
        Move to
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Design</DropdownMenuItem>
        <DropdownMenuItem>Marketing</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
  ],
}
