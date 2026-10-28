export const config = {
  isDev: import.meta.env.DEV === true,
} as const

export type Config = typeof config
