import { useEffect } from 'react'
import { create } from 'zustand'

export type Appearance = 'system' | 'light' | 'dark'

export type Shape = 'round' | 'soft' | 'sharp'

const APPEARANCE_KEY = 'app:appearance'
const SHAPE_KEY = 'app:shape'

export function isAppearance(value: unknown): value is Appearance {
  return value === 'system' || value === 'light' || value === 'dark'
}

export function isShape(value: unknown): value is Shape {
  return value === 'round' || value === 'soft' || value === 'sharp'
}

function stored<T>(key: string, isValid: (value: unknown) => value is T, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return isValid(value) ? value : fallback
  } catch {
    return fallback
  }
}

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    return
  }
}

interface AppearanceState {
  appearance: Appearance
  shape: Shape
  setAppearance: (appearance: Appearance) => void
  setShape: (shape: Shape) => void
}

export const useAppearance = create<AppearanceState>((set) => ({
  appearance: stored(APPEARANCE_KEY, isAppearance, 'system'),
  shape: stored(SHAPE_KEY, isShape, 'round'),
  setAppearance: (appearance) => {
    save(APPEARANCE_KEY, appearance)
    set({ appearance })
  },
  setShape: (shape) => {
    save(SHAPE_KEY, shape)
    set({ shape })
  },
}))

export function useSyncDarkClass() {
  const appearance = useAppearance((state) => state.appearance)

  useEffect(() => {
    const system = matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const dark = appearance === 'dark' || (appearance === 'system' && system.matches)
      document.documentElement.classList.toggle('dark', dark)
    }
    apply()
    if (appearance !== 'system') return
    system.addEventListener('change', apply)
    return () => system.removeEventListener('change', apply)
  }, [appearance])
}

export function useSyncShapeAttribute() {
  const shape = useAppearance((state) => state.shape)

  useEffect(() => {
    const root = document.documentElement
    if (shape === 'round') delete root.dataset.shape
    else root.dataset.shape = shape
  }, [shape])
}
