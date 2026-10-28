import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ToastProvider, Toaster } from '@dkrasniy/ui/components/toast'
import { TooltipProvider } from '@dkrasniy/ui/components/tooltip'
import { queryClient } from './query'
import { ErrorScreen, NotFoundScreen } from './errors'
import { SkeletonLoader } from './skeleton-loader'
import { routeTree } from '@/routeTree.gen'
import { useSyncDarkClass, useSyncShapeAttribute } from '@/state/appearance'

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPendingComponent: SkeletonLoader,
  defaultPendingMs: 0,
  defaultPendingMinMs: 200,
  defaultErrorComponent: ErrorScreen,
  defaultNotFoundComponent: NotFoundScreen,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function Providers() {
  useSyncDarkClass()
  useSyncShapeAttribute()

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ToastProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ToastProvider>
      </TooltipProvider>
    </QueryClientProvider>
  )
}
