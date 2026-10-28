import { createFileRoute } from '@tanstack/react-router'
import { ComponentIndex } from '@/features/components/ComponentIndex'

export const Route = createFileRoute('/_app/components/')({
  component: ComponentIndex,
})
