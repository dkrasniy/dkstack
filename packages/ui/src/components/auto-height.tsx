import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@dkrasniy/ui/lib/utils'

function AutoHeight({
  open = true,
  className,
  children,
}: {
  open?: boolean
  className?: string
  children: ReactNode
}) {
  const inner = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>()

  useLayoutEffect(() => {
    const node = inner.current
    if (!node) return
    const observer = new ResizeObserver(([entry]) => {
      const size = entry?.borderBoxSize[0]?.blockSize
      if (size !== undefined) setHeight(size)
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      data-slot="auto-height"
      data-open={open}
      inert={!open}
      style={{ height: open ? height : 0 }}
      className={cn(
        'overflow-hidden transition-[height,opacity] duration-320 ease-[cubic-bezier(0.32,0.72,0,1)] data-[open=false]:opacity-0 data-[open=false]:duration-200',
        className,
      )}
    >
      <div ref={inner} className="flow-root">
        {children}
      </div>
    </div>
  )
}

export { AutoHeight }
