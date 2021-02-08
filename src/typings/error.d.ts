type ErrorType =
  | Error
  | {
      name?: string
      message: string
      stack?: string
      code?: number
    }
  | string
