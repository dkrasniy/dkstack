import * as React from 'react'
import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { CheckIcon } from '@hugeicons/core-free-icons'

import { cn } from '@dkrasniy/ui/lib/utils'

function Tile({
  className,
  selected,
  children,
  ...props
}: React.ComponentProps<'div'> & { selected?: boolean }) {
  const selectable = selected !== undefined
  return (
    <div
      data-slot="tile"
      data-selected={selected || undefined}
      className={cn(
        'group/tile ease-smooth relative flex min-w-0 flex-col rounded-xl bg-card p-(--tile-pad) text-left inset-ring inset-ring-border transition-[box-shadow,scale] duration-150 [--tile-pad:8px] has-data-[slot=tile-action]:hover:shadow-float has-[[data-slot=tile-action]:active]:scale-99 motion-reduce:scale-100!',
        selectable &&
          'has-[[data-slot=tile-action]:active]:scale-100 has-data-[slot=tile-action]:hover:shadow-none!',
        className,
      )}
      {...props}
    >
      {children}
      {selectable ? (
        <span
          aria-hidden
          data-slot="tile-ring"
          className="ring-brand pointer-events-none absolute inset-0 z-20 rounded-[inherit] ring-0 transition-[box-shadow] duration-200 ease-out group-data-selected/tile:ring-2"
        />
      ) : null}
    </div>
  )
}

const CHECK_LAYER =
  'grid size-7 place-items-center rounded-full [grid-area:1/1] transition-[opacity,scale,filter] duration-300 ease-smooth'

function TileCheck({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="tile-check"
      className={cn(
        'pointer-events-none absolute top-4 right-4 z-20 grid size-7 scale-90 place-items-center opacity-0 transition-[opacity,scale] duration-150 ease-out group-hover/tile:scale-100 group-hover/tile:opacity-100 group-has-[:focus-visible]/tile:scale-100 group-has-[:focus-visible]/tile:opacity-100 group-data-selected/tile:scale-100 group-data-selected/tile:opacity-100 pointer-coarse:scale-100 pointer-coarse:opacity-100 motion-reduce:scale-100',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          CHECK_LAYER,
          'bg-black/30 backdrop-blur-sm group-data-selected/tile:scale-80 group-data-selected/tile:opacity-0 group-data-selected/tile:blur-[2px]',
        )}
      />
      <span
        className={cn(
          CHECK_LAYER,
          'bg-brand scale-80 text-white opacity-0 blur-[2px] group-data-selected/tile:scale-100 group-data-selected/tile:opacity-100 group-data-selected/tile:blur-[0px]',
        )}
      >
        <HugeiconsIcon icon={CheckIcon} strokeWidth={2.5} className="size-4" />
      </span>
    </span>
  )
}

function TileAction({ className, ...props }: ButtonPrimitive.Props) {
  return (
    <ButtonPrimitive
      data-slot="tile-action"
      className={cn(
        'absolute inset-0 z-10 rounded-[inherit] outline-offset-2 disabled:pointer-events-none',
        className,
      )}
      {...props}
    />
  )
}

function TileMedia({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="tile-media"
      className={cn(
        'relative h-48 overflow-hidden rounded-[calc(var(--radius-xl)-var(--tile-pad))] bg-muted',
        className,
      )}
      {...props}
    />
  )
}

function TileFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="tile-footer"
      className={cn('flex flex-col gap-0.5 px-2 pt-3 pb-1.5', className)}
      {...props}
    />
  )
}

function TileTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="tile-title"
      className={cn(
        'flex min-w-0 items-center justify-between gap-2 text-sm font-medium text-foreground',
        className,
      )}
      {...props}
    />
  )
}

function TileDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="tile-description"
      className={cn('truncate text-xs text-muted-foreground', className)}
      {...props}
    />
  )
}

export { Tile, TileAction, TileCheck, TileDescription, TileFooter, TileMedia, TileTitle }
