import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@dkrasniy/ui/lib/utils'
import { SPINNER } from '@dkrasniy/ui/components/spinner'
import { MorphText } from '@dkrasniy/ui/components/morph-text'

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap select-none will-change-[scale] transition-[background-color,color,opacity,box-shadow,scale] duration-150 ease-smooth active:scale-98 motion-reduce:active:scale-100 disabled:pointer-events-none disabled:opacity-40 data-disabled:pointer-events-none data-disabled:opacity-40 aria-busy:cursor-default [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground shadow-solid hover:bg-primary/88',
        // Tints, not bg-muted, so secondary and a hovered ghost still show on frame, which is
        // the same grey as muted.
        secondary:
          'bg-foreground/5 text-foreground hover:bg-foreground/10 aria-expanded:bg-foreground/10',
        outline: 'bg-background shadow-btn hover:bg-muted aria-expanded:bg-muted',
        ghost:
          'text-muted-foreground hover:bg-foreground/5 hover:text-foreground aria-expanded:bg-foreground/5 aria-expanded:text-foreground aria-pressed:bg-foreground/5 aria-pressed:text-foreground',
        dark: 'bg-foreground text-background shadow-solid hover:bg-foreground/88',
        destructive:
          'bg-destructive text-destructive-foreground shadow-solid hover:bg-destructive/90',
        success:
          'bg-success-solid text-success-solid-foreground shadow-solid hover:bg-success-solid/90',
        link: 'text-foreground underline decoration-current/25 underline-offset-3 hover:decoration-current',
      },
      size: {
        xs: "h-6 gap-1 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-8 gap-1.5 px-3 text-13',
        default: 'h-9 gap-1.5 px-4 text-sm',
        lg: 'h-10 gap-1.5 px-4.5 text-sm',
        xl: 'h-12 gap-2 px-5 text-base font-semibold',
        'icon-xs': "size-6 [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-8',
        icon: 'size-9',
        'icon-lg': 'size-10',
      },
      shape: {
        pill: 'rounded-pill',
        square: 'rounded-md',
      },
    },
    compoundVariants: [
      { variant: 'link', className: 'h-auto px-0' },
      { size: 'xl', className: 'w-full' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      shape: 'pill',
    },
  },
)

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
    morph?: boolean
  }

function Button({
  className,
  variant,
  size,
  shape,
  loading,
  morph,
  children,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant ?? 'primary'}
      aria-busy={loading || undefined}
      className={cn(
        buttonVariants({ variant, size, shape }),
        morph && 'overflow-hidden',
        className,
      )}
      onClick={loading ? undefined : onClick}
      {...props}
    >
      {morph ? (
        <MorphContent loading={loading === true}>{children}</MorphContent>
      ) : loading === undefined ? (
        children
      ) : (
        <span className="grid gap-[inherit]">
          <span className="inline-flex items-center justify-center gap-[inherit] [grid-area:1/1] group-aria-busy/button:opacity-0">
            {children}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              SPINNER,
              'size-4 place-self-center border-2 [grid-area:1/1] not-group-aria-busy/button:opacity-0',
            )}
          />
        </span>
      )}
    </ButtonPrimitive>
  )
}

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const RESIZE = { id: 'morph-resize', duration: 300, easing: EASE }
const GLIDE = { duration: 300, easing: EASE }
const SPINNER_IN = { duration: 400, easing: EASE, fill: 'backwards' as const }
const FADE_IN = {
  duration: 150,
  delay: 40,
  easing: 'ease-out',
  fill: 'backwards' as const,
}
const FADE_OUT = { duration: 90, easing: 'ease-out' }

function spring() {
  const settle = getComputedStyle(document.documentElement).getPropertyValue(
    '--ease-settle',
  )
  return settle.trim() || EASE
}

interface Placed {
  node: HTMLElement
  left: number
  top: number
}

interface Snapshot {
  text: string | undefined
  width: number
  labelLeft: number
  labelWidth: number
  content: Node
  spinner: Placed | undefined
}

