import { Toast as ToastPrimitive } from '@base-ui/react/toast'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import { Cancel01Icon, ExclamationMarkIcon, Tick02Icon } from '@hugeicons/core-free-icons'

import { cn } from '@dkrasniy/ui/lib/utils'

const TYPES = {
  success: { icon: Tick02Icon, className: 'bg-success text-white' },
  error: { icon: ExclamationMarkIcon, className: 'bg-destructive text-white' },
  warning: { icon: ExclamationMarkIcon, className: 'bg-warning text-background' },
  info: {
    icon: ExclamationMarkIcon,
    className: 'bg-foreground text-background [&_svg]:rotate-180',
  },
} satisfies Record<string, { icon: IconSvgElement; className: string }>

type ToastType = keyof typeof TYPES

const isToastType = (type: string | undefined): type is ToastType =>
  type !== undefined && Object.hasOwn(TYPES, type)

type Manager = ReturnType<typeof ToastPrimitive.useToastManager>
type ToastOptions = Omit<Parameters<Manager['add']>[0], 'type'> & { type?: ToastType }

interface ToastManager extends Omit<Manager, 'add'> {
  add: (options: ToastOptions) => string
}

function ToastProvider({
  limit = 3,
  timeout = 4000,
  ...props
}: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider limit={limit} timeout={timeout} {...props} />
}

const STACK = cn(
  '[--gap:0.75rem] [--peek:0.625rem] [--scale:calc(max(0,1-(var(--toast-index)*0.06)))] [--shrink:calc(1-var(--scale))]',
  '[--height:var(--toast-frontmost-height,var(--toast-height))]',
  '[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]',
  'absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] h-(--height) w-full origin-bottom select-none',
  '[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]',
  'data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]',
  "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
  'data-limited:opacity-0 data-starting-style:[transform:translateY(150%)] data-ending-style:opacity-0',
  '[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]',
  'data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]',
  'data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
  '[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s] motion-reduce:[transition:opacity_0.2s]',
)

function Toaster() {
  const { toasts } = ToastPrimitive.useToastManager()

  return (
    <ToastPrimitive.Portal>
      <ToastPrimitive.Viewport className="fixed right-[calc(1rem+env(safe-area-inset-right))] bottom-[calc(1rem+env(safe-area-inset-bottom))] z-100 w-[min(22.5rem,calc(100vw-2rem))] sm:right-[calc(1.5rem+env(safe-area-inset-right))] md:right-[calc(1.5rem+var(--toast-inset-end,0px)+env(safe-area-inset-right))] ease-smooth transition-[right] duration-260 motion-reduce:transition-none sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]">
        {toasts.map((toast) => {
          const type = isToastType(toast.type) ? TYPES[toast.type] : undefined
          return (
            <ToastPrimitive.Root
              key={toast.id}
              toast={toast}
              swipeDirection={['right', 'down']}
              data-slot="toast"
              className={cn(
                STACK,
                'group/toast rounded-xl bg-popover text-popover-foreground shadow-overlay',
              )}
            >
              <ToastPrimitive.Content className="flex items-start gap-3 overflow-hidden py-3 ps-3.5 pe-3 transition-opacity duration-250 data-behind:pointer-events-none data-behind:opacity-0 data-expanded:pointer-events-auto data-expanded:opacity-100">
                {type ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mt-px grid size-4.5 shrink-0 place-items-center rounded-full',
                      type.className,
                    )}
                  >
                    <HugeiconsIcon icon={type.icon} strokeWidth={3} className="size-3" />
                  </span>
                ) : null}
                <div className="min-w-0 flex-1">
                  <ToastPrimitive.Title className="text-sm font-medium text-pretty" />
                  <ToastPrimitive.Description className="mt-0.5 text-13 text-pretty text-muted-foreground" />
                </div>
                <ToastPrimitive.Action
                  data-slot="toast-action"
                  className="-my-1 h-7 shrink-0 cursor-pointer rounded-pill bg-muted px-3 text-13 font-medium transition-colors hover:bg-foreground/10"
                />
                <ToastPrimitive.Close
                  aria-label="Dismiss"
                  className="-my-0.5 grid size-6 shrink-0 cursor-pointer place-items-center rounded-pill text-muted-foreground opacity-0 transition-[opacity,background-color] group-hover/toast:opacity-100 hover:bg-foreground/5 hover:text-foreground focus-visible:opacity-100"
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    strokeWidth={2}
                    className="size-3.5"
                  />
                </ToastPrimitive.Close>
              </ToastPrimitive.Content>
            </ToastPrimitive.Root>
          )
        })}
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Portal>
  )
}

const useToast = (): ToastManager => ToastPrimitive.useToastManager()

export { ToastProvider, Toaster, useToast }
export type { ToastType }
