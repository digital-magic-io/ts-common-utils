import { hasValue, isEmpty, NullableType } from './type'

export const getOrElse = <T>(value: NullableType<T>, defaultValue: () => T): T =>
  hasValue(value) ? value : defaultValue()

export const mapNotNullable: <A, B>(f: (a: A) => B) => (v: NullableType<A>) => NullableType<B> = (f) => (v) =>
  hasValue(v) ? f(v) : undefined

// TODO: Find better algebra
export const mapNotNullablePair = <A, B, C>(f: (a: A, b: B) => NullableType<C>) => (
  a: NullableType<A>,
  b: NullableType<B>
): NullableType<C> => (isEmpty(a) || isEmpty(b) ? undefined : f(a, b))
