import { Button } from '@dkrasniy/ui/components/button'
import { useToast } from '@dkrasniy/ui/components/toast'
import type { Entry } from '../registry'

function Types() {
  const toast = useToast()
  return (
    <>
      <Button variant="outline" onClick={() => toast.add({ title: 'Draft saved' })}>
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.add({ type: 'success', title: 'Invited Jordan Lee' })}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: 'error',
            title: 'Couldn’t save the page',
            description: 'Check your connection and try again.',
          })
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({ type: 'warning', title: 'You can attach up to 10 files.' })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: 'info',
            title: 'Publishing continues if you leave this page.',
          })
        }
      >
        Info
      </Button>
    </>
  )
}

function WithAction() {
  const toast = useToast()
  return (
    <Button
      variant="outline"
      onClick={() => {
        const id = toast.add({
          title: 'Deleted Pricing',
          actionProps: { children: 'Undo', onClick: () => toast.close(id) },
        })
      }}
    >
      Delete page
    </Button>
  )
}

function Setup() {
  const toast = useToast()
  return (
    <Button variant="secondary" onClick={() => toast.add({ title: 'Changes saved' })}>
      Save
    </Button>
  )
}

export const entry: Entry = {
  slug: 'toast',
  title: 'Toast',
  group: 'Overlays',
  order: 60,
  summary:
    'Short messages that stack in the bottom corner and leave after four seconds. Hover to fan the stack out, and swipe right or down to dismiss one.',
  imports:
    "import { ToastProvider, Toaster, useToast } from '@dkrasniy/ui/components/toast'",
  guidance: [
    'Render ToastProvider and Toaster once at the root of the app, then call useToast wherever you need it.',
    'Toast the result of something someone did, like "Invited Jordan Lee". Errors in a form belong next to the field.',
    'Leave out type for neutral news. success, error, warning and info add a small colored mark before the title.',
    'Give an error a description that says what to do next.',
    'Add an Undo action after deleting something, instead of asking first in an alert dialog.',
  ],
  examples: [
    {
      title: 'Types',
      Demo: Types,
      code: `const toast = useToast()

toast.add({ title: 'Draft saved' })
toast.add({ type: 'success', title: 'Invited Jordan Lee' })
toast.add({
  type: 'error',
  title: 'Couldn’t save the page',
  description: 'Check your connection and try again.',
})
toast.add({ type: 'warning', title: 'You can attach up to 10 files.' })
toast.add({ type: 'info', title: 'Publishing continues if you leave this page.' })`,
    },
    {
      title: 'With an action',
      Demo: WithAction,
      code: `const id = toast.add({
  title: \`Deleted \${page.title}\`,
  actionProps: {
    children: 'Undo',
    onClick: () => {
      restore.mutate(page.id)
      toast.close(id)
    },
  },
})`,
    },
    {
      title: 'Setup',
      description: 'Once, around the app.',
      Demo: Setup,
      code: `<ToastProvider>
  <App />
  <Toaster />
</ToastProvider>`,
    },
  ],
}
