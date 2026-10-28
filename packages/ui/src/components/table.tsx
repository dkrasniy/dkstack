import * as React from 'react'

import { SortHeader, nextSort, type Sort } from '@dkrasniy/ui/components/sort-header'
import { Tray, TrayCard } from '@dkrasniy/ui/components/tray'
import { cn } from '@dkrasniy/ui/lib/utils'

interface TableColumn<Row> {
  key: string
  header: string
  cell: (row: Row) => React.ReactNode
  width?: string
  sortBy?: (a: Row, b: Row) => number
  hideHeader?: boolean
  className?: string
  headerClassName?: string
}

const CELL = 'min-w-0 px-3 first:ps-4 last:pe-4'

function Table<Row>({
  label,
  columns,
  rows,
  rowKey,
  defaultOrder,
  empty = 'Nothing to show.',
  className,
}: {
  label: string
  columns: readonly TableColumn<Row>[]
  rows: readonly Row[]
  rowKey: (row: Row) => string
  defaultOrder?: (a: Row, b: Row) => number
  empty?: React.ReactNode
  className?: string
}) {
  const [sort, setSort] = React.useState<Sort<string> | null>(null)

  const template = {
    gridTemplateColumns: columns
      .map((column) => column.width ?? 'minmax(0,1fr)')
      .join(' '),
  }
  const sortedBy = columns.find((column) => column.key === sort?.key)?.sortBy
  const sign = sort?.direction === 'descending' ? -1 : 1
  const ordered =
    sortedBy || defaultOrder
      ? [...rows].sort(
          (a, b) => (sortedBy ? sign * sortedBy(a, b) : 0) || (defaultOrder?.(a, b) ?? 0),
        )
      : rows

  return (
    <Tray
      role="table"
      aria-label={label}
      data-slot="table"
      className={cn('text-sm', className)}
    >
      <div
        role="row"
        style={template}
        className="sticky top-0 z-10 grid items-center rounded-t-xl bg-muted text-13 text-muted-foreground"
      >
        {columns.map((column) =>
          column.hideHeader ? (
            <span key={column.key} role="columnheader" className="sr-only">
              {column.header}
            </span>
          ) : column.sortBy ? (
            <SortHeader
              key={column.key}
              label={column.header}
              sort={sort?.key === column.key ? sort.direction : null}
              onToggle={() => setSort((current) => nextSort(current, column.key))}
              className={cn(CELL, column.headerClassName)}
            />
          ) : (
            <span
              key={column.key}
              role="columnheader"
              className={cn(CELL, 'py-2.5 font-medium', column.headerClassName)}
            >
              {column.header}
            </span>
          ),
        )}
      </div>
      <TrayCard role="rowgroup" className="divide-y divide-border">
        {ordered.map((row) => (
          <div
            key={rowKey(row)}
            role="row"
            style={template}
            className="grid items-center py-2.5"
          >
            {columns.map((column) => (
              <div key={column.key} role="cell" className={cn(CELL, column.className)}>
                {column.cell(row)}
              </div>
            ))}
          </div>
        ))}
        {ordered.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">{empty}</p>
        ) : null}
      </TrayCard>
    </Tray>
  )
}

export { Table, type TableColumn }
