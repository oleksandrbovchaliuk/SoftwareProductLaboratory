export const mergeRefs = <T = unknown>(
  ...refs: (React.MutableRefObject<T> | React.LegacyRef<T>)[]
): React.RefCallback<T> => (value) =>
  refs.forEach((ref) => {
    if (typeof ref === 'function') {
      ref(value)
    } else if (ref !== null && !!ref) {
      ;(ref as React.MutableRefObject<T | null>).current = value
    }
  })

export default {
  mergeRefs,
}
