interface Window {
  resetRedux?: () => void
  updateRedux?: (path: string[], value: unknown) => unknown
  dispatchRedux?: import('redux').ReduxDispatch
  getReduxState?: () => ReduxState
}