function MorphContent({ loading, children }: { loading: boolean; children: ReactNode }) {
  const row = useRef<HTMLSpanElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const content = useRef<HTMLSpanElement>(null)
  const spinner = useRef<HTMLSpanElement>(null)
  const last = useRef<Snapshot>(undefined)
  const text =
    typeof children === 'string' || typeof children === 'number'
      ? String(children)
      : undefined
  const [letters, setLetters] = useState({ text, key: 0 })
  if (text !== letters.text) {
    setLetters({ text, key: similar(letters.text, text) ? letters.key : letters.key + 1 })
  }

  useLayoutEffect(() => {
    const button = row.current?.parentElement
    const slot = label.current
    const shown = content.current
    if (!button || !slot || !shown) return
    if (spinner.current) lockSpin(spinner.current)

    const before = last.current
    const resizing = button
      .getAnimations()
      .find((animation) => animation.id === RESIZE.id)
    const from = resizing ? widthOf(button) : before?.width
    resizing?.cancel()
    const gliding = slot.getAnimations()
    const drift = gliding.length ? parseFloat(getComputedStyle(slot).translate) || 0 : 0
    gliding.forEach((animation) => animation.cancel())
    last.current = {
      text,
      width: widthOf(button),
      labelLeft: leftIn(button, slot),
      labelWidth: widthOf(slot),
      content: withoutExits(shown),
      spinner: spinner.current ? placed(button, spinner.current) : undefined,
    }
    if (!before || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const relabelled = before.text !== text
    const toggled = (before.spinner !== undefined) !== loading
    if (!relabelled && !toggled) return

    button.querySelectorAll('[data-morph-exit]').forEach((el) => el.remove())
    if (from !== undefined && from !== last.current.width) {
      button.animate(
        [{ width: `${from}px` }, { width: `${last.current.width}px` }],
        RESIZE,
      )
    }
    const crossfade = relabelled && !similar(before.text, text)
    const anchor = crossfade ? 0.5 : 0
    const slotLeft = leftIn(button, slot)
    const recentre = resizing && from !== undefined ? (from - before.width) / 2 : 0
    const shift =
      before.labelLeft +
      recentre +
      drift +
      before.labelWidth * anchor -
      (slotLeft + widthOf(slot) * anchor)
    if (shift) slot.animate([{ translate: `${shift}px 0` }, { translate: '0 0' }], GLIDE)
    if (crossfade) {
      fadeOutInside(slot, before.content)
      shown.animate([{ opacity: 0 }, { opacity: 1 }], FADE_IN)
      shown.animate([{ scale: 0.97 }, { scale: 1 }], {
        duration: 300,
        delay: 40,
        easing: spring(),
        fill: 'backwards',
      })
    }
    if (spinner.current && !before.spinner) {
      const dx = slotLeft + shift - leftIn(button, spinner.current)
      spinner.current.animate(
        [
          { opacity: 0, translate: `${dx}px 0` },
          { opacity: 1, offset: 0.35 },
          { opacity: 1, translate: '0 0' },
        ],
        SPINNER_IN,
      )
    } else if (before.spinner && !spinner.current) {
      fadeOut(button, before.spinner)
    }
  }, [text, loading])

  return (
    <span ref={row} className="inline-flex items-center gap-[inherit]">
      {loading && (
        <span
          ref={spinner}
          aria-hidden="true"
          className={cn(SPINNER, 'size-[1.15em] shrink-0 border-[0.15em]')}
        />
      )}
      <span
        ref={label}
        className="relative inline-grid gap-[inherit] will-change-[translate]"
      >
        <span
          ref={content}
          className="inline-flex items-center gap-[inherit] will-change-[opacity,scale]"
        >
          {text === undefined ? children : <MorphText key={letters.key} text={text} />}
        </span>
      </span>
    </span>
  )
}

function similar(a: string | undefined, b: string | undefined) {
  if (a === undefined || b === undefined) return false
  let shared = 0
  while (shared < a.length && a[shared] === b[shared]) shared++
  return shared >= 3
}

function widthOf(el: HTMLElement) {
  return parseFloat(getComputedStyle(el).width)
}

function leftIn(button: HTMLElement, el: HTMLElement) {
  const frame = button.getBoundingClientRect()
  const scale = frame.width / widthOf(button) || 1
  return (el.getBoundingClientRect().left - frame.left) / scale
}

function placed(button: HTMLElement, el: HTMLElement): Placed {
  return {
    node: el.cloneNode(true) as HTMLElement,
    left: leftIn(button, el),
    top: el.offsetTop,
  }
}

function lockSpin(el: HTMLElement) {
  el.getAnimations().forEach((animation) => {
    if (animation instanceof CSSAnimation) animation.startTime = 0
  })
}

function withoutExits(el: HTMLElement) {
  const copy = el.cloneNode(true) as HTMLElement
  copy.querySelectorAll('[data-exit]').forEach((exit) => exit.remove())
  return copy
}

function fadeOutInside(slot: HTMLElement, node: Node) {
  const copy = document.createElement('span')
  copy.append(node)
  copy.dataset.morphExit = ''
  copy.setAttribute('aria-hidden', 'true')
  copy.className = 'pointer-events-none absolute inset-0 flex items-center justify-center'
  slot.append(copy)
  copy.animate(
    [
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0.97 },
    ],
    FADE_OUT,
  ).onfinish = () => copy.remove()
}

function fadeOut(button: HTMLElement, { node: copy, left, top }: Placed) {
  copy.dataset.morphExit = ''
  Object.assign(copy.style, {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    pointerEvents: 'none',
  })
  button.prepend(copy)
  lockSpin(copy)
  copy.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 100,
    easing: 'ease-out',
  }).onfinish = () => copy.remove()
}

function ButtonArrow() {
  const arm =
    'origin-[10px_8px] transition-transform duration-350 ease-smooth [transform-box:view-box]'
  return (
    <svg
      data-icon="inline-end"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      aria-hidden="true"
      className="ease-smooth -mr-1 transition-transform duration-350 group-hover/button:translate-x-0.5"
    >
      <path d="M6 4L10 8" className={cn(arm, 'group-hover/button:rotate-8')} />
      <path d="M10 8L6 12" className={cn(arm, 'group-hover/button:-rotate-8')} />
    </svg>
  )
}

export { Button, ButtonArrow, buttonVariants }
