import ActionType, { Action } from './types'
import { uniqueFilter } from '@services/utils'
import { equalUserModels } from '@services/user'

export interface State {
  isLoading: boolean
  users: UserModel[]
  error: ErrorType | null
}

const initialState: State = {
  isLoading: false,
  users: [],
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
    case ActionType.LOAD_BEGIN:
    case ActionType.APPEND_BEGIN: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case ActionType.APPEND_SUCCESS: {
      return {
        ...state,
        users: [...state.users, action.payload],
        isLoading: false,
      }
    }
    case ActionType.LOAD_SUCCESS: {
      let newUsers: UserModel[] = []
      if (action.payload.refresh) {
        newUsers = action.payload.users
      } else {
        newUsers = [...state.users, ...action.payload.users].filter(
          uniqueFilter(equalUserModels)
        )
      }
      return {
        ...state,
        users: newUsers,
        isLoading: false,
      }
    }
    case ActionType.ERROR:
    case ActionType.LOAD_ERROR:
    case ActionType.APPEND_ERROR: {
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
