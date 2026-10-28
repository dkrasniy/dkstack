import { useState } from 'react'
import { Field, FieldTitle } from '@dkrasniy/ui/components/field'
import { Slider } from '@dkrasniy/ui/components/slider'
import type { Entry } from '../registry'

function firstOf(value: number | readonly number[]) {
  return typeof value === 'number' ? value : (value[0] ?? 0)
}

function Single() {
  const [opacity, setOpacity] = useState(80)
  return (
    <div className="w-full max-w-xs">
      <Field>
        <div className="flex items-center justify-between">
          <FieldTitle id="slider-opacity">Opacity</FieldTitle>
          <span className="text-muted-foreground text-sm tabular-nums">{opacity}%</span>
        </div>
        <Slider
          aria-labelledby="slider-opacity"
          value={[opacity]}
          onValueChange={(value) => setOpacity(firstOf(value))}
        />
      </Field>
    </div>
  )
}

function Range() {
  const [range, setRange] = useState<readonly number[]>([20, 80])
  return (
    <div className="w-full max-w-xs">
      <Field>
        <div className="flex items-center justify-between">
          <FieldTitle id="slider-price">Price</FieldTitle>
          <span className="text-muted-foreground text-sm tabular-nums">
            ${range[0]} to ${range[1]}
          </span>
        </div>
        <Slider
          aria-labelledby="slider-price"
          value={range}
          step={5}
          onValueChange={(value) => {
            if (typeof value !== 'number') setRange(value)
          }}
        />
      </Field>
    </div>
  )
}

function Disabled() {
  return (
    <div className="w-full max-w-xs">
      <Field data-disabled>
        <FieldTitle id="slider-disabled">Volume</FieldTitle>
        <Slider aria-labelledby="slider-disabled" defaultValue={[40]} disabled />
      </Field>
    </div>
  )
}

export const entry: Entry = {
  slug: 'slider',
  title: 'Slider',
  group: 'Inputs',
  order: 110,
  summary: 'Drag a thumb along a track to set a number, or two thumbs to set a range.',
  imports: `import { Slider } from '@dkrasniy/ui/components/slider'
import { Field, FieldTitle } from '@dkrasniy/ui/components/field'`,
  guidance: [
    'Always pass value or defaultValue as an array, [40] for one thumb or [20, 80] for a range, because anything else draws two thumbs.',
    'Name it with aria-labelledby pointing at a visible label, since an aria-label on Slider names its wrapper and not the thumbs.',
    'Print the current value beside the label when the exact number matters, because the slider does not show it.',
    'Save in onValueCommitted, which fires once the drag ends, and use onValueChange only to update the screen.',
  ],
  examples: [
    {
      title: 'One value',
      Demo: Single,
      code: `const [opacity, setOpacity] = useState(80)

<Field>
  <div className="flex items-center justify-between">
    <FieldTitle id="opacity">Opacity</FieldTitle>
    <span className="text-muted-foreground text-sm tabular-nums">{opacity}%</span>
  </div>
  <Slider
    aria-labelledby="opacity"
    value={[opacity]}
    onValueChange={(value) => setOpacity(typeof value === 'number' ? value : (value[0] ?? 0))}
  />
</Field>`,
    },
    {
      title: 'Range',
      description: 'Two values make two thumbs. step snaps them to multiples of 5.',
      Demo: Range,
      code: `<Slider aria-labelledby="price" defaultValue={[20, 80]} step={5} />`,
    },
    {
      title: 'Disabled',
      Demo: Disabled,
      code: `<Field data-disabled>
  <FieldTitle id="volume">Volume</FieldTitle>
  <Slider aria-labelledby="volume" defaultValue={[40]} disabled />
</Field>`,
    },
  ],
}
