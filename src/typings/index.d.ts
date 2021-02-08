/* eslint-disable @typescript-eslint/no-unused-vars */
type Parameters<T extends (...args: unknown[]) => unknown> = T extends (
  ...args: infer P
) => unknown
  ? P
  : never

type PropType<Obj, Key extends keyof Obj> = Obj[Key]

//* guide:
//* someActions: bindActionCreators<
//*   typeof someActions, BindedAsyncActions<typeof someActions>
//* >(
//*   someActions, dispatch
//* )

type BindedAsyncAction<T extends Function> = (
  ...args: Parameters<T>
) => ReturnType<ReturnType<T>>

type BindedAsyncActions<
  Obj extends import('redux').ActionCreatorsMapObject<unknown>
> = {
  [key in keyof Obj]: (
    ...args: Parameters<PropType<Obj, key>>
  ) => ReturnType<ReturnType<PropType<Obj, key>>>
}

type Filter<V = unknown> = (value: V, index: number, self: V[]) => boolean
type Sort<V = unknown> = (a: V, b: V) => number

type MapFunc<V = unknown, R = unknown> = (
  value: V,
  index: number,
  self: V[]
) => R

interface SortInfo<T extends string = string> {
  type: T | undefined
  reversed?: boolean
}

type FilterValue<T = unknown> = T | T[] | undefined | null

type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

type ID = number

type Callback = () => void
type ErrorCallback = (error: ErrorType) => void
