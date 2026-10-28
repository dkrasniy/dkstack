import { useEffect, useState } from 'react'
import { Button } from '@dkrasniy/ui/components/button'
import { Progress, ProgressLabel, ProgressValue } from '@dkrasniy/ui/components/progress'
import type { Entry } from '../registry'

function Upload() {
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)
  const running = started && value < 100

  useEffect(() => {
    if (!running) return
    const timer = setInterval(
      () => setValue((current) => Math.min(100, current + 7)),
      250,
    )
    return () => clearInterval(timer)
  }, [running])

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-5">
      <Progress value={value} className="w-full">
        <ProgressLabel>
          {value === 100 ? 'Uploaded 3 files' : 'Uploading 3 files'}
        </ProgressLabel>
        <ProgressValue />
      </Progress>
      <Button
        variant="secondary"
        size="sm"
        disabled={running}
        onClick={() => {
          setValue(0)
          setStarted(true)
        }}
      >
        {value === 0 ? 'Start upload' : 'Upload again'}
      </Button>
    </div>
  )
}

function Steps() {
  return (
    <Progress value={67} className="w-full max-w-sm gap-2">
      <ProgressLabel className="text-muted-foreground text-xs font-normal">
        2 of 3 steps done
      </ProgressLabel>
      <ProgressValue className="text-xs" />
    </Progress>
  )
}

function Bare() {
  return <Progress value={40} aria-label="Storage used" className="w-full max-w-sm" />
}

export const entry: Entry = {
  slug: 'progress',
  title: 'Progress',
  group: 'Feedback',
  order: 40,
  summary:
    'A thin bar that fills as work completes, with an optional label and percentage above it.',
  imports:
    "import { Progress, ProgressLabel, ProgressValue } from '@dkrasniy/ui/components/progress'",
  guidance: [
    'Use a bar only when you know how far along the work is. If you don’t, use Spinner or Dots.',
    'Children render above the track. ProgressLabel goes on the left and ProgressValue pushes itself to the right.',
    'Without a ProgressLabel, give the Progress an aria-label.',
    'When the work moves in whole steps, fill the bar by finished steps and say so in the label, like "2 of 3 steps done".',
  ],
  examples: [
    {
      title: 'Label and value',
      Demo: Upload,
      code: `<Progress value={upload.percent}>
  <ProgressLabel>Uploading {files.length} files</ProgressLabel>
  <ProgressValue />
</Progress>`,
    },
    {
      title: 'Small label',
      Demo: Steps,
      code: `<Progress value={Math.round((done / steps.length) * 100)} className="gap-2">
  <ProgressLabel className="text-muted-foreground text-xs font-normal">
    {done} of {steps.length} steps done
  </ProgressLabel>
  <ProgressValue className="text-xs" />
</Progress>`,
    },
    {
      title: 'Bar only',
      Demo: Bare,
      code: `<Progress value={usage.percent} aria-label="Storage used" />`,
    },
  ],
}
