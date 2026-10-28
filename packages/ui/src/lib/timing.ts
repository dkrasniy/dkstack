export const MIN_PENDING_MS = 600
export const MIN_CREATE_MS = 1100

export function atLeast<T>(ms: number, work: Promise<T>): Promise<T> {
  const wait = new Promise<void>((resolve) => setTimeout(resolve, ms))
  return work.finally(() => wait)
}
