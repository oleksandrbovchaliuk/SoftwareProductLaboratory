enum ActionType {
  LOADING = '[user]: loading',
  ERROR = '[user]: error',
  RESET = '[user]: reset',

  LOGIN_BEGIN = '[user]: login begin',
  LOGIN_SUCCESS = '[user]: login success',
  LOGIN_ERROR = '[user]: login error',

  LOGOUT_BEGIN = '[user]: logout begin',
  LOGOUT_SUCCESS = '[user]: logout success',
  LOGOUT_ERROR = '[user]: logout error',

  SIGNUP_BEGIN = '[user]: signup begin',
  SIGNUP_SUCCESS = '[user]: signup success',
  SIGNUP_ERROR = '[user]: signup error',
}

type LoadingAction = ReduxAction<ActionType.LOADING, boolean>

type ErrorAction = ReduxAction<ActionType.ERROR, ErrorType>

type ResetAction = ReduxAction<ActionType.RESET>

type LoginBeginAction = ReduxAction<ActionType.LOGIN_BEGIN>

type LoginSuccessAction = ReduxAction<ActionType.LOGIN_SUCCESS, User>

type LoginErrorAction = ReduxAction<ActionType.LOGIN_ERROR, ErrorType>

type LogoutBeginAction = ReduxAction<ActionType.LOGOUT_BEGIN>

type LogoutSuccessAction = ReduxAction<ActionType.LOGOUT_SUCCESS>

type LogoutErrorAction = ReduxAction<ActionType.LOGOUT_ERROR, ErrorType>

type SignupBeginAction = ReduxAction<ActionType.SIGNUP_BEGIN>

type SignupSuccessAction = ReduxAction<ActionType.SIGNUP_SUCCESS, User>

type SignupErrorAction = ReduxAction<ActionType.SIGNUP_ERROR, ErrorType>

export type Action =
  | LoadingAction
  | ErrorAction
  | ResetAction
  | LoginBeginAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutBeginAction
  | LogoutSuccessAction
  | LogoutErrorAction
  | SignupBeginAction
  | SignupSuccessAction
  | SignupErrorAction

export default ActionType
