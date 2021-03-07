export type Predicate<T> = (value: T) => boolean

export type Callable<R> = {
  (...args: ReadonlyArray<unknown>): R
}

export type GenericReturnType<R, X> = X extends Callable<R> ? R : never

// eslint-disable-next-line @typescript-eslint/ban-types
export type RecursivePartial<T> = T extends object ? { readonly [K in keyof T]?: RecursivePartial<T[K]> } : T

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NullableType<T = NonNullable<any>> = T | null | undefined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OptionalType<T = NonNullable<any>> = T | undefined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NullUnionType<T = NonNullable<any>> = T | null

export type NullableString = NullableType<string>
export type OptionalString = OptionalType<string>
export type NullUnionString = NullUnionType<string>

export const toNullUnionType = <T>(value: NullableType<T>): NullUnionType<T> => (value === undefined ? null : value)

export const toOptionalType = <T>(value: NullableType<T>): OptionalType<T> => (value === null ? undefined : value)

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const isNonArrayObject = (value: any): boolean =>
  hasValue(value) && typeof value === 'object' && !Array.isArray(value)

export const isEmpty = <T>(value: NullableType<T>): value is null | undefined => value === null || value === undefined

export const hasValue = <T>(value: NullableType<T>): value is T => !isEmpty(value)

export const isEmptyString = <T>(value: NullableType<T>): boolean =>
  value === null || value === undefined || (typeof value === 'string' && value.length === 0)

export const isNotEmptyString = <T>(value: NullableType<T>): boolean => !isEmptyString(value)

export const isBlankString = (v: NullableString): boolean => v === undefined || v === null || v.trim().length === 0

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nonEmptyPredicate: (emptyStrAsNone: boolean) => Predicate<any> = (emptyStrAsNone) =>
  emptyStrAsNone ? isNotEmptyString : hasValue

// eslint-disable-next-line @typescript-eslint/ban-types
export const allFieldsAreFilled = (emptyStrAsNone: boolean) => (object: object): boolean =>
  Object.keys(object).length === 0 ? false : Object.values(object).every(nonEmptyPredicate(emptyStrAsNone))

// eslint-disable-next-line @typescript-eslint/ban-types
export const anyFieldIsFilled = (emptyStrAsNone: boolean) => (object: object): boolean => {
  return Object.values(object).some(nonEmptyPredicate(emptyStrAsNone))
}

export const anyFieldIsFilledWithException = (emptyStrAsNone: boolean) => <T>(
  object: T,
  exceptionPredicate: Predicate<keyof T>
): boolean =>
  Object.entries(object).some(
    ([fieldName, item]) => !exceptionPredicate(fieldName as keyof T) && nonEmptyPredicate(emptyStrAsNone)(item)
  )

export const nameOf = <T>(name: keyof T): keyof T => name

export const arrayIntRange = (start: number, end: number): ReadonlyArray<number> =>
  Array.from({ length: end - start + 1 }, (_, k) => k + start)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export const mapValue = <A, B>(f: (a: A) => B) => f
