import { FormikErrors } from 'formik'

export const getFormErrors = <FormData = unknown>(
  values: FormikErrors<FormData>
): FormikErrors<FormData> =>
  (Object.keys(values).reduce(
    (acc, key) =>
      values[key as keyof FormikErrors<FormData>]
        ? { ...acc, [key]: values[key as keyof FormikErrors<FormData>] }
        : { ...acc },
    {}
  ) as unknown) as FormikErrors<FormData>

export const getErrorMessage = (error: ErrorType): string => {
  if (typeof error === 'string') {
    return error
  } else if (typeof error === 'object') {
    if ('message' in error) {
      return error.message
    }
  }
  return ''
}

export default {
  getFormErrors,
  getErrorMessage,
}
