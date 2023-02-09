export type FN<T, R> = (value: T) => R
export type Predicate<T> = FN<T, boolean>
export type Handler<T> = FN<T, void>
export type Lazy<T> = () => T

export type ReadonlyRecord<K extends keyof unknown, V> = Readonly<Record<K, V>>

export type CurriedLazy<A, B> = (value: A) => Lazy<B>
export type CurriedHandler<A, B> = (value: A) => Handler<B>

export type EitherProps<T, A extends keyof T, B extends keyof T> = T &
  (
    | ({
        readonly [K in A]-?: NonNullable<T[K]>
      } & {
        readonly [K in B]+?: never
      })
    | ({
        readonly [K in B]-?: NonNullable<T[K]>
      } & {
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

export type Primitive = string | number | boolean | bigint | symbol | undefined | null

// eslint-disable-next-line functional/readonly-type
export type PrimitiveRecord = {
  readonly [key: string]: Primitive | PrimitiveRecord
}

export type PrimitiveReadonlyRecord = Readonly<PrimitiveRecord>
