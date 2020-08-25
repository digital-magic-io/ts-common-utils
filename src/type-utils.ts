export interface Callable<R> {
  (...args: ReadonlyArray<any>): R
}

export type GenericReturnType<R, X> = X extends Callable<R> ? R : never

export type RecursivePartial<T> = T extends object ? { [K in keyof T]?: RecursivePartial<T[K]> } : T

export type NullableType<T = NonNullable<any>> = T | undefined
export type NullableString = NullableType<string>

export function asNullable<T>(value: T | undefined): T | null {
  return value === undefined ? null : value
}

export function fromNullable<T>(value: T | null): T | undefined {
  return value === null ? undefined : value
}

export function isEmptyString<T>(value: T | null | undefined): value is null | undefined {
  return value === null || value === undefined || (typeof value === 'string' && value.length === 0)
}

export function isBlankString(v: string | undefined | null): boolean {
  return v === undefined || v === null || v.trim().length === 0
}

export function isNotEmptyString<T>(value: T | null | undefined): value is T {
  return !isEmptyString(value)
}

export function isEmpty<T>(value: T | null | undefined): value is null | undefined {
  return value === null || value === undefined
}

export function hasValue<T>(value: T | null | undefined): value is T {
  return !isEmpty(value)
}

export function getOrElse<T>(value: T | null | undefined, defaultValue: () => T): T {
  return hasValue(value) ? value : defaultValue()
}

export function allFieldsAreFilled(object: object, emptyStrAsEmpty: boolean): boolean {
  if (Object.keys(object).length === 0) {
    return false
  }
  return Object.values(object).every(emptyStrAsEmpty ? isNotEmptyString : hasValue)
}

export function anyFieldIsFilled(object: object, emptyStrAsEmpty: boolean): boolean {
  return Object.values(object).some(emptyStrAsEmpty ? isNotEmptyString : hasValue)
}

export function anyFieldIsFilledWithException<T>(
  object: T,
  emptyStrAsEmpty: boolean,
  exceptionPredicate: (value: keyof T) => boolean
): boolean {
  return Object.entries(object).some(
    ([fieldName, item]) =>
      !exceptionPredicate(fieldName as keyof T) && (emptyStrAsEmpty ? isNotEmptyString(item) : hasValue(item))
  )
}

export function nameOf<T>(name: keyof T): keyof T {
  return name
}

export function arrayIntRange(start: number, end: number): ReadonlyArray<number> {
  return Array.from({ length: end - start + 1 }, (_, k) => k + start)
}
