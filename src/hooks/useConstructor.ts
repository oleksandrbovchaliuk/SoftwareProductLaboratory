import { useEffect, useRef } from 'react'

const useConstructor = (callBack: () => Callback | undefined) => {
  const hasBeenCalled = useRef(false)
  const unmount = useRef<Callback>()
  useEffect(
    () => () => {
      typeof unmount.current === 'function' && unmount.current?.()
    },
    []
  )
  if (hasBeenCalled.current) return

  hasBeenCalled.current = true
  unmount.current = callBack?.()
}

export default useConstructor
