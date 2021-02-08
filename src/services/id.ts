export const getId = (rawId: string | number | undefined): ID =>
  Math.trunc(
    typeof rawId === 'string'
      ? Number(rawId)
      : typeof rawId === 'number'
      ? rawId
      : NaN
  )

export const isId = (id: string | number | undefined): boolean =>
  Number.isInteger(typeof id === 'string' ? Number(id) : id)
