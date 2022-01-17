export type FN<T, R> = (value: T) => R
export type Predicate<T> = FN<T, boolean>
export type Handler<T> = FN<T, void>
export type Lazy<T> = () => T

export type CurriedLazy<A, B> = (value: A) => Lazy<B>
export type CurriedHandler<A, B> = (value: A) => Handler<B>

export type EitherProps<T, A extends keyof T, B extends keyof T> = T &
  (
    | ({
        readonly [K in A]-?: NonNullable<T[K]>
      } &
        {
          readonly [K in B]+?: never
        })
    | ({
        readonly [K in B]-?: NonNullable<T[K]>
      } &
        {
          readonly [K in A]+?: never
        })
  )

export type Callable<R> = {
  (...args: ReadonlyArray<unknown>): R
}

export type GenericReturnType<R, X> = X extends Callable<R> ? R : never

export type RecursiveReadonly<T> = T extends object ? { readonly [K in keyof T]: RecursiveReadonly<T[K]> } : T

// eslint-disable-next-line @typescript-eslint/ban-types,functional/prefer-readonly-type
export type RecursivePartial<T> = T extends object ? { [K in keyof T]?: RecursivePartial<T[K]> } : T

// eslint-disable-next-line @typescript-eslint/ban-types
export type ReadonlyRecursivePartial<T> = T extends object ? { readonly [K in keyof T]?: RecursivePartial<T[K]> } : T

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NullableType<T = NonNullable<any>> = T | null | undefined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OptionalType<T = NonNullable<any>> = T | undefined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NullUnionType<T = NonNullable<any>> = T | null

export type NonOptional<T> = T extends undefined ? never : T
export type NonNull<T> = T extends null ? never : T

export type NullableString = NullableType<string>
export type OptionalString = OptionalType<string>
export type NullUnionString = NullUnionType<string>

export const toNullUnionType = <T>(value: NullableType<T>): NullUnionType<T> => (value === undefined ? null : value)

export const toOptionalType = <T>(value: NullableType<T>): OptionalType<T> => (value === null ? undefined : value)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const allFieldsAreFilled =
  (emptyStrAsNone: boolean) =>
  // eslint-disable-next-line @typescript-eslint/ban-types
  (object: object): boolean =>
    Object.keys(object).length === 0 ? false : Object.values(object).every(nonEmptyPredicate(emptyStrAsNone))

export const anyFieldIsFilled =
  (emptyStrAsNone: boolean) =>
  // eslint-disable-next-line @typescript-eslint/ban-types
  (object: object): boolean => {
    return Object.values(object).some(nonEmptyPredicate(emptyStrAsNone))
  }

export const anyFieldIsFilledWithException =
  (emptyStrAsNone: boolean) =>
  <T>(object: T, exceptionPredicate: Predicate<keyof T>): boolean =>
    Object.entries(object).some(
      ([fieldName, item]) => !exceptionPredicate(fieldName as keyof T) && nonEmptyPredicate(emptyStrAsNone)(item)
    )

export const nameOf = <T>(name: keyof T): keyof T => name

export const arrayIntRange = (start: number, end: number): ReadonlyArray<number> =>
  Array.from({ length: end - start + 1 }, (_, k) => k + start)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const mapValue = <A, B>(f: (a: A) => B) => f
