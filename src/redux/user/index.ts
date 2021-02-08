import ActionType, { Action } from './types'

export interface State {
  isLoading: boolean
  user: User | null
  error: ErrorType | null
}

const initialState: State = {
  isLoading: false,
  user: null,
  error: null,
}

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      }
    }
    case ActionType.RESET: {
      return {
        ...initialState,
      }
    }
    case ActionType.LOGIN_BEGIN:
    case ActionType.LOGOUT_BEGIN:
    case ActionType.SIGNUP_BEGIN: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case ActionType.LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      }
    }
    case ActionType.LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        isLoading: false,
      }
    }
    case ActionType.SIGNUP_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      }
    }
    case ActionType.ERROR:
    case ActionType.LOGIN_ERROR:
    case ActionType.LOGOUT_ERROR:
    case ActionType.SIGNUP_ERROR: {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    }
    default:
      return state
  }
}

export default reducer
