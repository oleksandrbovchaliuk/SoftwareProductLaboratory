import action from '@redux/action'
import ActionType from './types'

import { modelToUser } from '@services/user'
import usersActions from '@redux/users/actions'
import delay from '@services/delay'

import SnackbarService from '@services/snackbar'
import { getErrorMessage } from '@services/error'

const loading = (isLoading = true): AppThunk => (dispatch) =>
  dispatch(action(ActionType.LOADING, isLoading))

const error = (error: ErrorType): AppThunk => (dispatch) =>
  dispatch(action(ActionType.ERROR, error))

const reset = (): AppThunk => (dispatch) => dispatch(action(ActionType.RESET))

const login = (
  email: string,
  password: string,
  _remember: boolean = false,
  onSuccess?: (user: User) => void,
  onError?: ErrorCallback
): AppThunk<User> => async (dispatch, getState) => {
  dispatch(action(ActionType.LOGIN_BEGIN))

  const {
    users: { users },
  } = getState()

  try {
    await delay(1000)
    const findUser = users.find((user) => user.email === email)

    if (!findUser) {
      throw Error(`There are no user with email ${email}`)
    } else if (findUser.password !== password) {
      throw Error('Wrong credentials')
    }
    const user = modelToUser(findUser)

    onSuccess?.(user)
    dispatch(action(ActionType.LOGIN_SUCCESS, user))
    return user
  } catch (error) {
    dispatch(action(ActionType.LOGIN_ERROR, error))
    onError?.(error)
    SnackbarService.error(getErrorMessage(error))
  }
}

const logout = (
  onSuccess?: Callback,
  onError?: ErrorCallback
): AppThunk => async (dispatch) => {
  dispatch(action(ActionType.LOGOUT_BEGIN))

  try {
    onSuccess?.()
    dispatch(action(ActionType.LOGOUT_SUCCESS))
  } catch (error) {
    dispatch(action(ActionType.LOGOUT_ERROR, error))
    onError?.(error)
    SnackbarService.error(getErrorMessage(error))
  }
}

const signup = (
  newUser: UserSignup,
  onSuccess?: Callback,
  onError?: ErrorCallback
): AppThunk => async (dispatch, getState, extra) => {
  dispatch(action(ActionType.SIGNUP_BEGIN))
  await delay(1000)

  try {
    const newUserModel = await usersActions.append(newUser)(
      dispatch,
      getState,
      extra
    )
    if (!newUserModel) {
      throw Error('Something went wrong')
    }
    onSuccess?.()
    dispatch(action(ActionType.SIGNUP_SUCCESS, modelToUser(newUserModel)))
  } catch (error) {
    dispatch(action(ActionType.SIGNUP_ERROR, error))
    onError?.(error)
    SnackbarService.error(getErrorMessage(error))
  }
}

const userActions = {
  loading,
  error,
  reset,
  login,
  logout,
  signup,
}

export default userActions
