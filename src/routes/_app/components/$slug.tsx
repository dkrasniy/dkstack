import { createFileRoute } from '@tanstack/react-router'
import { NotFoundScreen } from '@/app/errors'
import { ComponentPage } from '@/features/components/ComponentPage'
import { findEntry } from '@/features/components/registry'

export const Route = createFileRoute('/_app/components/$slug')({
  component: function EntryRoute() {
    const { slug } = Route.useParams()
    return findEntry(slug) ? <ComponentPage slug={slug} /> : <NotFoundScreen />
  },
})
