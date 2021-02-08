import { Action, combineReducers } from 'redux'

import ActionType from './types'

import { isPrimitive } from '@services/utils'

import user from './user'
import users from './users'
import tasks from './tasks'

const rootReducer = combineReducers({ user, users, tasks })

const reducer = (state: ReduxState | undefined, action: AnyAction) => {
  switch (action.type) {
    case ActionType.RESET: {
      state = undefined
      break
    }
    case ActionType.UPDATE: {
      if (action.payload.path.length > 0) {
        const path = Array.isArray(action.payload.path)
          ? action.payload.path.join('.')
          : action.payload.path
        const paths = path.split('.')

        let target: Record<string, unknown> = state as Record<string, unknown>
        console.log(paths.slice(0, -1))
        for (const key of paths.slice(0, -1)) {
          if (!target[key] || isPrimitive(target[key])) {
            target[key] = {}
          } else {
            target = target[key] as Record<string, unknown>
          }
        }
        target[paths[paths.length - 1]] = action.payload.value
      }
    }
  }
  return rootReducer(state, action as Action)
}

export { rootReducer }

export default reducer
