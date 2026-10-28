import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowUp02Icon,
  Search01Icon,
  ViewIcon,
  ViewOffSlashIcon,
} from '@hugeicons/core-free-icons'
import { Field, FieldLabel } from '@dkrasniy/ui/components/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@dkrasniy/ui/components/input-group'
import { Kbd } from '@dkrasniy/ui/components/kbd'
import type { Entry } from '../registry'

function Search() {
  return (
    <div className="w-full max-w-xs">
      <InputGroup>
        <InputGroupAddon>
          <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search projects" aria-label="Search projects" />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function Password() {
  const [shown, setShown] = useState(false)
  return (
    <div className="w-full max-w-xs">
      <Field>
        <FieldLabel htmlFor="input-group-password">Password</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="input-group-password"
            type={shown ? 'text' : 'password'}
            defaultValue="correct horse"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              aria-label="Show password"
              aria-pressed={shown}
              onClick={() => setShown(!shown)}
            >
              <HugeiconsIcon icon={shown ? ViewOffSlashIcon : ViewIcon} strokeWidth={2} />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  )
}

function Affixes() {
  return (
    <div className="grid w-full max-w-xl gap-6 sm:grid-cols-2">
      <Field>
        <FieldLabel htmlFor="input-group-address">Address</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput id="input-group-address" placeholder="example.com" />
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel htmlFor="input-group-budget">Budget</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>$</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            id="input-group-budget"
            inputMode="decimal"
            placeholder="0.00"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  )
}

function Composer() {
  const [message, setMessage] = useState('')
  return (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupTextarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Write a comment"
          aria-label="Comment"
          maxLength={280}
        />
        <InputGroupAddon align="block-end">
          <InputGroupText className="tabular-nums">{message.length}/280</InputGroupText>
          <InputGroupButton
            variant="primary"
            size="icon-sm"
            className="ml-auto"
            aria-label="Post comment"
            disabled={message.trim() === ''}
            onClick={() => setMessage('')}
          >
            <HugeiconsIcon icon={ArrowUp02Icon} strokeWidth={2} />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export const entry: Entry = {
  slug: 'input-group',
  title: 'Input group',
  group: 'Inputs',
  order: 30,
  summary:
    'An input or textarea with icons, text, or buttons inside its outline. The whole group shows focus and invalid states.',
  imports: `import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@dkrasniy/ui/components/input-group'
import { Kbd } from '@dkrasniy/ui/components/kbd'`,
  guidance: [
    'Use InputGroupInput and InputGroupTextarea inside a group, not Input and Textarea, because the group draws the outline.',
    'Set align on each addon: inline-start or inline-end for the sides, block-end for a row under a textarea.',
    'Clicking an addon focuses the input unless the click is on a button, so icons and text act like part of the field.',
    'Give icon-only InputGroupButtons an aria-label.',
  ],
  examples: [
    {
      title: 'Search',
      Demo: Search,
      code: `<InputGroup>
  <InputGroupAddon>
    <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search projects" aria-label="Search projects" />
  <InputGroupAddon align="inline-end">
    <Kbd>⌘K</Kbd>
  </InputGroupAddon>
</InputGroup>`,
    },
    {
      title: 'With a button',
      Demo: Password,
      code: `<InputGroup>
  <InputGroupInput id="password" type={shown ? 'text' : 'password'} />
  <InputGroupAddon align="inline-end">
    <InputGroupButton
      size="icon-xs"
      aria-label="Show password"
      aria-pressed={shown}
      onClick={() => setShown(!shown)}
    >
      <HugeiconsIcon icon={shown ? ViewOffSlashIcon : ViewIcon} strokeWidth={2} />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
    },
    {
      title: 'Text before and after',
      Demo: Affixes,
      code: `<InputGroup>
  <InputGroupAddon>
    <InputGroupText>$</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput id="budget" inputMode="decimal" placeholder="0.00" />
  <InputGroupAddon align="inline-end">
    <InputGroupText>USD</InputGroupText>
  </InputGroupAddon>
</InputGroup>`,
    },
    {
      title: 'Textarea with a toolbar',
      description: 'A block-end addon becomes a row under the text.',
      Demo: Composer,
      code: `<InputGroup>
  <InputGroupTextarea
    value={message}
    onChange={(event) => setMessage(event.target.value)}
    placeholder="Write a comment"
    aria-label="Comment"
    maxLength={280}
  />
  <InputGroupAddon align="block-end">
    <InputGroupText>{message.length}/280</InputGroupText>
    <InputGroupButton
      variant="primary"
      size="icon-sm"
      className="ml-auto"
      aria-label="Post comment"
      disabled={message.trim() === ''}
    >
      <HugeiconsIcon icon={ArrowUp02Icon} strokeWidth={2} />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
    },
  ],
}
