import { useState } from 'react'
import { Button } from '@dkrasniy/ui/components/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@dkrasniy/ui/components/dialog'
import { Field, FieldError, FieldLabel } from '@dkrasniy/ui/components/field'
import { Input } from '@dkrasniy/ui/components/input'
import type { Entry } from '../registry'

function Basic() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Rename project</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>
            The new name shows in the sidebar and on shared links.
          </DialogDescription>
        </DialogHeader>
        <Input defaultValue="Northwind" aria-label="Project name" />
        <DialogFooter>
          <DialogClose render={<Button variant="link" />}>Cancel</DialogClose>
          <DialogClose render={<Button />}>Rename</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function Form() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>New project</DialogTrigger>
      <DialogContent>
        <NewProjectForm onCreated={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

function NewProjectForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState('')
  const [error, setError] = useState<string>()
  const [pending, setPending] = useState(false)
  return (
    <form
      noValidate
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault()
        if (pending) return
        if (!name.trim()) return setError('Enter a name for the project.')
        setPending(true)
        setTimeout(onCreated, 1200)
      }}
    >
      <DialogHeader>
        <DialogTitle>New project</DialogTitle>
        <DialogDescription>You can invite people once it exists.</DialogDescription>
      </DialogHeader>
      <Field data-invalid={Boolean(error) || undefined}>
        <FieldLabel htmlFor="demo-new-project">Name</FieldLabel>
        <Input
          id="demo-new-project"
          value={name}
          placeholder="Brand refresh"
          autoFocus
          aria-invalid={Boolean(error)}
          onChange={(event) => {
            setName(event.target.value)
            setError(undefined)
          }}
        />
        <FieldError>{error}</FieldError>
      </Field>
      <DialogFooter>
        <DialogClose render={<Button type="button" variant="link" />}>Cancel</DialogClose>
        <Button type="submit" morph loading={pending}>
          {pending ? 'Creating project' : 'Create project'}
        </Button>
      </DialogFooter>
    </form>
  )
}

export const entry: Entry = {
  slug: 'dialog',
  title: 'Dialog',
  group: 'Overlays',
  order: 10,
  summary:
    'A centered panel over a dimmed page, for a short task that needs focus. It scales in from 96% and has a close button in the corner.',
  imports: `import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@dkrasniy/ui/components/dialog'`,
  guidance: [
    'Use a dialog for a task of one or two fields. Anything longer belongs on its own page or in a sheet.',
    'Title it with the action, like "New project", and make the submit button repeat that verb.',
    'Put the form in its own component inside DialogContent, so it unmounts on close and opens empty next time.',
    'DialogFooter bleeds to the edges with a top border. Put Cancel first as a link button and the action last.',
  ],
  examples: [
    {
      title: 'Basic',
      Demo: Basic,
      code: `<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>Rename project</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Rename project</DialogTitle>
      <DialogDescription>
        The new name shows in the sidebar and on shared links.
      </DialogDescription>
    </DialogHeader>
    <Input defaultValue={project.name} aria-label="Project name" />
    <DialogFooter>
      <DialogClose render={<Button variant="link" />}>Cancel</DialogClose>
      <DialogClose render={<Button />}>Rename</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    },
    {
      title: 'Form',
      description:
        'Controlled, so it closes when the request succeeds. The button keeps its place while it loads.',
      Demo: Form,
      code: `<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger render={<Button />}>New project</DialogTrigger>
  <DialogContent>
    <form
      noValidate
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault()
        create.mutate({ name }, { onSuccess: () => setOpen(false) })
      }}
    >
      <DialogHeader>
        <DialogTitle>New project</DialogTitle>
        <DialogDescription>You can invite people once it exists.</DialogDescription>
      </DialogHeader>
      <Field data-invalid={Boolean(error) || undefined}>
        <FieldLabel htmlFor="project-name">Name</FieldLabel>
        <Input id="project-name" value={name} onChange={(e) => setName(e.target.value)} />
        <FieldError>{error}</FieldError>
      </Field>
      <DialogFooter>
        <DialogClose render={<Button type="button" variant="link" />}>Cancel</DialogClose>
        <Button type="submit" morph loading={create.isPending}>
          {create.isPending ? 'Creating project' : 'Create project'}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>`,
    },
  ],
}
