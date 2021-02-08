import action from '@redux/action'
import ActionType from './types'

import tasksJson from '@data/tasks.json'
import taskResultsJson from '@data/task_results.json'

import SnackbarService from '@services/snackbar'
import { getErrorMessage } from '@services/error'
import { getMark } from '@services/task'

const loading = (isLoading = true): AppThunk => (dispatch) =>
  dispatch(action(ActionType.LOADING, isLoading))

const error = (error: ErrorType): AppThunk => (dispatch) =>
  dispatch(action(ActionType.ERROR, error))

const reset = (): AppThunk => (dispatch) => dispatch(action(ActionType.RESET))

const load = (
  refresh: boolean = false,
  onSuccess?: Callback,
  onError?: ErrorCallback
): AppThunk<Task[]> => async (dispatch, getState) => {
  dispatch(action(ActionType.LOAD_BEGIN))
  try {
    const tasks: Task[] = tasksJson as Task[]

    dispatch(action(ActionType.LOAD_SUCCESS, { tasks, refresh }))
    onSuccess?.()
    return getState().tasks.tasks
  } catch (error) {
    dispatch(action(ActionType.LOAD_ERROR, error))
    onError?.(error)
    SnackbarService.error(getErrorMessage(error))
  }
}

const select = (
  id?: ID,
  onSuccess?: (task: Task | null) => void,
  onError?: ErrorCallback
): AppThunk<Task | null> => async (dispatch, getState) => {
  dispatch(action(ActionType.SELECT_BEGIN))

  try {
    const {
      tasks: { tasks },
    } = getState()

    const task =
      id === undefined ? null : tasks.find((task) => task.id === id) || null

    if (id !== undefined && !task) {
      throw Error('No such task')
    }

    dispatch(action(ActionType.SELECT_SUCCESS, task))

    onSuccess?.(getState().tasks.currentTask)
    return task!
  } catch (error) {
    dispatch(action(ActionType.SELECT_ERROR, error))
    onError?.(error)
    SnackbarService.error(getErrorMessage(error))
  }
}

const append = (
  newTask: TaskCreate,
  onSuccess?: (task: Task) => void,
  onError?: ErrorCallback
): AppThunk<Task> => async (dispatch, getState) => {
  dispatch(action(ActionType.APPEND_BEGIN))
  try {
    const {
      tasks: { tasks },
    } = getState()

    const task: Task = {
      ...newTask,
      id: tasks.length,
    }

    dispatch(action(ActionType.APPEND_SUCCESS, task))
    onSuccess?.(task)
    return task
  } catch (error) {
    dispatch(action(ActionType.APPEND_ERROR, error))
    onError?.(error)
    SnackbarService.error(getErrorMessage(error))
  }
}

const loadResults = (
  refresh: boolean = false,
  onSuccess?: Callback,
  onError?: ErrorCallback
): AppThunk<TaskResult[]> => async (dispatch, getState) => {
  dispatch(action(ActionType.LOAD_RESULTS_BEGIN))
  try {
    const results: TaskResult[] = taskResultsJson as TaskResult[]

    dispatch(action(ActionType.LOAD_RESULTS_SUCCESS, { results, refresh }))
    onSuccess?.()
    return getState().tasks.results
  } catch (error) {
    dispatch(action(ActionType.LOAD_RESULTS_ERROR, error))
    onError?.(error)
    SnackbarService.error(getErrorMessage(error))
  }
}

const addSolution = (
  solution: TaskSolution,
  taskId: ID,
  onSuccess?: (taskResult: TaskResult) => void,
  onError?: ErrorCallback
): AppThunk<TaskResult> => async (dispatch, getState) => {
  dispatch(action(ActionType.APPEND_RESULT_BEGIN))

  try {
    const {
      tasks: { results, tasks },
      user: { user },
    } = getState()

    if (!user) {
      throw Error('No user data')
    }

    const task = tasks.find((task) => task.id === taskId)

    if (!task) {
      throw Error(`No task with id ${taskId}`)
    }

    const taskResult: TaskResult = {
      id: results.length,
      taskId,
      mark: getMark(solution, task.etalon),
      solution,
      userId: user.id,
    }

    dispatch(action(ActionType.APPEND_RESULT_SUCCESS, taskResult))
    onSuccess?.(taskResult)
    return taskResult
  } catch (error) {
    dispatch(action(ActionType.APPEND_RESULT_ERROR, error))
    onError?.(error)
    SnackbarService.error(getErrorMessage(error))
  }
}

const tasksActions = {
  loading,
  error,
  reset,
  load,
  select,
  append,
  loadResults,
  addSolution,
}

export default tasksActions
