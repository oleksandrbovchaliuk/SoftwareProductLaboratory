import { isProduction } from '@config'
import { dispatch, getState } from '@services/redux'

import globalActions from '@redux/actions'

export const configureReduxConsole = () => {
  if (!isProduction) {
    const reset = () => globalActions.reset()(dispatch, getState, undefined)

    const update = (path: string | string[], value: unknown) =>
      globalActions.update(path, value)(dispatch, getState, undefined)

    window.resetRedux = reset
    window.updateRedux = update
    window.dispatchRedux = dispatch
    window.getReduxState = getState

    return () => {
      delete window.resetRedux
      delete window.updateRedux
      delete window.dispatchRedux
      delete window.getReduxState
    }
  }
}

export const configureScrollbarPadding = () => {
  document.body.style.paddingRight = `${
    window.innerWidth - document.documentElement.clientWidth
  }px`
}

export default {
  configureReduxConsole,
  configureScrollbarPadding,
}
