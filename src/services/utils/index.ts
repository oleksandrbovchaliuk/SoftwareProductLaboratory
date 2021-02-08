export const uniqueFilter = <T>(
  compare: (a: T, b: T) => boolean = (a, b) => a === b
) => (value: T, index: number, self: T[]) =>
  self.findIndex((item) => compare(item, value)) === index

export const noop = (value: unknown) => value

export const noact = () => {}

export const nosort = <T>(_a: T, _b: T) => -1

export const nofilter = <T>(_v: T) => true

export const isPrimitive = (value: unknown) => {
  const type = typeof value
  switch (type) {
    case 'bigint':
    case 'boolean':
    case 'number':
    case 'string':
    case 'symbol': {
      return true
    }
    default: {
      return false
    }
  }
}

export const isSimple = (value: unknown) =>
  isPrimitive(value) || value === null || value === undefined

export const isComplex = (value: unknown) => !isSimple(value)

export const chunkStr = (v: string, len = 1, elem: string, reverse = false) => {
  v = reverse ? v.split('').reverse().join('') : v
  const re = new RegExp(`.{1,${len}}`, 'g')
  let groups = v.match(re)
  if (reverse && groups) {
    groups = groups.reverse()
    groups = groups.map((group) => group.split('').reverse().join(''))
  }
  return groups?.join(elem) || ''
}

export const isId = (id: string | number) =>
  Number.isInteger(typeof id === 'string' ? Number(id) : id)

export const objectsAreEqual = (a: object, b: object) => {
  const aProps = Object.getOwnPropertyNames(a)
  const bProps = Object.getOwnPropertyNames(b)

  if (aProps.length != bProps.length) {
    return false
  }
  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i] as keyof typeof a & keyof typeof b

    if (a[propName] !== b[propName]) {
      return false
    }
  }

  return true
}

export const intersection = <T>(a: T[], b: T[]): T[] =>
  a.filter((v) => b.includes(v))

export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> =>
  keys.reduce(
    (acc, key) =>
      key in obj ? { ...acc, [key]: (obj as Record<K, unknown>)[key] } : acc,
    {}
  ) as Pick<T, K>

export const pickValues = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): (T[K] | undefined)[] =>
  keys.reduce(
    (acc, key) => [
      ...acc,
      key in obj ? ((obj as Record<K, unknown>)[key] as T[K]) : undefined,
    ],
    [] as (T[K] | undefined)[]
  ) as (T[K] | undefined)[]

export const isNullable = (value: unknown) =>
  value === undefined || value === null

export const length = (value: unknown) =>
  Array.isArray(value) ? value.length : 1

export default {
  uniqueFilter,
  noop,
  noact,
  nosort,
  nofilter,
  isPrimitive,
  isSimple,
  isComplex,
  chunkStr,
  isId,
  objectsAreEqual,
  intersection,
  pick,
  pickValues,
  isNullable,
  length,
}
