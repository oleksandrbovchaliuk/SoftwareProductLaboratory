import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import configureStore from './configure'

import { setStore } from '@services/redux'

const { persistor, store } = configureStore()

const reduxBoot = <Props extends object = object>(
  Component: React.ComponentType<Props>
): React.FC<Props> => {
  const ReduxBoot: React.FC<Props> = (props: Props) => {
    useEffect(() => {
      setStore(store)
    }, [store])

    return (
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <Component {...props} />
        </Provider>
      </PersistGate>
    )
  }
  return ReduxBoot
}

export default reduxBoot
