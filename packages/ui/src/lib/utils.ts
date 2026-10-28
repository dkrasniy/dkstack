import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// tailwind-merge only knows Tailwind's default theme, so it can't tell which of two
// shadow-card and shadow-float classes should win.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      shadow: [
        'card',
        'float',
        'overlay',
        'input',
        'focus',
        'invalid',
        'btn',
        'btn-press',
        'press',
        'solid',
      ],
      text: ['13'],
      ease: ['smooth', 'settle', 'bounce'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
