import { useQuery } from '@tanstack/react-query'
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@dkrasniy/ui/components/page-header'
import { Skeleton } from '@dkrasniy/ui/components/skeleton'
import { Tray, TrayCard } from '@dkrasniy/ui/components/tray'
import { teamMembersQuery } from '@/api/team'
import { ErrorState } from '@/app/errors'
import { MemberList } from './MemberList'

export function Team() {
  const members = useQuery(teamMembersQuery())

  return (
    <div className="mx-auto max-w-5xl px-10 pt-10 pb-16">
      <PageHeader className="mb-5">
        <div className="min-w-0">
          <PageTitle>Team</PageTitle>
          <PageDescription>
            Add people and groups, and choose what each of them can do.
          </PageDescription>
        </div>
      </PageHeader>
      {members.isPending ? (
        <MembersSkeleton />
      ) : members.isError ? (
        <ErrorState
          error={members.error}
          subject="members"
          onRetry={() => void members.refetch()}
        />
      ) : (
        <MemberList members={members.data} />
      )}
    </div>
  )
}

function MembersSkeleton() {
  return (
    <div role="status" aria-label="Loading" className="animate-in fade-in-0 duration-300">
      <div className="mb-4 flex items-center gap-3">
        <Skeleton className="h-8.5 w-60 rounded-full" />
        <Skeleton className="h-9 w-72 rounded-sm" />
        <Skeleton className="ms-auto h-9 w-34 rounded-full" />
      </div>
      <Tray>
        <div className="flex h-10.5 items-center gap-4 ps-4">
          <Skeleton className="h-3 w-12" />
        </div>
        <TrayCard className="divide-border divide-y">
          {[0, 1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="flex items-center gap-3 px-4 py-2.5">
              <Skeleton className="size-8 shrink-0 rounded-full" />
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <Skeleton className="h-3.5 w-40" />
                <Skeleton className="h-3 w-56 max-w-full" />
              </div>
              <Skeleton className="h-8 w-36 rounded-sm" />
              <Skeleton className="ms-4 size-8 rounded-full" />
            </div>
          ))}
        </TrayCard>
      </Tray>
    </div>
  )
}
