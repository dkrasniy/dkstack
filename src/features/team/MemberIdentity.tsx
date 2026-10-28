import { HugeiconsIcon } from '@hugeicons/react'
import { UserGroupIcon } from '@hugeicons/core-free-icons'
import { Avatar, AvatarFallback } from '@dkrasniy/ui/components/avatar'
import { Badge } from '@dkrasniy/ui/components/badge'
import { cn } from '@dkrasniy/ui/lib/utils'
import type { DirectoryEntry } from '@/api/team'
import { groupSize, initials } from './members'

const SIZES = {
  chip: { root: 'size-5 after:hidden', text: 'text-[0.625rem]', glyph: 'size-[60%]' },
  row: { root: 'size-7 after:hidden', text: 'text-[0.625rem]', glyph: 'size-[60%]' },
  default: { root: 'size-8', text: 'text-xs', glyph: 'size-4' },
}

export function MemberAvatar({
  entry,
  size = 'default',
}: {
  entry: DirectoryEntry
  size?: keyof typeof SIZES
}) {
  const { root, text, glyph } = SIZES[size]
  if (entry.kind === 'group') {
    return (
      <span
        className={cn(
          'bg-muted text-muted-foreground grid shrink-0 place-items-center rounded-full',
          root,
        )}
      >
        <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} className={glyph} />
      </span>
    )
  }
  return (
    <Avatar className={root}>
      <AvatarFallback className={cn('font-medium', text)}>
        {initials(entry.name)}
      </AvatarFallback>
    </Avatar>
  )
}

export function MemberIdentity({
  entry,
  self = false,
}: {
  entry: DirectoryEntry
  self?: boolean
}) {
  const details = [entry.email, entry.kind === 'group' ? groupSize(entry.size) : null]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="flex min-w-0 items-center gap-3">
      <MemberAvatar entry={entry} />
      <div className="min-w-0 flex-1">
        <div className="flex h-5 min-w-0 items-center gap-2">
          <span title={entry.name} className="truncate font-medium">
            {entry.name}
          </span>
          {self ? <Badge className="h-4.5 px-1.5">You</Badge> : null}
        </div>
        <p className="text-muted-foreground truncate text-xs">{details}</p>
      </div>
    </div>
  )
}
