import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@dkrasniy/ui/components/combobox'
import { Field, FieldLabel } from '@dkrasniy/ui/components/field'
import type { Entry } from '../registry'

const COUNTRIES = [
  'Argentina',
  'Australia',
  'Brazil',
  'Canada',
  'France',
  'Germany',
  'India',
  'Italy',
  'Japan',
  'Mexico',
  'Netherlands',
  'Spain',
  'Sweden',
  'United Kingdom',
  'United States',
]

const LABELS = ['Bug', 'Design', 'Docs', 'Feature', 'Performance', 'Research']

function Single() {
  return (
    <div className="w-full max-w-xs">
      <Field>
        <FieldLabel htmlFor="combobox-country">Country</FieldLabel>
        <Combobox items={COUNTRIES}>
          <ComboboxInput id="combobox-country" placeholder="Search countries" />
          <ComboboxContent>
            <ComboboxEmpty>No countries match</ComboboxEmpty>
            <ComboboxList>
              {(country: string) => (
                <ComboboxItem key={country} value={country}>
                  {country}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    </div>
  )
}

function Multiple() {
  const anchor = useComboboxAnchor()
  return (
    <div className="w-full max-w-xs">
      <Field>
        <FieldLabel htmlFor="combobox-labels">Labels</FieldLabel>
        <Combobox items={LABELS} multiple defaultValue={['Design']}>
          <ComboboxChips ref={anchor}>
            <ComboboxValue>
              {(values: string[]) => (
                <>
                  {values.map((label) => (
                    <ComboboxChip key={label} className="ps-2">
                      {label}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput
                    id="combobox-labels"
                    placeholder={values.length === 0 ? 'Add labels' : ''}
                  />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>No labels match</ComboboxEmpty>
            <ComboboxList>
              {(label: string) => (
                <ComboboxItem key={label} value={label}>
                  {label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    </div>
  )
}

export const entry: Entry = {
  slug: 'combobox',
  title: 'Combobox',
  group: 'Inputs',
  order: 70,
  summary:
    'A select you can type into to filter the options. Pick one, or several as chips.',
  imports: `import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@dkrasniy/ui/components/combobox'
import { Field, FieldLabel } from '@dkrasniy/ui/components/field'`,
  guidance: [
    'Use a combobox when a list is long enough that people would rather type than scroll, and Select for a short one.',
    'Pass the options to Combobox as items and render each one in the ComboboxList function, which filters as people type.',
    'Always include ComboboxEmpty, so a search with no matches says so.',
    'For several values, add multiple, use ComboboxChips, and pass its useComboboxAnchor ref to ComboboxContent as anchor so the list opens under the chips.',
  ],
  examples: [
    {
      title: 'Single',
      Demo: Single,
      code: `<Field>
  <FieldLabel htmlFor="country">Country</FieldLabel>
  <Combobox items={COUNTRIES}>
    <ComboboxInput id="country" placeholder="Search countries" />
    <ComboboxContent>
      <ComboboxEmpty>No countries match</ComboboxEmpty>
      <ComboboxList>
        {(country: string) => (
          <ComboboxItem key={country} value={country}>
            {country}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</Field>`,
    },
    {
      title: 'Multiple',
      description: 'Backspace in the empty input removes the last chip.',
      Demo: Multiple,
      code: `const anchor = useComboboxAnchor()

<Combobox items={LABELS} multiple defaultValue={['Design']}>
  <ComboboxChips ref={anchor}>
    <ComboboxValue>
      {(values: string[]) => (
        <>
          {values.map((label) => (
            <ComboboxChip key={label} className="ps-2">
              {label}
            </ComboboxChip>
          ))}
          <ComboboxChipsInput
            id="labels"
            placeholder={values.length === 0 ? 'Add labels' : ''}
          />
        </>
      )}
    </ComboboxValue>
  </ComboboxChips>
  <ComboboxContent anchor={anchor}>
    <ComboboxEmpty>No labels match</ComboboxEmpty>
    <ComboboxList>
      {(label: string) => (
        <ComboboxItem key={label} value={label}>
          {label}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
    },
  ],
}
