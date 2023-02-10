import { hasValue } from './nullables'

// eslint-disable-next-line functional/prefer-immutable-types
export const hasDuplicates = (arr: Array<unknown>): boolean => arr.length !== new Set(arr).size

// eslint-disable-next-line functional/prefer-immutable-types
export const sameArrayValues = <T>(values: Array<T>): boolean => new Set(values).size === 1

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNonArrayObject = (value: any): boolean =>
  hasValue(value) && typeof value === 'object' && !Array.isArray(value)

export const arrayIncludes = <T extends U, U>(array: ReadonlyArray<T>, element: U): element is T => {
  return array.includes(element as T)
}

// eslint-disable-next-line functional/prefer-immutable-types
export const splitArrayToChunks = <T>(list: Array<T>, chunkSize: number): ReadonlyArray<ReadonlyArray<T>> =>
  // eslint-disable-next-line functional/prefer-immutable-types
  list.reduce((chunks: Array<Array<T>>, item: T, index) => {
    const chunk = Math.floor(index / chunkSize)
    // eslint-disable-next-line functional/immutable-data
    chunks[chunk] = ([] as Array<T>).concat(chunks[chunk] ?? [], item)
    return chunks
  }, [])

// eslint-disable-next-line functional/prefer-immutable-types
export const reorderArray = <T>(list: Array<T>, startIndex: number, endIndex: number): Array<T> => {
  const result = Array.from(list)
  // eslint-disable-next-line functional/immutable-data
  const [removed] = result.splice(startIndex, 1)
  // eslint-disable-next-line functional/immutable-data
  result.splice(endIndex, 0, removed)
  return result
}
