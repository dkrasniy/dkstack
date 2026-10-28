import { Outlet, createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '@/app/layout'

export const Route = createFileRoute('/_app')({
  component: function AppRoute() {
    return (
      <AppLayout>
        <Outlet />
      </AppLayout>
    )
  },
})
