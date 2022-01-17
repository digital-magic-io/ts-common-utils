import {
  hasValue,
  isEmpty,
  mapValue,
  NullableType,
  OptionalString,
  OptionalType,
  Predicate,
  toOptionalType
} from './type'

export const undefinedIf =
  <T>(predicate: Predicate<T>) =>
  (value: T): OptionalType<T> =>
    mapValue<T, OptionalType<T>>((v) => (predicate(v) ? undefined : v))(value)

export const mapNotNullable: <A, B>(f: (a: A) => B) => (v: NullableType<A>) => NullableType<B> = (f) => (v) =>
  hasValue(v) ? f(v) : undefined

// TODO: Find better algebra
export const mapNotNullablePair =
  <A, B, C>(f: (a: A, b: B) => NullableType<C>) =>
  (a: NullableType<A>, b: NullableType<B>): NullableType<C> =>
    isEmpty(a) || isEmpty(b) ? undefined : f(a, b)

// tslint:disable-next-line:radix
export const parseIntNanSafe = (value: string): OptionalType<number> => undefinedIf(isNaN)(parseInt(value))

export const parseOptionalInt = (value: OptionalType<string>): OptionalType<number> =>
  toOptionalType(mapNotNullable(parseInt)(value))

export const parseOptionalIntNanSafe = (value: OptionalType<string>): OptionalType<number> =>
  toOptionalType(mapNotNullable(parseIntNanSafe)(value))

export const asNonEmptyString = undefinedIf<OptionalString>((v) => v === undefined || v.length === 0)
