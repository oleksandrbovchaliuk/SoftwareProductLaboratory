type CoreReduxAction<T = unknown> = import('redux').Action<T>

type ReduxState = ReturnType<typeof import('@redux').rootReducer>

//* reducers

type GlobalActionType = import('@redux/types').default
type GlobalAction = import('@redux/types').Action

type UserActionType = import('@redux/user/types').default
type UserAction = import('@redux/user/types').Action

type UsersActionType = import('@redux/users/types').default
type UsersAction = import('@redux/users/types').Action

type TasksActionType = import('@redux/tasks/types').default
type TasksAction = import('@redux/tasks/types').Action

//* reducers end

type AnyActionType =
  | GlobalActionType
  | UserActionType
  | UsersActionType
  | TasksActionType

type AnyAction = GlobalAction | UserAction | UsersAction | TasksAction

interface ReduxActionWithPayload<T = AnyActionType, P = undefined>
  extends CoreReduxAction<T> {
  payload: P
}

type ReduxAction<T = AnyActionType, P = undefined> = P extends undefined
  ? CoreReduxAction<T>
  : ReduxActionWithPayload<T, P>

type AppThunk<R = undefined, E = undefined> = import('redux-thunk').ThunkAction<
  R extends undefined ? unknown | Promise<unknown> : R | Promise<R | undefined>,
  ReduxState,
  E,
  AnyAction
>

type ReduxDispatch = import('redux').Dispatch<AnyAction>

type ReduxMiddleware = import('redux').Middleware<{}, ReduxState, ReduxDispatch>

type ReduxThunkMiddleware<E = unknown> = import('redux-thunk').ThunkMiddleware<
  ReduxState,
  AnyAction,
  E
>
