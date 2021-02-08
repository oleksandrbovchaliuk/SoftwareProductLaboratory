import { asynchronous } from './async'

export const delay = (ms: number = 1) => asynchronous(undefined, ms)

export default delay
