import ActionType, { Action } from './types'
import { uniqueFilter } from '@services/utils'
import { equalTaskResults, equalTasks } from '@services/task'

export interface State {
  isLoading: boolean
  tasks: Task[]
  currentTask: Task | null
  results: TaskResult[]
  error: ErrorType | null
}

const initialState: State = {
  isLoading: false,
  tasks: [],
  currentTask: null,
  results: [],
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
    case ActionType.APPEND_BEGIN:
    case ActionType.LOAD_RESULTS_BEGIN:
    case ActionType.APPEND_RESULT_BEGIN: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case ActionType.SELECT_BEGIN: {
      return {
        ...state,
        isLoading: true,
        currentTask: null,
      }
    }
    case ActionType.LOAD_SUCCESS: {
      let newTasks: Task[] = []
      if (action.payload.refresh) {
        newTasks = action.payload.tasks
      } else {
        newTasks = [...state.tasks, ...action.payload.tasks].filter(
          uniqueFilter(equalTasks)
        )
      }
      return {
        ...state,
        tasks: newTasks,
        isLoading: false,
      }
    }
    case ActionType.SELECT_SUCCESS: {
      return {
        ...state,
        currentTask: action.payload,
        isLoading: false,
      }
    }
    case ActionType.APPEND_SUCCESS: {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        isLoading: false,
      }
    }
    case ActionType.LOAD_RESULTS_SUCCESS: {
      let newResults: TaskResult[] = []
      if (action.payload.refresh) {
        newResults = action.payload.results
      } else {
        newResults = [...state.results, ...action.payload.results].filter(
          uniqueFilter(equalTaskResults)
        )
      }
      return {
        ...state,
        results: newResults,
        isLoading: false,
      }
    }
    case ActionType.APPEND_RESULT_SUCCESS: {
      console.log('action.payload', action.payload)
      return {
        ...state,
        results: [...state.results, action.payload],
        isLoading: false,
      }
    }
    case ActionType.ERROR:
    case ActionType.LOAD_ERROR:
    case ActionType.SELECT_ERROR:
    case ActionType.APPEND_ERROR:
    case ActionType.LOAD_RESULTS_ERROR:
    case ActionType.APPEND_RESULT_ERROR: {
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
