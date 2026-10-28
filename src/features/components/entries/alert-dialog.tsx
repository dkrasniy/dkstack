import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { UserRemove01Icon } from '@hugeicons/core-free-icons'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@dkrasniy/ui/components/alert-dialog'
import { Button } from '@dkrasniy/ui/components/button'
import type { Entry } from '../registry'

function Destructive() {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        Delete project
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Northwind?</AlertDialogTitle>
          <AlertDialogDescription>
            Its 12 pages and their history are deleted for everyone in the workspace. You
            can’t undo this.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Keep project</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            loading={pending}
            onClick={() => {
              setPending(true)
              setTimeout(() => {
                setPending(false)
                setOpen(false)
              }, 1200)
            }}
          >
            Delete project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function Small() {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Remove Jordan Lee
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            <HugeiconsIcon icon={UserRemove01Icon} strokeWidth={2} />
          </AlertDialogMedia>
          <AlertDialogTitle>Remove Jordan Lee?</AlertDialogTitle>
          <AlertDialogDescription>
            They lose access to this workspace right away.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep member</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={() => setOpen(false)}>
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const entry: Entry = {
  slug: 'alert-dialog',
  title: 'Alert dialog',
  group: 'Overlays',
  order: 20,
  summary:
    'A dialog that asks someone to confirm before something they can’t take back. It has no close button, and clicking outside doesn’t dismiss it.',
  imports: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@dkrasniy/ui/components/alert-dialog'`,
  guidance: [
    'Only confirm actions that destroy something or can’t be undone. For anything you can undo, act right away and offer Undo in a toast.',
    'Name the thing in the title, like "Delete Northwind?", and say in the description exactly what goes with it.',
    'Label cancel with what it keeps, like "Keep project", so neither button reads as a plain "OK".',
    'AlertDialogAction doesn’t close on its own. Control open, pass loading while the request runs, and close it when the request succeeds.',
    'size="sm" centers the content and puts the two buttons side by side, for a short question with an icon.',
  ],
  examples: [
    {
      title: 'Destructive confirmation',
      Demo: Destructive,
      code: `<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger render={<Button variant="destructive" />}>
    Delete project
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete {project.name}?</AlertDialogTitle>
      <AlertDialogDescription>
        Its {project.pageCount} pages and their history are deleted for everyone in the
        workspace. You can’t undo this.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel disabled={remove.isPending}>Keep project</AlertDialogCancel>
      <AlertDialogAction
        variant="destructive"
        loading={remove.isPending}
        onClick={() => remove.mutate(project.id, { onSuccess: () => setOpen(false) })}
      >
        Delete project
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    },
    {
      title: 'Small, with an icon',
      Demo: Small,
      code: `<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger render={<Button variant="outline" />}>
    Remove {person.name}
  </AlertDialogTrigger>
  <AlertDialogContent size="sm">
    <AlertDialogHeader>
      <AlertDialogMedia className="bg-destructive/10 text-destructive">
        <HugeiconsIcon icon={UserRemove01Icon} strokeWidth={2} />
      </AlertDialogMedia>
      <AlertDialogTitle>Remove {person.name}?</AlertDialogTitle>
      <AlertDialogDescription>
        They lose access to this workspace right away.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Keep member</AlertDialogCancel>
      <AlertDialogAction
        variant="destructive"
        onClick={() => {
          remove.mutate(person.id)
          setOpen(false)
        }}
      >
        Remove
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    },
  ],
}
