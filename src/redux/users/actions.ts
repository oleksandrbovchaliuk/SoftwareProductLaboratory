import action from '@redux/action'
import ActionType from './types'

import usersJson from '@data/users.json'

const loading = (isLoading = true): AppThunk => (dispatch) =>
  dispatch(action(ActionType.LOADING, isLoading))

const error = (error: ErrorType): AppThunk => (dispatch) =>
  dispatch(action(ActionType.ERROR, error))

const reset = (): AppThunk => (dispatch) => dispatch(action(ActionType.RESET))

const load = (
  refresh: boolean = false,
  onSuccess?: Callback,
  onError?: ErrorCallback
): AppThunk<UserModel[]> => async (dispatch, getState) => {
  dispatch(action(ActionType.LOAD_BEGIN))
  try {
    const users: UserModel[] = usersJson as UserModel[]

    dispatch(action(ActionType.LOAD_SUCCESS, { users, refresh }))
    onSuccess?.()
    return getState().users.users
  } catch (error) {
    dispatch(action(ActionType.LOAD_ERROR, error))
    onError?.(error)
  }
}

const append = (
  newUser: UserSignup,
  onSuccess?: (user: UserModel) => void,
  onError?: ErrorCallback
): AppThunk<UserModel> => async (dispatch, getState) => {
  dispatch(action(ActionType.APPEND_BEGIN))
  try {
    const {
      users: { users },
    } = getState()
    if (users.find((user) => user.email === newUser.email)) {
      throw Error('Email already exists')
    }
    const newUserModel: UserModel = {
      ...newUser,
      id: users.length,
    }
    dispatch(action(ActionType.APPEND_SUCCESS, newUserModel))
    onSuccess?.(newUserModel)
    return newUserModel
  } catch (error) {
    dispatch(action(ActionType.APPEND_ERROR, error))
    onError?.(error)
  }
}

const usersActions = {
  loading,
  error,
  reset,
  load,
  append,
}

export default usersActions
