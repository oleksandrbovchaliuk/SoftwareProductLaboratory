import action from './action'

import ActionType from './types'

export const reset = (): AppThunk => async (dispatch) =>
  dispatch(action(ActionType.RESET))

export const update = (
  path: string | string[],
  value: unknown
): AppThunk => async (dispatch) =>
  dispatch(action(ActionType.UPDATE, { value, path }))

const globalActions = {
  reset,
  update,
}

export default globalActions
