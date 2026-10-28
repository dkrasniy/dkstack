import { describe, expect, it } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('lets a later custom shadow replace another', () => {
    expect(cn('shadow-card', 'shadow-float')).toBe('shadow-float')
  })

  it('lets a later custom easing replace another', () => {
    expect(cn('ease-smooth', 'ease-settle')).toBe('ease-settle')
  })

  it('lets shadow-none replace a custom shadow under the same variant', () => {
    expect(cn('focus-visible:shadow-focus', 'focus-visible:shadow-none')).toBe(
      'focus-visible:shadow-none',
    )
  })
})
