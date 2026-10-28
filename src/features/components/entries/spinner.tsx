import { Spinner } from '@dkrasniy/ui/components/spinner'
import type { Entry } from '../registry'

function Sizes() {
  return (
    <>
      <Spinner className="size-3" />
      <Spinner />
      <Spinner className="size-6 border-[2.5px]" />
      <Spinner className="text-brand size-6 border-[2.5px]" />
    </>
  )
}

function WithLabel() {
  return (
    <>
      <span className="text-muted-foreground flex items-center gap-2 text-sm">
        <Spinner className="size-3.5" />
        Loading pages
      </span>
      <span className="flex items-center gap-2.5 text-sm font-medium">
        <Spinner className="size-3" />
        Publishing
        <span className="text-muted-foreground font-normal">Started just now</span>
      </span>
    </>
  )
}

export const entry: Entry = {
  slug: 'spinner',
  title: 'Spinner',
  group: 'Feedback',
  order: 10,
  summary: 'A spinning ring in the current text color, for a wait of unknown length.',
  imports: "import { Spinner } from '@dkrasniy/ui/components/spinner'",
  guidance: [
    'Put a short label next to it that says what is loading. On its own, a spinner only says to wait.',
    'It takes its color from the text, so set text-* on it or its parent. Resize it with size-* and border-*.',
    'For a button that starts a request, pass loading to Button instead. It keeps the button’s width.',
    'If you know the layout of what is loading, use Skeleton so the page doesn’t jump when it arrives.',
  ],
  examples: [
    {
      title: 'Sizes and color',
      Demo: Sizes,
      code: `<Spinner className="size-3" />
<Spinner />
<Spinner className="size-6 border-[2.5px]" />
<Spinner className="text-brand size-6 border-[2.5px]" />`,
    },
    {
      title: 'With a label',
      Demo: WithLabel,
      code: `<span className="text-muted-foreground flex items-center gap-2 text-sm">
  <Spinner className="size-3.5" />
  Loading pages
</span>`,
    },
  ],
}
