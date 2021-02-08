import { Middleware, Store, applyMiddleware, compose, createStore } from 'redux'
import {
  PersistConfig,
  Persistor,
  persistReducer,
  persistStore,
} from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'

import reducer from '@redux'
import { isProduction } from '@config'
import middlewares from '@redux/middlewares'

const persistConfig: PersistConfig<ReduxState> = {
  key: 'root',
  storage,
}

export interface IConfigureStore {
  store: Store<ReduxState, AnyAction>
  persistor: Persistor
}

const configureStore = (onCompletion?: () => void): IConfigureStore => {
  let middleware: Middleware[] = [thunk, ...middlewares]
  if (!isProduction) {
    middleware = [...middleware, logger]
  }

  const composeEnhancers = compose(applyMiddleware(...middleware))
  const persistedReducer = persistReducer(persistConfig, reducer)
  const store = createStore(persistedReducer, composeEnhancers)
  const persistor = persistStore(store, undefined, onCompletion)

  return {
    store,
    persistor,
  }
}

export default configureStore
