import { useEffect, useRef } from 'react'

const useRoot = <E extends keyof HTMLElementTagNameMap>(
  root: HTMLElement | null,
  tag: E,
  options?: ElementCreationOptions
) => {
  const element = useRef(document.createElement(tag, options))

  useEffect(() => {
    root?.appendChild(element.current)
    return () => {
      root?.removeChild(element.current)
    }
  }, [root, tag])

  return element.current
}

export default useRoot
