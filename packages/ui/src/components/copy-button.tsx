import { useEffect, useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Copy01Icon, Tick02Icon } from '@hugeicons/core-free-icons'
import { Button } from '@dkrasniy/ui/components/button'
import { useToast } from '@dkrasniy/ui/components/toast'
import { Tooltip, TooltipContent, TooltipTrigger } from '@dkrasniy/ui/components/tooltip'

const COPIED_MS = 1500

function CopyButton({
  value,
  label = 'Copy link',
  failure = 'Couldn’t copy the link',
}: {
  value: string
  label?: string
  failure?: string
}) {
  const toast = useToast()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), COPIED_MS)
    return () => clearTimeout(timer)
  }, [copied])

  return (
    <Tooltip>
      <TooltipTrigger
        delay={300}
        render={
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={copied ? 'Copied' : label}
            onClick={() =>
              void Promise.resolve()
                .then(() => navigator.clipboard.writeText(value))
                .then(
                  () => setCopied(true),
                  () => toast.add({ title: failure }),
                )
            }
          />
        }
      >
        <HugeiconsIcon
          icon={copied ? Tick02Icon : Copy01Icon}
          strokeWidth={2}
          className="size-3.5"
        />
      </TooltipTrigger>
      <TooltipContent>{copied ? 'Copied' : label}</TooltipContent>
    </Tooltip>
  )
}

export { CopyButton }
