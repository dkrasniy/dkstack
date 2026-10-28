import { HugeiconsIcon } from '@hugeicons/react'
import { Notification01Icon } from '@hugeicons/core-free-icons'
import { Button } from '@dkrasniy/ui/components/button'
import { Input } from '@dkrasniy/ui/components/input'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@dkrasniy/ui/components/popover'
import { Textarea } from '@dkrasniy/ui/components/textarea'
import type { Entry } from '../registry'

function Share() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Share</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Share this page</PopoverTitle>
          <PopoverDescription>
            Anyone in the workspace with the link can view it.
          </PopoverDescription>
        </PopoverHeader>
        <div className="flex gap-2">
          <Input readOnly value="northwind.app/p/pricing" aria-label="Link" />
          <Button variant="secondary">Copy</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function Feedback() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="ghost" />}>Feedback</PopoverTrigger>
      <PopoverContent side="top">
        <PopoverHeader>
          <PopoverTitle>Send feedback</PopoverTitle>
          <PopoverDescription>The team reads every message.</PopoverDescription>
        </PopoverHeader>
        <Textarea placeholder="What would make this better?" aria-label="Feedback" />
        <Button size="sm" className="self-end">
          Send
        </Button>
      </PopoverContent>
    </Popover>
  )
}

const NOTIFICATIONS = [
  { who: 'Jordan Lee', what: 'commented on Pricing', when: '2m' },
  { who: 'Sam Rivera', what: 'invited you to Northwind', when: '1h' },
  { who: 'Alex Kim', what: 'published Home', when: '3h' },
]

function Notifications() {
  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="ghost" size="icon" aria-label="Notifications" />}
      >
        <HugeiconsIcon icon={Notification01Icon} strokeWidth={2} />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 gap-1 p-2">
        <PopoverTitle className="px-2 pt-1 pb-2">Notifications</PopoverTitle>
        {NOTIFICATIONS.map((item) => (
          <div
            key={item.who}
            className="hover:bg-muted flex items-baseline gap-3 rounded-sm px-2 py-2 transition-colors duration-150"
          >
            <p className="min-w-0 flex-1">
              <span className="font-medium">{item.who}</span>{' '}
              <span className="text-muted-foreground">{item.what}</span>
            </p>
            <span className="text-subtle-foreground text-xs tabular-nums">
              {item.when}
            </span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export const entry: Entry = {
  slug: 'popover',
  title: 'Popover',
  group: 'Overlays',
  order: 50,
  summary:
    'A small panel anchored to its trigger. It scales out from the trigger and closes when you click away or press Escape.',
  imports: `import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@dkrasniy/ui/components/popover'`,
  guidance: [
    'Use a popover for a quick input or a glance that relates to its trigger. If it needs more than a field and a button, use a dialog.',
    'Pass the trigger button through render, so the popover attaches to your Button instead of wrapping it.',
    'Set align="end" for triggers near the right edge, so the panel opens back toward the page.',
    'The panel is w-72 with p-4 and gap-3. Override them with className for a list, like w-80 p-2.',
  ],
  examples: [
    {
      title: 'Header and field',
      Demo: Share,
      code: `<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>Share</PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Share this page</PopoverTitle>
      <PopoverDescription>
        Anyone in the workspace with the link can view it.
      </PopoverDescription>
    </PopoverHeader>
    <div className="flex gap-2">
      <Input readOnly value={link} aria-label="Link" />
      <Button variant="secondary" onClick={() => copy(link)}>
        Copy
      </Button>
    </div>
  </PopoverContent>
</Popover>`,
    },
    {
      title: 'Above the trigger',
      Demo: Feedback,
      code: `<Popover>
  <PopoverTrigger render={<Button variant="ghost" />}>Feedback</PopoverTrigger>
  <PopoverContent side="top">
    <PopoverHeader>
      <PopoverTitle>Send feedback</PopoverTitle>
      <PopoverDescription>The team reads every message.</PopoverDescription>
    </PopoverHeader>
    <Textarea placeholder="What would make this better?" aria-label="Feedback" />
    <Button size="sm" className="self-end" onClick={send}>
      Send
    </Button>
  </PopoverContent>
</Popover>`,
    },
    {
      title: 'List, aligned to the end',
      Demo: Notifications,
      code: `<Popover>
  <PopoverTrigger render={<Button variant="ghost" size="icon" aria-label="Notifications" />}>
    <HugeiconsIcon icon={Notification01Icon} strokeWidth={2} />
  </PopoverTrigger>
  <PopoverContent align="end" className="w-80 gap-1 p-2">
    <PopoverTitle className="px-2 pt-1 pb-2">Notifications</PopoverTitle>
    {notifications.map((item) => (
      <div key={item.id} className="hover:bg-muted flex gap-3 rounded-sm px-2 py-2">
        <p className="min-w-0 flex-1">
          <span className="font-medium">{item.who}</span> {item.what}
        </p>
        <span className="text-subtle-foreground text-xs">{item.when}</span>
      </div>
    ))}
  </PopoverContent>
</Popover>`,
    },
  ],
}
