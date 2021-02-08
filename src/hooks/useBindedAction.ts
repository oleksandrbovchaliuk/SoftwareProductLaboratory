import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { ActionCreator, bindActionCreators } from 'redux'

const useBindedAction = <A, T extends ActionCreator<A>>(
  actionCreator: T,
  deps: unknown[] = []
) => {
  const dispatch = useDispatch<ReduxDispatch>()

  const action = useMemo(
    () => bindActionCreators<T, BindedAsyncAction<T>>(actionCreator, dispatch),
    [dispatch, ...deps]
  )

  return action
}

export default useBindedAction
