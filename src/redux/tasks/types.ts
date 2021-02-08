enum ActionType {
  LOADING = '[tasks]: loading',
  ERROR = '[tasks]: error',
  RESET = '[tasks]: reset',

  LOAD_BEGIN = '[tasks]: load begin',
  LOAD_SUCCESS = '[tasks]: load success',
  LOAD_ERROR = '[tasks]: load error',

  SELECT_BEGIN = '[tasks]: select begin',
  SELECT_SUCCESS = '[tasks]: select success',
  SELECT_ERROR = '[tasks]: select error',

  APPEND_BEGIN = '[tasks]: append begin',
  APPEND_SUCCESS = '[tasks]: append success',
  APPEND_ERROR = '[tasks]: append error',

  LOAD_RESULTS_BEGIN = '[tasks]: load results begin',
  LOAD_RESULTS_SUCCESS = '[tasks]: load results success',
  LOAD_RESULTS_ERROR = '[tasks]: load results error',

  APPEND_RESULT_BEGIN = '[tasks]: append result begin',
  APPEND_RESULT_SUCCESS = '[tasks]: append result success',
  APPEND_RESULT_ERROR = '[tasks]: append result error',
}

type LoadingAction = ReduxAction<ActionType.LOADING, boolean>

type ErrorAction = ReduxAction<ActionType.ERROR, ErrorType>

type ResetAction = ReduxAction<ActionType.RESET>

type LoadBeginAction = ReduxAction<ActionType.LOAD_BEGIN>

type LoadSuccessAction = ReduxAction<
  ActionType.LOAD_SUCCESS,
  { tasks: Task[]; refresh: boolean }
>

type LoadErrorAction = ReduxAction<ActionType.LOAD_ERROR, ErrorType>

type SelectBeginAction = ReduxAction<ActionType.SELECT_BEGIN>

type SelectSuccessAction = ReduxAction<ActionType.SELECT_SUCCESS, Task | null>

type SelectErrorAction = ReduxAction<ActionType.SELECT_ERROR, ErrorType>

type AppendBeginAction = ReduxAction<ActionType.APPEND_BEGIN>

type AppendSuccessAction = ReduxAction<ActionType.APPEND_SUCCESS, Task>

type AppendErrorAction = ReduxAction<ActionType.APPEND_ERROR, ErrorType>

type LoadResultsBeginAction = ReduxAction<ActionType.LOAD_RESULTS_BEGIN>

type LoadResultsSuccessAction = ReduxAction<
  ActionType.LOAD_RESULTS_SUCCESS,
  { results: TaskResult[]; refresh: boolean }
>

type LoadResultsErrorAction = ReduxAction<
  ActionType.LOAD_RESULTS_ERROR,
  ErrorType
>

type AppendResultBeginAction = ReduxAction<ActionType.APPEND_RESULT_BEGIN>

type AppendResultSuccessAction = ReduxAction<
  ActionType.APPEND_RESULT_SUCCESS,
  TaskResult
>

type AppendResultErrorAction = ReduxAction<
  ActionType.APPEND_RESULT_ERROR,
  ErrorType
>

export type Action =
  | LoadingAction
  | ErrorAction
  | ResetAction
  | LoadBeginAction
  | LoadSuccessAction
  | LoadErrorAction
  | SelectBeginAction
  | SelectSuccessAction
  | SelectErrorAction
  | AppendBeginAction
  | AppendSuccessAction
  | AppendErrorAction
  | LoadResultsBeginAction
  | LoadResultsSuccessAction
  | LoadResultsErrorAction
  | AppendResultBeginAction
  | AppendResultSuccessAction
  | AppendResultErrorAction

export default ActionType
