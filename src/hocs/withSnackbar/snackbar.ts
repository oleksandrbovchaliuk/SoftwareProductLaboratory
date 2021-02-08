import { SnackbarVariant } from '@components/Snackbar'

export interface SnackbarData {
  message: string
  variant?: SnackbarVariant
}

export const defaultSnackbarData: SnackbarData = {
  message: '',
  variant: SnackbarVariant.info,
}

export type ShowSnackbar = (snackbarData: SnackbarData) => void
