export interface Callable<R> {
  (...args: any[]): R;
}

export type GenericReturnType<R, X> = X extends Callable<R> ? R : never

export type RecursivePartial<T> = T extends object ? { [K in keyof T]?: RecursivePartial<T[K]> } : T

export type NullableType<T = NonNullable<any>> = T | undefined
export type NullableString = NullableType<string>

export function isEmptyString<T>(value: T | null | undefined): value is null | undefined {
  return value === null || value === undefined || (typeof value === 'string' && value.length === 0)
}

export function isNotEmptyString<T>(value: T | null | undefined): value is T {
  return !isEmptyString(value)
}

export function isEmpty<T> (value: T | null | undefined): value is null | undefined {
  return value === null || value === undefined
}

export function hasValue<T>(value: T | null | undefined): value is T {
  return !isEmpty(value)
}

export function getOrElse<T>(value: T | null | undefined, defaultValue: T): T {
  return hasValue(value) ? value : defaultValue
}

export function allFieldsAreFilled(object: object): boolean {
  return Object.values(object).every(hasValue)
}

export function anyFieldIsFilled(object: object): boolean {
  return Object.values(object).some(hasValue)
}

export function anyFieldIsFilledWithException<T>(object: T, exceptionPredicate: (value: keyof T) => boolean): boolean {
  return Object.entries(object).some(([fieldName, item]) => !exceptionPredicate(fieldName as keyof T) && hasValue(item))
}

// TODO: Write a test
export function stripEmptyValues<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.filter(hasValue).map(stripEmptyValues) as unknown as T
  }
  if (!(obj instanceof Object)) {
    return hasValue(obj) ? obj : undefined as unknown as T
  }
  return Object.fromEntries(Object.entries(obj).map(([prop, value]) => [prop, stripEmptyValues(value)])) as T
}

export function nameOf<T>(name: keyof T): keyof T {
  return name
}

export function arrayIntRange(start: number, end: number): number[] {
  return Array.from({length: end - start + 1}, (v, k) => k + start)
}
