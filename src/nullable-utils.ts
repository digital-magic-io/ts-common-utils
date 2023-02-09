import { NullableString, NullableType, NullUnionType, OptionalString, OptionalType, Predicate } from './type'

export const toNullUnionType = <T>(value: NullableType<T>): NullUnionType<T> => (value === undefined ? null : value)

export const toOptionalType = <T>(value: NullableType<T>): OptionalType<T> => (value === null ? undefined : value)

export const isEmpty = <T>(value: NullableType<T>): value is null | undefined => value === null || value === undefined

export const hasValue = <T>(value: NullableType<T>): value is T => !isEmpty(value)

export const isEmptyString = <T>(value: NullableType<T>): boolean =>
  value === null || value === undefined || (typeof value === 'string' && value.length === 0)

export const isNotEmptyString = <T>(value: NullableType<T>): boolean => !isEmptyString(value)

export const isBlankString = (v: NullableString): boolean => v === undefined || v === null || v.trim().length === 0

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nonEmptyPredicate: (emptyStrAsNone: boolean) => Predicate<any> = (emptyStrAsNone) =>
  emptyStrAsNone ? isNotEmptyString : hasValue

const mapValue = <A, B>(f: (a: A) => B): ((a: A) => B) => f

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

export const allFieldsAreFilled =
  (emptyStrAsNone: boolean) =>
  // eslint-disable-next-line @typescript-eslint/ban-types
  (object: { [s: string]: unknown }): boolean =>
    Object.keys(object).length === 0 ? false : Object.values(object).every(nonEmptyPredicate(emptyStrAsNone))

export const anyFieldIsFilled =
  (emptyStrAsNone: boolean) =>
  // eslint-disable-next-line @typescript-eslint/ban-types
  (object: { [s: string]: unknown }): boolean => {
    return Object.values(object).some(nonEmptyPredicate(emptyStrAsNone))
  }

export const anyFieldIsFilledWithException =
  (emptyStrAsNone: boolean) =>
  <V, T extends { [s: string]: V }>(object: T, exceptionPredicate: Predicate<keyof T>): boolean =>
    Object.entries(object).some(
      ([fieldName, item]) => !exceptionPredicate(fieldName) && nonEmptyPredicate(emptyStrAsNone)(item)
    )
