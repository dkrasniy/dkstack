import { Badge } from '@dkrasniy/ui/components/badge'
import { Table, type TableColumn } from '@dkrasniy/ui/components/table'
import type { Entry } from '../registry'

interface Project {
  id: string
  name: string
  owner: string
  pages: number
  status: 'Live' | 'Draft'
}

const PROJECTS: Project[] = [
  { id: 'p1', name: 'Marketing site', owner: 'Priya Raman', pages: 24, status: 'Live' },
  { id: 'p2', name: 'Help center', owner: 'Marcus Bell', pages: 112, status: 'Live' },
  { id: 'p3', name: 'Careers', owner: 'Jordan Lee', pages: 6, status: 'Draft' },
  { id: 'p4', name: 'Changelog', owner: 'Priya Raman', pages: 48, status: 'Live' },
]

const collator = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true })

const COLUMNS: TableColumn<Project>[] = [
  {
    key: 'name',
    header: 'Name',
    sortBy: (a, b) => collator.compare(a.name, b.name),
    cell: (project) => <span className="font-medium">{project.name}</span>,
  },
  {
    key: 'owner',
    header: 'Owner',
    width: '10rem',
    sortBy: (a, b) => collator.compare(a.owner, b.owner),
    className: 'truncate text-muted-foreground',
    cell: (project) => project.owner,
  },
  {
    key: 'pages',
    header: 'Pages',
    width: '6rem',
    sortBy: (a, b) => a.pages - b.pages,
    className: 'tabular-nums',
    cell: (project) => project.pages,
  },
  {
    key: 'status',
    header: 'Status',
    width: '6rem',
    cell: (project) => (
      <Badge variant={project.status === 'Live' ? 'success' : 'outline'}>
        {project.status}
      </Badge>
    ),
  },
]

function Projects() {
  return (
    <Table
      label="Projects"
      columns={COLUMNS}
      rows={PROJECTS}
      rowKey={(project) => project.id}
      className="w-full max-w-2xl"
    />
  )
}

function Empty() {
  return (
    <Table
      label="Projects"
      columns={COLUMNS}
      rows={[]}
      rowKey={(project) => project.id}
      empty="No projects yet. Create one to see it here."
      className="w-full max-w-2xl"
    />
  )
}

export const entry: Entry = {
  slug: 'table',
  title: 'Table',
  group: 'Surfaces',
  order: 1,
  summary:
    'Rows in a tray with a sticky header. Give a column a sortBy and its header sorts the table: ascending, descending, then back to the default order.',
  imports: "import { Table, type TableColumn } from '@dkrasniy/ui/components/table'",
  guidance: [
    'Describe each column with a header, a cell renderer and a grid width like 10rem. A column without a width takes the remaining space.',
    'Add sortBy to make a column sortable. It takes two rows and returns a number, like Array.prototype.sort.',
    'Pass defaultOrder for the order before anyone sorts. It also breaks ties when a sorted column has equal values.',
    'Filter and search outside the table and pass the matching rows. Pass empty with a sentence that says why nothing shows.',
    'For an actions column, set hideHeader so the header is read by screen readers but not shown.',
  ],
  examples: [
    {
      title: 'Sortable columns',
      description:
        'Name, Owner and Pages sort. Status has no sortBy, so its header is plain.',
      Demo: Projects,
      code: `const COLUMNS: TableColumn<Project>[] = [
  {
    key: 'name',
    header: 'Name',
    sortBy: (a, b) => a.name.localeCompare(b.name),
    cell: (project) => project.name,
  },
  {
    key: 'pages',
    header: 'Pages',
    width: '6rem',
    sortBy: (a, b) => a.pages - b.pages,
    cell: (project) => project.pages,
  },
]

<Table
  label="Projects"
  columns={COLUMNS}
  rows={projects}
  rowKey={(project) => project.id}
/>`,
    },
    {
      title: 'Empty',
      description:
        'With no rows, the header stays and the empty sentence takes the body.',
      Demo: Empty,
      code: `<Table
  label="Projects"
  columns={COLUMNS}
  rows={[]}
  rowKey={(project) => project.id}
  empty="No projects yet. Create one to see it here."
/>`,
    },
  ],
}
