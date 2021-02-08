import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { ActionCreatorsMapObject, bindActionCreators } from 'redux'

const useBindedActions = <A, T extends ActionCreatorsMapObject<A>>(
  actionCreator: T,
  deps: unknown[] = []
) => {
  const dispatch = useDispatch<ReduxDispatch>()

  const actions = useMemo(
    () => bindActionCreators<T, BindedAsyncActions<T>>(actionCreator, dispatch),
    [dispatch, ...deps]
  )

  return actions
}

export default useBindedActions
