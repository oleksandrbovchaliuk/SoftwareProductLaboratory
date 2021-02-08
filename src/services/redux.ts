import { Store } from 'redux'

let _store: Store<ReduxState, AnyAction>

export const setStore = (store: Store) => (_store = store)
export const getState = () => (_store && _store.getState()) || {}
export const dispatch = ((action: AnyAction) =>
  (_store && _store.dispatch(action)) || {}) as ReduxDispatch

export default {
  setStore,
  getState,
  dispatch,
}
