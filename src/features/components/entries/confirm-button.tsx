import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@dkrasniy/ui/components/alert-dialog'
import { Button } from '@dkrasniy/ui/components/button'
import { ConfirmButton } from '@dkrasniy/ui/components/confirm-button'
import { useToast } from '@dkrasniy/ui/components/toast'
import type { Entry } from '../registry'

function Publish() {
  const [pending, setPending] = useState(false)
  return (
    <ConfirmButton
      label="Publish 3 changes"
      confirmLabel="Confirm and publish"
      pendingLabel="Publishing"
      armedVariant="success"
      announcement="Select again to publish the project."
      loading={pending}
      onConfirm={() => {
        setPending(true)
        setTimeout(() => setPending(false), 1600)
      }}
    />
  )
}

function InDialog() {
  const toast = useToast()
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (!pending) setOpen(next)
      }}
    >
      <AlertDialogTrigger
        render={<Button variant="outline" className="text-destructive" />}
      >
        Archive project
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive Northwind?</AlertDialogTitle>
          <AlertDialogDescription>
            No one can open it or its pages anymore, and the live version goes offline.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Keep project</AlertDialogCancel>
          <ConfirmButton
            variant="destructive"
            label="Archive project"
            confirmLabel="Confirm and archive"
            pendingLabel="Archiving project"
            announcement="Select again to archive the project."
            loading={pending}
            onConfirm={() => {
              setPending(true)
              setTimeout(() => {
                setPending(false)
                setOpen(false)
                toast.add({ type: 'success', title: 'Archived Northwind' })
              }, 1400)
            }}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const entry: Entry = {
  slug: 'confirm-button',
  title: 'Confirm button',
  group: 'Actions',
  order: 5,
  summary:
    'A button you press twice. The first press arms it and the label morphs to say what happens next. The second press, within four seconds, runs the action.',
  imports: "import { ConfirmButton } from '@dkrasniy/ui/components/confirm-button'",
  guidance: [
    'Use it for an action that is costly to reverse but too routine for a dialog, like publishing.',
    'Inside an alert dialog it adds a second press for actions that are hard to undo, like archiving. Put it straight in AlertDialogFooter in place of AlertDialogAction, which renders the same Button.',
    'Make the confirm label say what happens, like "Confirm and publish". Never "Are you sure?".',
    'armedVariant changes the color when it arms. Primary to success suits publishing. Keep a destructive button destructive.',
    'Pass announcement so screen readers hear what the second press does. Blur, Escape and the timeout disarm it.',
    'Pass loading and pendingLabel while the request runs. The label morphs again and the button keeps its place.',
  ],
  examples: [
    {
      title: 'Publish',
      description: 'Arms to success, then shows a spinner while it publishes.',
      Demo: Publish,
      code: `<ConfirmButton
  label={\`Publish \${plural(changes, 'change', 'changes')}\`}
  confirmLabel="Confirm and publish"
  pendingLabel="Publishing"
  armedVariant="success"
  announcement="Select again to publish the project."
  loading={publish.isPending}
  onConfirm={() => publish.mutate()}
/>`,
    },
    {
      title: 'Inside an alert dialog',
      description:
        'Open the dialog, then press Archive project twice. Each press is a separate decision.',
      Demo: InDialog,
      code: `<AlertDialog
  open={open}
  onOpenChange={(next) => {
    if (!archive.isPending) setOpen(next)
  }}
>
  <AlertDialogTrigger render={<Button variant="outline" className="text-destructive" />}>
    Archive project
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Archive {project.name}?</AlertDialogTitle>
      <AlertDialogDescription>
        No one can open it or its pages anymore, and the live version goes offline.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel disabled={archive.isPending}>Keep project</AlertDialogCancel>
      <ConfirmButton
        variant="destructive"
        label="Archive project"
        confirmLabel="Confirm and archive"
        pendingLabel="Archiving project"
        announcement="Select again to archive the project."
        loading={archive.isPending}
        onConfirm={() =>
          archive.mutate(project.id, {
            onSuccess: () => {
              setOpen(false)
              toast.add({ type: 'success', title: \`Archived \${project.name}\` })
            },
          })
        }
      />
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    },
  ],
}
