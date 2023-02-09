export const nameOf = <T>(name: keyof T): keyof T => name

export const arrayIntRange = (start: number, end: number): ReadonlyArray<number> =>
  Array.from({ length: end - start + 1 }, (_, k) => k + start)

export const tryOrElse = <T>(fn: () => T, defaultValue: () => T): T => {
  // eslint-disable-next-line functional/no-try-statements
  try {
    return fn()
  } catch (e) {
    return defaultValue()
  }
}
