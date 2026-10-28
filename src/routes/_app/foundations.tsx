import { createFileRoute } from '@tanstack/react-router'
import { Foundations } from '@/features/foundations/Foundations'

export const Route = createFileRoute('/_app/foundations')({
  component: Foundations,
})
