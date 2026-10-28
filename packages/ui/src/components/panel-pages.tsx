import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { cn } from '@dkrasniy/ui/lib/utils'

const LEAVE_MS = 180

function PanelPages<Page extends string>({
  page,
  render,
  className,
  panelClassName,
}: {
  page: Page
  render: (page: Page) => ReactNode
  className?: string
  panelClassName?: string
}) {
  const [shown, setShown] = useState(page)
  const [leaving, setLeaving] = useState<Page | null>(null)
  if (page !== shown) {
    setLeaving(shown)
    setShown(page)
  }

  const card = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const keyboard = useRef(false)

  useEffect(() => {
    if (leaving === null) return
    const timer = setTimeout(() => {
      setLeaving(null)
      const element = content.current
      if (!element) return
      const live = (...selectors: string[]) =>
        element.querySelector<HTMLElement>(
          selectors.map((selector) => `${selector}:not([inert] *)`).join(', '),
        )
      const target = keyboard.current
        ? (live('[aria-pressed="true"]') ?? live('button', '[href]'))
        : element.closest<HTMLElement>('[role="dialog"]')
      target?.focus({ preventScroll: true })
    }, LEAVE_MS)
    return () => clearTimeout(timer)
  }, [leaving])

  useLayoutEffect(() => {
    const box = card.current
    const inner = content.current
    if (!box || !inner) return
    let sized = false
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return
      const { width, height } = entry.contentRect
      if (!sized) {
        sized = true
        box.style.width = `${width}px`
        box.style.height = `${height}px`
        return
      }
      const current = getComputedStyle(box)
      const fromWidth = parseFloat(current.width)
      const fromHeight = parseFloat(current.height)
      if (fromWidth === width && fromHeight === height) return
      box.style.transition = 'none'
      inner.style.transition = 'none'
      box.style.width = `${fromWidth}px`
      box.style.height = `${fromHeight}px`
      inner.style.translate = `0 ${height - fromHeight}px`
      void box.offsetHeight
      box.style.removeProperty('transition')
      inner.style.removeProperty('transition')
      box.style.width = `${width}px`
      box.style.height = `${height}px`
      inner.style.translate = '0 0'
    })
    observer.observe(inner)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      data-slot="panel-pages"
      className={cn(
        'pointer-events-none flex flex-col items-start justify-end',
        className,
      )}
    >
      <div
        ref={card}
        className={cn(
          'ease-smooth pointer-events-auto box-content flex shrink-0 flex-col items-start justify-end overflow-clip transition-[width,height] duration-240 motion-reduce:transition-none',
          panelClassName,
        )}
      >
        <div
          ref={content}
          className="ease-smooth relative shrink-0 transition-[translate] duration-240 will-change-transform motion-reduce:transition-none"
          onKeyDownCapture={() => {
            keyboard.current = true
          }}
          onPointerDownCapture={() => {
            keyboard.current = false
          }}
        >
          {leaving !== null && (
            <div
              key={leaving}
              inert
              aria-hidden="true"
              className="animate-panel-out absolute top-0 left-0 will-change-[opacity] motion-reduce:hidden"
            >
              {render(leaving)}
            </div>
          )}
          <div
            key={shown}
            className={cn(
              'will-change-[opacity]',
              leaving !== null && 'animate-panel-in motion-reduce:animate-none',
            )}
          >
            {render(shown)}
          </div>
        </div>
      </div>
    </div>
  )
}

export { PanelPages }
