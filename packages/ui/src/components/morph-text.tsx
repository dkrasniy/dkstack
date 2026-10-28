import { useLayoutEffect, useRef, useState } from 'react'

const MOVE = { duration: 300, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
const ENTER = {
  duration: 300,
  delay: 40,
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  fill: 'backwards' as const,
}
const EXIT = { duration: 200, easing: 'ease-out' }

function MorphText({ text }: { text: string }) {
  const [initial] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)
  const shown = useRef(initial)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    if (!root.querySelector('span')) root.replaceChildren(...[...shown.current].map(char))
    if (text === shown.current) return

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    root.querySelectorAll('[data-exit]').forEach((el) => el.remove())
    const before = [...root.children] as HTMLElement[]
    const from = lefts(root, before)
    before.forEach((el) => el.getAnimations().forEach((a) => a.cancel()))
    const keep = matches(shown.current, text)
    shown.current = text

    const after = [...text].map((ch, i) => {
      const old = keep.get(i)
      return (old === undefined ? undefined : before[old]) ?? char(ch)
    })
    const kept = new Set(keep.values())
    const leaving = before.filter((_, i) => !kept.has(i))
    root.replaceChildren(...after)
    if (still) return

    // Leaving letters stay where they were, out of the flow, while they fade.
    const [origin = 0, ...to] = lefts(root, [root, ...after])
    leaving.forEach((el) => {
      el.dataset.exit = ''
      el.style.left = `${(from[before.indexOf(el)] ?? origin) - origin}px`
      root.append(el)
      el.animate(
        [
          { opacity: 1, filter: 'blur(0)' },
          { opacity: 0, filter: 'blur(3px)' },
        ],
        EXIT,
      ).onfinish = () => el.remove()
    })
    after.forEach((el, i) => {
      const old = keep.get(i)
      if (old === undefined) {
        el.animate(
          [
            { opacity: 0, filter: 'blur(3px)', transform: 'translateY(2px)' },
            { opacity: 1, filter: 'blur(0)', transform: 'none' },
          ],
          ENTER,
        )
        return
      }
      const dx = (from[old] ?? 0) - (to[i] ?? 0)
      if (dx)
        el.animate([{ transform: `translateX(${dx}px)` }, { transform: 'none' }], MOVE)
    })
  }, [text])

  return (
    <span data-slot="morph-text">
      <span className="sr-only">{text}</span>
      <span
        ref={ref}
        aria-hidden="true"
        className="relative inline-block whitespace-pre *:inline-block *:data-exit:absolute *:data-exit:top-0"
      >
        {initial}
      </span>
    </span>
  )
}

function lefts(root: HTMLElement, els: HTMLElement[]) {
  const scale =
    root.getBoundingClientRect().width / parseFloat(getComputedStyle(root).width) || 1
  const frame = root.offsetParent?.getBoundingClientRect().left ?? 0
  return els.map((el) => (el.getBoundingClientRect().left - frame) / scale)
}

function char(ch: string) {
  const el = document.createElement('span')
  el.textContent = ch
  return el
}

// Pairs each letter of `b` with one of `a` along their longest common subsequence, as a
// map from new index to old index.
function matches(a: string, b: string) {
  const x = [...a]
  const y = [...b]
  const table = Array.from({ length: x.length + 1 }, () =>
    new Array<number>(y.length + 1).fill(0),
  )
  const at = (i: number, j: number) => table[i]?.[j] ?? 0
  for (let i = x.length - 1; i >= 0; i--) {
    for (let j = y.length - 1; j >= 0; j--) {
      const row = table[i]
      if (row)
        row[j] =
          x[i] === y[j] ? at(i + 1, j + 1) + 1 : Math.max(at(i + 1, j), at(i, j + 1))
    }
  }
  const pairs = new Map<number, number>()
  for (let i = 0, j = 0; i < x.length && j < y.length;) {
    if (x[i] === y[j]) {
      pairs.set(j, i)
      i++
      j++
    } else if (at(i + 1, j) >= at(i, j + 1)) i++
    else j++
  }
  return pairs
}

export { MorphText }
