import { useEffect, useState, type ComponentProps } from 'react'

import { Button } from '@dkrasniy/ui/components/button'

type ButtonProps = ComponentProps<typeof Button>

const CONFIRM_MS = 4000

function ConfirmButton({
  label,
  confirmLabel,
  pendingLabel,
  announcement = 'Select again to confirm.',
  onConfirm,
  variant = 'primary',
  armedVariant = variant,
  timeout = CONFIRM_MS,
  loading,
  disabled,
  onBlur,
  onKeyDown,
  ...props
}: Omit<ButtonProps, 'children' | 'morph' | 'onClick'> & {
  label: string
  confirmLabel: string
  pendingLabel?: string
  announcement?: string
  onConfirm: () => void
  armedVariant?: ButtonProps['variant']
  timeout?: number
}) {
  const [armed, setArmed] = useState(false)
  const confirming = armed && !disabled && !loading

  useEffect(() => {
    if (!armed) return
    const timer = setTimeout(() => setArmed(false), timeout)
    return () => clearTimeout(timer)
  }, [armed, timeout])

  return (
    <>
      <Button
        morph
        data-armed={confirming || undefined}
        variant={confirming ? armedVariant : variant}
        loading={loading === true}
        disabled={disabled}
        onClick={(event) => {
          if (!armed) return setArmed(true)
          if (event.detail > 1) return
          setArmed(false)
          onConfirm()
        }}
        onBlur={(event) => {
          setArmed(false)
          onBlur?.(event)
        }}
        onKeyDown={(event) => {
          if (event.repeat && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault()
          }
          if (event.key === 'Escape' && confirming) {
            event.stopPropagation()
            setArmed(false)
          }
          onKeyDown?.(event)
        }}
        {...props}
      >
        {loading && pendingLabel ? pendingLabel : confirming ? confirmLabel : label}
      </Button>
      <span aria-live="polite" className="sr-only">
        {confirming ? announcement : ''}
      </span>
    </>
  )
}

export { ConfirmButton }
