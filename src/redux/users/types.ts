enum ActionType {
  LOADING = '[users]: loading',
  ERROR = '[users]: error',
  RESET = '[users]: reset',

  LOAD_BEGIN = '[users]: load begin',
  LOAD_SUCCESS = '[users]: load success',
  LOAD_ERROR = '[users]: load error',

  APPEND_BEGIN = '[users]: append begin',
  APPEND_SUCCESS = '[users]: append success',
  APPEND_ERROR = '[users]: append error',
}

type LoadingAction = ReduxAction<ActionType.LOADING, boolean>

type ErrorAction = ReduxAction<ActionType.ERROR, ErrorType>

type ResetAction = ReduxAction<ActionType.RESET>

type LoadBeginAction = ReduxAction<ActionType.LOAD_BEGIN>

type LoadSuccessAction = ReduxAction<
  ActionType.LOAD_SUCCESS,
  { users: UserModel[]; refresh: boolean }
>

type LoadErrorAction = ReduxAction<ActionType.LOAD_ERROR, ErrorType>

type AppendBeginAction = ReduxAction<ActionType.APPEND_BEGIN>

type AppendSuccessAction = ReduxAction<ActionType.APPEND_SUCCESS, UserModel>

type AppendErrorAction = ReduxAction<ActionType.APPEND_ERROR, ErrorType>

export type Action =
  | LoadingAction
  | ErrorAction
  | ResetAction
  | LoadBeginAction
  | LoadSuccessAction
  | LoadErrorAction
  | AppendBeginAction
  | AppendSuccessAction
  | AppendErrorAction

export default ActionType
