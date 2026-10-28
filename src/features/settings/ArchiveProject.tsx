import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@dkrasniy/ui/components/alert-dialog'
import { Button } from '@dkrasniy/ui/components/button'
import { ConfirmButton } from '@dkrasniy/ui/components/confirm-button'
import { useToast } from '@dkrasniy/ui/components/toast'
import { TrayCard, TrayFooter } from '@dkrasniy/ui/components/tray'
import { atLeast, MIN_PENDING_MS } from '@dkrasniy/ui/lib/timing'
import { describeError } from '@/app/errors'
import { archiveProject, type Project } from './project'
import { Section } from './Section'

export function ArchiveProject({ project }: { project: Project }) {
  const toast = useToast()
  const [confirming, setConfirming] = useState(false)
  const archive = useMutation({
    mutationFn: () => atLeast(MIN_PENDING_MS, archiveProject()),
    onSuccess: () => {
      setConfirming(false)
      toast.add({ type: 'success', title: `Archived ${project.name}` })
    },
  })
  const failure = archive.error ? describeError(archive.error) : null

  return (
    <Section title="Danger zone">
      <TrayCard className="flex flex-col gap-1 p-5">
        <h3 className="text-sm font-medium">Archive this project</h3>
        <p className="text-muted-foreground text-sm text-pretty">
          Hides the project and its pages from everyone in the workspace, and takes the
          live version offline.
        </p>
      </TrayCard>
      <TrayFooter note="Only project owners can archive it.">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-destructive"
          onClick={() => setConfirming(true)}
        >
          Archive project
        </Button>
      </TrayFooter>

      <AlertDialog
        open={confirming}
        onOpenChange={(open) => {
          if (!open && !archive.isPending) setConfirming(false)
        }}
        onOpenChangeComplete={(open) => {
          if (!open) archive.reset()
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive {project.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              No one can open it or its pages anymore, and the live version goes offline.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {failure ? (
            <p role="alert" className="text-destructive text-sm">
              {`${failure.title} ${failure.detail}`.trim()}
            </p>
          ) : null}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={archive.isPending}>
              Keep project
            </AlertDialogCancel>
            <ConfirmButton
              variant="destructive"
              label="Archive project"
              confirmLabel="Confirm and archive"
              pendingLabel="Archiving project"
              announcement="Select again to archive the project."
              loading={archive.isPending}
              onConfirm={() => archive.mutate()}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Section>
  )
}
